import React, { useState } from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import {BiLeftArrowAlt} from 'react-icons/bi'
import { endpoints } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { setLoader } from '../redux/slices/Loader'
import { toast } from 'react-hot-toast'

const ForgotPassword = () => {

  const dispatch = useDispatch()

  const {CREATE_RESET_TOKEN} = endpoints
  const loader = useSelector((state)=>state.loader.value)

  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  async function submitHandler(e){
    try{
      e.preventDefault()
      dispatch(setLoader(true))
      // api call
      const {data} = await apiConnector("POST", CREATE_RESET_TOKEN, {email: email})
      if(data.success){
        // toast
        toast.success(data.message)
        setEmailSent(true)
        localStorage.setItem('reset-token', data.token)
      } else {
        // error toast message
        toast.error(data.message)
        setEmail('')
      }

      dispatch(setLoader(true))
    } catch(error){
      setEmail('')
      toast.error("Network Issue")
      console.log(error.message)
      dispatch(setLoader(false))
    }
  }



  return (
    loader? (<Spinner/>): (
      <div className='flex  min-h-screen justify-center items-center py-[50px] pt-[75px] '>
        <div className='w-1/2'>
          <h1>
            {!emailSent? 'Reset your password' : 'Check email'}
          </h1>
          <p>
            {!emailSent?
            "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
            :`We have sent the reset email to ${email}`}
          </p>
          <form
          onSubmit={(e)=>{submitHandler(e)}}
          >
            {
              !emailSent && (
                <div className='flex flex-col'>
                  <label>
                    Email Address
                    <sup className='text-[#EF476F] text-md'>*</sup>
                  </label>
                  <input
                  name='email'
                  type='email' 
                  placeholder='Enter email'
                  value= {email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  />
                </div>
              )
            }
            <div className='w-full'>
              <Button text={!emailSent? 'Submit': 'Resend Email'} type='submit'></Button>
            </div>
          </form>
          <div>
            <Link className='flex' to='/login'>
              <span><BiLeftArrowAlt/></span>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  )
}

export default ForgotPassword