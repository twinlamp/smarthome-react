import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentRelay: null,
  data: []
};

const getCurrentRelayStart = (state, action) => {
  return {...state, ...{
    currentRelay: null,
  }};
};

const getCurrentRelayFinish = (state, action) => {
  return {...state, ...{
    currentRelay: action.item,
  }};
}

const getRelayDataStart = (state, action) => {
  return {...state, ...{
    data: [],
  }};
};

const getRelayDataFinish = (state, action) => {
  return {...state, ...{
    data: action.data,
  }};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_RELAY_START:
      return getCurrentRelayStart(state, action);
    case actionTypes.GET_CURRENT_RELAY_FINISH:
      return getCurrentRelayFinish(state, action);
    case actionTypes.GET_RELAY_DATA_START:
      return getRelayDataStart(state, action);
    case actionTypes.GET_RELAY_DATA_FINISH:
      return getRelayDataFinish(state, action);
    default:
      return state;
  }
};

export default reducer;