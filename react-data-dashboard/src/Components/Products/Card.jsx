import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBagHeartFill } from 'react-icons/bs'


function Card({ img, title, star, reviews, newPrice}) {
  debugger;
  return (
    <div>
      <section className='card'>
        <img src={img} alt='product' className='card-img'/>
        <div className="card-details">
          <h3 className='card-title'>{title}</h3>
          <section className='card-reviews'> 
          <p>{reviews}</p>
          <AiFillStar className='rating'/>
          <AiFillStar className='rating'/> 
          <AiFillStar className='rating'/> 
          <AiFillStar className='rating'/> 
          <AiFillStar className='rating'/>

            <span className="total-products"> 4 </span>
          </section>
          <section className='card-price'></section>
          <div className="price">
          </div>
          <div className="bag">
            <BsFillBagHeartFill />
          </div>
        </div>
       </section>
    </div>
  )
}

export default Card
