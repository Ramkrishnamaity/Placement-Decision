import React from 'react'
import client1 from '../../assets/clients/client-1.png'
import client2 from '../../assets/clients/client-2.png'
import client3 from '../../assets/clients/client-3.png'
import client4 from '../../assets/clients/client-4.png'
import client5 from '../../assets/clients/client-5.png'
import client6 from '../../assets/clients/client-6.png'

const Companies = () => {
  return (
    <div className='pt-10 w-full h-max flex flex-col justify-center bg-white'>
      <div className='w-max self-center mb-5'>
        <h2 className='pb-2 px-5 border-b-2 border-[aqua] text-2xl'>Top Comapnies</h2>
      </div>
      <div className='h-max px-2 py-6 pt-5 items-center bg-[#f4f4f4]'>
        <div className='flex flex-wrap space-y-5 gap-3 items-center justify-between'>
          <img
            src={client1}
            className='w-[100px]'
          />
          <img
            src={client2}
            className='w-[100px]'
          />
          <img
            src={client3}
            className='w-[100px]'
          />
          <img
            src={client4}
            className='w-[100px]'
          />
          <img
            src={client5}
            className='w-[100px]'
          />
          <img
            src={client6}
            className='w-[100px]'
          />
        </div>
      </div>    
    </div>
  )
}

export default Companies