import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  size: '',
  toppings: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  },
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField(state, action) {
      const { name, value } = action.payload

      if (Object.keys(state.toppings).includes(name)) {
        state.toppings[name] = value
      } else {
        state[name] = value
      }
    },
    resetForm() {
      return initialState
    },
  },
})

export const { updateField, resetForm } = formSlice.actions
export default formSlice.reducer
