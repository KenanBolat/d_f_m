import React from 'react'
import Button from '../Components/Shared/buttons'
import './Recommended.css'

function Recommended({handleClick}) {
  return (
    <div>
      <h2 className='recommended-title'>  Satellite Missions</h2>
      
      <div className="recommended-flex">
        <Button onClickHandler={handleClick} value='' title="All"></Button>
        <Button onClickHandler={handleClick} value='heels' title="MSG"></Button>
        <Button onClickHandler={handleClick} value='IODC' title="IODC"></Button>
        <Button onClickHandler={handleClick} value='Others' title="Others"></Button>
      </div>
    </div>
  )
}

export default Recommended
