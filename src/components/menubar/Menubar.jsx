import React, { useContext, useState } from 'react';
import './Menubar.css'
import {assets} from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'

const Menubar = () => {
  const navigate = useNavigate();
  const [active,setActive] = useState('home');
  const {quantity , token , setToken ,setQuantity} = useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantity).filter(qty => qty > 0).length;
  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    navigate("/");
    setQuantity({});
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link to="/">
        <img src={assets.logo} className='mx-2' alt="logo" height={48} width={48} />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className={active === 'home' ? "nav-link fw-bold active":"nav-link"} to="/" onClick={()=>setActive('home')}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className={active === 'explore' ? "nav-link fw-bold active":"nav-link"} to="/explore" onClick={()=>setActive('explore')}>Explore</Link>
            </li>
            <li className="nav-item">
                <Link className={active === 'contact us' ? "nav-link fw-bold active":"nav-link"} to="/contact" onClick={()=>setActive('contact us')}>Contact Us</Link>
            </li>
        </ul>
        <div className='d-flex align-items-center gap-4'>
            <Link className='position-relative' to='/cart'>
                <img src={assets.cart} alt="cart" width={28} height={28} className='position-relative' />
                <span className='positon-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>{uniqueItemsInCart}</span>
            </Link>
            {
              !token ? 
              <>
                <button className='btn btn-outline-primary btn-sm' onClick={()=>navigate('/login')}>Login</button>
                <button className='btn btn-outline-success btn-sm' onClick={()=>navigate("/register")}>Register</button>
              </> :
              <div className="dropdown text-end"> 
                <Link to="/" className='d-block link-body-emphasis text-decoration-none dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={assets.userIcon} alt="" height={32} width={32} className='rounded-circle' />
                </Link>
                <ul className='dropdown-menu text-small cursor-pointer'>
                  <li className="dropdown-item" onClick={() => navigate('/myOrders')}>Orders</li>
                  <li className="dropdown-item" onClick={logout}>Logout</li>
                </ul>
              </div>
            }
        </div>
    </div>
  </div>
</nav>
  )
}

export default Menubar;