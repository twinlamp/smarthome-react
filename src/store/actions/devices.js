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

export const getDevicesFinish = (devices) => {
  return {
    type: actionTypes.GET_DEVICES_FINISH,
    devices: devices
  }
}

export const addDevice = (name, timezone, token) => {
  return {
    type: actionTypes.ADD_DEVICE,
    name: name,
    timezone: timezone,
    token: token
  }
}

export const addDeviceStart = () => {
  return {
    type: actionTypes.ADD_DEVICE_START
  }
}

export const addDeviceFinish = () => {
  return {
    type: actionTypes.ADD_DEVICE_FINISH
  }
}

export const addDeviceFail = (error) => {
  return {
    type: actionTypes.ADD_DEVICE_FAIL,
    error: error
  }
}