import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useEffect } from "react";
import { apiConnector } from "./services/apiConnector";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from './redux/slices/profile'
import { endpoints } from "./services/apis";

function App() {

  const dispatch = useDispatch()
  const token = useSelector((state)=>state.token.value)
  const { GET_PROFILE } = endpoints;


  async function getUser(){
    try{

      dispatch(setLoading(true))
      const response = await apiConnector("GET", GET_PROFILE, {
        Authorization: `Bearer ${token}`
      })
      console.log(response)
      dispatch(setUser(response.data))
      dispatch(setLoading(false))

    } catch(error){

      console.log(error.message)
      dispatch(setLoading(false))

    }
  }


  useEffect(()=>{
    getUser()
  })


  return (
    <div className="font-inter bg-softBlue min-h-screen">

        {/* navigation bar */}

      <Navbar />

        {/* different paths */}

      <Routes>
        <Route to="/" element={<Home />} />
      </Routes>

      
    </div>
  );
}

export default App;
