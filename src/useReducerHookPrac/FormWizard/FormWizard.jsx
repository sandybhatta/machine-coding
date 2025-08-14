import React, { useEffect, useReducer } from 'react'


const initialState={
    currentStepIndex:0,
    isValid:false,
    formData:{
        personalInfo:{
            name:"",
            email:"",
            gender:"",
            age:""
        },
        address:{
            city:"",
            district:"",
            state:"",
            zip:"",
            houseNo:""
        },
        accountDetails:{
            bank:"",
            bracnch:"",
            accountId:"",
            accountHolderName:"",
            password:""
        }

    },
    validationError:[],

}
const reducerFn=(state,action)=>{

    switch(action.type){
        case "UPDATE_FIELD":
            const {name, value}= action.payload.target;
            const key=  Object.keys(state.formData)[state.currentStepIndex]
            const newState={
                ...state,
                formData:{
                    ...formData,
                    [key]:{
                        ...state.formData[key],
                        [name]:value

                    }
                }
            }
            return newState
        
        case "PREVIOUS_STEP":
            return {
                ...state,
                currentStepIndex:state.currentStepIndex-1
            }
        case "VALIDATE_STEP":
            const values=state.formData[Object.keys(step.formData)[state.currentStepIndex]]
            for(let [key,value] of Object.entries(values)){
                if(key==="name"){
                    const nameOfUser=value.trim().split("");
                    const notAllowedChars=["!","@","#","%","^","&","*","(",")"]
                    for(let letter of nameOfUser){
                        if(notAllowedChars.includes(letter)){
                            return {
                                ...state,
                                validationError:[...state.validationError,"name should not have other characters than a-z or A-z"]
                            }
                        }
                    }
                }
                if(key==="email"){
                    if(!value.includes("@")){
                        return {
                            ...state,
                            validationError:[...state.validationError,"email should  have @"]
                        }
                    }
                }
                if(key==="gender"){
                    const allowedGenders=["male","female"]
                    if(!allowedGenders.includes(value.toLowerCase().trim())){
                        return {
                            ...state,
                            validationError:[...state.validationError,"gender should be either male or female"]
                        }
                    }
                }
                if(key==="age"){
                    if(value<18){
                        return {
                            ...state,
                            validationError:[...state.validationError,"age Should be greater than 18"]
                        }
                    }
                }
                
                if(key==="zip"){
                    
                    if(value.length<6){
                        return {
                            ...state,
                            validationError:[...state.validationError, "Zip should be equal to 6 digits"]
                        }
                    }
                }
                
                if(key==="accountId"){
                    if(value.length<5){
                        return {
                            ...state,
                            validationError:[...state.validationError,"account id should be greater than or equal to 5"]
                        }
                    }
                }
                
                
            }
            return {
                ...state,
                isValid:true,
                validationError:[]
            }


    }
}

const FormWizard = () => {
    const [state, dispatch]=useReducer(reducerFn,initialState)

    useEffect(()=>{

    })
  return (
    <div>
        {
           Object.keys(Object.keys(state.formData)[state.currentStepIndex]).map((key)=>{
            
            return (
                <div key={key}>
                <input 
                name={key}
                value={state.formData[Object.keys(state.formData)[state.currentStepIndex]][key]} 
                onChange={(e)=>{dispatch({type:"UPDATE_FIELD", payload:e})}}
                />
                
                </div>
            )
           })
        }
        <div>
             {
                state.validationError.map(errors=>(
                   
                        <p key={errors}>
                            {errors}
                        </p>
                    
                ))
             }
            <button 
            onClick={()=>{dispatch({type:"PREVIOUS_STEP"})}}
            disabled={state.currentStepIndex===0 || state.validationError.length!==0}> Previous </button>


            <button
                onClick={state.currentStepIndex===Object.keys(state.formData).  length-1? ()=>{dispatch({type:"SUBMIT"})}: ()=>{dispatch({type:"NEXT_STEP"})}} 
                disabled={state.validationError.length!==0 || state.isValid===false}>
                 {state.currentStepIndex===Object.keys(state.formData).length-1? "Submit": "Next"} 
                </button>

            <button 
            onClick={()=>{dispatch({type:"VALIDATE_STEP"})}}
            >
                validate
            </button>
        </div>
    </div>
  )
}

export default FormWizard
