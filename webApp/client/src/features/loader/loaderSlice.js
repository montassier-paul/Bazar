import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false
  },
  reducers: {
    load: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    loaded: state => {
      state.value = false
    },

  }
})

// Action creators are generated for each case reducer function
export const { load, loaded } = loaderSlice.actions

export default loaderSlice.reducer
