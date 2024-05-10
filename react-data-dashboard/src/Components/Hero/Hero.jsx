import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                        <p>new</p>
                        <img src="https://via.placeholder.com/100" alt="hero" />
                        <span>👋</span>
                </div>
                <p> collections </p>
                <p> for everyone </p>
            </div>
            <div className="hero-latest-btn">
                    <div>Latest collections</div>
                    <div>👉</div>
            </div>
        </div>

        <div className="hero-right">
                <img src="https://via.placeholder.com/500x300" alt="hero" />
        </div>
    </div>
  )
}

export default Hero
