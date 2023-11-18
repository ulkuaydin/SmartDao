import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import SmartDaoService from "../../utils/smartDaoService"
import metamaskService from "../../utils/metamaskService";
import Web3 from "web3";



const initialState = {
    success:false,
     value:[]
}

export const getDao = createAsyncThunk('dao/getDao',async()=>{

       const web3 = new Web3(window.ethereum);
       const newService = new SmartDaoService("0xb00A7CD04b0d005702aFC4f5ccB3671E0F5bF512",web3,metamaskService.getAccount());
     const dao = newService.getDAOs().then(response=>{
       console.log(response);
        return response;
       })
      
       return dao;
   
})

export const daoSlice = createSlice({
    name:'dao',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getDao.pending,(state)=>{
          state.success = false
        })
        builder.addCase(getDao.fulfilled,(state,action)=>{
         console.log(action.payload);
            state.success = true,
            state.value = action.payload;
           
            
        })
        builder.addCase(getDao.rejected,(state)=>{
            state.success = false
        })
    }
})

export default daoSlice.reducer;