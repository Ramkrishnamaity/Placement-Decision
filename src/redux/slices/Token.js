import { createSlice } from '@reduxjs/toolkit'


export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")): null,
        signupData: null
    },
    reducers:{
        setToken: (state, action)=>{
            state.value = action.payload;
        },
        setSignupData: (state, action)=>{
            state.signupData = action.payload;
        }
    }
})

export const { setToken, setSignupData } = tokenSlice.actions

export default tokenSlice.reducer