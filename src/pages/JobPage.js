import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { endpoints } from '../services/apis'
import { setLoader } from '../redux/slices/Loader'
import { apiConnector } from '../services/apiConnector'
import { toast } from 'react-toastify'
import Job from '../components/Job'
import Modal from '../components/core/Modal'
import { CSVLink } from 'react-csv'

const JobPage = () => {

  const {JOB, DELETE_JOB} = endpoints
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const {user} = useSelector((state)=>state.profile)
  const token = useSelector((state)=>state.token.value)
  const loader = useSelector((state)=>state.loader.value)
  const jobId = location.pathname.split('/').at(-1)

  
  const [openModal, setOpenModal] = useState(false)
  const [job, setJob] = useState(null)
  const [relatedJob, setRelatedJob] = useState(null)

  async function fetchJob(){
    try{
      dispatch(setLoader(true))
      const {data} = await apiConnector("POST", JOB, {jobId:jobId}, {Authorization: `Bearer ${token}`})
      if(data.success){
        setJob(data.job)
        setRelatedJob(data.relatedJob)
        dispatch(setLoader(false))
      } else{
        toast.error(data.message)
        dispatch(setLoader(false))
      }
    } catch(error){
      dispatch(setLoader(false))
      toast.error("Network issue")
    }
  }

  async function deleteJob(){
    try{
      dispatch(setLoader(true))
      const {data} = await apiConnector("DELETE", DELETE_JOB, {id:jobId}, {Authorization: `Bearer ${token}`})
      if(data.success){
        setJob(null)
        setRelatedJob(null)
        navigate('/all-job')
        dispatch(setLoader(false))
      } else{
        toast.error(data.message)
        dispatch(setLoader(false))
      }
    } catch(error){
      dispatch(setLoader(false))
      toast.error("Network issue")
    }
  }

  function isApply(){
    if(Object.values(user?.jobs).find((v)=> v._id === job?._id))
      return true
    else return false
  }

  function isSame(jId){
    if(job?._id === jId) return true
    else return false
  }

  function getData(){

    let data = job?.applications

    Object.values(data).forEach((app)=>{
      delete app._id
      delete app.jobId 
      delete app.uid 
      delete app.createdAt 
      delete app.updatedAt 
      delete app.__v 
    })

    return data

  }





  useEffect(()=>{
    fetchJob()
  },[])

  return (
    loader? (<Spinner/>): (
      <div className='py-[50px] pt-[75px] min-h-screen text-white space-y-10'>
        <div className='w-[95%] sm:w-[90%] md:w-[80%] bg-richBlack p-10  rounded-md flex flex-col items-center gap-8 mx-auto'>
          {
            job !== null && (
              
              <>
                <div className='flex flex-col items-center justify-center'>
                  <div>
                    <img
                    src={job?.logo}
                    alt='job logo'
                    className='w-[100px] h-[100px] rounded-xl object-cover'
                    />
                  </div>
                  <div className='text-center mt-1'>
                    <h1 className='text-xl'>{job?.companyName}</h1>
                    <p className='text-[#FFFFFF99]'>{job?.category}</p>
                  </div>
                </div>
                
                <div className='sm:w-[90%] w-full  text-justify leading-7'>
                  <h2 className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl w-max'>Job Description</h2>
                  <p className='sm:p-5 p-1 mt-2'>{job?.description}</p>
                </div>

                <div className='sm:w-[90%] w-full  flex md:justify-between items-center flex-wrap space-x-5 space-y-3'>
                  <div className=' flex items-center gap-2 mt-3'>
                    <p className='sm:ml-5 ml-[5%] px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>Skills: </p>
                      {
                        job?.tags.map((tag, index)=>(
                          <p key={index}
                          className=''
                          >{index === job?.tags.length-1? tag:`${tag} ,`}</p>
                        ))
                      }
                  </div>
                  <div className=' flex items-center gap-2'>
                    <p className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>Location: </p>
                    {
                      job?.location
                    }
                  </div>
                  <div className=' flex items-center gap-2'>
                    <p className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>Package: </p>
                    <p>{job?.package}</p>
                  </div>
                  <div className=' flex items-center gap-2'>
                    <p className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>Job Type: </p>
                    <p>{job?.jobType}</p>
                  </div>
                  <div className=' flex items-center gap-2'>
                    <p className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>vacancie: </p>
                    <p>{job?.vacancie}</p>
                  </div>
                  <div className=' flex items-center gap-2'>
                    <p className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>Applications: </p>
                    <p>{job?.applications.length}</p>
                  </div>
                  <div className=' flex items-center gap-2'>
                    <p className='px-2 py-1 bg-richBlue text-lg text-black rounded-xl'>Last Date: </p>
                    <p>{job?.lastDate.split('T').at(0)}</p>
                  </div>
                </div>

                <div className='flex items-center flex-wrap gap-2'>
                    <button onClick={()=>{navigate('/all-job')}} className='text-[crimson]'>
                      go back to all jobs
                    </button>
                    {
                      user?.accountType === 'Student'? (
                       isApply()? (
                        <button disabled className='p-1 bg-richBlue rounded-lg'>
                          Applied           
                        </button>
                       ):(
                        <button onClick={()=>{navigate(`/apply-job/${job?._id}`)}} className='p-1 bg-richBlue rounded-lg'>
                          ApplyJob           
                        </button>
                       ) 
                      ) : (
                        <>
                        <div className='p-1 bg-richBlue rounded-lg'>
                          <CSVLink data={getData()}>Download Applications</CSVLink>
                        </div>
                        
                        <button onClick={()=>{setOpenModal(true)}} className='p-1 bg-[crimson] rounded-lg'>
                          Delete Job
                        </button>
                        {/* modal */}
                        {openModal && <Modal desc='You want to delete this job' btnText='Delete' setOpenModal={setOpenModal} deleteAccount={null} logout={null} deleteJob={deleteJob} /> }
                        </>
                      )
                    }
                </div>
              </>

            )
          }
        </div>
        <div className='text-black sm:w-[80%] w-[95%] mx-auto space-y-5'>
          <h2 className='text-white text-2xl tracking-wider'>Related Jobs : </h2>
          {
            relatedJob !== null && (
              <div className='flex flex-wrap gap-5 justify-center items-center'>
                {
                  relatedJob.map((j)=>(
                    !isSame(j._id) && <Job job={j} key={j._id}/> 
                  ))
                }
              </div>
            )
          }
        </div>
      </div> 
    )
  )
}

export default JobPage