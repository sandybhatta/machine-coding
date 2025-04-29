import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"

const UserCard = ({fullname,img,bio,email}) => {
    const[toggle,setToggle]=useState(false)
    const[myBio,setMyBio]=useState(bio)
    useEffect(()=>{
if(toggle || bio.length<150){
    setMyBio(bio)
}
else{
    setMyBio(bio.slice(0,150)+" ... more")
}
    },[toggle,bio])
  return (
    <div>
        <img src={img} alt='image'/>
        <h2>Hello my name is {fullname}</h2>
        <p>my email is {email}</p>
        <h3>About me</h3>
        <p onClick={()=>setToggle(!toggle)}>{myBio}</p>
    </div>
  )
}
UserCard.defaultProps={
    img:"defaultimage",
    fullname:"guest"
}
UserCard.propTypes={
fullname:PropTypes.string,
bio:PropTypes.string,
img:PropTypes.string,
email:PropTypes.string,
}

export default UserCard