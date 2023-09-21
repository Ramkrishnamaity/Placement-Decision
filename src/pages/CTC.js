import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { payment } from '../services/Payment'
import { setLoader } from '../redux/slices/Loader'
import { toast } from 'react-toastify'

const CTC = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loader = useSelector((state)=>state.loader.value)

    const [formData, setFormData] = useState({
        email: '', amount: 3300, firstName: '', lastName: ''
    })

    function handleOnChange(e){
        setFormData((prev)=>({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    async function validateEmail (email){

        let apikey = process.env.REACT_APP_EMAIL_VALIDATOR_API_KEY
        let url = `https://api.emailvalidation.io/v1/info?apikey=${apikey}&email=${email}`

        const res = await fetch(url)
        let data =  await res.json()

        return data.smtp_check
    }

    async function submitHandler(e){
        try{
            e.preventDefault() 
            dispatch(setLoader(true))
            if(!await validateEmail(formData.email)){
                dispatch(setLoader(false))
                toast.error('Please Enter a Valid Mail')
                return
            }
                
            await payment(formData, dispatch, navigate)
            
            setFormData({
                email: '', amount: 3300, firstName: '', lastName: ''
            })
        } catch(error){
            console.log(error.message)
            setFormData({
                email: '', amount: 3300, firstName: '', lastName: ''
            })
        }
    }


  return (
    loader? (<Spinner/>): (  
        <div className='flex justify-center items-center  lg:w-[40%] md:w-[50%] w-[90%] mx-auto py-[50px] pt-[75px] min-h-screen text-[#FFFFFF99]'>

            <form 
                onSubmit={(e)=>{submitHandler(e)}}
                className='w-full'
            >
                <fieldset className='border-2 border-[#FFFFFF99] rounded-lg px-5 py-5 pt-2 flex flex-col justify-center gap-5'>
                    <legend className='ml-2 px-2 py-4 text-white text-2xl tracking-wide'>CDC Registration</legend>

                    <div className='flex gap-1 md:flex-row flex-col'>
                        <div  className='flex flex-col'>
                            <label>
                                First Name
                            </label>
                            <input
                            name='firstName'
                            type='text' 
                            placeholder='Enter first name'
                            value= {formData.firstName}
                            onChange={(e)=>{handleOnChange(e)}}
                            className='my-2 rounded-md py-2 px-5 outline-none text-black'
                            />
                        </div>
                        <div  className='flex flex-col'>
                            <label>
                                Last Name
                            </label>
                            <input
                            name='lastName'
                            type='text' 
                            placeholder='Enter last name'
                            value= {formData.lastName}
                            onChange={(e)=>{handleOnChange(e)}}
                            className='my-2 rounded-md py-2 px-5 outline-none text-midBlack'
                            />
                        </div>
                    </div>


                    <div  className='flex flex-col'>
                        <label>
                            Official Email Address
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='email'
                        type='email' 
                        placeholder='Enter email'
                        value= {formData.email}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none text-midBlack'
                        />
                    </div>
                    <div  className='flex flex-col'>
                        <label>
                            Amount
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        readOnly
                        type='number' 
                        value= '3300'
                        className='my-2 rounded-md py-2 px-5 outline-none cursor-no-drop  text-midBlack'
                        />
                    </div>

                    <div>
                        <Button text='Register' type='submit'></Button>
                    </div>

                    <div>
                        Already Done? <Link to='/signup' className='text-[#EF476F]'>Sign up</Link>
                    </div>

                </fieldset>
            </form>


        </div>
    )
  )
}

export default CTC