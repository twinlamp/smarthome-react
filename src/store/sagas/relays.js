import { put } from 'redux-saga/effects'
import * as actions from '../actions'

let headers = token => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('Content-Type', 'application/json')
  return headers  
}

export function* getCurrentRelaySaga(action) {
  yield put(actions.getCurrentRelayStart())
  const response = yield fetch(`/api/v1/relays/${action.id}`, { method: 'GET', headers: headers(action.token) })
  const jsonResponse = yield response.json()
  jsonResponse.relay.sensor_id = parseInt(jsonResponse.relay.sensor.id)
  jsonResponse.relay.possible_sensors.forEach((s) => {
    s.min = parseInt(s.min)
    s.max = parseInt(s.max)
  })
  yield put(actions.getCurrentRelayFinish(jsonResponse.relay))
}

export function* editRelaySaga(action) {
  yield put(actions.editRelayStart())
  const requestBody = { relay: { name: action.name, min: action.min, max: action.max, icon: action.icon } }
  const response = yield fetch(`/api/v1/relays/${action.id}`, { method: 'PUT', headers: headers(action.token), body: JSON.stringify(requestBody) })
  const jsonResponse = yield response.json()
  if (jsonResponse.ok) {
    yield put(actions.editRelayFinish())
  } else {
    yield put(actions.editRelayFail(jsonResponse.errors))
  }
}

export function* getRelayDataSaga(action) {
  yield put(actions.getRelayDataStart())
  let url = `/api/v1/relay_values?relay_id=${action.id}`
  if (action.from) { url += `&from=${action.from}` }
  if (action.to) { url += `&to=${action.to}`}
  const response = yield fetch(url, { method: 'GET', headers: headers(action.token) })
  const jsonResponse = yield response.json()
  yield put(actions.getRelayDataFinish(jsonResponse))
}