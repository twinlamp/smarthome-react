import * as actionTypes from '../actions/actionTypes';

const initialState = {
  navActions: {}
};

const setNavActions = (state, action) => {
  return {...state, ...{
    navActions: action.navActions
  }}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAV_ACTIONS:
      return setNavActions(state, action);
    default:
      return state;
  }
};

export default reducer;