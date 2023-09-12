import React from 'react'
import {BiSolidQuoteAltLeft, BiSolidQuoteAltRight} from 'react-icons/bi'

const Card = ({data}) => {
  return (
    <div className='p-5 flex flex-col gap-3'>

        <div className='flex items-center justify-start gap-2'>
            <img
                src={data.image}
                className='w-[70px] h-[70px] rounded-full'
            />
            <div>
                <p>{data.name}</p>
                <p>{data.designation}</p>
            </div>
        </div>
        <div className=''>
        <BiSolidQuoteAltLeft/><p className=''>{data.description}</p><BiSolidQuoteAltRight/>
        </div>

    </div>
  )
}

export default Card