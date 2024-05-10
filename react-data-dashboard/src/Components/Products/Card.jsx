import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillBagHeartFill } from 'react-icons/bs'


function Card({ img,img2,img3, img4, png, netcdf_title,geotiff_title, reviews, newPrice}) {
  debugger;
  return (
    <div>
      <section className='card'>
        <img src={img} alt='product' className='card-img'/>
        <img src={img2} alt='product' className='card-img'/>
        <img src={img3} alt='product' className='card-img'/>
        <img src={img4} alt='product' className='card-img'/>
        <div className="card-details">
          <h3 className='card-title'>{png}</h3>
          <h3 className='card-title'>{netcdf_title}</h3>
          <h3 className='card-title'>{geotiff_title}</h3>
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
