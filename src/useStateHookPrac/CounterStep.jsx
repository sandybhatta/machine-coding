import React, { useState } from 'react'

const CounterStep = () => {
    const [count , setCount] = useState(0)
    const [step , setStep] = useState("0")
    const [error , setError] = useState("")


    const handleChange= (e) =>{
        const value = parseInt(e.target.value);
        if(isNaN(value) || value<0){
            setError("Only positive integers are allowed")
        }
        else{
            setError("")
            setStep(value);
        }
       

    }
    const increment = () =>{
        const parsed = parseInt(step);
        setCount(parsed+count)
    }
    const decrement = () =>{
        const parsed = parseInt(step);
        setCount(count-parsed)
    }
    

  return (
    <div>
        <input 
        type='text' 
        onChange={handleChange}
        placeholder='enter a number for step'
        />

        {error &&<p>{error}</p>}

       <div>
        <p>{count}</p>
       <button onClick={increment}>+</button>
        <button disabled={count<=0} onClick={decrement}>-</button>
       </div>
    </div>
  )
}

export default CounterStep