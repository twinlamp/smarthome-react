import * as actionTypes from './actionTypes';

export const setNavActions = (navActions) => {
  return {
    type: actionTypes.SET_NAV_ACTIONS,
    navActions: navActions
  };
};

export const setNavTitle = (currentAction, showCurrentItem) => {
  return {
    type: actionTypes.SET_NAV_TITLE,
    currentAction: currentAction,
    showCurrentItem: showCurrentItem
  };
};