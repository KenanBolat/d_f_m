import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {AiFillShopping} from 'react-icons/ai'
import './Navbar.css'

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className='navbar'>
      
        <ul className="nav-menu">
          <li onClick={()=>{setMenu("home")}}><Link to="home">HOME</Link>{menu==="home"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("datatable")}}><Link to="datatable">Datalist</Link>{menu==="datatable"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("channels")}}><Link to="channels">Latest Data</Link>{menu==="channels"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("map")}}><Link to="map">Map</Link>{menu==="map"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("products")}}><Link to="products">Products</Link>{menu==="products"?<hr/>:<></>}</li>
          
          <li onClick={()=>{setMenu("msg")}}><Link to="msg">MSG</Link>{menu==="msg"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("iodc")}}><Link to="iodc">IODC</Link>{menu==="iodc"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("rss")}}><Link to="rss">RSS</Link>{menu==="rss"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("others")}}><Link to="others">Others</Link>{menu==="others"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        <div className="nav-logo">
            <img src={require('./tmet_logo.png')} alt="logo" className="logo"/>
        </div>
        </div>
      
    </div>
  )
}

export default Navbar
