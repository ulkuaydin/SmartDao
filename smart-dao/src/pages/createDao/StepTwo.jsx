import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setIndex } from "../../redux/reducers/formSlice";

const StepTwo = () => {
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.voterType) {
      errors.voterType = "Required";
    }

    return errors;
  };
  const addressValidate = (values)=>{
    const errors = {};
    if(!values.tokenName){
        errors.tokenName = "Required";
    }
    if(!values.tokenSymbol){
        errors.tokenSymbol = "Required";
    }
    if(!values.tokenSupply){
        errors.tokenSupply = "Required"
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      voterType: "",
      haveToken: "",
      haveNft: "",
      address: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      dispatch(setIndex());
    },
  });
  const createAddress = useFormik({
    initialValues:{
        tokenName:"",
        tokenSymbol:"",
        tokenSupply:"",
    },
    addressValidate,
    onSubmit:(values)=>{
        console.log(values);

    }
  })
  return (
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
              {formik.values.haveToken === "yes" ?
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter token address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  style={{maxWidth:'290px'}}
                />
              </div> : ""}
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
              {formik.values.haveToken === "no" ? <><form onSubmit={createAddress.handleSubmit}><div className="form-group d-flex align-items-center gap-2 mb-3 mt-4">
                <label htmlFor="" style={{fontSize:'20px'}}>Token Name:</label>
                <input type="text" className="form-control" name="tokenName" id="" placeholder="Enter token name" style={{width:'50%'}} onChange={createAddress.handleChange} value={createAddress.values.tokenName} />
                </div>
                <div className="form-group d-flex align-items-center gap-2 mb-3">
                <label htmlFor="" style={{fontSize:'20px'}}>Token Symbol:</label>
                <input type="text" className="form-control" name="tokenSymbol" id="" placeholder="Enter token symbol" style={{width:'50%'}} onChange={createAddress.handleChange} value={createAddress.values.tokenSymbol} />
                </div>
                <div className="form-group d-flex align-items-center gap-2 mb-3">
                <label htmlFor="" style={{fontSize:'20px'}}>Token Supply:</label>
                <input type="text" className="form-control" name="tokenSupply" id="" placeholder="Enter token supply" style={{width:'50%'}} onChange={createAddress.handleChange} value={createAddress.values.tokenSupply} />
                </div>
                </form> </>: ""}
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
        {formik.values.voterType === "nft" ? <>
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
              {formik.values.haveNft === "yes" ? 
            <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter token address"
              onChange={formik.handleChange}
              value={formik.values.address}
              style={{maxWidth:'290px'}}
            />
          </div>: ""  
            }
           
          
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
              {formik.values.haveNft === "no" ? <><form onSubmit={createAddress.handleSubmit}><div className="form-group d-flex align-items-center gap-2 mb-3 mt-4">
                <label htmlFor="" style={{fontSize:'20px'}}>Nft Name:</label>
                <input type="text" className="form-control" name="tokenName" id="" placeholder="Enter Nft name" style={{width:'50%'}} onChange={createAddress.handleChange} value={createAddress.values.tokenName} />
                </div>
                <div className="form-group d-flex align-items-center gap-2 mb-3">
                <label htmlFor="" style={{fontSize:'20px'}}>Nft Symbol:</label>
                <input type="text" className="form-control" name="tokenSymbol" id="" placeholder="Enter Nft symbol" style={{width:'50%'}} onChange={createAddress.handleChange} value={createAddress.values.tokenSymbol} />
                </div>
                <div className="form-group d-flex align-items-center gap-2 mb-3">
                <label htmlFor="" style={{fontSize:'20px'}}>Nft Supply:</label>
                <input type="text" className="form-control" name="tokenSymbol" id="" placeholder="Enter Nft supply" style={{width:'50%'}} onChange={createAddress.handleChange} value={createAddress.values.tokenSupply} />
                </div>
                </form> </>: ""}
            </div>
           
        </>:""}
       
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
  );
};

export default StepTwo;
