import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FiUpload} from 'react-icons/fi'
import { endpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
import { setUser } from '../../redux/slices/profile'

const ChangeProfileImage = () => {

  const {UPLOAD_PROFILE_PICTURE} = endpoints
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.token.value)
  const {user} = useSelector((state)=>state.profile)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)


  function handleClick(){
    fileInputRef.current.click()
  }

  function handleFileChange(e){
    const file = e.target.files[0]
    if(file){
      setImage(file)
      preview(file)
    }
  }

  function preview(file){
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
        setPreviewImage(reader.result)
    }
  }

  async function handleFileUpload(){
    try{
      setLoading(true)
      const formdata = new FormData()
      formdata.append('profilePicture', image)
      //api call
      const {data} = await apiConnector("PUT", UPLOAD_PROFILE_PICTURE, formdata, {Authorization: `Bearer ${token}`})
      console.log(data)
      dispatch(setUser(data.user))
      localStorage.setItem('user', JSON.stringify(data.user))
      setLoading(false)

    } catch(error){
      setLoading(false)
      console.log(error.message)
    }
  }




  return (
    <div className='rounded-md bg-richBlack text-white p-5 flex items-center justify-start gap-4'>
      <div>
        <img
              src={previewImage || user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] md:w-[100px] rounded-full object-cover"
        />
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl tracking-wide font-bold'>Change Profile Picture</h2>
        <div className='flex items-center gap-2'>
          <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          onChange={handleFileChange}
          />
          <button className='rounded-md px-2 py-1 bg-[#FFFFFF99] cursor-pointer'
          onClick={handleClick}
          disabled={loading}
          >
            Select
          </button>
          <div className='flex gap-2 items-center bg-[crimson] px-1 rounded-md py-1 text-white cursor-pointer'
          onClick={handleFileUpload}
          >
            {
              loading? 'Uploading..' : (<>Upload <FiUpload/></>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfileImage