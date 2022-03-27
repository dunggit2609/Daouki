import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AUTH from "constant/auth";
import authApi from "core/API/authApi";

export const registerSlice = createAsyncThunk(
  "auth/register",
  async () => {
    
    const rs = await authApi.register();
    if (!rs || !rs.success) {
      return
    }
    localStorage.setItem(AUTH.STORAGE_KEY, rs);
    return rs.data;
  }
);

export const loginGetUserInforSlice = createAsyncThunk(
  "auth/loginUser",
  async () => {
    const rs = await authApi.loginGetToken();

    localStorage.setItem(AUTH.STORAGE_KEY, rs);
    return rs;
    //save expired at
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    current: localStorage.getItem(AUTH.STORAGE_KEY) || {},
  },
  reducers: {},
  extraReducers: {
    [registerSlice.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginGetUserInforSlice.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
