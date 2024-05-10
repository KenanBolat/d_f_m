import axios from "axios";

debugger;
const baseUrl = {URL: process.env.VITE_APP_API_URL || 'http://localhost:8000/api/'}
const axiosInstance = axios.create({
  baseURL: baseUrl["URL"],
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});




// Request Interceptor
axiosInstance.interceptors.request.use(request => {
  debugger;
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  } 
  else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }


  return request;
});

// Response Interceptor
axiosInstance.interceptors.response.use(response => response, error => {
  debugger;
  const originalRequest = error.config;
  
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // mark the request to signify it has already been retried
    const refreshToken = localStorage.getItem("refresh_token");
    return axios.post(`${baseUrl}token/refresh/`, { refresh: refreshToken })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh); // update the refresh token if the server sends a new one

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest); // retry the original request with the new token
        }
      });
  }
  return Promise.reject(error);
});

export default axiosInstance;
