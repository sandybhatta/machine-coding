import React from 'react'
import{useState} from 'react'

const LimitCounter = ({max,min}) => {
    const [count, setCount] = useState(0)
  return (
    <div>
<p>Count {count}</p>

<button onClick={()=>setCount(count+1)}  disabled={count === max}>+</button>
<button onClick={()=>setCount(count-1)}  disabled={count === min}>-</button>

    </div>
  )
}

export default LimitCounter