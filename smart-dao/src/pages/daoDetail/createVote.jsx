import { useFormik } from "formik"
import { useDispatch } from "react-redux";
import { setVoteIndex } from "../../redux/reducers/voteSlice";


const CreateVote = () => {
    const dispatch = useDispatch();
    const validate = (values)=>{
   const errors={}
   if(!values.voteType){
    errors.voteType = "Required";
   }
    }
    const formik = useFormik({
        initialValues: {
          voteType:''
        },
        validate,
        onSubmit: (values) => {
          console.log(values);
         dispatch(setVoteIndex());
        },
      });
  return (
    <form onSubmit={formik.handleSubmit}>
         <h5 className="question mb-2 mt-4">Who can open a voting?</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="voteType"
            value="general"
            onChange={formik.handleChange}
            checked={formik.values.voteType === "general"}
            id=""
          />
          <label htmlFor="" className="question-label">
            General Voting
          </label>
          </div>
          <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="voteType"
            value="treasury"
            onChange={formik.handleChange}
            checked={formik.values.voteType === "treasury"}
            id=""
          />
          <label htmlFor="" className="question-label">
            Treasury Voting
          </label>
          </div>
          <div className="col-lg-12">
          <div className="d-flex create-dao-button justify-content-end gap-3" style={{marginTop:'300px'}}>
            <button type="button" className="cancel">
              Cancel
            </button>
            <button type="submit" className="submit">
              Next
            </button>
          </div>
          </div>
    </form>
  )
}

export default CreateVote