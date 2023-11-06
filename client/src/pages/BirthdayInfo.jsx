import React from 'react'
import Wrapper from '../components/wrapper/wrapper'
import birthdayImg from '../assets/images/birthday_info/gifts_icon.png'
import BirthdayInfoForm from '../components/birthdayInfo/BirthdayInfoForm'

const BirthdayInfo = ({page}) => {
  return (
<Wrapper page={page}>
<div className="absolute top-32 w-full h-full overflow-hidden">

 <div className='flex justify-center pt-5'>
   <p className='text-white font-bold'>Tell us about your loved one...</p>
 </div>
 <div className='relative px-16'>
  <img src={birthdayImg} alt="Loading..." />
   <div className='absolute bottom-2 left-0 justify-center flex text-white text-xl font-bold w-full '>Their name</div>
 </div>
 <div>
  
  <BirthdayInfoForm/>
 </div>
 </div>
 
</Wrapper>
  )
}

export default BirthdayInfo
