import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* getDevicesSaga(action) {
  yield put(actions.getDevicesStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const response = yield fetch('/api/device/list', { method: 'POST', headers: headers })
  const jsonResponse = yield response.json()
  let data = jsonResponse.status === 'success' ? jsonResponse.data : []
  yield put(actions.getDevicesFinish(data))
}

export function* addDeviceSaga(action) {
  yield put(actions.addDeviceStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const initResponse = yield fetch('/api/device/add', { method: 'POST', headers: headers, body: JSON.stringify({ version: 1 }) })
  const jsonInitResponse = yield initResponse.json()
  if (jsonInitResponse.status === 'success') {
    const id = jsonInitResponse.data.Token
    yield put(actions.editDevice(parseInt(id), action.name, action.timezone, action.token))
    yield put(actions.addDeviceFinish())
  } else {
    const errorMsg = 'Something went wrong'
    yield put(actions.addDeviceFail(errorMsg))
  }
}

export function* getCurrentDeviceSaga(action) {
  yield put(actions.getCurrentDeviceStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const requestBody = { deviceId: parseInt(action.id) }
  const response = yield fetch('/api/device', { method: 'POST', headers: headers, body: JSON.stringify(requestBody) })
  const jsonResponse = yield response.json()
  yield put(actions.getCurrentDeviceFinish(jsonResponse.data))  
}

export function* editDeviceSaga(action) {
  yield put(actions.editDeviceStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const requestBody = { deviceId: parseInt(action.id), name: action.name, timezone: action.timezone }
  const initResponse = yield fetch('/api/device/set', { method: 'POST', headers: headers, body: JSON.stringify(requestBody) })
  const jsonInitResponse = yield initResponse.json()
  if (jsonInitResponse.status === 'success') {
    yield put(actions.editDeviceFinish())
  } else {
    const errorMsg = 'Name already taken'
    yield put(actions.editDeviceFail(errorMsg))
  }
}