import React from 'react'
import {BsCheck2All} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='py-10 px-10 w-full h-max flex flex-col justify-center bg-white'>
      <div className='w-max self-center mb-4'>
        <h2 className='py-3 px-5 bg-richBlack rounded-full text-white text-2xl'>About Us</h2>
      </div>
      <div className='flex gap-3 flex-col'>
        <h2 className='text-3xl font-bold tracking-wide text-[crimson]'>
        Ducimus rerum libero reprehen cumque
        </h2>
        <p className='text-md sm:text-lg text-richBlack tracking-wide'>
        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul>
          <li className='flex items-center gap-2 sm:text-md text-sm text-softBlack'>
            <BsCheck2All color='crimson'/>
            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
          </li>
          <li className='flex items-center gap-2 sm:text-md text-sm text-softBlack'>
            <BsCheck2All color='crimson'/>
            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
          </li>
          <li className='flex items-center gap-2 sm:text-md text-sm text-softBlack'>
            <BsCheck2All color='crimson'/>
            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
          </li>
        </ul>
        <p className='text-md sm:text-lg text-richBlack tracking-wide'>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Link to='/login' className='self-start bg-[crimson] px-3 py-2 rounded-md text-white font-bold'>Learn more.</Link>
      </div>
    </div>
  )
}

export default About