import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  email: null
};

const signInFinish = (state, action) => {
  return {...state, ...{
    token: action.token,
    email: action.email
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
    case actionTypes.SIGN_IN_FINISH:
      return signInFinish(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout();
    default:
      return state;
  }
};

export default reducer;