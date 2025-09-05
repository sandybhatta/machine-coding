import React, { useContext } from 'react'
import { FormContext } from './FormWizardWithMultipleComponent'

const Step3 = () => {
    const {state,dispatch}=useContext(FormContext)
    const form=state.formData.accountDetails
    console.log(form);
  return (
    <div>
        <h2>STEP {state.stepIndex+1}</h2>
        {
            Object.keys(form).map(key=>(
                <div key={key}>
                <label>
                    {key}
                    <input name={key} 
                    value={state.formData.accountDetails[key]}
                    onChange={(e)=>dispatch({type:"UPDATE",payload:{name:e.target.name,value:e.target.value}})}/>
                </label>
                </div>
            ))
        }
        <button onClick={()=>dispatch({type:"PREV"})}>previous </button>

        <button onClick={()=>dispatch({type:"VALIDATE",})}>validate</button>
        <button disabled={!state.isValid}
         onClick={()=>dispatch({type:"NEXT"})}>Submit</button>
         <div>
            {state.validationError.map((error,i)=>(
                <div key={i}>
                   Error:{i} {error}
                </div>
            ))}
         </div>
    </div>
  )
}

export default Step3