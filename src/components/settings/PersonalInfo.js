import React from 'react'
import { useSelector } from 'react-redux'

const PersonalInfo = () => {

  
  const {user} = useSelector((state)=>state.profile)

  
  return (
    <div className='border bg-richBlack text-white p-10 flex items-center justify-around'>
      <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-softBlack ">First Name</p>
              <p className="text-sm font-medium">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-softBlack">Email</p>
              <p className="text-sm font-medium ">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-softBlack">Gender</p>
              <p className="text-sm font-medium">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <div>
          <p className="mb-2 text-sm text-softBlack">Last Name</p>
          <p className="text-sm font-medium">
            {user?.lastName}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-softBlack">Phone Number</p>
          <p className="text-sm font-medium">
            {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-softBlack">Date Of Birth</p>
          <p className="text-sm font-medium text-richblack-5">
            { user?.profile?.dateOfBirth !== null?? "Add Date Of Birth"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo