import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/reducers/userSlice';


export const store = configureStore({
    reducer:{
        user:userSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})