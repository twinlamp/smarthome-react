import * as actionTypes from './actionTypes';

export const getDevices = (token) => {
  return {
    type: actionTypes.GET_DEVICES,
    token: token
  }
}

export const getDevicesStart = () => {
  return {
    type: actionTypes.GET_DEVICES_START
  }
}

export const getDevicesFinish = () => {
  return {
    type: actionTypes.GET_DEVICES_FINISH
  }
}