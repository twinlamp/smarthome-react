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

export const getCurrentDevice = (token, id) => {
  return {
    type: actionTypes.GET_CURRENT_DEVICE,
    token: token,
    id: id
  }
}

export const getCurrentDeviceStart = () => {
  return {
    type: actionTypes.GET_CURRENT_DEVICE_START
  }
}

export const getCurrentDeviceFinish = (device) => {
  return {
    type: actionTypes.GET_CURRENT_DEVICE_FINISH,
    device: device
  }
}

export const editDevice = (id, name, timezone, token) => {
  return {
    type: actionTypes.EDIT_DEVICE,
    id: id,
    name: name,
    timezone: timezone,
    token: token
  }
}

export const editDeviceStart = () => {
  return {
    type: actionTypes.EDIT_DEVICE_START
  }
}

export const editDeviceFinish = () => {
  return {
    type: actionTypes.EDIT_DEVICE_FINISH
  }
}

export const editDeviceFail = (error) => {
  return {
    type: actionTypes.EDIT_DEVICE_FAIL,
    error: error
  }
}