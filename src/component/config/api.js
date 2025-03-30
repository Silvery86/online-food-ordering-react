import axios from "axios"
export const APP_PRODUCTION = process.env.REACT_APP_PRODUCTION === "true";
export const API_URI = APP_PRODUCTION ? "https://online-food-ordering.nguyen-giang-86.cloud" : "http://localhost:5454";

export const api = axios.create({
    baseURL:API_URI,
    headers:{
        "Content-Type":"application/json",
    }
})