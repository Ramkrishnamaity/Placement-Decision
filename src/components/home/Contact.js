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

  async function submitHandler(e){
    e.preventDefault()
    setFormData({
      name:'', email: '', subject: '', message: ''
    })
    toast.success("Email send successfully")


    // try{
    //   setFlag(true)
    //   // const {data} = await apiConnector("POST", SEND_EMAIL, formData)
    //   setFlag(false)
      
    //   // if(data.success){
    //   //   setFlag(false)
    //   //   toast.success(data.message)
    //   // }
    //   // else{
    //   //   setFlag(false)
    //   //   toast.error(data.message)
    //   // }
    // } catch(error){
    //   toast.error("Network Issue")
    //   console.log(error.message)
    //   setFlag(false)
    // }
  }


  return (
    <div className='py-10 px-10 w-full h-max flex flex-col justify-center bg-white'>
      <div className='w-max self-center mb-4'>
        <h2 className='pb-2 px-5 border-b-2 border-[aqua] text-2xl'>Contact Us</h2>
      </div>
      <div className='flex flex-col lg:flex-row items-center gap-5'>
        <div className='lg:w-[50%] w-[95%] flex flex-wrap flex-row justify-around items-center gap-2'>
          <div className='space-y-2'>
          <div className=' p-5 rounded-sm bg-[#f4f4f4]'>
            <div><CiLocationOn/></div>
            <h2>Address</h2>
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
          </div>
          <div className=' p-5 rounded-sm bg-[#f4f4f4]'>
            <div><PiPhoneCallLight/></div>
            <h2>Call us</h2>
            <p>+1 5589 55488 55</p>
            <p>+1 6678 254445 41</p>
          </div>
          </div>
          <div className='space-y-2'>
          <div className='p-5 rounded-sm bg-[#f4f4f4]'>
            <div><AiOutlineMail/></div>
            <h2>Email Us</h2>
            <p>info@example.com</p>
            <p>contact@example.com</p>
          </div>
          <div className='p-5 rounded-sm bg-[#f4f4f4]'>
            <div><FiClock/></div>
            <h2>Open Hours</h2>
            <p>Monday - Friday</p>
            <p>9:00AM - 05:00PM</p>
          </div>
          </div> 
        </div>
        <div className='lg:w-[45%] w-[95%] p-5 rounded-sm bg-[#f4f4f4]'>
          <form className='w-full '
          onSubmit={submitHandler}
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
                >Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact