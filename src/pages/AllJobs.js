import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BiSearch} from 'react-icons/bi'
import Spinner from '../components/Spinner'
import { setLoader } from '../redux/slices/Loader'
import { categories } from '../Data'
import { endpoints } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { toast } from 'react-toastify'
import Job from '../components/Job'

const AllJobs = () => {

  const {GET_JOBS} = endpoints
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.token.value)
  const loader = useSelector((state)=>state.loader.value)
  const {user} = useSelector((state)=>state.profile)
  const [tag, setTag] = useState('')
  const [category, setCategory] = useState('All')
  const [jobType, setJobType] = useState('Onsite')
  const [sort, setSort] = useState(true)

  const [jobs, setJobs] = useState(null)

  function enterHandler(e){
    if(e.key === "Enter"){
      tag!=='' && fetchJob()
    }
  }


  async function fetchJob(category){ 
    try{ 
      dispatch(setLoader(true))
      let query = ''
      // api call
      if(category) query += `?category=${category}`
      if(tag !== '' && query !== '') query += `&tags=${tag}`
      else if(tag !== '') query += `?tags=${tag}`

      const {data} = await apiConnector("GET", `${GET_JOBS}${query}`, null, {Authorization: `Bearer ${token}`})
      sort? setJobs(data.jobs.reverse()): setJobs(data.jobs)
      dispatch(setLoader(false))
      
    } catch(error){
      toast.error("NetWork Issue")
      console.log(error.message)
      dispatch(setLoader(false))
    }
  }

  useEffect(()=>{
    fetchJob()
  },[])


  
  return (
    loader? (<Spinner/>): (  
      <div className='py-[50px] pt-[75px] min-h-screen '>
        <div className='w-[95%] sm:w-[90%] md:w-[80%] flex flex-col gap-5 pt-4 mx-auto'>
          <div className='relative'>
            <input
              type='text'
              value={tag}
              placeholder='Search your best job here'
              onChange={(e)=>{setTag(e.target.value)}}
              onKeyUp={(e)=>{enterHandler(e)}}
              className='w-full px-5 py-2 rounded-full outline-none'
            />
            <button onClick={()=>{tag!=='' && fetchJob()}}
            className='absolute top-0 right-0 bg-richBlue px-8 py-3 rounded-full'
            ><BiSearch/></button>
          </div>

          <div className='flex flex-col gap-2 justify-center'>
            <h2 className='font-bold'>Recomendation</h2>
            <div className='flex items-center gap-2 flex-wrap text-white px-1'>
              {
                categories.map((categori, index)=>(
                  <div key={index}
                  className={`px-4 py-2 cursor-pointer rounded-full ${category === categori? 'bg-richBlue': 'bg-white text-black'}`}
                  onClick={()=>{
                    if(categori === 'All'){
                      setCategory(categori)
                      fetchJob()
                    }
                    else {
                      setCategory(categori)
                      fetchJob(categori, null)
                    }
                    }}
                  >{categori}</div>
                ))
              }
            </div>
            <div className='flex items-center gap-3 self-end mt-2'>
              <p>Sort by</p>
              <select className='outline-none px-2 py-1 rounded-full'
              onChange={(e)=>{setJobType(e.target.value)}}
              >
                <option value='Onsite'>Onsite</option>
                <option value='Remote'>Remote</option>
                <option value='Hybrid'>Hybrid</option>
              </select>
              <select className='outline-none px-2 py-1 rounded-full'
              onChange={(e)=>{
                setJobs(jobs.reverse())
                setSort(e.target.value)
                }}
              >
                <option value='true'>Recent</option>
                <option value='false'>Last Recent</option>
              </select>
            </div>
          </div>

          <div className='flex justify-center items-center flex-col gap-5'>
            {
              !jobs? (<div>Job not found</div>):
              (
                jobs.filter((job)=>job.jobType.includes(jobType)).map((job)=>(
                  <Job key={job._id} job={job}></Job>
                ))
              )
            }
          </div>

        </div>
      </div>
    )
  )
}

export default AllJobs