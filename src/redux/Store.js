import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './slices/auth'
import profileSlice from './slices/profile'

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    profile: profileSlice
  },
})