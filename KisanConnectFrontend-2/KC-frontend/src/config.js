// axiosConfig.js
import axios from "axios";
const Token = localStorage.getItem("token") || "dummy" ;
const api = axios.create({
  baseURL: "http://localhost:5000/",
});

// request interceptor 
api.interceptors.request.use(
  (config) =>{
    config.headers.Authorization = `Bearer ${Token}`;
    return config ;
  },
  (error) =>  Promise.reject(error)
);
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
