import React, { useState } from 'react'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {BsFillEyeSlashFill, BsFillEyeFill} from 'react-icons/bs'
import { endpoints } from "../services/apis";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { apiConnector } from "../services/apiConnector";
import { setToken } from '../redux/slices/Token';
import { useDispatch } from 'react-redux';
import { setLoader } from '../redux/slices/Loader';
import { toast } from 'react-toastify';


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {LOGIN} = endpoints
    const loader = useSelector((state)=>state.loader.value)
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '', password: ''
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
            // api call
            const {data} = await apiConnector("POST", LOGIN, formData)
            setFormData({email: '', password: ''})
            if(data.success){
                dispatch(setLoader(false))
                localStorage.setItem("token", JSON.stringify(data.token))
                dispatch(setToken(data.token))
                // toast
                navigate('/')
                toast.success(data.message)
            } else{
                dispatch(setLoader(false))
                // error toast message
                toast.error(data.message)
            }
        } catch(error){
            setFormData({email: '', password: ''})
            toast.error("Network Issue")
            console.log(error.message)
            dispatch(setLoader(false))
        }
    }



  return (loader? (<Spinner/>): (

        <div className='py-[50px] pt-[75px] flex min-h-screen justify-center items-center  lg:w-[40%] md:w-[50%] w-[90%] mx-auto text-[#FFFFFF99]'>

            <form 
                onSubmit={(e)=>{submitHandler(e)}}
                className='w-full'
            >
                <fieldset className='border rounded-lg px-5 py-5 pt-2 flex flex-col justify-center gap-5'>
                    <legend className='ml-2 px-2 py-4  text-white text-2xl tracking-wide'>Welcome Again</legend>

                    <div  className='flex flex-col'>
                        <label>
                            Email Address
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='email'
                        type='email' 
                        placeholder='Enter email'
                        value= {formData.email}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none'
                        />
                    </div>

                    <div className='relative flex flex-col'>
                        <label>
                            Password
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='password'
                        type={showPassword? 'password': 'text'} 
                        placeholder='Enter password'
                        value= {formData.password}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none'
                        />
                        <div className=' ml-2'>
                            not remember password?
                            <Link to='/forgot-password' className='text-[#EF476F]'>forgot password</Link> 
                        </div>
                        <div className='absolute p-1 right-2 top-10 cursor-pointer' onClick={()=>{setShowPassword((prev)=>(!prev))}}>
                            { 
                                showPassword? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
                            }
                        </div>
                    </div>

                    <div>
                        <Button text='Log In' type='submit'></Button>
                    </div>

                    <div className='ml-2'>
                        Did't Have Account? <Link to='/signup' className='text-[#EF476F]'>Sign Up</Link>
                    </div>

                </fieldset>
            </form>


        </div>
    
    )
  )
}

export default Login