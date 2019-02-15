import * as actionTypes from './actionTypes';

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    email: email
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};