import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    index:0,
}

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setIndex:(state)=>{
          state.index += 1;
        }
    }
})

export const { setIndex } = formSlice.actions;
export default formSlice.reducer;