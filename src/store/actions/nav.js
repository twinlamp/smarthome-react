import * as actionTypes from './actionTypes';

export const setNavActions = (navActions) => {
  return {
    type: actionTypes.SET_NAV_ACTIONS,
    navActions: navActions
  };
};

export const setCurrentAction = currentAction => {
  return {
    type: actionTypes.SET_CURRENT_ACTION,
    currentAction: currentAction
  };
};