import React from 'react'
import './Nav.css'
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'

function Nav() {
  return (
    <nav>
    <div>
      
      <div className="nav-container"></div>
      <input type="text" className='search-input' placeholder='Enter your search' />
      <div className="profile-container">
        <a href="#">
          <FiHeart className='nav-icons' />
        </a>
        <a href="#">
          <AiOutlineShoppingCart className='nav-icons' />
        </a>
        <a href="#">
          <AiOutlineUserAdd className='nav-icons' />
        </a>
      </div>
    </div>
    </nav>
  )
}

export default Nav
