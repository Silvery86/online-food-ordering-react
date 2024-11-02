import axios from "axios"
const isProduction = window.location.hostname === 'foodsou.store';
export const API_URI = isProduction ? "https://foodsou.store" : "http://localhost:5454";

export const api = axios.create({
    baseURL:API_URI,
    headers:{
        "Content-Type":"application/json",
    }
})