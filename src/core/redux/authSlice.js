import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AUTH from "constant/auth";
import authApi from "core/API/authApi";

export const registerSlice = createAsyncThunk(
  "auth/register",
  async (payload) => {
    
    const rs = await authApi.register(payload);
    if (!rs || !rs.success) {
      return
    }
    localStorage.setItem(AUTH.TOKEN_KEY, rs.data.token);
    const timeExpired = new Date(`${rs.data.expired_time} UTC+07:00`)
    localStorage.setItem(AUTH.EXPIRED_TOKEN, timeExpired.toString());
    localStorage.setItem(AUTH.STORAGE_KEY, rs.data.user_id);
    return rs.data;
  }
);
export const loginGetTokenSlice = createAsyncThunk(
  "auth/loginToken",
  async (payload) => {
    const rs = await authApi.loginGetToken(payload);
    if (!rs || !rs.success) {
      return
    }

    localStorage.setItem(AUTH.TOKEN_KEY, rs.data.token);
      const timeExpired = new Date(`${rs.data.timeExpired} +07:00 UTC`);
    localStorage.setItem(AUTH.EXPIRED_TOKEN, timeExpired.toString());
  }
);
export const loginGetUserInforSlice = createAsyncThunk(
  "auth/loginUser",
  async () => {
    const rs = await authApi.loginGetUserInfo();
    if (!rs || !rs.success) {
      return
    }
    localStorage.setItem(AUTH.STORAGE_KEY, rs.data.user_id);
    return rs.data;
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
