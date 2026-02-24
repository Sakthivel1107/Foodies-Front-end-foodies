import axios from 'axios';

const API_URL = 'https://foodies-back-end-1.onrender.com/api';

export const registerUser = async (data) => {
    try {
        const response = axios.post(API_URL+'/register',data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (data) => {
    try {
        const response = axios.post(API_URL+'/login',data);
        return response;
    } catch (error){
        throw error;
    }
}
