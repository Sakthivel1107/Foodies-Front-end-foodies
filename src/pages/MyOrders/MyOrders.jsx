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
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);
  return (
    <div className="container">
        <div className="py-5 row justify-content-center">
            <table className="table table-response">
                <tbody>
                    {
                        data &&
                        data.map((order,index)=>{
                            return (
                                <tr key={index}>
                                    <td>
                                        <img src={assets.logo} alt="" height={42} width={42} />
                                    </td>
                                    <td>
                                        {
                                            order.orderedItems.map((item,index) => {
                                                if(index === order.orderedItems.length-1){
                                                    return item.name + " x" +item.quantity;
                                                }
                                                else{
                                                    return item.name + " x" +item.quantity +" , ";
                                                }
                                            })
                                        }
                                    </td>
                                    <td>&#x20B9;{order.amount.toFixed(2)}</td>
                                    <td>Items: {order.orderedItems.length}</td>
                                    <td className="fw-bold text-capialize">&#x25cf;{order.orderStatus}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning" onClick={fetchOrders}>
                                            <i className="bi bi-arrow-clockwise"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MyOrders
;