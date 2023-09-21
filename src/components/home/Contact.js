import React, { useState } from 'react'
import {CiLocationOn} from 'react-icons/ci'
import {PiPhoneCallLight} from 'react-icons/pi'
import {AiOutlineMail} from 'react-icons/ai'
import {FiClock} from 'react-icons/fi'
import { endpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
import { toast } from 'react-toastify'

const Contact = () => {

  const {SEND_EMAIL} = endpoints

  const [flag, setFlag] = useState(false)

  const [formData, setFormData]= useState({
    name:'', email: '', subject: '', message: ''
  })

  function changeHandler(e){
    setFormData((prev)=>(
      {...prev, [e.target.name]: e.target.value}
    ))
  }

  async function validateEmail (email){

    let apikey = process.env.REACT_APP_EMAIL_VALIDATOR_API_KEY
    let url = `https://api.emailvalidation.io/v1/info?apikey=${apikey}&email=${email}`

    const res = await fetch(url)
    let data =  await res.json()

    return data.smtp_check
  }

  async function submitHandler(e){
    try{
      e.preventDefault()
      setFlag(true)
      if(!await validateEmail(formData.email)){
        setFlag(false)
        toast.error('Please Enter a Valid Mail')
        return
      }
      const {data} = await apiConnector("POST", SEND_EMAIL, formData)
      setFormData({
        name:'', email: '', subject: '', message: ''
      })
      
      if(data.success){
        setFlag(false)
        toast.success("Email send successfully")
      }
      else{
        setFlag(false)
        toast.error(data.message)
      }
    } catch(error){
      toast.error("Network Issue")
      console.log(error.message)
      setFormData({
        name:'', email: '', subject: '', message: ''
      })
      setFlag(false)
    }
  }


  return (
    <div className='py-10 sm:px-10 px-5 w-full h-max flex flex-col justify-center bg-white'>
      <div className='w-max self-center mb-4'>
        <h2 className='py-3 px-5 bg-richBlack rounded-full text-white text-2xl'>Contact Us</h2>
      </div>
      <div className='flex flex-col lg:flex-row items-center gap-5'>
        <div className='lg:w-[50%] w-[95%] flex flex-wrap flex-row justify-around items-center gap-2'>
          <div className='space-y-5'>
          <div className=' p-5 rounded-sm bg-[#f4f4f4]'>
            <div><CiLocationOn color='crimson' size='20px'/></div>
            <h2>Address</h2>
            <p>Saltlake A023</p>
            <p>Kolkata, West Ben.</p>
          </div>
          <div className=' p-5 rounded-sm bg-[#f4f4f4]'>
            <div><PiPhoneCallLight color='crimson' size='20px'/></div>
            <h2>Call us</h2>
            <p>+1 5589 55488 55</p>
            <p>+1 6678 254445 41</p>
          </div>
          </div>
          <div className='space-y-5'>
          <div className='p-5 rounded-sm bg-[#f4f4f4]'>
            <div><AiOutlineMail color='crimson' size='20px'/></div>
            <h2>Email Us</h2>
            <p>info@placement.com</p>
            <p>contact@gmit.com</p>
          </div>
          <div className='p-5 rounded-sm bg-[#f4f4f4]'>
            <div><FiClock color='crimson' size='20px'/></div>
            <h2>Open Hours</h2>
            <p>Monday - Friday</p>
            <p>9:00AM - 05:00PM</p>
          </div>
          </div> 
        </div>
        <div className='lg:w-[45%] w-[95%] p-5 rounded-sm bg-[#f4f4f4]'>
          <form className='w-full '
          onSubmit={(e)=>{submitHandler(e)}}
          >
            <div className='flex flex-col items-center justify-between gap-5'>
              <div className='w-full flex items-center justify-center gap-2 flex-wrap'>
                <input
                type='text'
                name='name'
                placeholder='Enter the Name'
                className='outline-none px-2 py-3 w-[100%] sm:w-[49%]'
                onChange={(e)=>{changeHandler(e)}}
                value={formData.name}
                required
                />
                <input
                type='text'
                name='email'
                placeholder='Enter the email'
                className='outline-none px-2 py-3 w-[100%] sm:w-[49%]'
                onChange={(e)=>{changeHandler(e)}}
                value={formData.email}
                required
                />
              </div>
              <div className='w-full'>
              <input
              type='text'
              name='subject'
                placeholder='subject'
                className='outline-none px-2 py-3 w-full'
                onChange={(e)=>{changeHandler(e)}}
                value={formData.subject}
                required
                />
              </div>
              <div className='w-full'>
              <textarea
              name='message'
                placeholder='message'
                className='outline-none px-2 py-3 resize-none w-full h-[100px]'
                onChange={(e)=>{changeHandler(e)}}
                value={formData.message}
                required
              />
              </div>
              <div className='w-max self-center'>
                <button type='submit' disabled={flag}
                className='px-3 py-2 rounded-lg bg-[crimson] text-white'
                >
                  {
                    flag? 'Processing..': 'Submit'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact