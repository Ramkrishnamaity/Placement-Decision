import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from './components/core/Navbar'
import Home from "./pages/Home";
import { useEffect } from "react";
import { apiConnector } from "./services/apiConnector";
import { useDispatch, useSelector } from 'react-redux'
import {  setUser } from './redux/slices/profile'
import { setLoader } from "./redux/slices/Loader";
import { endpoints } from "./services/apis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import CTC from "./pages/CTC"
import { toast } from "react-toastify"
import Profile from './pages/Profile'
import AllJobs from './pages/AllJobs'
import Setting from './pages/Setting'
import AppliedJobs from './pages/AppliedJobs'
import ApplyJob from './pages/ApplyJob'
import CreateJob from './pages/CreateJob'
import AllStudents from './pages/AllStudents'
import JobPage from "./pages/JobPage";


function App() {

  const dispatch = useDispatch()
  const token = useSelector((state)=>state.token.value)
  const {user} = useSelector((state)=>state.profile)
  const { GET_PROFILE } = endpoints;


  async function getUser(){
    try{

      dispatch(setLoader(true))
      // api call
      const {data} = await apiConnector("GET", GET_PROFILE, null, {Authorization: `Bearer ${token}`})
      if(data.success){
        dispatch(setUser(data.data))
        localStorage.setItem('user', JSON.stringify(data.data))
      } else{
        // error toast message
        toast.error(data.message)
      }
      dispatch(setLoader(false))

    } catch(error){

      toast.error("Network Issue")
      console.log(error.message)
      dispatch(setLoader(false))

    }
  }


  // run every render whenever user data does't exist and token is exist
  useEffect(()=>{
    if(user == null && token !== null) getUser()
  })


  return (
  <div className="font-inter bg-softBlack min-h-screen">

    {/* navigation bar */}
  <Navbar />

    {/* different paths */}
  <Routes>

    <Route path="/" element={<Home />} />


    {/* only non login user route */}
    <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />

    <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />

    <Route path="/ctc-registration" element={<OpenRoute><CTC /></OpenRoute>} />

    <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />

    <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />

    <Route path="/reset-password/:id" element={<OpenRoute><ResetPassword /></OpenRoute>} />

    
    {/* only logged in user route */}

    {
      user !== null && (
        <>

          <Route path="/profile" element={<Profile/>} />
          <Route path="/all-job" element={<AllJobs/>} />
          <Route path="/settings" element={<Setting/>} />
          <Route path="/job/:id" element={<JobPage/>} />


          {
            user.accountType === 'Student'?
            (
              <>
                {/* Specific Student Routes */}
                <Route path="/applied-job" element={<AppliedJobs/>} />
                <Route path="/apply-job/:id" element={<ApplyJob/>} />
              </>
            ):
            (
              <>
                {/* Specific Admin Routes */}
                <Route path="/create-job" element={<CreateJob/>} />
                <Route path="/all-students" element={<AllStudents/>} />
              </>
            )
          }
        </>
      )
    }



    {/* not found page */}
    <Route path="*" element={<NotFound/>}/>


  </Routes>

  </div>
  )
}

export default App;
