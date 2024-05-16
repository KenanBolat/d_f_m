import React from 'react'

const Items = (props) => {
  return (
    <div>
      ITEMS
        <div className="item"></div>
        <img src="{props.image}" alt="item" />
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-prices-new"></div>
        </div>

        
    </div>
  )
}

export default Item
