
import StepOne from "./StepOne";
import { useSelector } from "react-redux";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const CreateDao = () => {
  const index = useSelector((state)=>state.form.index);
  const step = ()=>{
    switch (index) {
        case 0:
            return <StepOne/>
            
         case 1:
            return <StepTwo/>

        case 2:
            return <StepThree/>
            

        default:
            break;
      }
  }
  return (
    <div className="container">
      <div className="dao" id="dao">
        <div className="create-dao">
          <h6 className="create-dao-title">Create Dao</h6>
          <div className="create-dao-form">
            <div className="progress-bar"></div>
           {step()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDao;
