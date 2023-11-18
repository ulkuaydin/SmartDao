import { useDispatch, useSelector } from "react-redux";
import MetaMaskService from "../../utils/metamaskService";
import {
  getWallet,
  setUser,
  setUserAccount,
} from "../../redux/reducers/userSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  const connectWallet = async () => {
    const connectResponse = await MetaMaskService.connectToMetaMask();
    if (connectResponse.success) {
      dispatch(setUser(connectResponse));
      console.log(connectResponse);

      MetaMaskService.registerAccountsChangedListener((accounts) => {
        console.log("accountsChanged", accounts); //TODO delete
        if (accounts.length > 0) {
          dispatch(setUserAccount(accounts[0]));
        } else {
          dispatch(setUserAccount(null));
        }
      });

      MetaMaskService.registerChainChangedListener((chains) => {
        console.log("ChainChanged", chains); //TODO delete
      });
    }
  };


  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="d-flex justify-content-between h-100">
            <div className="logo">
              <img src="src/assets/react.svg" alt="..." />
            </div>
           <div>{user.account}</div>

            <div className="wallet">
              <button type="button" onClick={connectWallet}>
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
