import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentSensor: null,
  data: []
};

const getCurrentSensorStart = (state, action) => {
  return {...state, ...{
    currentSensor: null,
  }};
};

const getCurrentSensorFinish = (state, action) => {
  return {...state, ...{
    currentSensor: action.item,
  }};
}

const getSensorDataStart = (state, action) => {
  return {...state, ...{
    data: [],
  }};
};

const getSensorDataFinish = (state, action) => {
  return {...state, ...{
    data: action.data,
  }};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_SENSOR_START:
      return getCurrentSensorStart(state, action);
    case actionTypes.GET_CURRENT_SENSOR_FINISH:
      return getCurrentSensorFinish(state, action);
    case actionTypes.GET_SENSOR_DATA_START:
      return getSensorDataStart(state, action);
    case actionTypes.GET_SENSOR_DATA_FINISH:
      return getSensorDataFinish(state, action);
    default:
      return state;
  }
};

export default reducer;