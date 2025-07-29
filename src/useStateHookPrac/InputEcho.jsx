import React, { useState } from 'react'

const InputEcho = () => {
    const [ input , setInput ] =useState("")
  return (
    <div>
        <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />
        <p>you typed:{input}</p>
        <p>characters Count: {input.length}</p>
    </div>
  )
}

export default InputEcho