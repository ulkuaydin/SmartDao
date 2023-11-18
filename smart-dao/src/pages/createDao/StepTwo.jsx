import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setStateTwo } from "../../redux/reducers/formSlice";
import Web3 from "web3";
import SmartDaoService from "../../utils/smartDaoService";
import metamaskService from "../../utils/metamaskService";
import { useState } from "react";

const Modal = ({ isOpen, toggleModal, contractAddress, dispatch }) => {
  if (!isOpen) return null;

  return (
    <div
      className={isOpen ? "modal fade show d-block" : "modal fade d-none"}
      style={{ background: "rgba(14, 14, 14, 0.94)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header justify-content-end border-bottom-0">
            <button type="button" className="p-0" onClick={toggleModal}>
              <img src="src/assets/close-square.svg" alt="..."></img>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-4">
                <img src="src/assets/coin.svg"></img>
              </div>
              <div className="col-lg-8">
                <div className="px-3">
                  <span className="address">A new address is created.</span>

                  <input
                    className="mt-4 form-control"
                    type="text"
                    value={contractAddress}
                    readOnly
                  ></input>

                  <p className="address mt-3">
                    You can share this token address for others to join your
                    DAO.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer text-center border-top-0">
            <button type="button" className="submit" onClick={toggleModal}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    const element = document.getElementById("dao");
    console.log("element", element);
    element.style.display = isModalOpen ? "block" : "contents";
  };

  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (values.voterType === "token") {
      if (values.haveToken === "yes") {
        if (!values.address) {
          errors.address = "Required";
        }
      } else {
        if (!values.tokenName) {
          errors.tokenName = "Required";
        }
        if (!values.tokenSymbol) {
          errors.tokenSymbol = "Required";
        }
        if (!values.tokenSupply) {
          errors.tokenSupply = "Required";
        }
      }
    } else {
      if (values.haveNft === "yes") {
        if (!values.address) {
          errors.address = "Required";
        }
      } else {
        if (!values.nftName) {
          errors.nftName = "Required";
        }
        if (!values.nftSymbol) {
          errors.nftSymbol = "Required";
        }
        if (!values.nftSupply) {
          errors.nftSupply = "Required";
        }
      }
    }
    console.log("validate errors", errors,values);
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      voterType: "",
      haveToken: "",
      haveNft: "",
      address: "",
      tokenName: "",
      tokenSupply: "",
      nftName: "",
      nftSymbol: "",
      nftSupply: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("ONSUBMIT", values);
      if (
        values.address === "" &&
        (values.haveNft === "no" || values.haveToken === "no")
      ) {
        let web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log("get account", metamaskService.getAccount());
        let newService = new SmartDaoService(
          "0xb00A7CD04b0d005702aFC4f5ccB3671E0F5bF512", //TODO get this from app consntan or use service singleton
          web3,
          accounts[0]
        );

        if (values.voterType === "token") {
          // Begin listening for DaoCreated events
          newService.listenToERC20Created((eventData) => {
            console.log("New ERC20 Created:", eventData._contractAddress);
            setContractAddress(eventData._contractAddress);

            //Set values
            values.haveToken = "yes";
            values.address = eventData._contractAddress;

            toggleModal();
          });

          newService.createDefaultERC20(
            values.tokenName,
            values.tokenSymbol,
            values.tokenSupply
          );
        } else {
          newService.listenToERC721Created((eventData) => {
            console.log("New ERC20 Created:", eventData._contractAddress);
            setContractAddress(eventData._contractAddress);

            //Set values
            values.haveNft = "yes";
            values.address = eventData._contractAddress;

            toggleModal();
          });

          newService.createDefaultERC721(
            values.nftName,
            values.nftSymbol,
            values.nftSupply
          );
        }
      } else {
        console.log("next2");
        dispatch(setStateTwo(values));
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h5 className="question">Who can open a voting?</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="voterType"
            value="token"
            onChange={formik.handleChange}
            checked={formik.values.voterType === "token"}
            id=""
          />
          <label htmlFor="" className="question-label">
            Token Holders
          </label>
          {formik.values.voterType === "token" ? (
            <>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="haveToken"
                  value="yes"
                  onChange={formik.handleChange}
                  checked={formik.values.haveToken === "yes"}
                  id=""
                />
                <label htmlFor="" className="question-label">
                  I have a token
                </label>
                {formik.values.haveToken === "yes" ? (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter token address"
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      style={{ maxWidth: "290px" }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="haveToken"
                  value="no"
                  onChange={formik.handleChange}
                  checked={formik.values.haveToken === "no"}
                  id=""
                />
                <label htmlFor="" className="question-label">
                  Create token for me
                </label>
                {formik.values.haveToken === "no" ? (
                  <>
                    <div className="form-group d-flex align-items-center gap-2 mb-3 mt-4">
                      <label htmlFor="" style={{ fontSize: "20px" }}>
                        Token Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="tokenName"
                        id=""
                        placeholder="Enter token name"
                        style={{ width: "50%" }}
                        onChange={formik.handleChange}
                        value={formik.values.tokenName}
                      />
                    </div>
                    <div className="form-group d-flex align-items-center gap-2 mb-3">
                      <label htmlFor="" style={{ fontSize: "20px" }}>
                        Token Symbol:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="tokenSymbol"
                        id=""
                        placeholder="Enter token symbol"
                        style={{ width: "50%" }}
                        onChange={formik.handleChange}
                        value={formik.values.tokenSymbol}
                      />
                    </div>
                    <div className="form-group d-flex align-items-center gap-2 mb-3">
                      <label htmlFor="" style={{ fontSize: "20px" }}>
                        Token Supply:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="tokenSupply"
                        id=""
                        placeholder="Enter token supply"
                        style={{ width: "50%" }}
                        onChange={formik.handleChange}
                        value={formik.values.tokenSupply}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="voterType"
            value="nft"
            onChange={formik.handleChange}
            checked={formik.values.voterType === "nft"}
            id=""
          />
          <label htmlFor="" className="question-label">
            Nft Holders
          </label>
          {formik.values.voterType === "nft" ? (
            <>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="haveNft"
                  value="yes"
                  onChange={formik.handleChange}
                  checked={formik.values.haveNft === "yes"}
                  id=""
                />
                <label htmlFor="" className="question-label">
                  I have a Nft
                </label>
                {formik.values.haveNft === "yes" ? (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter token address"
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      style={{ maxWidth: "290px" }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="haveNft"
                  value="no"
                  onChange={formik.handleChange}
                  checked={formik.values.haveNft === "no"}
                  id=""
                />
                <label htmlFor="" className="question-label">
                  Create Nft for me
                </label>
                {formik.values.haveNft === "no" ? (
                  <>
                    <div className="form-group d-flex align-items-center gap-2 mb-3 mt-4">
                      <label htmlFor="" style={{ fontSize: "20px" }}>
                        Nft Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nftName"
                        id=""
                        placeholder="Enter Nft name"
                        style={{ width: "50%" }}
                        onChange={formik.handleChange}
                        value={formik.values.nftName}
                      />
                    </div>
                    <div className="form-group d-flex align-items-center gap-2 mb-3">
                      <label htmlFor="" style={{ fontSize: "20px" }}>
                        Nft Symbol:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nftSymbol"
                        id=""
                        placeholder="Enter Nft symbol"
                        style={{ width: "50%" }}
                        onChange={formik.handleChange}
                        value={formik.values.nftSymbol}
                      />
                    </div>
                    <div className="form-group d-flex align-items-center gap-2 mb-3">
                      <label htmlFor="" style={{ fontSize: "20px" }}>
                        Nft Supply:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="nftSupply"
                        id=""
                        placeholder="Enter Nft supply"
                        style={{ width: "50%" }}
                        onChange={formik.handleChange}
                        value={formik.values.nftSupply}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-12" style={{ marginTop: "150px" }}>
          <div className="d-flex create-dao-button justify-content-end gap-3">
            <button type="button" className="cancel">
              Cancel
            </button>
            <button type="submit" className="submit">
              Next
            </button>
          </div>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        contractAddress={contractAddress}
        dispatch={dispatch}
      />
    </>
  );
};

export default StepTwo;
