import React from 'react'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'


const Home = () => {

  const loader = useSelector((state)=>state.loader.value)


  return (
    loader? (<Spinner/>): (
      <div className='py-[50px] pt-[75px] min-h-screen '>
        
        Home
        
      </div>
    )
  )
}

export default Home