import axios from "axios";

const api = axios.create({
    baseURL: "/", // use proxy in package.json to forward /api requests to Spring Boot
});

export default api;
