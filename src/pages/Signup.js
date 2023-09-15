import React, {useState} from 'react'
import {BsFillEyeSlashFill, BsFillEyeFill} from 'react-icons/bs'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { useDispatch , useSelector } from 'react-redux';
import {setSignupData} from '../redux/slices/Token'
import Spinner from '../components/Spinner'
import { setLoader } from '../redux/slices/Loader';
import { toast } from 'react-toastify';

const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {SENDOTP} = endpoints
    const loader = useSelector((state)=>state.loader.value)

    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const [formData, setFormData] = useState({
        email: '', password: '', confirmPassword: '', firstName: '', lastName: ''
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
            const {data} = await apiConnector("POST", SENDOTP, {email: formData.email})
            if(data.success){
                dispatch(setSignupData(formData))
                dispatch(setLoader(false))
                navigate('/verify-email')
                // toast
                toast.success(data.message)
            } else{
                dispatch(setLoader(false))
                // error toast message
                toast.error(data.message)
            }
            // toast
            setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' })
        } catch(error){
            setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' })
            toast.error("Network Issue")
            console.log(error.message)
            dispatch(setLoader(false))
        }
    }

    

  return (
    loader? (<Spinner/>): (
        <div className='py-[50px] pt-[75px] flex min-h-screen justify-center items-center  lg:w-[40%] md:w-[50%] w-[90%] mx-auto text-[#FFFFFF99]'>

        <form 
            onSubmit={(e)=>{submitHandler(e)}}
            className='w-full'
        >
            <fieldset className='border rounded-lg px-5 py-5 pt-2 flex flex-col justify-center gap-5'>
                <legend className='ml-2 px-2 py-4  text-white text-2xl tracking-wide'>Create Account</legend>

                <div className='flex gap-1 md:flex-row flex-col'>
                    <div  className='flex flex-col'>
                        <label>
                            First Name
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='firstName'
                        type='text' 
                        placeholder='Enter first name'
                        value= {formData.firstName}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                        />
                    </div>
                    <div  className='flex flex-col'>
                        <label>
                            Last Name
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='lastName'
                        type='text' 
                        placeholder='Enter last name'
                        value= {formData.lastName}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                        />
                    </div>
                </div>


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
                    className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                    />
                </div>

                <div className='relative flex flex-col'>
                    <label>
                        Password
                        <sup className='text-[#EF476F] text-md'>*</sup>
                    </label>
                    <input
                    name='password'
                    type={showPassword1? 'password': 'text'} 
                    placeholder='Enter password'
                    value= {formData.password}
                    onChange={(e)=>{handleOnChange(e)}}
                    required
                    className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                    />
                    <div className='absolute p-1 right-2 top-10 cursor-pointer' onClick={()=>{setShowPassword1((prev)=>(!prev))}}>
                        { 
                            showPassword1? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
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
                    type={showPassword2? 'password': 'text'} 
                    placeholder='Confirm password'
                    value= {formData.confirmPassword}
                    onChange={(e)=>{handleOnChange(e)}}
                    required
                    className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
                    />
                    <div className='absolute p-1 right-2 top-10 cursor-pointer' onClick={()=>{setShowPassword2((prev)=>(!prev))}}>
                        { 
                            showPassword2? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
                        }
                    </div>
                </div>

                <div>
                    <Button text='Sign Up' type='submit'></Button>
                </div>

                <div>
                    Already Have Account? <Link to='/login' className='text-[#EF476F]'>Log in</Link>
                </div>

            </fieldset>
        </form>


        </div>
    )
  )
}

export default Signup