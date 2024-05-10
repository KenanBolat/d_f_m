import React from 'react'

const Items = (props) => {
  return (
    <div>
      ITEMS
        <div className="item"></div>
        <img src="{props.image}" alt="item" />
        <p>{props.name}</p>

        
    </div>
  )
}

export default Item
