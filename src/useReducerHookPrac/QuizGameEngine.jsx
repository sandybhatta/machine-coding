import React, { useEffect, useReducer, useRef, useState } from 'react'
const initialState={
    isSubmitted:false,
    currentIndex:0,
    correct:0,
    wrong:0,
    questions:[
            {
                question:"1  Does useReducer Hook make state management easier when the state is large enough, what are other tools out there?", 
                answer:"RTK", 
                mcq:["RTK","context Api", "useRef", "forwardRef"],
                selected:"", timer:15, status:true
            },

            {
                question:"2  which hook other than useState Hook being used for state management ?", 
                answer:"useReducer",
                mcq:["useRef", "useEffect","useContext","useReducer"],
                selected:"", timer:15, status:true
            },

            {
                question:"3  useEffect get used for what in React?", 
                answer:"side Effects", 
                mcq:["only Api calls","for timers","local Storage access","side Effects"],
                selected:"", timer:15, status:true
            },

            {
                question:"4  React have what solution for prop Drilling?", 
                answer:"Context api", 
                mcq:["state lifting", "Toolkit", "useEffect", "Context api"],
                selected:"", timer:15, status:true
            },

            {
                question:"5  what frame works Does node have?", 
                answer:"Express and Nest",
                mcq:["Express and Next", "Express and Nest" ,"React and Vue", "vanilla js"],
                selected:"", timer:15, status:true
            },

            {
                question:"6  how does express uses authentication before every reaquest being made?",
                answer:"middlewares", 
                mcq:["Routers", "Cookies", "Cors", "middlewares"],
                selected:"", timer:15, status:true
            },

            {
                question:"7  how does express make modular routing?", 
                answer:"express.Router()", 
                mcq:["express.Router()", "app=express()", "express.json()",],
                selected:"", timer:15, status:true
            },
                
            {
                question:"8  what are the other noSql database management system", answer:"MongoDB",
                mcq:["MySql","PostGresQl","MongoDB"],
                selected:"", timer:15, status:true
            },

            {
                question:"9  how does mongoDB optimizes query search?",
                answer:"Indexing",
                mcq:["Aggregation", "Sharding", "Replica sets","Indexing"],
                selected:"", timer:15, status:true
            },
   
]
}
const quizReducer = (state,action)=>{

    switch (action.type) {
        case "MCQ_SELECT":{
           
            
            if( !state.questions[state.currentIndex].status){
                return state
            }
            const newstate={...state,questions:[...state.questions]}
            newstate.questions[state.currentIndex].selected=action.payload.val
            return newstate


        }
        case "TIME":{
            const newstate={...state,questions:[...state.questions]}
            if(action.payload.time<=0){
                newstate.questions[state.currentIndex].status  =  false
                return newstate
            }
            newstate.questions[state.currentIndex].timer  =  action.payload.time-1
            
            return newstate

        }
        case "NEXT":{
            return {
                ...state,
                questions:[...state.questions],
                currentIndex:state.currentIndex+1
            }
        }
        case "PREV":{
            return {
                ...state,
                questions:[...state.questions],
                currentIndex:state.currentIndex-1
            }
        }
        case "SUBMIT":{
            const {correct, wrong}= calculateCorrect(state)
            return {
                ...state,
                isSubmitted:true,
                correct,
                wrong
            }
        }
            
            
    
        default:
            break;
    }
}
function calculateCorrect(state){
const arr= state.questions
let correct=0;
let wrong=0
    for(let val of arr){
        if(val.selected===val.answer){
            correct++
        }else{
            wrong++
        }
    }
    return {correct,wrong}
}
const QuizGameEngine = () => {
    const [state, dispatch] = useReducer(quizReducer,initialState)
   
    const ref= useRef(null);
    
    
    
    const step=state.questions[state.currentIndex]
    
    
    useEffect(()=>{
       
        ref.current=setInterval(()=>{
            
            if(!state.isSubmitted){
                
            dispatch({type:"TIME",payload:{time:step.timer}})
            }
        },1000)
        return()=>{
            clearInterval(ref.current);
            ref.current=null
        }
    },[state.currentIndex])



    useEffect(()=>{

        if(state.questions[state.currentIndex].timer===0){
            if(state.currentIndex===state.questions.length-1){
                dispatch({type:"SUBMIT"})
            }
           else {setTimeout(()=>{
                dispatch({type:"NEXT"})
            },3000)}
        }
    },[state.questions[state.currentIndex].timer])
  return (
    <div>
            <h3>{step.question}</h3> 
            <h3>{step.timer}</h3>
            {
                step.mcq.map((choice,idx)=>(
                    <div key={idx}>
                        <input
                        type='radio'
                        name={step.question}
                        value={choice}
                        checked={step.selected===choice}
                        onChange={(e)=>dispatch(
                            {
                                type:"MCQ_SELECT",
                                payload:{ val:e.target.value}
                            })}
                        />
                        <span>{choice}</span>

                        
                    </div>
                ))

                
            }
            {state.isSubmitted===true &&
                        <div>
                             {step.selected===step.answer?
                            <p>correct answer ✔️ {step.answer}</p>:
                            <div>
                            <p>Your answer ❌ {step.selected}</p>    
                            <p>Right answer ✔️ {step.answer}</p>    
                            </div>}
                            
                        </div>
                            
            }
            
            <button 
            disabled={state.currentIndex===0} 
            onClick={()=>dispatch({type:"PREV"})}>
                prev
            </button>

            <button 
            disabled={state.currentIndex===state.questions.length-1} 
            onClick={()=>dispatch({type:"NEXT"})}>
                next
            </button>

            {state.currentIndex===state.questions.length-1 && 

            <button
            onClick={()=>dispatch({type:"SUBMIT"})}>
                Submit
            </button>
            }
            {
                state.isSubmitted && 
                <div>
                    <p>total marks:</p>
                    <p>correct answers: {state.correct}</p>
                    <p>wrong answers: {state.wrong}</p>
                </div> 
            }

    </div>
  )
}

export default QuizGameEngine