// axiosConfig.js
import axios from "axios";

export  const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const subscribeMircroSerice = axios.create({
  baseURL : "localhost:3333/"
})
// request interceptor 
api.interceptors.request.use(
  (config) =>{
    const Token = localStorage.getItem("token") || "dummy" ;
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


