import React, { useState } from 'react'

const ShowHidePass = () => {
    const [flag ,  setFlag ] = useState(true)
    const [input , setInput ] = useState("")
  return (
    <div>
        <input
        type={flag?"password":"text"}
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />

        <button
        onClick={()=>setFlag(prev=>!prev)}
        >
            {flag?"show":"hide"}
        </button>
    </div>
  )
}

export default ShowHidePass