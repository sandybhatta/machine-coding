import React, { useState } from 'react'

const TwoWayBinding = () => {
    const [ formData , setFormData ] = useState({
                                                    name:"",
                                                    email:""
                                                
                                                    })


    const handleChange = (e)=>{
        const{name, value} = e.target
        setFormData({
            name:value
        })
    }
  return (
    <div>
        <input type='text'
        value={formData.name}
        name='name'
        onChange={handleChange}
        />

        <input 
        type='email'
        value={formData.email}
        name='email'
        onChange={handleChange}/>

        <div>
            user written data
            {formData.name}
            {formData.email}
        </div>
    </div>
  )
}

export default TwoWayBinding