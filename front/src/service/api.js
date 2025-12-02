import axios from "axios";

const api = axios.create ({
    baseURL: "http://localhost:5000",
    withCrdentials: true,
});

export default api;