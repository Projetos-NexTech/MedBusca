import axios from "axios";

const api = axios.create ({
    // local: baseURL: "http://localhost:5000",
    baseURL: "http://backend:5000",
    withCredentials: true,
});

export default api;
