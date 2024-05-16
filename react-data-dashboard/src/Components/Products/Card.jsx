import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import { AiFil } from 'react-icons/ai'
import { FaExternalLinkAlt } from "react-icons/fa";




function Card({ img,img2,img3, img4, png, netcdf_title,geotiff_title, date_tag, satellite_mission}) {
  return (
    <div>
      <section className='card'>
        {img && <img src={img} alt='product' className='card-img'/>}
        {img2 && <img src={img2} alt='product' className='card-img'/>}
        {img3 && <img src={img3} alt='product' className='card-img'/>}
        {img4 && <img src={img4} alt='product' className='card-img'/>}

        <div className="card-details">
          <h3 className='card-title'>{png}</h3>
          <h3 className='card-title'>{png}</h3>
          <h3 className='card-title'>{netcdf_title}</h3>
          <h3 className='card-title'>{geotiff_title}</h3>
          <section className='card-reviews'> 
          
            {/* <AiOutlineDownload size={50}></AiOutlineDownload> */}
            <FaExternalLinkAlt size={50}></FaExternalLinkAlt>

            
          </section>
          <section className='card-price'></section>
          <div className="price">
          </div>
        </div>
       </section>
    </div>
  )
}

export default Card
