import axios from "axios";

const API = axios.create({
  baseURL: "https://library-crud-app-backend.onrender.com", // 🔁 change si backend local
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
