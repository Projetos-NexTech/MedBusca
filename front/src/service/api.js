import axios from "axios";

const api = axios.create ({
    // local: baseURL: "http://localhost:5000",
    baseURL: "backend.railway.internal,
    withCrdentials: true,
});

export default api;
