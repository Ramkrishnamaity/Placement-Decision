import React, { useState } from 'react'
import {FiTrash2} from 'react-icons/fi'
import Modal from '../core/Modal'
import { endpoints } from '../../services/apis'
import { setLoader } from '../../redux/slices/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiConnector'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DeleteProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {DELETE_ACCOUNT} = endpoints
    const token = useSelector((state)=>state.token.value)
    const [openModal, setOpenModal] = useState(false)

    async function deleteAccount(){
        try{
            dispatch(setLoader(true))
            //api call
            const {data} = await apiConnector("DELETE", DELETE_ACCOUNT, null, {Authorization: `Bearer ${token}`})
            //navigate
            if(data.success){
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                dispatch(setLoader(false))
                navigate('/')
            } else{
                // error toast
                toast.error(data.message)
                dispatch(setLoader(false))
            }
            
        } catch(error){
            dispatch(setLoader(false))
            console.log(error.message)
        }
    }


  return (
    <div>
        <div className="my-5 flex sm:flex-row flex-col items-center gap-x-5 rounded-md bg-richBlack  p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
            <FiTrash2 className="text-3xl text-[white]" />
        </div>
        <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-[white]">
            Delete Account
            </h2>
            <div className="sm:w-3/5 w-full">
            <p>Would you like to delete account?</p>
            <p>
                Deleting your account is
                permanent and will remove all the contain associated with it.
            </p>
            </div>
            <button
            type="button"
            className="w-fit cursor-pointer italic text-[red]"
            onClick={()=>{setOpenModal(true)}}
            >
            I want to delete my account.
            </button>
        </div>

        {/* modal */}
        {openModal && <Modal desc='You want to delete your account' btnText='Delete' setOpenModal={setOpenModal} deleteAccount={deleteAccount} logout={null} deleteJob={null} /> }

        </div>
    </div>
  )
}

export default DeleteProfile