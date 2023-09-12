import React, {useState} from 'react'
import {BsFillEyeSlashFill, BsFillEyeFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { endpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";



const UpdatePassword = () => {

  const token = useSelector((state)=>state.token.value)

  const {UPDATE_PASSWORD} = endpoints

  const [showPassword1, setshowPassword1] = useState(false)
  const [showPassword2, setshowPassword2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
      current: '', new: ''
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
        setLoading(true)
        // api call
        const data = {oldPassword:formData.current, newPassword:formData.new, token: token}
        await apiConnector("POST", UPDATE_PASSWORD, data )
        setFormData({current: '', new: ''})
        // toast
        setLoading(false)
        console.log("success")
    } catch(error){
        console.log(error.message)
        setLoading(false)
    }
}



  return (
    <div className=''>
      <form
      onSubmit={(e)=>{submitHandler(e)}} 
      >
        <fieldset className=' rounded-md bg-richBlack  p-5  flex md:flex-row flex-col justify-around gap-2'>
          <div className='relative flex flex-col'>
            <label>
                Current Password
                <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
            name='current'
            type={!showPassword1? 'password': 'text'} 
            placeholder='Enter Currrent password'
            value= {formData.current}
            onChange={(e)=>{handleOnChange(e)}}
            required
            className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
            />
            <div className='absolute p-1 right-2 top-10 cursor-pointer text-richBlack' onClick={()=>{setshowPassword1((prev)=>(!prev))}}>
                { 
                    !showPassword1? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
                }
            </div>
          </div>
          <div className='relative flex flex-col '>
            <label>
                New Password
                <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
            name='new'
            type={!showPassword2? 'password': 'text'} 
            placeholder='Enter new password'
            value= {formData.new}
            onChange={(e)=>{handleOnChange(e)}}
            required
            className='my-2 rounded-md py-2 px-5 outline-none text-richBlack'
            />
            <div className='absolute p-1 right-2 top-10 cursor-pointer text-richBlack' onClick={()=>{setshowPassword2((prev)=>(!prev))}}>
                { 
                    !showPassword2? (<BsFillEyeFill/>): (<BsFillEyeSlashFill/>)
                }
            </div>
          </div>
        </fieldset>
        <div className='flex items-center justify-end gap-5 mt-4'>
          <button onClick={()=>{setFormData({current: '', new: ''})}}
          className='rounded-md px-2 py-1 bg-[#FFFFFF99]'
          >Cancel</button>
          <button type='submit' disabled={loading}
           className='flex gap-2 items-center bg-[crimson] px-2 rounded-md py-2 text-white'
          >{loading? 'Updating...': 'Update'}</button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword