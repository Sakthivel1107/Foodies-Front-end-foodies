import React, { useContext } from 'react';
import {assets} from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { calculateCartTotals } from '../../util/cartUtils';
import { useState } from 'react';
import axios from 'axios';
import {RAZORPAY_KEY} from '../../util/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {foodList,quantity,setQuantity,token} = useContext(StoreContext);
  //cart items
  const cartItems = foodList.filter(food => quantity[food.id] > 0);
  //calculation function call
  const {subtotal,shipping,tax,total} = calculateCartTotals(cartItems,quantity);
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    address:"",
    state:"",
    city:"",
    zip:""
  });

  const  verifyPayment = async (razorpayResponse) => {
    console.log(razorpayResponse);
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature
    };
    try {
      const response = await axios.post("https://foodies-back-end-1.onrender.com/api/orders/verify", paymentData , {headers : {"Authorization": `Bearer ${token}`}})
        if( response.status === 200 ){
        toast.success("Payment successful.");
        await clearCart();
        navigate("/myOrders");
      }
      else{
        toast.error("Payment failed, Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  }

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete("https://foodies-back-end-1.onrender.com/api/orders/"+orderId,{headers:{"Authorization":`Bearer ${token}`}})
    } catch (error) {
      toast.error("Something went wrong. Contact support.");
    }
  }

  const clearCart = async () => {
    try {
      await axios.delete("https://foodies-back-end-1.onrender.com/api/cart",{headers:{"Authorization":`Bearer ${token}`}})
      setQuantity({});
    } catch (error) {
      toast.error("Error while clearing the cart.");
    }
  }
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData( data => ({...data,[name]:value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state} - ${data.zip}.`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map(item => ({
        foodId: item.id,
        quantity: quantity[item.id],
        price: item.price * quantity[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        descriptiona: item.description,
        name: item.name
      })),
      amount: total.toFixed(2),
      orderStatus:"preparing"
    }

    try {
      const response = await axios.post("https://foodies-back-end-1.onrender.com/api/orders/create",orderData,{headers:{"Authorization":`Bearer ${token}`}})
      if(response.status === 201 && response.data.razorPayOrderId){
        //Initiate the payment
        initiateRazorpayPayment(response.data);
      }
      else{
        toast.error("Unable to place order, Please try again.");
      }
    } catch (error) {
      toast.error("Unable to place order, Please try again.");
    }
  }

  const initiateRazorpayPayment = (order)=>{
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount * 100, //Convert to paise
      currency: "INR",
      name: "Foodies",
      description: "Food Order Payment",
      order_id: order.razorPayOrderId,
      handler: async function(razorpayResponse){
        await verifyPayment(razorpayResponse)
      },
      prefill:{
        name:`${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme: {color: "#3399c"},
      modal: {
        ondismiss: async function () {
          await deleteOrder(order.id);
        }
      }
    };
    const razorPay = new window.Razorpay(options);
    razorPay.open()
  };
  return (
    <div className="container mt-3">

        <div className='text-center'>
          <img className='d-block mx-auto mb-3' src={assets.logo} alt="logo" width={98} height={98} />
        </div>
      
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {
              cartItems.map((item)=>(
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-muted">Qty: {quantity[item.id]}</small>
              </div>
              <span className="text-muted">₹{item.price}.00</span>
            </li>
              ))
            }
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Shipping</h6>
              </div>
              <span className="text-muted">₹{shipping}.00</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Tax(10%)</h6>
              </div>
              <span className="text-muted">₹{tax}.00</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{total}.00</strong>
            </li>
          </ul>

        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" className="form-control" id="firstName" placeholder="Jack" value={data.firstName} onChange={onChangeHandler} required/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Sparrow" name="lastName" value={data.lastName} onChange={onChangeHandler}  required/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="username">Email</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input type="email" className="form-control" id="email" placeholder="Username" name="email" value={data.email} onChange={onChangeHandler} required/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className='form-label'>Phone Number</label>
              <input type="tel" pattern='[0-9]{10}' className="form-control" id="phone" placeholder="9384958303" name="phoneNumber" value={data.phoneNumber} onChange={onChangeHandler} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" name="address" value={data.address} onChange={onChangeHandler} required/>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" name="state" value={data.state} onChange={onChangeHandler} required>
                  <option value="">Choose...</option>
                  <option value="TamilNadu">TamilNadu</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="city">City</label>
                <select className="custom-select d-block w-100" id="city" name="city" value={data.city} onChange={onChangeHandler} required>
                  <option value="">Choose...</option>
                  <option value="madurai">Madurai</option>
                  <option value="sivagangai">Sivagangai</option>
                  <option value="virudhunagar">Virudhunagar</option>
                  <option value="dindugul">Dindugul</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="tel" pattern='[0-9]{6}' className="form-control" id="zip" placeholder="625003" name="zip" value={data.zip} onChange={onChangeHandler} required/>
              </div>
            </div>
            <hr className="mb-4"/>
            <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={cartItems.length === 0}>Continue to checkout</button>
          </form>
        </div>
      </div>

    </div>

  )
}

export default PlaceOrder;