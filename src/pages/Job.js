import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Job = () => {

  const location = useLocation()
  const id = location.pathname.split('/').at(-1)

  const [job, setJob] = useState(null)

  async function fetchJob(){
    try{

    } catch(error){

    }
  }

  useEffect(()=>{
    fetchJob()
  },[])

  return (
    <div className='py-[50px] pt-[75px] min-h-screen'>
      <div className='w-[95%] sm:w-[90%] md:w-[80%] flex flex-col gap-5 pt-4 mx-auto'>
        {job?.companyName}
      </div>
    </div>
  )
}

export default Job