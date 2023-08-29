import React from 'react'
import companyLogo from '../assets/companyLogo.png'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useSelector } from 'react-redux'
import ProfileDropdown from './ProfileDropdown'

const Navbar = () => {

  const token = useSelector((state)=>state.token.value)



  return (
    <div className='bg-transp h-[4rem] w-full flex justify-around mt-1 items-center fixed text-md tracking-wider'>

      {/* logo */}
      <div>
        <Link to='/'>
          <img src={companyLogo} alt='logo' className='w-[200px] h-[60px] rounded-xl'/>
        </Link>
      </div>

      {/* hyperlinks */}
      <ul className='flex items-center justify-between gap-5 font-medium'>
        <li>
          <Link to='/' >Home</Link>
        </li>
        <li>
          <a href='#about'>About</a>
        </li>
        <li>
          <a href='#companies'>Companies</a>
        </li>
        <li>
          <a href='#latestJob'>LatestJob</a>
        </li>
        <li>
          <a href='#testimonials'>Testimonials</a>
        </li>
        <li>
          <a href='#contact'>Contact</a>
        </li>

      </ul>

      {/* buttons */}
      <div className='flex justify-between items-center gap-3'>
        
        {
          token == null && (
          <Link to='/login'>
            <Button text='Log in'/>
          </Link>
          )
        }

        {
          token === null && (
          <Link to='/signup'>
            <Button text='Sign up'/>
          </Link>
          )
        }

        { token !== null && <ProfileDropdown/> }

      </div>


    </div>
  )
}

export default Navbar