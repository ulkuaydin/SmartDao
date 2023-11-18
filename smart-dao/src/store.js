import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/reducers/userSlice';
import  daoSlice  from './redux/reducers/daoSlice';
import formSlice from './redux/reducers/formSlice';



export const store = configureStore({
    reducer:{
        user:userSlice,
        dao:daoSlice,
        form:formSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})