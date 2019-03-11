import * as actionTypes from '../actions/actionTypes';

const initialState = {
  navActions: {},
  currentAction: null
};

const setNavActions = (state, action) => {
  return {...state, ...{
    navActions: action.navActions
  }}
}

const setCurrentAction = (state, action) => {
  return {...state, ...{
    currentAction: action.currentAction
  }}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAV_ACTIONS:
      return setNavActions(state, action);
    case actionTypes.SET_CURRENT_ACTION:
      return setCurrentAction(state, action);
    default:
      return state;
  }
};

export default reducer;