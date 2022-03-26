import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: false,
  reducers: {
   displaySpinner (state) {
      return state = true;
    },
    hideSpinner(state) {
      return state = false;
    },
  },
});

const { actions, reducer } = spinnerSlice;
export const { displaySpinner, hideSpinner } = actions;
export default reducer;
