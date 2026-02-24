import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../services/foodService";
import axios from "axios";
import { decreaseQtyFromCart, getCartData, increateQtyToCart } from "../services/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [token,setToken] = useState("");
    const [foodList,setFoodList] = useState([]);
    const [quantity,setQuantity] = useState({});
    const increaseQuantity = async (foodId) => {
        setQuantity(prev => ({...prev,[foodId]:(prev[foodId] || 0)+1}));
        await increateQtyToCart(foodId,token);
    }
    const decreaseQuantity = async (foodId) => {
        setQuantity(prev => ({...prev,[foodId]:prev[foodId]>0 ? prev[foodId]-1 : 0}));
        await decreaseQtyFromCart(foodId,token);
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
        async function loadData() {
            const data = await fetchFoodList();
            setFoodList(data);
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};