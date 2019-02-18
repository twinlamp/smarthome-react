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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICES_START:
      return getDevicesStart(state, action);
    default:
      return state;
  }
};

export default reducer;