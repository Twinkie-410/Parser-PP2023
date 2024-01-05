import axios from "axios";

export const API= axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers: {"Access-Control-Allow-Origin": "*"}
})