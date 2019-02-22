import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  email: null,
  error: null,
  loading: false,
};

const signInStart = (state, action) => {
  return {...state, ...{
    error: null,
    loading: true
  }};
};

const signInSuccess = (state, action) => {
  return {...state, ...{
    token: action.token,
    email: action.email,
    error: null,
    loading: false
  }};
};

const signInFail = (state, action) => {
  return {...state, ...{
    error: action.error,
    loading: false
  }};
};

const signUpStart = (state, action) => {
  return {...state, ...{
    error: null,
    loading: true
  }};
};

const signUpSuccess = (state, action) => {
  return {...state, ...{
    error: null,
    loading: false
  }};
};

const signUpFail = (state, action) => {
  return {...state, ...{
    error: action.error,
    loading: false
  }};
};

const authLogout = (state, action) => {
  return {...state, ...{
    email: null,
    token: null
  }}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_START:
      return signInStart(state, action);
    case actionTypes.SIGN_IN_SUCCESS:
      return signInSuccess(state, action);
    case actionTypes.SIGN_IN_FAIL:
      return signInFail(state, action);
    case actionTypes.SIGN_UP_START:
      return signUpStart(state, action);
    case actionTypes.SIGN_UP_SUCCESS:
      return signUpSuccess(state, action);
    case actionTypes.SIGN_UP_FAIL:
      return signUpFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout();
    default:
      return state;
  }
};

export default reducer;