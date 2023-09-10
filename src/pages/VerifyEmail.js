import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../services/apiConnector'
import { endpoints } from '../services/apis'
import { useNavigate } from 'react-router-dom'
import { setSignupData } from '../redux/slices/Token'
import Spinner from '../components/Spinner'
import { setLoader } from '../redux/slices/Loader'
import { toast } from 'react-toastify'

const VerifyEmail = () => {

  const {SIGNUP} = endpoints
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [otp, setOtp] = useState('')
  const loader = useSelector((state)=>state.loader.value)
  const {signupData} = useSelector((state)=>state.token)

  async function submitHandler(e){
    try{
      e.preventDefault()
      dispatch(setLoader(true))
      // api call
      const {data} = await apiConnector("POST", SIGNUP, {...signupData, otp:otp})
      setSignupData(null)
      if(data.success){
        dispatch(setLoader(false))
        navigate('/login')
        // toast
        toast.success(data.message)
      } else{
        dispatch(setLoader(false))
        navigate('/signup')
        // error toast message
        toast.error(data.message)
      }
      setOtp('')

    } catch(error){
      setSignupData(null)
      setOtp('')
      toast.error("Network Issue")
      console.log(error.message)
      dispatch(setLoader(false))
      navigate('/signup')
    }
  }

  // when sign up data is empty
  useEffect(()=>{
    if(!signupData) navigate('/signup')
  })


return (
    loader? (<Spinner/>): (      
      <div className='flex justify-center items-center py-[50px] pt-[75px] min-h-screen '>
          <form
          onSubmit={(e)=>{submitHandler(e)}}
          >
            <h2>Verify Email</h2>
            <p>A verification code has been sent to you. Enter the code below</p>
            <div className='flex items-center gap-3'>
              <input type='text' placeholder='Enter otp' className='outline-none'
                onChange={(e)=>{setOtp(e.target.value)}}
                value={otp}
                name='otp'
              />
            </div>
            <div>
            <Button text='Submit' type='submit'/>
            </div>
          </form>
      </div>
    )
  )
}

export default VerifyEmail