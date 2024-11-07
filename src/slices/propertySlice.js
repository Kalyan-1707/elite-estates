import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  results: [],
  property: {},
  favorites: [],
}

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload
    },
    setProperty: (state, action) => {
      state.property = action.payload
    },
    setFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setResults, setProperty, setFavorites, updatePropertyFavorite } = propertySlice.actions

export default propertySlice.reducer