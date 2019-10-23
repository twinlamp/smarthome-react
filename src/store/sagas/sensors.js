import { put } from 'redux-saga/effects'
import * as actions from '../actions'

let headers = token => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('Content-Type', 'application/json')
  return headers  
}

export function* getCurrentSensorSaga(action) {
  yield put(actions.getCurrentSensorStart())
  const response = yield fetch(`/api/v1/sensors/${action.id}`, { method: 'GET', headers: headers(action.token) })
  const jsonResponse = yield response.json()
  jsonResponse.sensor.min = parseInt(jsonResponse.sensor.min)
  jsonResponse.sensor.max = parseInt(jsonResponse.sensor.max)
  yield put(actions.getCurrentSensorFinish(jsonResponse.sensor))
}

export function* editSensorSaga(action) {
  yield put(actions.editSensorStart())
  const requestBody = { sensor: { name: action.name, min: action.min, max: action.max, icon: action.icon } }
  const response = yield fetch(`/api/v1/sensors/${action.id}`, { method: 'PUT', headers: headers(action.token), body: JSON.stringify(requestBody) })
  const jsonResponse = yield response.json()
  if (jsonResponse.ok) {
    yield put(actions.editSensorFinish())
  } else {
    yield put(actions.editSensorFail(jsonResponse.errors))
  }
}

export function* getSensorDataSaga(action) {
  yield put(actions.getSensorDataStart())
  let url = `/api/v1/sensor_values?sensor_id=${action.id}`
  if (action.from) { url += `&from=${action.from}` }
  if (action.to) { url += `&to=${action.to}`}
  const response = yield fetch(url, { method: 'GET', headers: headers(action.token) })
  const jsonResponse = yield response.json()
  yield put(actions.getSensorDataFinish(jsonResponse.data))
}