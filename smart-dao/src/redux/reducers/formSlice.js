import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    index:0,
    daoName :'',
    votingOpener:'',
    voter:'',
    treasuryVotingOpener:'',
    treasuryVoter:'',
    logoURL:'',
    daoWebsite:''
}

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setIndex:(state)=>{
          state.index += 1;
        },
        setStateOne:(state,action)=>{
            state.index += 1;
            state.daoName = action.payload.daoName;
            state.logoURL = action.payload.daoImage;
            state.daoWebsite = action.payload.daoWebsite;
        },
        setStateTwo:(state,action)=>{
            state.index += 1;
            state.votingOpener = action.payload.address;
            state.treasuryVotingOpener = action.payload.address;
        },
        setStateThree:(state,action)=>{
            state.index += 1;
            state.voter = action.payload.address;
            state.treasuryVoter = action.payload.address;
        }
    }
})

export const { setIndex,setStateOne, setStateTwo,setStateThree} = formSlice.actions;
export default formSlice.reducer;