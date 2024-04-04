import React from 'react'; 
import './Login.css';
import { FaUserShield, FaUnlockAlt, FaLock } from "react-icons/fa";




const Login = () => {
  return (
    <div className='wrapper'>
        <form action=''>
            <h1> Login </h1>
            
            <div className="input-box">
                <input type='text' placeholder='Email' required />
                <FaUserShield className='icon'/>
            </div>

            <div className="input-box">
                <input type='password' placeholder='Password' required /> <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <label><input type='checkbox' /> Remember me</label> <br />
                <a href='#'>Forgot Password</a>
            </div>
            <button type='submit'>Login</button>
            <div className="register-link">
                <p>Don't have an account? <a href='/register'>Register</a></p>
            </div>
        </form>
      
    </div>
  )
}

export default Login
