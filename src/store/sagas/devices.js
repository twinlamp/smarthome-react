import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* getDevicesSaga(action) {
  yield put(actions.getDevicesStart())
  const headers = new Headers()
  headers.append('X-Session-Token', action.token)
  const response = yield fetch('/api/device/list', { method: 'POST', headers: headers })
  const jsonResponse = yield response.json()
  console.log(jsonResponse)
  yield put(actions.getDevicesFinish())
}