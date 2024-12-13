import axios from "axios";
import { reactBackendUrl } from "../env/envoriment";

const api = axios.create({
  baseURL: `${reactBackendUrl}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
