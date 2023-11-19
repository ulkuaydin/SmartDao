import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/reducers/userSlice';
import  daoSlice  from './redux/reducers/daoSlice';
import formSlice from './redux/reducers/formSlice';
import voteSlice from './redux/reducers/voteSlice';



export const store = configureStore({
    reducer:{
        user:userSlice,
        dao:daoSlice,
        form:formSlice,
        vote:voteSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})