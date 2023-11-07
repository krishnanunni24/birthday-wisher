import React, { useEffect } from 'react'
import cadberryImg from "../assets/images/landing/cadburry_celebration_img.png"
import welcomeText from "../assets/images/landing/welcome_text.png"
import { useNavigate } from 'react-router-dom'
import bgImg from "../assets/images/landing/background_style.png"
import Background from '../components/wrapper/background'
const LandingPage=()=> {
    const navigate=useNavigate()
    useEffect(()=>{
    const timeOut = setTimeout(()=>{
    navigate("/register")
    },3000)
    return ()=> clearTimeout(timeOut)
    },[])

  return (
 <Background>

      <div className="flex justify-center items-center h-full">
      <div className="relative flex items-center">
        
        <img src={cadberryImg} alt="" className='mb-10'/>
        <div className="absolute top-52 left-1 w-full h-full  text-white text-center">
          <img src={welcomeText} alt=""/>
        </div>
      </div>
    </div>
 </Background>

  
  
  )
}

export default LandingPage
