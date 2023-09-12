import React from 'react'
import { useForm } from 'react-hook-form'
import { categories } from '../Data'
import { endpoints } from '../services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../redux/slices/Loader'
import { apiConnector } from '../services/apiConnector'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const CreateJob = () => {


  const {CREATE_JOB} =  endpoints
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state)=>state.token.value)
  const loader = useSelector((state)=>state.loader.value)
  const {register, handleSubmit,reset, formState:{errors}} = useForm()

  async function submitHandler(formData){
    try{
      dispatch(setLoader(true))
      const {data} = await apiConnector("POST", CREATE_JOB, formData, {Authorization: `Bearer ${token}`})
      if(data.success){
        reset()
        dispatch(setLoader(false))
        navigate(`/job/${data.jobD._id}`)
        toast.success(data.message)
      } else{
        dispatch(setLoader(false))
        toast.error(data.message)
      }
    } catch(error){
      reset()
      dispatch(setLoader(false))
      toast.error(error.message)
    }
  }


  return (
    loader? (<Spinner/>): (
      <div className='py-[30px] pt-[75px] min-h-screen  text-[#FFFFFF99]'>
        <div className=' bg-softBlack flex flex-col items-center pt-4 mx-auto pb-1'>
        <h1 className="text-white mb-14 sm:text-3xl text-xl font-medium px-5 py-4 bg-richBlue rounded-e-xl self-start">
          Create Job</h1>
          <div className='w-[95%] sm:w-[85%] md:w-[80%] mx-auto '>
          <form onSubmit={handleSubmit(submitHandler)} className='w-full'>
            <div className='flex gap-2 md:flex-row flex-col justify-between items-center'>
              <div className='flex flex-col md:w-[49%] w-full'>
                <label htmlFor='companyName'>Company Name
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='companyName'
                  placeholder='like google'
                  className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
                  {...register("companyName", {required:true})}
                />
                {errors.companyName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter company name.
                </span>
              )}  
              </div>
              <div className='flex flex-col md:w-[49%] w-full'>
                <label htmlFor='companyUrl'>Company URL
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='companyUrl'
                  placeholder='like google.com'
                  className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
                  {...register("companyUrl", {required:true})}
                /> 
                {errors.companyUrl && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter comany url.
                </span>
              )} 
              </div>
            </div>
            
            <div className='flex items-center justify-between gap-3 md:flex-row flex-col'>
              <div className='flex flex-col md:w-[32%] w-full'>
                <label htmlFor='category'>Category
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <select
                  name='category'
                  className='my-2 rounded-md py-[10px] px-5 outline-none text-richBlack w-full'
                  {...register("category", {required:true})}
                >
                  {
                    categories.map((category, index)=>(
                      index !== 0 && <option key={index} value={category}>{category}</option>
                    ))
                  }
                </select>
                
              </div>
              <div className='flex flex-col  md:w-[32%] w-full'>
                <label htmlFor='jobType'>Job Type
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <select
                  name='jobType'
                  className='my-2 rounded-md py-[10px] px-5 outline-none text-richBlack w-full'
                  {...register("jobType", {required:true})}
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                
              </div>
              <div className='flex flex-col  md:w-[32%] w-full'>
                <label htmlFor='vacancie'>Vacancie
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='vacancie'
                  placeholder='enter vacancie'
                  className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
                  {...register("vacancie", {required:true})}
                />
                {errors.vacancie && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter vacancie.
                </span>
              )}  
              </div>
            </div>

            <div className='flex items-center justify-between gap-2 md:flex-row flex-col'>
              <div className='flex flex-col md:w-[49%] w-full'>
                <label htmlFor='tags'>Skills
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='tags'
                  placeholder='like python R java'
                  className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
                  {...register("tags", {required:true})}
                />
                {errors.tags && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter skills.
                </span>
              )}  
              </div>
              <div className='flex flex-col md:w-[49%] w-full'>
                <label htmlFor='location'>Location
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='location'
                  placeholder='like chennai'
                  className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
                  {...register("location", {required:true})}
                /> 
                {errors.location && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please job location.
                </span>
              )} 
              </div>
            </div>

            <div className='flex items-center justify-between gap-2 md:flex-row flex-col'>
              <div className='flex flex-col md:w-[49%] w-full'>
                <label htmlFor='package'>Package
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='package'
                  placeholder='Enter package in Lakh'
                  className='my-2 rounded-md py-2 px-5 outline-none text-richBlack w-full'
                  {...register("package", {required:true})}
                />
                {errors.package && (
                <span className="-mt-1 text-[12px]">
                  Please enter package.
                </span>
              )}  
              </div>
              <div className='flex flex-col  md:w-[49%] w-full'>
                <label htmlFor='lastDate'>Location
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='date'
                  name='lastDate'
                  className='my-2 rounded-md py-2 px-5 outline-none  text-richBlack w-full'
                  {...register("lastDate", {required:true})}
                /> 
                {errors.location && (
                <span className="-mt-1 text-[12px]">
                  Please enter last date.
                </span>
              )} 
              </div>
            </div>

            <div className='flex flex-col mx-auto'>
            <label htmlFor='description'>Description
                <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <textarea
              name='description'
              placeholder='write job D'
              className='my-2 rounded-md py-2 px-5 outline-none resize-none w-full h-[80px] text-richBlack'
              {...register("description", {required:true})}
            />
            {errors.description && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter JD .
                </span>
              )}  
            </div>

            <div className='flex justify-center items-center mt-5'>
              <Button text='Create' type='submit'/>
            </div>

          </form>
          </div>
        </div>
      </div>
    )
  )
}

export default CreateJob