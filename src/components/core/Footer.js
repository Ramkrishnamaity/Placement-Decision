import React from 'react'
import {FaFacebook} from 'react-icons/fa'
import {AiFillTwitterCircle, AiOutlineInstagram, AiFillLinkedin} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='pt-10 px-10 w-full h-max flex flex-col justify-center bg-[#f4f4f4]'>
      <div className='flex items-center justify-between'>
          <div >
            Placement decision Useful Links : 
          </div>
          <div className='flex items-center justify-center gap-2 '>
            <a href="/" ><AiFillTwitterCircle size='33px' color='#3a3939'/></a>
            <a href="/" ><FaFacebook size='30px' color='#3a3939'/></a>
            <a href="/" ><AiOutlineInstagram size='33px' color='#3a3939'/></a>
            <a href="/" ><AiFillLinkedin size='35px' color='#3a3939'/></a>
          </div>
      </div>
      <div className='w-[95%] bg-white mx-auto py-4 my-5 rounded-sm'>
      <div className='w-max mx-auto text-sm text-center'>
        <p>© Copyright Placement Decision All Rights Reserved</p>
        <p>Designed by RAG</p>

      </div>
      </div>
    </div>
  )
}

export default Footer