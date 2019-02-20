import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* getDevicesSaga(action) {
  yield put(actions.getDevicesStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const response = yield fetch('/api/device/list', { method: 'POST', headers: headers })
  const jsonResponse = yield response.json()
  yield put(actions.getDevicesFinish())
}

export function* addDeviceSaga(action) {
  yield put(actions.addDeviceStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const initResponse = yield fetch('/api/device/add', { method: 'POST', headers: headers, body: JSON.stringify({ version: 1 }) })
  const jsonInitResponse = yield initResponse.json()
  console.log(jsonInitResponse)
  if (jsonInitResponse.status === 'success') {
    console.log('success')
    const id = jsonInitResponse.data.Token
    console.log(id)
    console.log(action.name)
    console.log(action.timezone)
    const requestBody = { deviceId: parseInt(id), name: action.name, timezone: action.timezone }
    yield fetch('/api/device/set', { method: 'POST', headers: headers, body: JSON.stringify(requestBody) })
    yield put(actions.addDeviceFinish())
  } else {
    console.log('fails')
    const errorMsg = 'Something went wrong'
    yield put(actions.addDeviceFail(errorMsg))
  }
}