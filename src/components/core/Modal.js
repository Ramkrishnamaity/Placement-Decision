import React from 'react'
import Button from '../Button'

const Modal = ({desc, btnText, setOpenModal, deleteAccount, logout, deleteJob }) => {


  return (
    <div className='z-[999] fixed overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='flex flex-col items-center border p-5 bg-black text-white'>
            <h1>Are you sure?</h1>
            <p>{desc}</p>
            <div onClick={()=>{
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
            <Button text={btnText} />
            </div>
            <button onClick={()=>{setOpenModal(false)}}>
                Cancel
            </button>
        </div>
    </div>
  )
}

export default Modal