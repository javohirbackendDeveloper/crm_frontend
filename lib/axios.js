import axios from "axios";
export const API = "http://localhost:4000/api";
console.log(import.meta.env.MODE);

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : "https://crm-backend-xiqj.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
