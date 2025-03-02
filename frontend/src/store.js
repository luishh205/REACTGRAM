import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import  useReducer from "./slices/UserSlice"
import photoReducer from './slices/PhotoSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: useReducer,
        photo: photoReducer,
    },
});