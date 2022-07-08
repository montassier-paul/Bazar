import { createSlice } from '@reduxjs/toolkit'

// Slice to reload sidebar and topbar when profile updated, user followed
export const loaderSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false
  },
  reducers: {
    // state to reload topbar and sidebar data
    load: state => {
      state.value = true
    },
    loaded: state => {
      state.value = false
    },

  }
})


export const { load, loaded } = loaderSlice.actions

export default loaderSlice.reducer
