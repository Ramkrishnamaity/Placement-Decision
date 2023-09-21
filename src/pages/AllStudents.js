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
      <div className='py-[50px] pt-[75px] min-h-screen text-[#FFFFFF99]'>
        <div className='flex flex-col pt-4 text-white mx-auto'>
          <h1
          className="mb-14 sm:text-3xl text-xl font-medium px-5 py-4 bg-richBlue rounded-e-xl self-start"
          >Students</h1>
        <div className='w-[95%] sm:w-[98%] md:w-[80%] mx-auto flex flex-col gap-5 '>
          <div className='flex flex-col gap-5 justify-between rounded-md  bg-richBlack sm:p-8 px-2 overflow-hidden py-5 sm:px-12'>
            <h2 className='sm:text-2xl text-xl tracking-wide'>CTC Registered Emails</h2>
            <div className='flex flex-wrap gap-3 items-center text-[#FFFFFF99]'>
              {
                ctc !==null && (
                  ctc.map((mail)=>(
                    <div key={mail._id}
                    className=' bg-richBlue rounded-full w-max sm:p-2 px-[4px] py-[2px]'
                    >{mail.email}</div>
                  ))
                )
              }
            </div>
          </div>
        
          <div className='flex flex-col justify-between gap-5 rounded-md bg-richBlack md:p-8 p-5 md:px-12 sm:px-5 px-1'>
            <h2 className='sm:text-2xl text-xl tracking-wide ml-2'>Registered Students</h2>
        
            <div className='bg-richBlue '>
            <table className='w-full border border-collapse'>
              <thead className='text-lg'>
                <tr className='border'>
                  <td className='border p-2 hidden md:flex'>Image</td>
                  <td className='border p-2 px-1 sm:text-lg text-md'>Name & Email</td>
                  <td className='border p-2 hidden sm:flex'>Contact</td>
                  <td className='border p-2 px-1 sm:text-lg text-md'>City</td>
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
      </div>
    )
  )
}

export default AllStudents