import * as actionTypes from '../actions/actionTypes';

const initialState = {
  devices: [],
  currentDevice: null
};

const getDevicesStart = (state, action) => {
  return {...state, ...{
    devices: [],
  }};
};

const getDevicesFinish = (state, action) => {
  return {...state, ...{
    devices: action.devices || [],
  }};
}

const getCurrentDeviceStart = (state, action) => {
  return {...state, ...{
    currentDevice: null,
  }};
};

const getCurrentDeviceFinish = (state, action) => {
  return {...state, ...{
    currentDevice: action.item,
  }};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICES_START:
      return getDevicesStart(state, action);
    case actionTypes.GET_DEVICES_FINISH:
      return getDevicesFinish(state, action);
    case actionTypes.GET_CURRENT_DEVICE_START:
      return getCurrentDeviceStart(state, action);
    case actionTypes.GET_CURRENT_DEVICE_FINISH:
      return getCurrentDeviceFinish(state, action);
    default:
      return state;
  }
};

export default reducer;