import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setIndex } from "../../redux/reducers/formSlice";

const StepOne = () => {

    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = {};
        if (!values.daoName) {
          errors.daoName = "Required";
        }
    
        if (!values.daoImage) {
          errors.daoImage = "Required";
        }
    
        if (!values.daoWebsite) {
          errors.daoWebsite = "Required";
        }
    
        return errors;
      };
    
      const formik = useFormik({
        initialValues: {
          daoName: "",
          daoImage: "",
          daoWebsite: "",
        },
        validate,
        onSubmit: (values) => {
          console.log(values);
          dispatch(setIndex());
        },
      });
    
  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="form-group  mb-4">
      <div className="row ">
        <div className="col-lg-4 text-end">
          <label htmlFor="">Dao Name:*</label>
        </div>
        <div className="col-lg-8">
          <input
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.daoName}
            placeholder="Enter DAO Name"
            name="daoName"
            id="daoName"
          />
        </div>
      </div>
    </div>
    <div className="form-group  mb-4">
      <div className="row">
        <div className="col-lg-4 text-end">
          <label htmlFor="">Dao Image:</label>
        </div>
        <div className="col-lg-8">
          <input
            type="text"
            className="form-control"
            name="daoImage"
            id="daoImage"
            placeholder="Enter image url"
            onChange={formik.handleChange}
            value={formik.values.daoImage}
          />
        </div>
      </div>
    </div>
    <div className="form-group  mb-4">
      <div className="row">
        <div className="col-lg-4 text-end">
          <label htmlFor="">Dao Website:</label>
        </div>
        <div className="col-lg-8">
      
          <input
            type="text"
            className="form-control"
            name="daoWebsite"
            id="daoWebsite"
            placeholder="Enter website url"
            onChange={formik.handleChange}
            value={formik.values.daoWebsite}
          />
        </div>
      </div>
    </div>
    <div className="form-required">
      <span>Fields marked with '*' are required</span>
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
  )
}

export default StepOne