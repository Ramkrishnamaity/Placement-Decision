import React from 'react'
import { useSelector } from 'react-redux'

const ProfileDropdown = () => {

    
  const user = useSelector((state)=>state.profile.user)


  return (
    <div>
        user
    </div>
  )
}

export default ProfileDropdown