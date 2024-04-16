import React, {useState, useEffect} from 'react'; 
import axiosInstance from './axios';
import { useAuth } from '../../Contexts/AuthProvider'; // Make sure this path is correct
import {jwtDecode} from 'jwt-decode';

import { useNavigate } from 'react-router-dom';


import './Login.css';
import { FaUserShield, FaUnlockAlt, FaLock } from "react-icons/fa";




const Login = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    

    const initialFormData = Object.freeze({
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        if (auth.accessToken) {
          navigate('/dashboard'); // Redirect to dashboard or another appropriate route
        }
      }, [auth, navigate]);
    

    const handleChange = (e) => {
        // console.log(e.target.value);
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.post('token/', {
            email: formData.email,
            password: formData.password,
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            localStorage.setItem('email', jwtDecode(res.data.access).user_email);
            localStorage.setItem('user_name', jwtDecode(res.data.access).user_name);
            console.log(jwtDecode(res.data.access));
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            setAuth({ accessToken: res.data.access,
                     refreshToken: res.data.refresh,
                     email: jwtDecode(res.data.access).user_email,
                     user_name: jwtDecode(res.data.access).user_name,});
            axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
            navigate('/home');
            setAuth({
                accessToken: res.data.access, // the JWT token
                user_name: jwtDecode(res.data.access).user_name, // make sure this is set based on your login response
              });
            console.log(res);
            console.log(res.data);
        });
    }
  return (
    <div className='container'>
    <div className='wrapper'>
        <form action=''>
            <h1> Login </h1>
            
            <div className="input-box">
                <input type='text' name='email' placeholder='Email' required onChange={handleChange} />
                <FaUserShield className='icon'/>
            </div>

            <div className="input-box">
                <input type='password' name='password' placeholder='Password' onChange={handleChange}  required /> <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <label><input type='checkbox' /> Remember me</label> <br />
                <a href='#'>Forgot Password</a>
            </div>
            <button type='submit' onClick={handleSubmit}>Login</button>
            <div className="register-link">
                <p>Don't have an account? <a href='/register'>Register</a></p>
            </div>
        </form>
      
    </div>
    </div>
  )
}

export default Login
