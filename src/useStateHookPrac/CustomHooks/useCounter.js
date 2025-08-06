import { useState } from "react";

function useCounter(initalvalue=0){
    const [value,setValue]=useState(initalvalue)

    const increment=()=>{
        setValue(v=>v+1)
    }
    const decrement=()=>{
        setValue(v=>v-1)
    }
    const reset=()=>{
        setValue(initalvalue)
    }
    return [value, {increment,decrement,reset}]
}