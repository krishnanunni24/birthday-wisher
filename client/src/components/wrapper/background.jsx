import React from 'react'

const Background = ({children}) => {
  return (
    <div className="bg-gradient-to-br from-background2 via-background to-background inset-0 fixed z-30" >
    <div className='bubble-layer h-full bg-cover bg-no-repeat'>
    {children}
    </div>
    </div>
  )
}

export default Background
