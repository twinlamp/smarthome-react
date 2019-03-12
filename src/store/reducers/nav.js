import * as actionTypes from '../actions/actionTypes';

const initialState = {
  navActions: {},
  currentAction: null,
  showCurrentItem: false,
  currentItem: null
};

const setNavActions = (state, action) => {
  return {...state, ...{
    navActions: action.navActions
  }}
}

const setNavTitle = (state, action) => {
  return {...state, ...{
    currentAction: action.currentAction,
    showCurrentItem: action.showCurrentItem
  }}
}

const checkNavItem = (state, action) => {
  if (action.item) {
    return {...state, ...{ currentItem: action.item }}
  } else {
    return state
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAV_ACTIONS:
      return setNavActions(state, action);
    case actionTypes.SET_NAV_TITLE:
      return setNavTitle(state, action);
    default:
      return checkNavItem(state, action);
  }
};

export default reducer;