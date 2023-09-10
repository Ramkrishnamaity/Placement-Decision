import React from 'react'
import {TfiLocationPin} from 'react-icons/tfi'
import {LuTimer} from 'react-icons/lu'
import {GiSandsOfTime} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'



const Job = ({job}) => {

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
    <div className=' rounded-lg bg-white w-full flex gap-5 flex-wrap justify-start items-center p-10'
    onClick={(e)=>{navigate(`/job/${job._id}`)}}
    >
        <div className='self-start'>
            <img
                src={job?.logo}
                alt='job logo'
                className='w-[50px] h-[50px] rounded-xl object-cover bg-softBlue'
            />
        </div>
        <div className='space-y-1'>
            <h2>{job?.companyName}</h2>
            <div className='flex flex-wrap items-center gap-1'>
                {job?.tags.map((tag, index)=>(<p key={index}>{tag}</p>))}
            </div>
            <div className='flex items-center'>
                <TfiLocationPin/>
                <span>{job?.location}</span>
            </div>
            <div className='flex items-center flex-wrap'>
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
        <div className='ml-5 space-y-1 self-start'>
            <p>Division</p>
            <p className='text-[green]'>{job?.category}</p>
            <p className='text-xl text-richBlue'>{`$${job?.package}`}<span className='text-sm text-black pl-1'>/ year</span></p>
        </div>
    </div>
  )
}

export default Job