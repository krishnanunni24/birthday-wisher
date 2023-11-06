import React from 'react'
import Wrapper from '../wrapper/wrapper'
import bgImg from "../../assets/images/loading/loading_bg.png"

const Loading = () => {
  return (
      <div className="absolute top-28  w-full h-full overflow-hidden">
        <div className=" flex flex-col py-32 items-center pt-5">
           <div className='flex flex-col justify-center p-24'>
          <p className="text-white text-center font-bold text-lg">
            <span className='text-xl font-extrabold'>
                Please wait
                </span>
                 <br/> while we compose your song...
          </p>
          <div className='mt-10' >
             <img src={bgImg} alt="" />
          </div>

           </div>
        </div>
    </div>
  )
}

export default Loading
