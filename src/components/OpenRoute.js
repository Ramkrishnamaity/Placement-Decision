import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const OpenRoute = ({children}) => {  
  const {value} = useSelector((state)=>state.token)
  if(value === null){
    return children
  } else {
    return <Navigate to='/' />
  }
}

export default OpenRoute