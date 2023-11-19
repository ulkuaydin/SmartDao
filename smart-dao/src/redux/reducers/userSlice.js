import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import MetaMaskService from "../../utils/metamaskService";
import Web3 from "web3";


const initialState = {
    success:false,
    account:'',
    web3:null,
}
export const getWallet = createAsyncThunk('user/getWallet',async ()=>{
   
    // const connectResponse = await MetaMaskService.connectToMetaMask();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const connectResponse = {
        success:false,
        account:'',
        web3:null,
    }
    connectResponse.success = accounts.length > 0 ? true : false;
    connectResponse.account = accounts[0];
    connectResponse.web3 = await web3;

    if (connectResponse.success) {
 
    // dispatch(setUser(connectResponse));
  
      

      MetaMaskService.registerAccountsChangedListener((accounts) => {
        console.log('accountsChanged', accounts);//TODO delete 
        if (accounts.length > 0) {
    
        // dispatch(setUserAccount(accounts[0]));
        return accounts[0];
        } else {
        // dispatch(setUserAccount(null));
        return null;
        }
      });

      MetaMaskService.registerChainChangedListener((chains) => {
        var chainId =parseInt( chains, 16);
        console.log('ChainChanged', parseInt( chains, 16));//TODO delete 

        window.location.reload();

        
      });
      console.log('slice',connectResponse);
      return connectResponse;

    }
})


export const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        // getUser:(state)=>{
        //     state;
        // },
        setUser:(state,payload)=>{
            state.success = payload.success;
            state.account = payload.account;
            state.web3 = payload.web3;

        },
        setUserAccount:(state,payload)=>{
            state.account = payload;
        }
    },
    extraReducers:(builder) =>{
    builder.addCase(getWallet.pending,(state)=>{
        console.log('pending');
        state.success = false;
    })
    builder.addCase(getWallet.fulfilled,(state,action)=>{
        console.log('fulfilled');
        state.account = action.payload.account;
        state.success = true;
        state.web3 = action.payload.web3;
        console.log('fullfulled state ',action.payload.account);
    })
    builder.addCase(getWallet.rejected,(state)=>{
        console.log('rejected');
        state.success = false;
    })
    }
})


export const {getUser,setUser,setUserAccount}=userSlice.actions;
export default userSlice.reducer;