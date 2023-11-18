import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Web3 from "web3";
import { useState } from "react";
import SmartDaoService from "../../utils/smartDaoService";

const DaoDetail = () => {
  const { id } = useParams();
  useEffect(() => {}, []);
  const [account, setAccounts] = useState(null);

  useEffect(() => {
    // Create an instance of Web3
    const web3 = new Web3(window.ethereum);

    // Fetch the accounts
    web3.eth
      .getAccounts()
      .then((accounts) => {
        let newService = new SmartDaoService(
          "0xb00A7CD04b0d005702aFC4f5ccB3671E0F5bF512", //TODO get this from app consntan or use service singleton
          web3,
          accounts[0]
        );

        newService.getDAOs(id).then((dao) => {
          // Update the state with the fetched accounts
          if (dao ==null){
            return;
          }
          setAccounts(dao);
        });
      })
      .catch((error) => {
        // Handle errors, such as if the user has not enabled MetaMask
        console.error("Error fetching accounts:", error);
      });
  }, []); // The empty array as the second argument ensures this runs once on mount
console.log('connected account',account);
  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-3">
          <div
            className="dao d-flex align-items-center flex-column"
            style={{ minHeight: "auto" }}
          >
            <div className="discover-dao-item d-flex flex-column align-items-center">
              <div className="logo d-flex align-items-center justify-content-center">
                <span>{account?.daoName.slice(0,2)}</span>
              </div>
              <h6
                className="text-center mt-2"
                style={{ fontWeight: "700", fontSize: "25px" }}
              >
                { account?.daoName }
              </h6>
            </div>

            <div className="dao-detail-favourite d-flex gap-3">
              <Link to={"/"}>
                {" "}
                <img src="/public/world.svg" alt="..."></img>
              </Link>
              <button type="button" className="p-0">
                <img src="/public/star.svg"></img>
              </button>
            </div>
            <h6
              className="text-center"
              style={{ fontWeight: "700", fontSize: "25px", marginTop: "50px" }}
            >
              Contracts
            </h6>
            <ul
              className="dao-detail-contract-list p-0"
              style={{ marginTop: "27px" }}
            >
              <li className="text-center" style={{ paddingBottom: "30px" }}>
                <span>General Voting Contract</span>
              </li>
              <li className="text-center">
                <span>Treasury Voting Contract</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="dao">
            <div className="col-lg-12">
              <div className="w-100 d-flex justify-content-between">
                <h5 className="dao-detail-vote-title mb-0">Votings</h5>
                <button type="button" className="p-0">
                  <img src="/vote.svg" alt="" />
                </button>
              </div>
            </div>
            <div className="dao-vote-list">
              <div className="dao-vote-item">
                <div className="dao-vote-item-header d-flex justify-content-between w-100">
                  <h6 className="mb-0">General Voting Title</h6>
                  <span className="green">Open</span>
                </div>
                <div className="dao-vote-item-body mt-3">
                  <p className="description">
                    Voting description will be placed here, voting description
                    will be placed here but we will use this sentence for now as
                    a placeholder, because why not blablah haha haha...
                  </p>
                  <div className="choices">
                    <div className="choices-item align-items-center  mb-3">
                      <div className="row align-items-center ">
                        <div className="col-lg-3">
                          <div className="form-check">
                            <input
                              type="radio"
                              className="input-checkbox"
                            ></input>
                            <label htmlFor="" className="ms-2">
                              Option One
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="progress-choice position-relative"></div>
                        </div>
                      </div>
                    </div>
                    <div className="choices-item align-items-center  mb-3">
                      <div className="row align-items-center">
                        <div className="col-lg-3">
                          <div className="form-check">
                            <input
                              type="radio"
                              className="input-checkbox"
                            ></input>
                            <label htmlFor="" className="ms-2">
                              Option One
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="progress-choice position-relative"></div>
                        </div>
                      </div>
                    </div>
                    <div className="choices-item align-items-center  mb-3">
                      <div className="row align-items-center">
                        <div className="col-lg-3">
                          <div className="form-check">
                            <input
                              type="radio"
                              className="input-checkbox"
                            ></input>
                            <label htmlFor="" className="ms-2">
                              Option One
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="progress-choice position-relative"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 text-end">
                    <span className="date">Ends on 19.11.2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoDetail;
