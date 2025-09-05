import React, { useContext } from 'react'
import { FormContext } from './FormWizardWithMultipleComponent'

const Step1 = () => {
    const {state,dispatch}=useContext(FormContext)
    const form=state.formData.personalInfo
  return (
    <div>
        <h2>STEP {state.stepIndex+1}</h2>
        {
            Object.keys(form).map(key=>(
                <div key={key}>
                <label>
                    {key}
                    <input name={key} 
                    value={state.formData.personalInfo[key]}
                    onChange={(e)=>dispatch({type:"UPDATE",payload:{name:e.target.name,value:e.target.value}})}/>
                </label>
                </div>
            ))
        }
        <button disabled={true}>previous </button>

        <button onClick={()=>dispatch({type:"VALIDATE"})}>validate</button>
        <button disabled={!state.isValid}
         onClick={()=>dispatch({type:"NEXT"})}>next</button>
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

export default Step1