import { createSlice } from '@reduxjs/toolkit'


export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        loading: false
    },
    reducers:{
        setUser(state, action) {
            state.user = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
    }
})

export const { setLoading, setUser } = profileSlice.actions

export default profileSlice.reducer