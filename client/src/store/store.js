import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice.js'
export const appStore = configureStore({
    reducer:{
        auth:authReducer,
    }
})