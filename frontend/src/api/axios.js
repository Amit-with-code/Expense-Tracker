import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-7qvt.onrender.com/api",
});

// ✅ Attach token ONLY if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;