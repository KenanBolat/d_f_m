import axios from "axios";

const baseUrl = "http://localhost:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use((config) => {
  const taken = localStorage.getItem("access_token");
  config.headers.Authorization = taken ? `Bearer ${taken}` : "";
  return config;
});

export default axiosInstance;
