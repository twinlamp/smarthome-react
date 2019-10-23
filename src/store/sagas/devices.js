import { put } from 'redux-saga/effects'
import * as actions from '../actions'

let headers = token => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('Content-Type', 'application/json')
  return headers  
}

export function* getDevicesSaga(action) {
  yield put(actions.getDevicesStart())
  const response = yield fetch('/api/v1/devices', { method: 'GET', headers: headers(action.token) })
  const jsonResponse = yield response.json()
  let data = response.ok ? jsonResponse.data : []
  yield put(actions.getDevicesFinish(data))
}

export function* addDeviceSaga(action) {
  yield put(actions.addDeviceStart())
  const requestBody = { name: action.name, timezone: action.timezone }
  const response = yield fetch('/api/v1/devices', { method: 'POST', headers: headers(action.token), body: JSON.stringify(requestBody) })
  const jsonResponse = yield response.json()
  if (jsonResponse.ok) {
    yield put(actions.addDeviceFinish())
  } else {
    yield put(actions.addDeviceFail(jsonResponse.errors))
  }
}

export function* getCurrentDeviceSaga(action) {
  yield put(actions.getCurrentDeviceStart())
  const response = yield fetch(`/api/v1/devices/${action.id}`, { method: 'GET', headers: headers(action.token) })
  const jsonResponse = yield response.json()
  yield put(actions.getCurrentDeviceFinish(jsonResponse.device))
}

export function* editDeviceSaga(action) {
  yield put(actions.editDeviceStart())
  const requestBody = { device: { name: action.name, timezone: action.timezone } }
  const response = yield fetch(`/api/v1/devices/${action.id}`, { method: 'PUT', headers: headers(action.token), body: JSON.stringify(requestBody) })
  const jsonResponse = yield response.json()
  if (jsonResponse.ok) {
    yield put(actions.editDeviceFinish())
  } else {
    yield put(actions.editDeviceFail(jsonResponse.errors.device))
  }
}
