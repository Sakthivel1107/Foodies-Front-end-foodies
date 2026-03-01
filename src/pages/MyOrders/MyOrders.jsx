import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import "./MyOrders.css"

const MyOrders = () => {
    const {token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get("https://foodies-back-end-1.onrender.com/api/orders",{headers: {Authorization: `Bearer ${token}`}});
        setData(response.data);
    };
    const received = async (orderId) => {
        const response = await axios.delete(`https://foodies-back-end-1.onrender.com/api/orders/${orderId}`,{headers: {Authorization: `Bearer ${token}`}});
        if(response.status === 204){
            setData(prev => prev.filter(data => data.id !== orderId));
        }
    };
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);
    
return (
  <div className="container py-5">

    {/* ================= MOBILE VIEW (Cards) ================= */}
    <div className="d-md-none">
      {data &&
        data.map((order, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">

              <div className="d-flex align-items-center mb-2">
                <img src={assets.logo} alt="" height={42} width={42} />
                <div className="ms-3 fw-bold">
                  ₹{order.amount.toFixed(2)}
                </div>
              </div>

              <p className="mb-1">
                {order.orderedItems.map((item, i) =>
                  i === order.orderedItems.length - 1
                    ? `${item.name} x${item.quantity}`
                    : `${item.name} x${item.quantity}, `
                )}
              </p>

              <p className="mb-1">
                Items: {order.orderedItems.length}
              </p>

              <p
                className={`fw-bold text-capitalize ${
                  order.orderStatus === "Delivered"
                    ? "text-success"
                    : "text-warning"
                }`}
              >
                ● {order.orderStatus}
              </p>

              {order.orderStatus === "Delivered" ? (
                <div>
                  <span>Received: </span>
                  <button className="btn fs-4 btn-lg" onClick={ () => received(order.id)}>✅</button>
                </div>
              ) : (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={fetchOrders}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              )}

            </div>
          </div>
        ))}
    </div>

    {/* ================= DESKTOP VIEW (Table) ================= */}
    <div className="table-responsive d-none d-md-block">
      <table className="table align-middle">
        <tbody>
          {data &&
            data.map((order, index) => (
              <tr key={index}>
                <td>
                  <img src={assets.logo} alt="" height={42} width={42} />
                </td>

                <td>
                  {order.orderedItems.map((item, i) =>
                    i === order.orderedItems.length - 1
                      ? `${item.name} x${item.quantity}`
                      : `${item.name} x${item.quantity}, `
                  )}
                </td>

                <td>₹{order.amount.toFixed(2)}</td>

                <td>Items: {order.orderedItems.length}</td>

                <td
                  className={`fw-bold text-capitalize ${
                    order.orderStatus === "Delivered"
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                {order.orderStatus}
                </td>

                <td>
                  {order.orderStatus === "Delivered" ? (
                    <div>
                      <span className="me-2">Received:</span>
                      <button className="btn btn-sm fs-5" onClick={ () => received(order.id)}>✅</button>
                    </div>
                  ) : (
                    <div className='ps-2'>
                        <button className="btn btn-warning btn-sm" onClick={fetchOrders}>
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                    
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  </div>
);

}

export default MyOrders;