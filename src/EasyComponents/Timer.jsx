import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [time, setTime] = useState(0);
    let timer = null; // 🔴 declared on every render
  
    const startTimer = () => {
      if (timer) return;
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    };
  
    const stopTimer = () => {
      clearInterval(timer); // 🔴 This timer is always null!
      timer = null;
    };
  
    return (
      <div>
        <p>{time}</p>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    );
}

export default Timer