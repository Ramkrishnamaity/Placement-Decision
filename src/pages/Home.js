import React, { useRef } from 'react'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'
import HeroSection from '../components/home/HeroSection'
import About from '../components/home/About'
import Companies from '../components/home/Companies'
import LatestJob from '../components/home/LatestJob'
import Testimonials from '../components/home/Testimonials'
import Contact from '../components/home/Contact'
import Footer from '../components/core/Footer'
import {AiOutlineArrowUp} from 'react-icons/ai'
import ResetPassword from './ResetPassword'

const Home = () => {

  const topRef = useRef(<div></div>)
  const loader = useSelector((state)=>state.loader.value)

 
  return (
    loader? (<Spinner/>): (
      <div className='min-h-screen flex flex-col'>
      
          <div ref={topRef}><HeroSection/></div>
          <About/>
          <Companies/>
          <LatestJob/>
          <Testimonials/>
          <Contact/>
          <Footer/>
          
          {/* top button */}
          <div className='fixed bottom-1 right-1 w-[40px] h-[40px] bg-[crimson] rounded-sm text-white flex justify-center items-center text-2xl'
          onClick={()=>topRef.current.scrollIntoView({behavior: 'smooth'})}
          >
            <AiOutlineArrowUp/>
          </div>
      </div>
    )
  )
}

export default Home