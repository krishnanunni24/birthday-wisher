import React, { useEffect } from 'react'
import cadberryImg from "../assets/images/landing/cadburry_celebration_img.png"
import welcomeText from "../assets/images/landing/welcome_text.png"
import { useNavigate } from 'react-router-dom'
const LandingPage=()=> {
    const navigate=useNavigate()
    useEffect(()=>{
    const timeOut = setTimeout(()=>{
    navigate("/register")
    },3000)
    return ()=> clearTimeout(timeOut)
    },[])

  return (
    <div className="bg-background inset-0 fixed">
    <div className="flex justify-center items-center h-full">
      <div className="relative h-full flex items-center ">
        
        <img src={cadberryImg} alt="" className='mb-10'/>
        <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <img src={welcomeText} alt=""/>
        </div>
      </div>
    </div>
  </div>
  
  
  )
}

export default LandingPage
