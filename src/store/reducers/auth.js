import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    email: null,
    error: null,
    loading: false,
};

const authStart = (state, action) => {
    return {...state, ...{
      error: null,
      loading: true
    }};
};

const authSuccess = (state, action) => {
  return {...state, ...{
    token: action.token,
    email: action.email,
    error: null,
    loading: false
  }};
};

const authFail = (state, action) => {
  return {...state, ...{
    error: action.error,
    loading: false
  }};
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;