import axios from "axios"

export const API_URI = "http://localhost:5454"

export const api = axios.create({
    baseURL:API_URI,
    headers:{
        "Content-Type":"application/json",
    }
})