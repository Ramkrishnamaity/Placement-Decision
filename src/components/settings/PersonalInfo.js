import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { endpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
import { toast } from 'react-toastify'
import { setUser } from '../../redux/slices/profile'

const PersonalInfo = () => {

  const dispatch = useDispatch()
  const {register, handleSubmit,reset, formState:{errors, isDirty}} = useForm()
  const [loading , setLoading] = useState(false)
  
  const {UPDATE_PROFILE} = endpoints
  const token = useSelector((state)=>state.token.value)
  const {user} = useSelector((state)=>state.profile)

  function date(str){
    let date = new Date(str)
    let res = date.getFullYear() + "-" +((date.getMonth()+1).length !== 2 ? "0" + (date.getMonth() + 1) : (date.getMonth()+1)) + "-" + (date.getDate().length !== 2 ?"0" + date.getDate() : date.getDate());
    return res
  }

  async function updateProfile(formData){
    try{
      if(!isDirty) return
      setLoading(true)
      const {data} = await apiConnector("PUT", UPDATE_PROFILE, {...formData}, {Authorization: `Bearer ${token}`})
      toast.success(data.message)
      dispatch(setUser(data.userD))
      localStorage.setItem('user', JSON.stringify(data.userD))
      reset()
      setLoading(false)
    } catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }

  
  return (
    <div className='w-full rounded-md '>
      
      <div className='sm:text-2xl text-xl font-bold tracking-wider text-white pb-3'>
        Update Profile : 
      </div>

      <div className='bg-richBlack p-10 flex items-center justify-around'>
      
      <form onSubmit={handleSubmit(updateProfile)} >

        <div className='flex flex-col gap-3 w-full'>
        <div className='flex flex-col sm:flex-row gap-3 mx-auto'>
          <div className=' flex flex-col'>
            <label htmlFor='firstName'>First Name
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='text'
              name='firstName'
              placeholder='Enter your first name'
              className='my-2 rounded-md py-2 px-5 outline-none w-full text-richBlack'
              {...register("firstName", {required:true})}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your first name.
              </span>
            )}  
          </div>
          <div className=' flex flex-col'>
            <label htmlFor='lastName'>Last Name
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='text'
              name='lastName'
              placeholder='Enter your last name'
              className='my-2 rounded-md py-2 px-5 outline-none w-full text-richBlack'
              {...register("lastName", {required:true})}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="-mt-1 text-[12px] text-yellow-100 lg:w-[49%] w-full">
                Please enter your last name.
              </span>
            )}  
          </div>
        </div>
        
        <div className='flex flex-col sm:flex-row gap-3 mx-auto'>
          <div className=' flex flex-col'>
            <label htmlFor='email'>Email
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='my-2 rounded-md py-2 px-5 w-full outline-none text-richBlack'
              value={user?.email}
              readOnly
            />  
          </div>
          <div className=' flex flex-col'>
            <label htmlFor='contactNumber'>Contact no
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='number'
              name='contactNumber'
              placeholder='Enter your contact no'
              className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
              {...register("contactNumber", {required:true})}
              defaultValue={user?.profile?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your contact no.
              </span>
            )}  
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:justify-between justify-start gap-5 w-full mx-auto py-5'>
          <div className=' flex flex-col'>
            <label htmlFor='gender'>Gender
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <select
              name='gender'
              className='my-2 rounded-md py-2 px-5 w-full outline-none text-richBlack'
              {...register("gender", {required:true})}
              defaultValue={user?.profile?.gender}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='Transgender'>Transgender</option>
            </select> 
          </div>
          <div className=' flex  flex-col '>
            <label htmlFor='dateOfBirth'>Date of Birth
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='date'
              name='dateOfBirth'
              className='my-2 rounded-md py-[4.8px] px-5 outline-none text-richBlack w-full'
              {...register("dateOfBirth", {required:{value:true}})}
              defaultValue={date(user?.profile?.dateOfBirth)}
            />
             {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your DOB.
              </span>
            )}  
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 mx-auto'>
          <div className=' flex flex-col'>
            <label htmlFor='city'> City
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='text'
              name='city'
              placeholder='Enter your city'
              className='my-2 rounded-md py-2 px-5 outline-none w-full text-richBlack'
              {...register("city", {required:true})}
              defaultValue={user?.profile?.city}
            />
            {errors.city && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your city.
              </span>
            )}  
          </div>
          <div className=' flex flex-col'>
            <label htmlFor='state'>State
            <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='text'
              name='state'
              placeholder='Enter your state'
              className='my-2 rounded-md py-2 px-5 outline-none w-full text-richBlack'
              {...register("state", {required:true})}
              defaultValue={user?.profile?.state}
            />
            {errors.state && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your state.
              </span>
            )}  
          </div>
        </div>
        </div>
        
        <div className='flex flex-col gap-3'>
          <label htmlFor='about'>About
              <sup className='text-[#EF476F] text-md'>*</sup>
          </label>
          <textarea
            name='about'
            placeholder='write somthing about you'
            className='my-2 rounded-md py-2 px-5 outline-none resize-none w-full text-richBlack'
            {...register("about", {required:true})}
            defaultValue={user?.profile?.about}
          />
          {errors.about && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter about your self.
            </span>
          )} 
        </div>

        <div className='flex items-center justify-end gap-5 text-white mt-5'>
          <button onClick={()=>{if(isDirty) reset()}} 
          className='rounded-md px-2 py-1 bg-[#FFFFFF99]'
          >Cancel</button> 
          <button type='submit' disabled={loading}
          className='flex gap-2 items-center bg-[crimson] px-2 rounded-md py-2 text-white'
          >{loading? 'Updating...': 'Update'}</button>
        </div>
      </form>

      </div>

    </div>
  )
}

export default PersonalInfo