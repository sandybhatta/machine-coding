import React, { useState } from 'react'

const ToDo = () => {
    const [todos , setTodos]= useState([])
    const [input,setInput] = useState("")
    const[editing,setEditing]=useState(-1)
    
    const addTodo = ()=>{
        setTodos([...todos,{id:todos.length+1,content:input}])
        setInput("")
    }
    const editTodo = (id)=>{
        const editTodo=todos.find(todo=>todo.id===id)
        setInput(editTodo.content)
        setEditing(id)
    }
    const saveTodo = ()=>{
       const updateTodo= todos.map(todo=>{
        return todo.id===editing?{...todo,content:input}:todo
       })
        setTodos([...updateTodo])
        setInput("")
        setEditing(-1)
    }
    const deleteTodo=(id)=>{
        setTodos(todos.filter(todo=>todo.id!==id))
    }
  return (
    <div>
        <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />
        <button onClick={editing>-1?saveTodo:addTodo}> {editing>-1?"save":"add"}</button>
        

        <ul>
            {
                todos.map(todo=>{
                    return (
                        <div key={todo.id}>
                        <li >{todo.content}</li>
                        <button onClick={()=>editTodo(todo.id)} >edit</button>
                        <button onClick={()=>deleteTodo(todo.id)}>delete</button>
                        </div>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default ToDo