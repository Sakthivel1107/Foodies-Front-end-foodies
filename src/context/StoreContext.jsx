import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../services/foodService";
import axios from "axios";
import { decreaseQtyFromCart, getCartData, increateQtyToCart } from "../services/cartService";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [token,setToken] = useState("");
    const [foodList,setFoodList] = useState([]);
    const [quantity,setQuantity] = useState({});
    const increaseQuantity = async (foodId) => {
        if(localStorage.getItem("token")){
            setQuantity(prev => ({...prev,[foodId]:(prev[foodId] || 0)+1}));
            await increateQtyToCart(foodId,token);
        }
        else{
            toast.warning("Please login to add items to the cart");
        }
    }
    const decreaseQuantity = async (foodId) => {
        if(localStorage.getItem("token")){
            setQuantity(prev => ({...prev,[foodId]:prev[foodId]>0 ? prev[foodId]-1 : 0}));
            await decreaseQtyFromCart(foodId,token);
        }
        else{
            toast.warning("Please login to remove items from the cart");
        }
    }
    const removeItemFromCart = (foodId) => {
        setQuantity((prevQuantity) => {
            const updatedQuantity = {...prevQuantity};
            delete updatedQuantity[foodId];
            return updatedQuantity;
        })
    }
    const loadCartData = async (token) =>{
        const items = await getCartData(token);
        setQuantity(items);
    }
 
    const contextValue = {
        foodList,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart,
        token,
        setToken,
        setQuantity,
        loadCartData
    };

    useEffect(()=>{
        function setIsLoggedIn(token){
            localStorage.setItem("token",token);
        }
        function logout(){
            localStorage.setItem("token","");
            setToken(null);
        }
        async function validateToken() {
            const token = localStorage.getItem("token");

            if (token) {
                await axios.get(" https://foodies-back-end-1.onrender.com/api/validateToken", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                .then(() => {
                setIsLoggedIn(token);
                })
                .catch(() => {
                logout();
                });
            }
        }
        async function loadData() {
            const data = await fetchFoodList();
            setFoodList(data);
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
        validateToken()
        loadData();
    },[]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};