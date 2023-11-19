import { useSelector } from "react-redux";
import SmartDaoService from "../../utils/smartDaoService";
import Web3 from "web3";


const StepSix = () => {
      const allData = useSelector((state) => state.form);
      const user = useSelector((state)=>state.user);
    //   const dispatch = useDispatch();

  const createDao = async ()=>{
    try {
          const web3 = new Web3(window.ethereum);
     
        const daoService = new SmartDaoService("0xb00A7CD04b0d005702aFC4f5ccB3671E0F5bF512", web3,user.account);
  
  
  
  
        // Begin listening for DaoCreated events
        daoService.listenToDaoCreated((eventData) => {
         
        });
  
        const tx = await daoService.createDao(
          allData.daoName, //daoName, 
           allData.generalVotingOpener, //votingOpener, 
          allData.generalVoter, //voter, 
          allData.treasuryVotingOpener, //treasuryVotingOpener, 
          allData.treasuryVoter, //treasuryVoter, 
          allData.logoUrl,//logoURL, 
          allData.daoWebsite//daoWebsite
        );
  
  
        alert('Transaction sent ' + tx);
 
  
      } catch (error) {
        console.log('Error getting USDT balance:', error);
      }
  }
  return (
    <div className="create-dao-preview-page">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex w-100 justify-content-center">
            <div className="logo d-flex align-items-center justify-content-center">
              <span>{allData.daoName.slice(0, 2)}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3">
          <div className="d-flex w-100 justify-content-center">
            <span className="left" style={{paddingRight:'10px'}}>Dao Name:</span><p className="right mb-0">{allData.daoName}</p>
          </div>
        </div>
        <div className="col-lg-12 mt-3">
        <div className="d-flex w-100 justify-content-center">
            <span className="left" style={{paddingRight:'10px'}}>Dao Website:</span><p className="right mb-0">{allData.daoWebsite}</p>
          </div>
        </div>
        <div className="col-lg-6 mt-3">
             <h6 className="text-center">General Voting Contract</h6>
             <h6 className="text-center">{allData.votingType.toUpperCase()} holders can open a voting. </h6>
             <div className="form-group d-flex justify-content-center" style={{maxWidth:'100%'}}>
                <label htmlFor="" style={{paddingRight:'1rem'}}>{allData.votingType} Address:</label>
                <input type="text" className="form-control" style={{maxWidth:'50%'}}  value={allData.generalVotingOpener}></input>
             </div>
             <h6 className="text-center" style={{marginTop:'30px'}}>{allData.voterType.toUpperCase()} holders can vote. </h6>
             <div className="form-group d-flex justify-content-center" style={{maxWidth:'100%'}}>
                <label htmlFor="" style={{paddingRight:'1rem'}}>{allData.voterType} Address:</label>
                <input type="text" className="form-control" style={{maxWidth:'50%'}}  value={allData.generalVoter} readOnly></input>
             </div>
        </div>
        <div className="col-lg-6 mt-3">
             <h6 className="text-center">Treasury Voting Contract</h6>
             <h6 className="text-center">{allData.treasuryVotingType.toUpperCase()} holders can open a voting. </h6>
             <div className="form-group d-flex justify-content-center" style={{maxWidth:'100%'}}>
             <label htmlFor="" style={{paddingRight:'1rem'}}>{allData.treasuryVoterType} Address:</label>
             <input type="text" className="form-control" style={{maxWidth:'50%'}} value={allData.treasuryVotingOpener} readOnly></input>
             </div>
             <h6 className="text-center" style={{marginTop:'30px'}}>{allData.treasuryVoterType.toUpperCase()} holders can vote. </h6>
             <div className="form-group d-flex justify-content-center" style={{maxWidth:'100%'}}>
                <label htmlFor="" style={{paddingRight:'1rem'}}>{allData.voterType} Address:</label>
                <input type="text" className="form-control" style={{maxWidth:'50%'}}  value={allData.treasuryVoter} readOnly></input>
             </div>
        </div>
        <div className="col-lg-12 text-center mt-3">
            <button className="submit" type="button" onClick={createDao}>Create Dao</button>
        </div>
      </div>
    </div>
  )
}

export default StepSix