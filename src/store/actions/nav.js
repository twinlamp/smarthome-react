import * as actionTypes from './actionTypes';

export const setNavActions = (navActions) => {
  return {
    type: actionTypes.SET_NAV_ACTIONS,
    navActions: navActions
  };
};