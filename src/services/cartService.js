import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://foodies-back-end-1.onrender.com/api/cart";
export const increateQtyToCart = async (foodId,token) => {
    try {
        await axios.post(API_URL,{foodId},{headers: {"Authorization": `Bearer ${token}`}});
    } catch (error) {
        console.error("Error while increasing food quantity to cart");
    }
}
export const decreaseQtyFromCart = async (foodId,token) => {
    try {
        await axios.post(API_URL+"/remove",{foodId},{headers: {"Authorization": `Bearer ${token}`}})
    } catch (error) {
        console.error("Error while decreasing food quantity from cart");
    }
}
export const getCartData = async (token) => {
        const response = await axios.get(API_URL,{headers: {"Authorization": `Bearer ${token}`}});
        return response.data.items;    
}