import React, { useState } from 'react'

const ToggleButton = () => {

    const [flag , setFlag ] =useState(true)
  return (
    <div>
        <button onClick={()=>setFlag(!flag)}>
            {flag?"start":"stop"}
        </button>
    </div>
  )
}

export default ToggleButton