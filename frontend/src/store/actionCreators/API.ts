import axios from "axios";

export const API= axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Request-Headers': 'access-control-allow-origin',
        'Access-Control-Request-Method': 'POST',
    }
})