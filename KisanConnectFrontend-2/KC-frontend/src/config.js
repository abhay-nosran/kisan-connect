// axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      // Token expired or unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      alert("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default api;
