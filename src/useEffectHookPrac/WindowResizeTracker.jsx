import React, { useEffect, useState } from 'react'

const WindowResizeTracker = () => {
    const [size,setSize]=useState({
        height:window.innerHeight,
        width:window.innerWidth
    })

    useEffect(()=>{
        let id=null
        function handleSize(){
            console.log(  window.innerHeight, window.innerWidth);
            if(id){
                clearTimeout(id)
            }
             id = setTimeout(()=>{
                setSize({
                    height:window.innerHeight,
                    width:window.innerWidth
                })
            },6000)
            
        }
        window.addEventListener("resize", handleSize)

        return ()=>{
            if(id){
                clearTimeout(id)
            }
            window.removeEventListener("resize", handleSize)
        }
    })
  return (
    <div>

    </div>
  )
}

export default WindowResizeTracker