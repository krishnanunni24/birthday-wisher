import React from 'react'

const HamBurger = ({handleClick}) => {


  return (
    <>
    <button className="relative group ham-button" onClick={handleClick}>
    <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all  duration-200 shadow-md">
      <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden m-2">
        <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg]"></div>
        <div className="bg-white h-[2px] ms-2 w-1/2 rounded transform transition-all duration-300 group-focus:-translate-x-10"></div>
        <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]"></div>
      </div>
    </div>
  </button>
  
  </>
  )
}

export default HamBurger
