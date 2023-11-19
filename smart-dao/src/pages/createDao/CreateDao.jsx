import StepOne from "./StepOne";
import { useSelector } from "react-redux";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";

const CreateDao = () => {
  const index = useSelector((state) => state.form.index);
  const step = () => {
    switch (index) {
      case 0:
        return <StepOne />;

      case 1:
        return <StepTwo />;

      case 2:
        return <StepThree />;

      case 3:
        return <StepFour />;
      case 4:
        return <StepFive />;
      case 5:
        return <StepSix />;
      case 6:
        return <StepSeven/>;
        
      default:
        break;
    }
  };
  return (
    <div className="container">
      <div className="dao" id="dao">
        <div className="create-dao">
          <div
            className="d-flex w-100"
            style={
              index === 5 ? { marginBottom: "7px" } : { marginBottom: "56px" }
            }
          >
            <h6
              className="create-dao-title pe-3"
            >
              Create Dao
            </h6>
            {index === 5 ? (
              <span className="create-dao-preview">Preview</span>
            ) : index >= 3 && index < 5 ? (
              <span className="create-dao-preview">
                Treasury Voting Contract
              </span>
            ) : (
              <span className="create-dao-preview">
                General Voting Contract
              </span>
            )}
          </div>
          <div className="create-dao-form">
            <div className={index === 3 ? "d-none" : "progress-bar"}></div>
            {step()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDao;
