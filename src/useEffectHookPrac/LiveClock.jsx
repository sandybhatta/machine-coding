import React, { useEffect, useState } from 'react'

const LiveClock = () => {
    const [time , setTime]= useState(new Date());
    const[ start, setStart] =useState(true)

    useEffect(() => {
        let id=null
      if(start){
         id = setInterval(() => {
            setTime(new Date());
          }, 1000);
        
      }
        
        return () => {
            console.log(id);
          clearInterval(id);
        };
      }, [start]);

      const pause=()=>{
        setStart(false)
      }
      const startTimer=()=>{
        setStart(true)
      }
  return (
    <div>
        {time.getHours()}hr : {time.getMinutes()}min: {time.getSeconds()} seconds  
        <button onClick={pause}>pause</button>    
        <button onClick={startTimer}>start</button>    
    </div>
  )
}

export default LiveClock