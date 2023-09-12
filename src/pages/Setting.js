import React from 'react'
import Spinner from '../components/Spinner'
import ChangeProfileImage from '../components/settings/ChangeProfileImage'
import PersonalInfo from '../components/settings/PersonalInfo'
import UpdatePassword from '../components/settings/UpdatePassword'
import DeleteProfile from '../components/settings/DeleteProfile'
import { useSelector } from 'react-redux'

const Setting = () => {


  const loader = useSelector((state)=>state.loader.value)

  return (
    loader? (<Spinner/>): (
      <div className='py-[50px] pt-[75px] min-h-screen '>
        <div className='flex flex-col pt-4'>

          <h1 className='px-5 py-4 bg-richBlue rounded-e-xl self-start mb-14 sm:text-3xl text-xl text-white'>
            Edit Profile
          </h1>
        <div className='w-[95%] sm:w-[90%] md:w-[80%] mx-auto flex flex-col gap-8 text-[#FFFFFF99]'>
          <ChangeProfileImage/>

          <PersonalInfo/>

          <UpdatePassword/>

          <DeleteProfile/>
        </div>

        </div>
      </div>  
    )
  )
}

export default Setting