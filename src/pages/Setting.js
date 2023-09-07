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
        <div className='w-[95%] sm:w-[90%] md:w-[80%] flex flex-col gap-5 pt-4 mx-auto'>

          <h1>
            Edit Profile
          </h1>

          <ChangeProfileImage/>

          <PersonalInfo/>

          <UpdatePassword/>

          <DeleteProfile/>

        </div>
      </div>  
    )
  )
}

export default Setting