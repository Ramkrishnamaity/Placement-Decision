import React from 'react'
import { useSelector } from 'react-redux'
import Job from '../components/Job'

const AppliedJobs = () => {

  
  const {user} = useSelector((state)=>state.profile)

  return (
    <div className='py-[50px] pt-[75px] min-h-screen '>
      <div className='flex justify-center items-center flex-col gap-5'>
          <h1 className=' bg-richBlue p-1 md:p-3 text-xl md:text-2xl rounded-e-xl self-start'>Applied jobs</h1>
          <div className='sm:w-[90%] md:w-[85%] w-[95%] mx-auto space-y-5'>
          {
            user?.jobs.length === 0? (<div>Job not found</div>):
            (
              user?.jobs.map((job)=>(
                <Job key={job._id} job={job}></Job>
              ))
            )
          }
          </div>
      </div>
    </div>
  )
}

export default AppliedJobs