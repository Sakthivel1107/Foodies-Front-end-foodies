import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {StoreContext} from '../../context/StoreContext'

const FoodItem = (props) => {
  const {quantity,increaseQuantity,decreaseQuantity} = useContext(StoreContext);
  return (
    <div key={props.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
        <div className="card" style={{"maxWidth": "320px"}}>
            <Link to={`/food/${props.id}`}>
              <img src={props.imgUrl} className="card-img-top" alt="Product Image" height={300} width={60}/>
            </Link>
            <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">{props.description}</p>
            <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">₹{props.price}.00</span>
                    <div>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-half text-warning"></i>
                        <small className="text-muted">(4.5)</small>
                    </div>
            </div>
            </div>
            <div className="card-footer d-flex justify-content-between bg-light">
                <Link className="btn btn-primary btn-sm fs-6" to={`/food/${props.id}`}>View Food</Link>
                {
                  quantity[props.id] > 0 ?(
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-danger btn-sm fs-5" onClick={()=> decreaseQuantity(props.id)}><i className="bi bi-dash-circle"></i></button>
                      <span className='fw-bold'>{quantity[props.id]}</span>
                      <button className="btn btn-success btn-sm fs-5" onClick={() => increaseQuantity(props.id)}><i className="bi bi-plus-circle"></i></button>
                    </div>
                  )
                  :(
                    <button className="btn btn-primary btn-sm fs-5" onClick={() => increaseQuantity(props.id)}><i className="bi bi-plus-circle"></i></button>
                  )
                }
            </div>
        </div>
    </div>
  )
}

export default FoodItem;