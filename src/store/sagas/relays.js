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

  jsonResponse.relay.sensor_id = jsonResponse.relay.sensor ? parseInt(jsonResponse.relay.sensor.id) : ''
  jsonResponse.relay.possible_sensors.forEach((s) => {
    s.min = parseInt(s.min)
    s.max = parseInt(s.max)
  })

  if (jsonResponse.relay.task.task_schedule.start) {
    jsonResponse.relay.task.task_schedule.schedule = 'calendar'
  } else if (Object.values(jsonResponse.relay.task.task_schedule.days).find((d) => d.on || d.off)) {
    jsonResponse.relay.task.task_schedule.schedule = 'weekly'
  } else {
    jsonResponse.relay.task.task_schedule.schedule = 'none'
  }

  jsonResponse.relay.task.values_range = !!jsonResponse.relay.task.min

  yield put(actions.getCurrentRelayFinish(jsonResponse.relay))
}

export function* editRelaySaga(action) {
  yield put(actions.editRelayStart())
  const requestBody = { relay: { name: action.name, icon: action.icon, state: action.state, sensor_id: action.sensor_id, task: action.task } }
  const response = yield fetch(`/api/v1/relays/${action.id}`, { method: 'PUT', headers: headers(action.token), body: JSON.stringify(requestBody) })
  const jsonResponse = yield response.json()

  if (response.ok) {
    yield put(actions.editRelayFinish())
  } else {
    yield put(actions.editRelayFail(jsonResponse.errors.relay))
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