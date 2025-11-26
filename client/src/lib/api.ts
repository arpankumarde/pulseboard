import axios from "axios";
import { Cookies } from "react-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    const token = cookies.get("pulse-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
