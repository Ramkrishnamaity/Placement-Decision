import React from 'react'

const Student = ({student}) => {

  return (
    <tr className='border'>

        <td className='text-center justify-center items-center sm:p-1 p-2 hidden md:flex'>
          <img
              src={student?.image}
              alt={`profile ${student?.firstName}`}
              className="aspect-square sm:w-[50px] w-[30px] rounded-full object-cover"
          />
        </td>
        <td className=' border sm:p-2 p-[1px]'>
          <div className="space-y-1 sm:text-md text-sm">
            <p >
              {student?.firstName + " " + student?.lastName}
            </p>
            <p >{student?.email}</p>
          </div>
        </td>
        <td className='text-center sm:p-2 p-2 hidden sm:flex '>
          <div>
              {student?.profile?.contactNumber?? 'null'}
          </div>
        </td>
        <td className='border sm:p-2 p-1 sm:text-md text-sm'>
          <div>
              {student?.profile?.city?? 'null'}
          </div>
        </td>
        
        
    </tr>
  )
}

export default Student