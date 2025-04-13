// src/utils/axiosInstance.js
import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "/api", // thanks to vite proxy
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
