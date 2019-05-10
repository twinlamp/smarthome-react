import * as actionTypes from './actionTypes';

export const getCurrentRelay = (token, id) => {
  return {
    type: actionTypes.GET_CURRENT_RELAY,
    token: token,
    id: id
  }
}

export const getCurrentRelayStart = () => {
  return {
    type: actionTypes.GET_CURRENT_RELAY_START
  }
}

export const getCurrentRelayFinish = (relay) => {
  return {
    type: actionTypes.GET_CURRENT_RELAY_FINISH,
    item: relay
  }
}

export const editRelay = (id, name, icon, state, sensor_id, task, token) => {
  return {
    type: actionTypes.EDIT_RELAY,
    id: id,
    name: name,
    icon: icon,
    state: state,
    sensor_id: sensor_id,
    task: task,
    token: token
  }
}

export const editRelayStart = () => {
  return {
    type: actionTypes.EDIT_RELAY_START
  }
}

export const editRelayFinish = () => {
  return {
    type: actionTypes.EDIT_RELAY_FINISH
  }
}

export const editRelayFail = (errors) => {
  return {
    type: actionTypes.EDIT_RELAY_FAIL,
    errors: errors
  }
}

export const getRelayData = (token, id, from, to) => {
  return {
    type: actionTypes.GET_RELAY_DATA,
    token: token,
    id: id,
    from: from,
    to: to
  }
}

export const getRelayDataStart = () => {
  return {
    type: actionTypes.GET_RELAY_DATA_START
  }
}

export const getRelayDataFinish = (data) => {
  return {
    type: actionTypes.GET_RELAY_DATA_FINISH,
    data: data
  }
}