import { useFormik } from "formik"
import { useDispatch } from "react-redux";
import { setVoting } from "../../redux/reducers/voteSlice";


const CreateVoteSecond = () => {
    const dispatch = useDispatch();
    const validate = (values) => {
     const errors = {};
     if(!values.title){
        errors.title = "Required!";
     }
     if(!values.description){
        errors.description = "Required!";
     }
     if(!values.option1){
        errors.option1 = "Required!";
     }
     if(!values.option2){
        errors.option2 = "Required!";
     }
    }
    const formik = useFormik({
        initialValues:{
            title:'',
            description:'',
            option1:'',
            option2:''
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
            
            dispatch(setVoting(false));
          },
    })
  return (
    <form onSubmit={formik.handleSubmit} style={{marginTop:'50px'}}>
       <div className="form-group vote d-flex align-items-center">
        <label htmlFor="" className="pe-2">Title:</label>
        <input type="text" style={{maxWidth:'50%'}} className="form-control" onChange={formik.handleChange} value={formik.values.title} name="title" id="" />
       </div>
       <div className="form-group vote d-flex " style={{marginTop:'25px'}}>
        <label htmlFor="" className="pe-2">Description:</label>
        <textarea  style={{maxWidth:'50%',resize:'none',minHeight:'267px'}} className="form-control" onChange={formik.handleChange} value={formik.values.description} name="description" id="" />
       </div>
       <div className="form-group vote d-flex " style={{marginTop:'25px'}}>
        <label htmlFor="" className="pe-2">Option 1:</label>
        <input type="text"  style={{maxWidth:'50%'}} className="form-control" onChange={formik.handleChange} value={formik.values.option1} name="option1" id="" />
       </div>
       <div className="form-group vote d-flex " style={{marginTop:'25px'}}>
        <label htmlFor="" className="pe-2">Option 2:</label>
        <input type="text"  style={{maxWidth:'50%'}} className="form-control" onChange={formik.handleChange} value={formik.values.option2} name="option2" id="" />
       </div>
       <div className="col-lg-12">
          <div className="d-flex create-dao-button justify-content-end gap-3" >
          
            <button type="submit" className="submit">
              Create Voting
            </button>
          </div>
          </div>
    </form>
  )
}

export default CreateVoteSecond