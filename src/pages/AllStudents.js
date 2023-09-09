import React, { useEffect, useState } from 'react'
import { endpoints } from '../services/apis'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { setLoader } from '../redux/slices/Loader'
import { apiConnector } from '../services/apiConnector'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Student from '../components/Student'

const AllStudents = () => {

  const {CTC_MAILS, ALL_PROFILE} = endpoints
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state)=>state.token.value)
  const loader = useSelector((state)=>state.loader.value)
  const [ctc, setCTC] = useState(null)
  const [students, setStudents] = useState(null)

  const getStudents = async()=>{
    try{
      dispatch(setLoader(true))
      const res1 = await apiConnector("GET", CTC_MAILS, null, {Authorization: `Bearer ${token}`})
      const res2 = await apiConnector("GET", ALL_PROFILE, null, {Authorization: `Bearer ${token}`})
      if(res1.data.success && res2.data.success){
        setCTC(res1.data.students)
        setStudents(res2.data.users)
        dispatch(setLoader(false))
      } else{
        dispatch(setLoader(false))
        toast.error("Students could not fetched successfully")
      }
    } catch(error){
      dispatch(setLoader(false))
      navigate('/')
      toast.error(error.message)
      console.log(error.message)
    }
  }


  useEffect(()=>{
    getStudents()
  },[])

  
  return (
    loader? (<Spinner/>): (
      <div className='py-[50px] pt-[75px] min-h-screen '>
        <div className='w-[95%] sm:w-[98%] md:w-[80%] flex flex-col pt-4 text-white mx-auto gap-5'>

          <h1 className=' text-5xl'>Students</h1>
          <div className='flex flex-col gap-5 justify-between rounded-md border-[1px] border-midBlack bg-softBlack p-8 px-12'>
            <h2>CTC Registered Emails</h2>
            <div className='flex flex-wrap gap-2 items-center'>
              {
                ctc !==null && (
                  ctc.map((mail)=>(
                    <div key={mail._id}
                    className=' bg-richBlue rounded-full w-max p-2'
                    >{mail.email}</div>
                  ))
                )
              }
            </div>
          </div>
        
          <div className='flex flex-col justify-between gap-5 rounded-md border-[1px] border-midBlack bg-softBlack md:p-8 p-5 md:px-12 px-5'>
            <h2>Registered Students</h2>
        
            <div className='bg-richBlue '>
            <table className='w-full border border-collapse'>
              <thead className='text-lg'>
                <tr className='border'>
                  <td className='border p-2 hidden md:flex'>Image</td>
                  <td className='border p-2'>Name & Email</td>
                  <td className='border p-2 hidden sm:flex'>Contact</td>
                  <td className='border p-2'>City</td>
                </tr>
              </thead>
              <tbody className='bg-white text-black'>
              {
                students !== null && (
                  students.map((student)=>(
                    <Student student={student} key={student._id}/>
                  ))
                )
              }
              </tbody>
            </table>
            </div>
          </div>

        </div>
      </div>
    )
  )
}

export default AllStudents