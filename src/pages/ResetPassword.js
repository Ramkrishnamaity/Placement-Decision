import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate , Link} from 'react-router-dom'
import Button from '../components/Button'
import {BsFillEyeSlashFill, BsFillEyeFill} from 'react-icons/bs'
import {BiLeftArrowAlt} from 'react-icons/bi'
import { apiConnector } from '../services/apiConnector'
import { endpoints } from '../services/apis'
import Spinner from '../components/Spinner'
import { setLoader } from '../redux/slices/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'

const ResetPassword = () => {

    const {RESET_PASSWORD} = endpoints
    const loader = useSelector((state)=>state.loader.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const token = location.pathname.split("/").at(-1)

    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const [formData, setFormData] = useState({
        password: '', confirmPassword: ''
    })

    function handleOnChange(e){
        setFormData((prev)=>({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    async function submitHandler(e){
        try{
            e.preventDefault()
            dispatch(setLoader(true))
            //api call
            const {data} = await apiConnector("POST", RESET_PASSWORD, {...formData, token:token})

            if(data.success){
                navigate('/login')
                // toast
                toast.success(data.message)

            } else{
                navigate('/forgot-password')
                // error toast message
                toast.error(data.message)
            }
            setFormData({
                password: '', confirmPassword: ''
            })

        } catch(error){
            setFormData({
                password: '', confirmPassword: ''
            })
            navigate('/forgot-password')
            toast.error("Network Issue")
            console.log(error.message)
        }
    }


    useEffect(()=>{
       if(localStorage.getItem('reset-token') !== token){
        // toast genarate token
        return navigate('/forgot-password')
       }   
    })
    
  return (
    loader? (<Spinner/>): (  
        <div className='py-[50px] pt-[75px] flex justify-center items-center min-h-screen text-[#FFFFFF99]'>
            <div className=' bg-midBlack py-5 sm:px-5 px-2 rounded-md space-y-2'>
                <h1 className='sm:text-2xl text-xl font-bold tracking-wider text-white'>Choose new password</h1>
                <p>
                    Almost done. Enter your new password and you're all set.
                </p>
                <form className='w-full'
                onSubmit={(e)=>{submitHandler(e)}}
                >
                    <div className='relative flex flex-col'>
                        <label>
                            New Password
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='password'
                        type={!showPassword1? 'password': 'text'} 
                        placeholder='Enter new password'
                        value= {formData.password}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                        />
                        <div className='absolute p-1 right-2 top-10 cursor-pointer text-richBlack' onClick={()=>{setShowPassword1((prev)=>(!prev))}}>
                            { 
                                !showPassword1? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
                            }
                        </div>
                    </div>
                    <div className='relative flex flex-col'>
                        <label>
                            Confirm Password
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='confirmPassword'
                        type={!showPassword2? 'password': 'text'} 
                        placeholder='Enter password'
                        value= {formData.confirmPassword}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                        />
                        <div className='absolute p-1 right-2 top-10 cursor-pointer text-richBlack' onClick={()=>{setShowPassword2((prev)=>(!prev))}}>
                            { 
                                !showPassword2? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
                            }
                        </div>
                    </div>

                    <div className='w-full mt-2'>
                        <Button text='Reset Password' type='submit'></Button>
                    </div> 
                </form>
                <div>
                    <Link className='flex items-center' to='/login'>
                        <span><BiLeftArrowAlt/></span>
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    )
  )
}

export default ResetPassword