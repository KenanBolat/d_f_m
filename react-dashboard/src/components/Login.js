import React, { useState } from 'react';
import { useNavigate, BrowserRouter as Router, Routes } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                email: email,
                password,
            });
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            // Redirect to dashboard or update state
            navigate('/Dashboard');  // Redirect to the dashboard

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;