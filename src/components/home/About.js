import React from 'react'
import {BsCheck2All} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='py-10 px-10 w-full h-max flex flex-col justify-center bg-white'>
      <div className='w-max self-center mb-4'>
        <h2 className='pb-2 px-5 border-b-2 border-[aqua] text-2xl'>About Us</h2>
      </div>
      <div className='flex gap-2 flex-col'>
        <h2 className='text-3xl text-[crimson]'>
        Ducimus rerum libero reprehenderit cumque
        </h2>
        <p>
        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul>
          <li className='flex items-center gap-2'>
            <BsCheck2All/>
            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
          </li>
          <li className='flex items-center gap-2'>
            <BsCheck2All/>
            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
          </li>
          <li className='flex items-center gap-2'>
            <BsCheck2All/>
            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
          </li>
        </ul>
        <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Link to='/login' className='self-start bg-[crimson] p-3 rounded-sm'>Learn more.</Link>
      </div>
    </div>
  )
}

export default About