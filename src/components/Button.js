import React from 'react'

const Button = ({text, type}) => {
  return (
    <button type={type}
    className='bg-richBlack border-2 border-transp text-white px-5 py-3 rounded-lg hover:bg-softBlue  hover:border-richBlack transition-all duration-150'
    >{text}</button>
  )
}

export default Button

