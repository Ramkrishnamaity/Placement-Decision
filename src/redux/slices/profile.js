import { createSlice } from '@reduxjs/toolkit'


export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')): null,
    },
    reducers:{
        setUser(state, action) {
            state.user = action.payload
        },
    }
})

export const { setUser } = profileSlice.actions

export default profileSlice.reducer