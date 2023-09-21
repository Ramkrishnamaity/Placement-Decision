import React, { useEffect, useState } from 'react'
import Job from '../Job'
import { endpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
import { toast } from 'react-toastify'

const LatestJob = () => {

  const {GET_LATEST_JOBS} = endpoints
  const [jobs, setJobs] = useState(null)

  async function fetch(){
    try{
      //api call
      const {data} = await apiConnector("GET", GET_LATEST_JOBS)
      setJobs(data.jobs)
      
    } catch(error){
      toast.error("NetWork Issue")
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetch()
  })

  
  return (
    <div className='py-10 pb-17 sm:px-10 px-5 w-full h-max flex flex-col justify-center bg-softBlack'>
      <div className='w-max self-center mb-5'>
        <h2 className='py-3 px-5 bg-richBlack rounded-full text-white text-2xl'>Latest jobs</h2>
      </div>
      <div className='flex flex-wrap justify-center gap-5 items-center'>
      {jobs !== null && (
        jobs.map((job)=>(
          <Job key={job._id} job={job} clickDisable={false}></Job>
        ))
      )}
      </div>

    </div>
  )
}

export default LatestJob