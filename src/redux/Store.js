import { configureStore } from '@reduxjs/toolkit'
import loaderSlice from './slices/Loader'
import profileSlice from './slices/profile'
import tokenSlice from './slices/Token'

export const store = configureStore({
  reducer: {
    loader: loaderSlice,
    profile: profileSlice,
    token: tokenSlice
  },
})