import axios from "axios";
// let token = localStorage.getItem("session_token");
// let latest_refresh_token = localStorage.getItem("refresh_token");
// let clientKey = "UTBOMmJBLVlRZ1dJODgwN2xNNTVHUGpOQm9Ycmh2c2FSRWNrLTZXTG4waw=="
const baseURL = process.env.VUE_APP_API_BASE_URL
const maxTimeOut = 120000;
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : baseURL
  , timeout: maxTimeOut
});


//Request interceptor for API calls
API.interceptors.request.use(
  async config => {
    config.headers = {
      'Accept': 'application/json',
      'api-key': 'eyJpZCI6IjciLCJuYW1lIjoic2Nvb3Bfd2ViX2FwcHMifQ', // allow
    //   'Authorization': `${clientKey}`,
    //   'x-access-token': token
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });
//let refreshing_token = null;
API.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    try {

    //   originalRequest._retry = true;
    //   const { refresh_token, access_token } = refreshing_token ? refreshing_token : await refreshAccessToken()
    //   refreshing_token = null;
    //   API.defaults.headers.common['x-access-token'] = access_token
    //   localStorage.removeItem("session_token")
    //   localStorage.removeItem("refresh_token")
    //   localStorage.setItem("refresh_token", refresh_token ? refresh_token : latest_refresh_token);
    //   localStorage.setItem("session_token", access_token);
    //   token = access_token;
    //   latest_refresh_token = refresh_token;
      return API(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  } else if (error.response.status === 403) {
    let err = error.response
    return Promise.reject(err);
  } else {
    return Promise.reject(error);
  }
});


export default API;
