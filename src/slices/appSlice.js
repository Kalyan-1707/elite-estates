import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: "en"
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLanguage } = appSlice.actions

export default appSlice.reducer