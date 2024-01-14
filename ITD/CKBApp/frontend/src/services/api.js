import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000", // Replace with your Django backend URL
});

export default api;
