import React, {useState} from 'react'; 
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';


import './Login.css';
import { FaUserShield, FaUnlockAlt, FaLock } from "react-icons/fa";




const Login = () => {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);

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
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            navigate('/dashboard');
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
