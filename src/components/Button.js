import React from 'react'

const Button = ({text, type}) => {
  return (
    <button type={type}
    className='bg-[crimson] border border-[crimson] text-white sm:px-5 sm:py-3 px-3 py-2 text-md tracking-wider rounded-lg hover:border-white hover:text-[crimson] hover:bg-richBlack transition-all duration-50'
    >{text}</button>
  )
}

export default Button

