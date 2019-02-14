import * as actionTypes from './actionTypes';

export const auth = (email, password) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password
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