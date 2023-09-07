import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {RiEditBoxLine} from 'react-icons/ri'

const Profile = () => {

  
  const {user} = useSelector((state)=>state.profile)
  const dateofbirth = user?.profile?.dateOfBirth
  const date = new Date(dateofbirth).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const navigate = useNavigate()


  return (
    <div className='py-[50px] pt-[75px] pb-0 min-h-screen flex justify-center items-center'>
      
      <div className='w-[95%] sm:w-[90%] md:w-[80%] flex flex-col pt-4 text-white mx-auto'>
        <h1 className="mb-14 text-3xl font-medium text-richBlack">
          My Profile
        </h1>

        <div className="flex items-center justify-between rounded-md border-[1px] border-softBlack bg-midBlack p-8 px-12">
            <div className="flex items-center gap-x-4">
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square sm:w-[78px] w-[50px] rounded-full object-cover"
              />
              <div className="space-y-1">
                <p className="text-lg font-semibold text-richblack-5">
                  {user?.firstName + " " + user?.lastName}
                </p>
                <p className="text-sm text-richblack-300">{user?.email}</p>
              </div>
            </div>
          <div onClick={()=>{navigate('/settings')}}
          className='border p-2 rounded-sm border-[yellow] cursor-pointer'
          >
            <RiEditBoxLine />
          </div>
        </div>

        <div className=" text-white my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-softBlack  bg-midBlack  p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <div onClick={()=>{navigate('/settings')}}
              className='border p-2 rounded-sm border-[yellow] cursor-pointer'
            >
              <RiEditBoxLine />
            </div>
          </div>
          <p
            className=''
          >
            {user?.additionalDetails?.about? user?.additionalDetails?.about : "Write Something About Yourself"}
          </p>
        </div>

        <div className="text-white my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-softBlack  bg-midBlack  p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <div onClick={()=>{navigate('/settings')}}
              className='border p-2 rounded-sm border-[yellow] cursor-pointer'
            >
              <RiEditBoxLine />
            </div>
        </div>
        <div className="flex max-w-[500px] justify-between">
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
                { dateofbirth !== null? date : "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
        </div>

      </div>

    </div>
  )
}

export default Profile