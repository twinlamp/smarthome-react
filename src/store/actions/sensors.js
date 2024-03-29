import * as actionTypes from './actionTypes';

export const getCurrentSensor = (token, id) => {
  return {
    type: actionTypes.GET_CURRENT_SENSOR,
    token: token,
    id: id
  }
}

export const getCurrentSensorStart = () => {
  return {
    type: actionTypes.GET_CURRENT_SENSOR_START
  }
}

export const getCurrentSensorFinish = (sensor) => {
  return {
    type: actionTypes.GET_CURRENT_SENSOR_FINISH,
    item: sensor
  }
}

export const editSensor = (id, name, icon, min, max, token) => {
  return {
    type: actionTypes.EDIT_SENSOR,
    id: id,
    name: name,
    icon: icon,
    min: min,
    max: max,
    token: token
  }
}

export const editSensorStart = () => {
  return {
    type: actionTypes.EDIT_SENSOR_START
  }
}

export const editSensorFinish = () => {
  return {
    type: actionTypes.EDIT_SENSOR_FINISH
  }
}

export const editSensorFail = (errors) => {
  return {
    type: actionTypes.EDIT_SENSOR_FAIL,
    errors: errors
  }
}

export const getSensorData = (token, id, from, to) => {
  return {
    type: actionTypes.GET_SENSOR_DATA,
    token: token,
    id: id,
    from: from,
    to: to
  }
}

export const getSensorDataStart = () => {
  return {
    type: actionTypes.GET_SENSOR_DATA_START
  }
}

export const getSensorDataFinish = (data) => {
  return {
    type: actionTypes.GET_SENSOR_DATA_FINISH,
    data: data
  }
}