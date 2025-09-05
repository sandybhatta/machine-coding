import React, { createContext, useReducer } from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Submit from './Submit';

const initialState={
    stepIndex:0,
    isValid:false,
    formData: {
        personalInfo: {
          name: "",
          email: "",
          gender: "",
          age: ""
        },
        address: {
          city: "",
          district: "",
          state: "",
          zip: "",
          houseNo: ""
        },
        accountDetails: {
          bank: "",
          branch: "",
          accountId: "",
          accountHolderName: "",
          password: ""
        }
      },
      validationError: []
}
const reducer=(state,action)=>{
    switch (action.type) {
        case "PREV":
           return{
            ...state,
            stepIndex:state.stepIndex===0?0:state.stepIndex-1
           } 
        case "NEXT":
           return{
            ...state,
            stepIndex:state.stepIndex+1,
            isValid:false
           } 
        case "VALIDATE":
           
           const keys= Object.keys(state.formData)
           const subKey=keys[state.stepIndex]
           const errors=[];

           for (let [key, value] of Object.entries(state.formData[subKey])) {
            if (key === "name") {
              const notAllowedChars = ["!", "@", "#", "%", "^", "&", "*", "(", ")"];
              if (
                value.trim().length === 0 ||
                [...value].some((char) => notAllowedChars.includes(char))
              ) {
                errors.push("Name should only contain letters A-Z or a-z");
              }
            }
    
            if (key === "email" && !value.includes("@")) {
              errors.push("Email should contain @");
            }
    
            if (key === "gender") {
              const allowedGenders = ["male", "female"];
              if (!allowedGenders.includes(value.toLowerCase().trim())) {
                errors.push("Gender should be either male or female");
              }
            }
    
            if (key === "age" && Number(value) < 18) {
              errors.push("Age should be greater than or equal to 18");
            }
    
            if (key === "zip" && value.length !== 6) {
              errors.push("Zip should be exactly 6 digits");
            }
    
            if (key === "accountId" && value.length < 5) {
              errors.push("Account ID should be at least 5 characters");
            }
          }

          return {
            ...state,
            validationError:errors.length===0?[]:errors,
            isValid:errors.length===0?true:false
          }
           
        case "UPDATE":
            const totalKeys= Object.keys(state.formData)
            const subFormData=totalKeys[state.stepIndex]
            const{name,value}=action.payload

           return{
            ...state,
            formData:{
                ...state.formData,
                [subFormData]:{
                    ...state.formData[subFormData],
                    [name]:value
                }
            }
           } 

        

    
        default:
            return {
                ...state
            };
    }
}


export const FormContext=createContext()

const FormWizardWithMultipleComponent = () => {

const [state,dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{state,dispatch}}>
        <div>
            {
                state.stepIndex===0 ? <Step1/>:
                state.stepIndex===1 ? <Step2/>:
                state.stepIndex===2 ? <Step3/>:
                <Submit/>
            }
        </div>
    </FormContext.Provider>
    
  )
}

export default FormWizardWithMultipleComponent