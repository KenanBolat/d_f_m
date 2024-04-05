import React, {useState, useEffect} from "react";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
       const refreshToken = localStorage.getItem("refresh_token");

       if(refreshToken) {
           axiosInstance
           .post("token/blacklist/", {refresh: refreshToken,})
           .catch((error) => {
                console.log("Error blacklisting", error)}).finally(() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    axiosInstance.defaults.headers["Authorization"] = null;
                    navigate("/login");
                });
            
       } else {
            // no refresh token
            navigate("/login");
       } 
    }, [navigate]);
    return (
        <div>
            <div> Logging out...</div>
        </div>
    );
}