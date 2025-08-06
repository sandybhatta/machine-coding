import {useState} from 'react'

const useToggle = (initalvalue=false) => {
    const[value, setValue]=useState(initalvalue);
    function toggle(){
        setValue(v=>!v)
    }
  return [value,toggle]
}

export default useToggle