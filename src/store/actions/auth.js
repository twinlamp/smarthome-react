import * as actionTypes from './actionTypes';

export const signIn = (email, password) => {
  return {
    type: actionTypes.SIGN_IN_USER,
    email: email,
    password: password,
  }
}

export const signUp = (email, password) => {
  return {
    type: actionTypes.SIGN_UP_USER,
    email: email,
    password: password,
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START
  };
};

export const signInSuccess = (token, email) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    token: token,
    email: email
  };
};

export const signInFail = (errors) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    errors: errors
  };
};

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START
  };
};

export const signUpSuccess = () => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS
  };
};

export const signUpFail = (errors) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    errors: errors
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationDate) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationDate: expirationDate
  }
}

export const authCheckState = (url) => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
    url: url
  }
}