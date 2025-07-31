import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOn: false,
}

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOn = !state.isOn
    },
  },
})

export const { toggle } = toggleSlice.actions
export default toggleSlice.reducer
