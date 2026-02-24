import axios from "axios";

const API_URL = 'https://foodies-back-end-1.onrender.com/api/foods';

export const fetchFoodList = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log('Error: ',error);
        throw error;
    }
}

export const fetchFoodDetailsById = async (id) => {
    try {
        const response = await axios.get(API_URL+`/${id}`);
        if(response.status ===200){
            return response.data;
        }
    }
    catch(error){
        console.log("Error: ",error);
        throw error;
    }
}