import React from 'react'
import { Link } from 'react-router-dom'
import college from '../../assets/bg-clg.jpg'
import {AiOutlineArrowRight} from 'react-icons/ai'

const HeroSection = () => {
  return (
    <div className='h-[100vh] flex justify-between items-center text-white'>
        <div className='relative w-full h-full'>
          <img
            src={college}
            alt='collgee'
            className='object-cover object-center w-[100vw] h-[100vh]'
          />
          <div className='absolute left-0 right-0 bottom-0 top-0 backdrop-blur-sm'>
            <div className='md:w-[60%] w-[80%] mx-auto lg:mt-[25%] md:mt-[30%] sm:mt-[50%] mt-[60%] flex flex-col items-center justify-between gap-5'>
            <h1 className='text-4xl leading-7 text-white font-extrabold tracking-wider'>
              Welcome To Placement Decision 
            </h1>   
            <p className='text-[#FFFFFF99] font-bold lg:text-center text-start tracking-normal'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni dolorum, placeat esse laudantium cum necessitatibus porro obcaecati corporis tenetur praesentium.
            </p>
            <Link to='/ctc-registration' className='bg-[crimson] px-3 py-2 font-bold rounded-md lg:self-center self-start flex items-center gap-1'>Register now <span><AiOutlineArrowRight/></span></Link>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default HeroSection