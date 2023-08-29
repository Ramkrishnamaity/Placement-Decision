import React from 'react'

const Button = ({text}) => {
  return (
    <button 
    className='bg-richBlack border-2 border-transp text-white px-5 py-3 rounded-lg hover:bg-transp hover:text-richBlue hover:border-richBlack transition-all duration-150'
    >{text}</button>
  )
}

export default Button