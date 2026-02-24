import React from 'react';
import './Cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../util/cartUtils';

const cart = () => {
  const navigate = useNavigate();
  const {foodList,increaseQuantity,decreaseQuantity,quantity,removeItemFromCart} = useContext(StoreContext);
  //cart items
  const cartItems = foodList.filter(food => quantity[food.id] > 0);
  //calculation function call
  const {subTotal,shipping,tax,total} = calculateCartTotals(cartItems,quantity);
  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <div className="row">
          <div className="col-lg-8">
              {
                cartItems.length > 0 ?
              <div className="card mb-4">
                  <div className="card-body">
                      {
                        cartItems.map((item,index)=>(
                          <div key={index} className="row cart-item mb-3">
                            <div className="col-md-3">
                                <img src={item.imageUrl} alt={item.name} className="img-fluid rounded"/>
                            </div>
                            <div className="col-md-5 mt-2">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="text-muted">Category: {item.category}</p>
                            </div>
                            <div className="col-md-2">
                                <div className="input-group mt-3">
                                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <input style={{"maxWidth":"100px"}} type="text" className="form-control  form-control-sm text-center quantity-input" value={quantity[item.id]} readOnly />
                                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>
                            </div>
                            <div className="col-md-2 text-end">
                                <p className="fw-bold">₹{item.price * quantity[item.id].toFixed(2)}</p>
                                <button className="btn btn-sm btn-outline-danger" onClick={()=>removeItemFromCart(item.id)}>
                                        <i className="bi bi-trash"></i>
                                </button>
                            </div>
                            <hr />
                          </div>
                        ))
                      }
                      
                  </div>
              </div> : <p>Your cart is empty.</p>
              }
              <div className="text-start mb-4">
                  <Link href="#" className="btn btn-outline-primary" to="/">
                      <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                  </Link>
              </div>
          </div>
          <div className="col-lg-4">
              
              <div className="card cart-summary">
                  <div className="card-body">
                      <h5 className="card-title mb-4">Order Summary</h5>
                      <div className="d-flex justify-content-between mb-3">
                          <span>Subtotal</span>
                          <span>₹{subTotal.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                          <span>Shipping</span>
                          <span>₹{shipping.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                          <span>Tax</span>
                          <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-4">
                          <strong>Total</strong>
                          <strong>₹{total.toFixed(2)}</strong>
                      </div>
                      <button className="btn btn-primary w-100" disabled={cartItems.length===0} onClick={()=>navigate('/order')}>Proceed to Checkout</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default cart;