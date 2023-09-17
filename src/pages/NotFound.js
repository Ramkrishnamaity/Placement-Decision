import React from 'react'
import notfound from '../assets/notfound.jpg'

const NotFound = () => {

  

  return (
    <div className='min-h-screen'>
      <img
        src={notfound}
        alt='notfound'
        className='w-full'
      />
    </div>
  )
}

export default NotFound