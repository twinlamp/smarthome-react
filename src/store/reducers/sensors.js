import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentSensor: null
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_SENSOR_START:
      return getCurrentSensorStart(state, action);
    case actionTypes.GET_CURRENT_SENSOR_FINISH:
      return getCurrentSensorFinish(state, action);
    default:
      return state;
  }
};

export default reducer;