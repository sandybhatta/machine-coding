// import React from 'react'
// import{useState} from 'react'

// const LimitCounter = ({max,min}) => {
//     const [count, setCount] = useState(0)
//   return (
//     <div>
// <p>Count {count}</p>

// <button onClick={()=>setCount(count+1)}  disabled={count === max}>+</button>
// <button onClick={()=>setCount(count-1)}  disabled={count === min}>-</button>

//     </div>
//   )
// }
// const LimitCounter = ({max,min,step}) => {
//     const [count, setCount] = useState(0)
//   return (
//     <div>
// <p>Count {count}</p>

// <button onClick={()=>setCount(count+step)}  disabled={count >= max}>+</button>
// <button onClick={()=>setCount(count-step)}  disabled={count <= min}>-</button>

//     </div>
//   )
// }

// export default LimitCounter

import React, { useState, useRef } from 'react';

const LimitCounter = ({ max, min }) => {
  const [count, setCount] = useState(min);

  const intervalRef = useRef(null); // to store interval ID

  // Start auto increment/decrement
  const startAutoChange = (type) => {
    if (intervalRef.current) return; // prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (type === 'inc' && prev < max) return prev + 1;
        if (type === 'dec' && prev > min) return prev - 1;
        return prev;
      });
    }, 200);
  };

  // Stop auto change
  const stopAutoChange = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div>
      <p>Count: {count}</p>

      <button
        onMouseDown={() => startAutoChange('inc')}
        onMouseUp={stopAutoChange}
        onMouseLeave={stopAutoChange}
        disabled={count === max}
      >
        +
      </button>

      <button
        onMouseDown={() => startAutoChange('dec')}
        onMouseUp={stopAutoChange}
        onMouseLeave={stopAutoChange}
        disabled={count === min}
      >
        -
      </button>
    </div>
  );
};

export default LimitCounter;
