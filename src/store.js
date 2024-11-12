import { configureStore } from '@reduxjs/toolkit'
import propertyReducer from './slices/propertySlice.js'
import appReducer from './slices/appSlice.js'

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    app: appReducer
  },
})