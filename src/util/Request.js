import Axios from "axios";
// import { failAlert } from "./ComponentUtils";
import { API_URL } from "./Constants";
// import { getToken, logout } from "./CredentialUtils";

export const isUnauthorizedErr = err => {
  return err?.response?.status === 401;
};

export const handleError = error => {
  // if (isUnauthorizedErr(error)) {
  //   logout();
  // } else {
  //   failAlert({
  //     text: extractError(error),
  //     toast: true
  //   });
  // }
  throw error;
};

export const extractError = error => {
  return error?.response?.data?.message || error?.message;
};

export const Request = baseURL => {
  return Axios.create({
    baseURL: baseURL || API_URL
  });
};

const getAuthConfig = () => {
  let config = {
    headers: {
      // Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json;charset=utf-8"
    }
  };
  return config;
};

export const AuthRequest = {
  then: promise => {
    if (handleError) {
      promise.catch(err => handleError(err));
    }
    return promise;
  },
  post(URL, data, handleError = true) {
    let config = getAuthConfig();
    return AuthRequest.then(Request().post(URL, data, config), handleError);
  },
  get(URL, handleError = true) {
    let config = getAuthConfig();
    return AuthRequest.then(Request().get(URL, config), handleError);
  },
  put(URL, data, handleError = true) {
    let config = getAuthConfig();
    return AuthRequest.then(Request().put(URL, data, config), handleError);
  },
  delete(URL, handleError = true) {
    let config = getAuthConfig();
    return AuthRequest.then(Request().delete(URL, config), handleError);
  }
};
