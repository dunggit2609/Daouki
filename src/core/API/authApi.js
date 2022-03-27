import axiosClient from "./axiosClient";

const authURL = "/v1/auth";
const authApi = {
  register() {
    const uri = `${authURL}/1`;
    return axiosClient.get(uri);
  },
  loginGetToken() {
    const uri = `${authURL}/1`;
    return axiosClient.get(uri);
  },
};

export default authApi;
