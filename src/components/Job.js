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
    <div className=' rounded-lg bg-richBlack w-full flex md:space-x-[5rem] lg:space-x-[8rem] space-x-1 gap-y-5 md:flex-row flex-col md:justify-center md:items-center justify-around items-center p-10 text-[#FFFFFF99] '
    onClick={(e)=>{clickDisable && navigate(`/job/${job._id}`)}}
    >
        <div className=' flex md:flex-row flex-col justify-center md:items-center md:justify-between gap-7'>
        <div className='md:self-start self-start'>
            <img
                src={job?.logo}
                alt='job logo'
                className='w-[78px] h-[78px] rounded-2xl object-cover bg-softBlue'
            />
        </div>
        <div className='space-y-1'>
            <h2 className='text-2xl font-bold tracking-wider text-white'>{job?.companyName}</h2>
            <div className='flex flex-wrap items-center gap-1 text-lg tracking-wide'>
                {job?.tags.map((tag, index)=>(<p key={index}>{index === job?.tags.length-1?`${tag}` :`${tag},`}</p>))}
            </div>
            <div className='flex items-center  gap-1'>
                <TfiLocationPin/>
                <span>{job?.location}</span>
            </div>
            <div className='flex items-center flex-wrap gap-4'>
                <div className='flex items-center'>
                    <LuTimer/>
                    <p> {calTimeInterval(job?.createdAt)}</p>
                </div>
                <div className='flex items-center'>
                    <GiSandsOfTime/>
                    <p> {job?.jobType}</p>
                </div>
                <div>
                    {job?.applications.length} Applicants
                </div>
            </div>
        </div>
        </div>
        <div className='flex md:flex-col flex-row gap-5 items-center'>
            <p className='text-white text-md'>Division</p>
            <p className=''>{job?.category}</p>
            <p className='text-xl text-white'>{`${job?.package}`}<span className='text-sm  pl-1'>/ year</span></p>
        </div>
    </div>
  )
}

export default Job