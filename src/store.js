import { configureStore } from '@reduxjs/toolkit'
import propertyReducer from './slices/propertySlice.js'

export const store = configureStore({
  reducer: {
    property: propertyReducer,
  },
})