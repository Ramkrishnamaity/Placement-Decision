import React, { useState } from 'react'
import companyLogo from '../../assets/com1.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import {BsList} from 'react-icons/bs'
import {AiOutlineArrowRight, AiOutlineAppstore, AiOutlineHome} from 'react-icons/ai'
import {RxCrossCircled} from 'react-icons/rx'
import {CgProfile} from 'react-icons/cg'
import {FiSettings} from 'react-icons/fi'
import { setToken } from '../../redux/slices/Token'
import { setUser } from '../../redux/slices/profile'
import Modal from './Modal'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const {user} = useSelector((state)=>state.profile)
  const [open, setOpen] = useState(false)

  async function logout(){
    try{
      // api call
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      dispatch(setToken(null))
      dispatch(setUser(null))
      toast.success("Logged out successfully")
      setOpen(false)
      // toast
      navigate('/')
    } catch(error){
      console.log(error.message)
    }
  }



  return (
    <div className='navbar z-[100] fixed w-full border bg-richBlack  h-[4rem] flex justify-around items-center text-md tracking-wider'>


      {/* navbar open button */}
      <div className='cursor-pointer text-white'>
        <div onClick={()=>{setOpen(true)}}><BsList size='30px'/></div>
      </div>

      {/* logo */}
      <div>
        <Link to='/'>
          <img src={companyLogo} alt='logo' className='w-[200px] h-[60px] rounded-xl'/>
        </Link>
      </div>


      {/* Navbar sidebar */}
      {
        open && (
          <div className='fixed top-[4rem]'>
            <div className='fixed pb-5 flex flex-col items-start justify-around pl-3 w-[75%] sm:w-[50%] md:w-[35%] lg:w-[30%]  h-full  bg-richBlack text-white   left-0 transition-all duration-100  origin-left  ease-linear'>
              {/* navbar close button */}
              <div className='absolute top-5 right-5 cursor-pointer'>
                <div className=' cursor-pointer' onClick={()=>{setOpen(false)}}><RxCrossCircled size='20px'/></div>
              </div>

              {/* profile */} 
              {
                !user? 
                  ( 
                    <Link className='w-full' to='/login'>
                      <div className='bg-white text-softBlack w-[50%] p-3 rounded-lg mx-auto flex items-center justify-center gap-1'>
                        Getting Started<AiOutlineArrowRight/>
                      </div>
                    </Link>
                  ): 
                  (
                    <div className='bg-white text-softBlack border-2 rounded-md gap-1 p-2 mt-2 text-sm'>
                      <div className='flex items-center gap-2'>
                        <img src={user.image} alt={`${user.firstName} profile`} className='sm:w-[50px] sm:h-[50px] w-[35px] h-[35px] rounded-full object-cover'/>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                      </div>
                      <p>{user.email}</p>
                    </div>
                  )
              }
              
              {/* list items */}
              <ul className='nav flex flex-col justify-center items-baseline gap-5 md:ml-[13%] ml-[8%]'>
                <li>
                  <NavLink to='/' className='flex items-center gap-1'>
                    <div className='mb-[2px] w-5'><AiOutlineHome/></div>
                    <p>Home</p>
                  </NavLink>
                </li>
                {
                  user === null && (
                    <li>
                      <NavLink to='/ctc-registration' className='flex items-center gap-1'>
                      <div className='mb-[2px] w-5'><AiOutlineHome/></div>
                      <p>CTC Registration</p>
                      </NavLink>
                    </li>
                  )
                }
                {
                  user && (
                    <>
                      <li>
                        <NavLink to='/profile' className='flex items-center gap-1'>
                          <div><CgProfile/></div>
                          <p>My Profile</p>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to='/all-job' className='flex items-center gap-1'>
                          <div><AiOutlineAppstore/></div>
                          <p>{user.accountType === "Student"? 'Find Jobs': 'All Jobs'}</p>
                        </NavLink>
                      </li>

                      {
                        user.accountType === "Student"? 
                        (
                          <li>
                            <NavLink to='/applied-job' className='flex items-center gap-1'>
                              <div><AiOutlineAppstore/></div>
                              <p>Applied Jobs</p>
                            </NavLink>
                          </li>
                        ): 
                        (
                          <>
                            <li>
                              <NavLink to='/create-job' className='flex items-center gap-1'>
                                <div><AiOutlineAppstore/></div>
                                <p>Create Job</p>
                              </NavLink>
                            </li>
                            <li>
                            <NavLink to='/all-students' className='flex items-center gap-1'>
                              <div><AiOutlineAppstore/></div>
                              <p>All Students</p>
                            </NavLink>
                          </li>
                          </>
                        )
                      }

                      <li>
                        <NavLink to='/settings' className='flex items-center gap-1'>
                          <div><FiSettings/></div>
                          <p>Settings</p>
                        </NavLink>
                      </li>
                    </>
                  )
                }
              </ul>


              {/* buttons */}
              <div className='w-full flex items-center justify-center gap-5'>
                
                {
                  user == null && (
                  <Link to='/login'>
                    <Button text='Log in'/>
                  </Link>
                  )
                }

                {
                  user === null && (
                  <Link to='/signup'>
                    <Button text='Sign up'/>
                  </Link>
                  )
                }

                { user !== null && 
                  <div onClick={()=>{setOpenModal(true)}}>
                    <Button text='Log Out'/>
                  </div>
                }

              </div>

            </div>
            
            <div 
            onClick={()=>{setOpen(false)}}
            className='fixed cursor-pointer h-[100vh] w-[25%] sm:w-[50%] md:w-[65%] lg:w-[70%] right-0 bg-white bg-opacity-10 backdrop-blur-sm'
            >

            </div>
          </div>
        )
      }

      {/* modal */}
      {openModal && <Modal desc='You will logged out of your account' btnText='Logout' setOpenModal={setOpenModal} deleteAccount={null} logout={logout} deleteJob={null} /> }


    </div>
  )
}

export default Navbar