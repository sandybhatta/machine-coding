import React ,{ useRef } from "react";

export default function Counter() {
    const clicksRef = useRef(0); // { current: 0 }
  
    function handleClick() {
      clicksRef.current += 1;    // mutate — no re-render
      console.log('clicks', clicksRef.current);
    }
  
    return <button onClick={handleClick}>Click {clicksRef.current}</button>;
  }
  