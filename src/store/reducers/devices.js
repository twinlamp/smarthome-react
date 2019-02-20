import * as actionTypes from '../actions/actionTypes';

const initialState = {
  devices: [],
  loading: false,
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
    error: null,
    loading: true
  }};
};

const addDeviceFinish = (state, action) => {
  return {...state, ...{
    error: null,
    loading: false
  }};
}

const addDeviceFail = (state, action) => {
  return {...state, ...{
    error: action.error,
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
    default:
      return state;
  }
};

export default reducer;