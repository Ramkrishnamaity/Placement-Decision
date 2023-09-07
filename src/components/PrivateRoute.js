import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {  
  const {value} = useSelector((state)=>state.token)
  if(value === null){
    return <Navigate to='/login' />
  } else {
    return children
  }
}

export default PrivateRoute