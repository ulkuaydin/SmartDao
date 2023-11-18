import { useDispatch, useSelector } from "react-redux";

const StepFour = () => {
  const allData = useSelector((state) => state.form);
  console.log(allData);
  return (
    <div>StepFour</div>
  )
}

export default StepFour