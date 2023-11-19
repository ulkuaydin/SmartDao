import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    index:0,
    isVoting:false
}

export const voteSlice = createSlice({
    name:'vote',
    initialState,
    reducers:{
        setVoteIndex:(state)=>{
            state.index +=1;
        },
        setVoting(state,action){
            state.isVoting = !state.isVoting;
        }
    }
})

export const {setVoteIndex,setVoting} = voteSlice.actions;
export default voteSlice.reducer;