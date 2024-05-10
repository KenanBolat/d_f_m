import React from 'react'
import './Sidebar.css'
import Category  from './Category/Category'
import Datarange   from './dataRange/dataRange'
import Colors  from './Colors/Colors'


function Sidebar({handleChange}) {
  return (
    <div>
        <section className='sidebar'> 
            <div className="logo-container">
                <img src="https://via.placeholder.com/75" alt="logo" className="logo"/>
            </div>
        <Category handleChange={handleChange} /> 
        <Datarange handleChange={handleChange} /> 
        <Colors handleChange={handleChange} />
        </section>
      
    </div>
  )
}

export default Sidebar
