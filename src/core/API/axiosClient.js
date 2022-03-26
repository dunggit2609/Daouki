import axios from "axios";
import AUTH from "constant/auth";
import { useFeatureOfMenu } from 'hooks/useFeatureOfMenu';
import { _LIST_LINK } from 'constant/config';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {},
});

const refreshToken = () => {
  const customHeaders = {};
  const header_token_name = AUTH.HEADER_TOKEN_NAME;
  const accessToken = localStorage.getItem(AUTH.TOKEN_KEY);
  customHeaders[header_token_name] = accessToken;
  return new Promise((resolve) => {
    resolve(
      axios.get("https://myw-project.herokuapp.com/api/auth/token", {
        headers: { ...customHeaders },
      })
    );
  });
};
let refreshTokenRequest = null;
const configToken = async () => {
  const now = new Date();
  const localExpiredTime = localStorage.getItem(AUTH.EXPIRED_TOKEN);
  const expiredTime = new Date(localExpiredTime);
  const isTokenExpired =
    localExpiredTime !== null && now >= expiredTime ? true : false;
  if (isTokenExpired) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshToken();
    const data = await refreshTokenRequest;
    refreshTokenRequest = null;
    const newToken = data.data.content.token;
    const newTimeExpired = data.data.content.timeExpired;
    localStorage.setItem(AUTH.TOKEN_KEY, newToken);
    localStorage.setItem(AUTH.EXPIRED_TOKEN, newTimeExpired);
  }
  return;
};
// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};
  configToken();
  const header_token_name = AUTH.HEADER_TOKEN_NAME;
  const accessToken = `Bearer ${localStorage.getItem(AUTH.TOKEN_KEY)}`;
  if (!!accessToken) {
    customHeaders[header_token_name] = accessToken;
  }
  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    //parse error
    // const { config, status, data } = error.response;
    const URLS = {}; // link URLS apply this handle err
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(AUTH.STORAGE_KEY);
        localStorage.removeItem(AUTH.TOKEN_KEY);
        localStorage.removeItem(AUTH.EXPIRED_TOKEN);
        window.location.replace(_LIST_LINK.index);
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
