import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    index:0,
    daoName :'',
    votingType:'',
    generalVotingOpener:'',
    generalVoter:'',
    voterType:'',
    treasuryVotingOpener:'',
    treasuryVoter:'',
    treasuryVoterType:'',
    treasuryVotingType:'',
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
            state.generalVotingOpener = action.payload.address;
            state.voterType = action.payload.voterType;
        },
        setStateThree:(state,action)=>{
            state.index += 1;
            state.generalVoter = action.payload.address;
            state.votingType = action.payload.voterType;
        },
        setStateFour:(state,action)=>{
            state.index +=1;
            state.treasuryVotingOpener = action.payload.address;
            state.treasuryVotingType = action.payload.voterType;
        },
        setStateFive:(state,action)=>{
            state.index += 1;
            state.treasuryVoter = action.payload.address;
            state.treasuryVoterType = action.payload.voterType;
        }
    }
})

export const { setIndex,setStateOne, setStateTwo,setStateThree,setStateFour,setStateFive} = formSlice.actions;
export default formSlice.reducer;