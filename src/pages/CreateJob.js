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
      <div className='py-[50px] pt-[75px] min-h-screen '>
        <div className='w-[95%] sm:w-[90%] md:w-[80%] bg-softBlack flex flex-col items-center gap-8 pt-4 mx-auto pb-8'>
          <h1 className='text-richBlue text-2xl self-start ml-5'>Create Job</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='companyName'>Company Name
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='companyName'
                  placeholder='like google'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("companyName", {required:true})}
                />
                {errors.companyName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter company name.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='companyUrl'>Company URL
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='companyUrl'
                  placeholder='like google.com'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("companyUrl", {required:true})}
                /> 
                {errors.companyUrl && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter comany url.
                </span>
              )} 
              </div>
            </div>
            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='category'>Category
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <select
                  name='category'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("category", {required:true})}
                >
                  {
                    categories.map((category, index)=>(
                      index !== 0 && <option key={index} value={category}>{category}</option>
                    ))
                  }
                </select>
                
              </div>
              <div className='flex flex-col'>
                <label htmlFor='jobType'>Job Type
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <select
                  name='jobType'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("jobType", {required:true})}
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                
              </div>
              <div className='flex flex-col'>
                <label htmlFor='vacancie'>Vacancie
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='vacancie'
                  placeholder='enter vacancie'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("vacancie", {required:true})}
                />
                {errors.vacancie && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter vacancie.
                </span>
              )}  
              </div>
            </div>

            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='tags'>Skills
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='tags'
                  placeholder='like python R java'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("tags", {required:true})}
                />
                {errors.tags && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter skills.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='location'>Location
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='location'
                  placeholder='like chennai'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("location", {required:true})}
                /> 
                {errors.location && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please job location.
                </span>
              )} 
              </div>
            </div>

            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='package'>Skills
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='package'
                  placeholder='Enter package in Lakh'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("package", {required:true})}
                />
                {errors.package && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter package.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='lastDate'>Location
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='date'
                  name='lastDate'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("lastDate", {required:true})}
                /> 
                {errors.location && (
                <span className="-mt-1 text-[12px] text-yellow-100">
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
              className='my-2 rounded-md py-2 px-5 outline-none resize-none'
              {...register("description", {required:true})}
            />
            {errors.description && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter JD .
                </span>
              )}  
            </div>

            <div className='flex justify-center items-center'>
              <button className='text-[red] text-xl' type='submit'>
                Create
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  )
}

export default CreateJob