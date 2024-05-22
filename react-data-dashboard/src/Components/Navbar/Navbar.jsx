import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {AiFillShopping} from 'react-icons/ai'
import './Navbar.css'

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src="./tmet_logo.png" alt="logo" className="logo"/>
        </div>
        <ul className="nav-menu">
          <li onClick={()=>{setMenu("mgs")}}><Link to="mgs">MGS</Link>{menu==="mgs"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("iodc")}}><Link to="iodc">IODC</Link>{menu==="iodc"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("rss")}}><Link to="rss">RSS</Link>{menu==="rss"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("others")}}><Link to="others">Others</Link>{menu==="others"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        <Link to="login"><button>Login</button></Link>
          
            <Link to="/cart"><AiFillShopping size={70} className='cart-icon'/></Link>
            <div className="nav-cart-count">0</div>
          
        </div>
      
    </div>
  )
}

export default Navbar
