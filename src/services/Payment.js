import { setLoader } from '../redux/slices/Loader'
import { toast } from 'react-toastify'
import { apiConnector } from './apiConnector'
import { endpoints } from './apis'



const {INITIATE_ORDER, VERIFY_PAYMENT, PAYMENT_SUCCESS_EMAIL} = endpoints



async function sendPaymentSuccessEmail(response, amount, email){
    try{
        const {data} = await apiConnector("POST", PAYMENT_SUCCESS_EMAIL, {...response, amount, email})
        if(!data.success){
            toast.error(data.message)
        }
    } catch(error){
        console.log(error.message)
    }
}


async function verifyPayment(response, email, dispatch, navigate){
    try{
        const {data} = await apiConnector("POST", VERIFY_PAYMENT, {...response, email})
        if(!data.success){
            toast.error(data.message)
        }
    } catch(error){
        dispatch(setLoader(false))
        console.log(error.message)
    }
}


function loadSDK(src){
    return new Promise((resolve)=>{
        const script = document.createElement('script')
        script.src = src
        script.onload = ()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function payment(formData, dispatch, navigate){
    try{
        // order initiate
        const orderResponse = await apiConnector("POST", INITIATE_ORDER, formData ) 
        if(!orderResponse.data.success){
            dispatch(setLoader(false))
            // error toast message
            toast.error(orderResponse.data.message)
            return
        }

        // load razorpay sdk
        const flag = await loadSDK("https://checkout.razorpay.com/v1/checkout.js")
        if (!flag) {
            toast.error(
              "Razorpay SDK failed to load. Check your Internet Connection."
            )
            dispatch(setLoader(false))
            return
        }

        // create modal
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "Placement Decision",
            description: "Thank you for join us.",
            image: "https://res.cloudinary.com/dtguuc4py/image/upload/v1693050712/PlacementDecision/companyLogo/ov0o6cev3zuwhv3c4ztw.png",
            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
            },
            handler: function (response) {
              sendPaymentSuccessEmail(response, orderResponse.data.data.amount, formData.email)
              verifyPayment(response, formData.email ,dispatch, navigate)
            },
          }

          const razorpayModal = new window.Razorpay(options)
          razorpayModal.open()

          razorpayModal.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.")
          })
          
          dispatch(setLoader(false))

    } catch(error){
        dispatch(setLoader(false))
        // toast
        toast.error("Network Issue on payment")
        console.log(error.message)
    }
}

