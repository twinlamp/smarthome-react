import * as actionTypes from '../actions/actionTypes';

const initialState = {
  devices: [],
  loading: false,
  errors: null,
  currentDevice: null
};

const getDevicesStart = (state, action) => {
  return {...state, ...{
    devices: [],
    loading: true
  }};
};

const getDevicesFinish = (state, action) => {
  return {...state, ...{
    devices: action.devices || [],
    loading: false
  }};
}

const addDeviceStart = (state, action) => {
  return {...state, ...{
    errors: null,
    loading: true
  }};
};

const addDeviceFinish = (state, action) => {
  return {...state, ...{
    errors: null,
    loading: false
  }};
}

const addDeviceFail = (state, action) => {
  return {...state, ...{
    errors: action.errors,
    loading: false
  }};
}

const getCurrentDeviceStart = (state, action) => {
  return {...state, ...{
    device: {},
    loading: true
  }};
};

const getCurrentDeviceFinish = (state, action) => {
  return {...state, ...{
    currentDevice: action.device,
    loading: false
  }};
}

const editDeviceStart = (state, action) => {
  return {...state, ...{
    errors: null,
    loading: true
  }};
};

const editDeviceFinish = (state, action) => {
  return {...state, ...{
    errors: null,
    loading: false
  }};
}

const editDeviceFail = (state, action) => {
  return {...state, ...{
    errors: action.errors,
    loading: false
  }};
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICES_START:
      return getDevicesStart(state, action);
    case actionTypes.GET_DEVICES_FINISH:
      return getDevicesFinish(state, action);
    case actionTypes.ADD_DEVICE_START:
      return addDeviceStart(state, action);
    case actionTypes.ADD_DEVICE_FINISH:
      return addDeviceFinish(state, action);
    case actionTypes.ADD_DEVICE_FAIL:
      return addDeviceFail(state, action);
    case actionTypes.GET_CURRENT_DEVICE_START:
      return getCurrentDeviceStart(state, action);
    case actionTypes.GET_CURRENT_DEVICE_FINISH:
      return getCurrentDeviceFinish(state, action);
    case actionTypes.EDIT_DEVICE_START:
      return editDeviceStart(state, action);
    case actionTypes.EDIT_DEVICE_FINISH:
      return editDeviceFinish(state, action);
    case actionTypes.EDIT_DEVICE_FAIL:
      return editDeviceFail(state, action);
    default:
      return state;
  }
};

export default reducer;