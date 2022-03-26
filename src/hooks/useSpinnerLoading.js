import { displaySpinner, hideSpinner } from "core/redux/spinnerSlice";
import { useDispatch } from "react-redux";

export const UseSpinnerLoading = () => {
  const dispatch = useDispatch();
  const handleDisplaySpinner = (isDisplay) => {
    const action = isDisplay ? displaySpinner() : hideSpinner();

    dispatch(action);
  };

  return { handleDisplaySpinner };
};
