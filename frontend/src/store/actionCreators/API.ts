import axios, { AxiosRequestConfig } from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

export const API= axios.create({
    withCredentials:true,
    baseURL:API_URL,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Request-Headers': 'access-control-allow-origin',
        'Access-Control-Request-Method': 'POST',
    }
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})