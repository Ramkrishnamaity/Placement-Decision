import React from 'react'
import Button from '../Button'

const Modal = ({desc, btnText, setOpenModal, deleteAccount, logout, deleteJob }) => {


  return (
    <div className='text-[#FFFFFF99] z-[999] fixed overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='flex flex-col items-center gap-1 p-8 rounded-lg bg-richBlack '>
            <h1>Are you sure?</h1>
            <p>{desc}</p>
            <div className='my-2'
             onClick={()=>{
                if(deleteAccount !== null){
                  deleteAccount()
                }
                if(logout!== null){
                  logout()
                }
                if(deleteJob!== null){
                  deleteJob()
                }
                setOpenModal(false)
            }}>
            <button className='flex gap-2 items-center bg-[crimson] px-4 rounded-md py-2 text-white' >
              {btnText}
            </button>
            </div>
            <button onClick={()=>{setOpenModal(false)}}>
                Cancel
            </button>
        </div>
    </div>
  )
}

export default Modal