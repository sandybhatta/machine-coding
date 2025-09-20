// import React, { useRef } from "react";

// export default function OTPForm() {
//   const inputsRef = useRef([]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     if (value && index < inputsRef.current.length - 1) {
//       // Move focus to next input
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !e.target.value && index > 0) {
//       // Move focus to previous input
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pasteData = e.clipboardData.getData("text").split("");
//     pasteData.forEach((char, i) => {
//       if (inputsRef.current[i]) {
//         inputsRef.current[i].value = char;
//       }
//     });
//     // Focus last filled input
//     if (inputsRef.current[pasteData.length - 1]) {
//       inputsRef.current[pasteData.length - 1].focus();
//     }
//     // e.preventDefault();
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "8px",
//         justifyContent: "center",
//         marginTop: "50px",
//       }}
//       onPaste={handlePaste}
//     >
//       {Array.from({ length: 6 }).map((_, index) => (
//         <input
//           key={index}
//           type="text"
//           maxLength="1"
//           style={{
//             width: "40px",
//             height: "40px",
//             textAlign: "center",
//             fontSize: "20px",
//           }}
//           ref={(el) => (inputsRef.current[index] = el)}
//           onChange={(e) => handleChange(e, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//         />
        
//       ))}
//     </div>
//   );
// }







// ____________________________ follow ups _____________________________________
// 1. Auto-Submit on Completion

// Extend your OTP form so that as soon as the last input is filled, the OTP is auto-submitted (show an alert or call an API mock).

// Constraint: Don’t use useEffect to watch state. Handle this entirely through useRef and controlled focus.
import React, { useRef } from 'react'

const OTPForm = () => {
    const inputRef=useRef([])

    const handlePaste=(e)=>{
      const pasteData = e.clipboardData.getData("text").split("")
      pasteData.forEach((char,idx) => {
        if(inputRef.current[idx]){
          inputRef.current[idx]=char
        }
      });

      if(inputRef.current[pasteData.length-1]){
        inputRef.current[pasteData.length-1].focus()
      }
    }

    const handleChange=(e,index)=>{
      console.log(index);
      const value= e.target.value
      if (isNaN(Number(value))) {
        inputRef.current[index].classList.add("red")
        inputRef.current[index].value=""
        
      }
      if(value && index<inputRef.current.length-1){
        inputRef.current[index+1].focus()
      }
    }
    const handleKeyDown=(e,index)=>{
    
      if(e.key==="Backspace" && !e.target.value && index>0){
        console.log(index);
        inputRef.current[index-1].focus()
      }
    }



  return (
    <div>
        {Array.from({length:6}).map((_,idx)=>(
            <div
            onPaste={handlePaste}
            key={idx}
            >


                <input
                maxLength="1"
                type='text'
                ref={el=>inputRef.current[idx]=el}
                onChange={(e)=>handleChange(e,idx)}
                onKeyDown={(e)=>handleKeyDown(e,idx)}
                />


            </div>
        ))}
    </div>
  )
}














export default OTPForm

