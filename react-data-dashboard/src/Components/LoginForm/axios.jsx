import axios from "axios";

const baseUrl = "http://localhost:8000/api/";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json", 
    },
});


export default axiosInstance; 
