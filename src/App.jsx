import React, { useContext } from 'react';
import Menubar from './components/menubar/Menubar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ExploreFoods from './pages/explore/ExploreFoods';
import Contact from './pages/contact/Contact';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import {ToastContainer} from 'react-toastify'
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeorder/PlaceOrder';
import Login from './components/login/Login';
import Register from './components/register/Register';
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './context/StoreContext';
import Loader from './Loader/Loader';

const App = () => {
  const {token} = useContext(StoreContext);
  return (
    <div>
      <Menubar />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/explore' element={<ExploreFoods />}></Route>
        <Route path='/contact' element={token ? <Contact /> : <Home />}></Route>
        <Route path='/food/:id' element={<FoodDetails />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/order' element={token ? <PlaceOrder /> : <Login /> }></Route>
        <Route path='/login' element={token ? <Home /> : <Login />}></Route>
        <Route path='/register' element={token ? <Home /> :<Register />}></Route>
        <Route path='/myOrders' element={token ? <MyOrders/> : <Login />}></Route>
      </Routes>
    </div>
  )
}

export default App;