import axios from "axios";

const api = axios.create ({
    // local: baseURL: "http://localhost:5000",
    baseURL: "http://backend-production-e39a.up.railway.app",
    withCredentials: true,
});

export default api;
