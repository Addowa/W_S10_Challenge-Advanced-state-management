import { configureStore } from '@reduxjs/toolkit'
import formReducer from './formSlice'
import { pizzaApi } from './apiSlice'
import filterReducer from './filterSlice'

export const createStore = () => 
  configureStore({
    reducer: {
      form: formReducer,
      [pizzaApi.reducerPath]: pizzaApi.reducer,
      filter: filterReducer,
    },
    middleware: (getDefault) => getDefault().concat(
      pizzaApi.middleware
    ),
})
export const store = createStore()
export const resetStore = createStore
export default store
