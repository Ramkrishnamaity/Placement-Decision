import React from 'react'
import {TfiLocationPin} from 'react-icons/tfi'
import {LuTimer} from 'react-icons/lu'
import {GiSandsOfTime} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'



const Job = ({job, clickDisable}) => {

    const navigate = useNavigate()

    function calTimeInterval(date){
        const createdAt = new Date(date)
        let time = Math.floor((new Date() - createdAt) / (60*60*1000))
        if(time > 24){
            return `${Math.floor(time/24)} days ago`
        } else{
            return `${time} hours ago`
        }
    }


  return (

    <div className='rounded-md flex flex-col justify-center gap-5 bg-richBlack w-[280px] h-[250px] px-2 py-3 text-[#FFFFFF99] '
    onClick={(e)=>{clickDisable && navigate(`/job/${job._id}`)}}
    >
        <div className='flex items-center justify-start gap-2'>
            <img
                src={job?.logo}
                alt='job logo'
                className='w-[68px] h-[68px] rounded-2xl object-cover bg-softBlue'
            />
            <div>
                <h2 className='text-lg text-white tracking-wider'>{job?.companyName}</h2>
                <div className='flex items-center text-sm  gap-1'>
                    <TfiLocationPin className='text-white'/>
                    <span>{job?.location}</span>
                </div>
            </div>
        </div>

        <div>
            {job?.description.substring(0,90)}
            <span className='text-softBlue'>...Read more</span>
        </div>

        <div className='flex items-center justify-between'>
            <div className='text-softBlue text'>
                <p> {job?.jobType}</p>
            </div>
            <div className='flex items-center gap-1'>
                <LuTimer/>
                <p> {calTimeInterval(job?.createdAt)}</p>
            </div>
        </div>

    </div>
  )
}

export default Job