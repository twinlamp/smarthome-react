import * as actionTypes from '../actions/actionTypes';
import { takeEvery, fork, all } from 'redux-saga/effects';
import { signInSaga, signUpSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from './auth';
import { getDevicesSaga, addDeviceSaga, getCurrentDeviceSaga, editDeviceSaga } from './devices';
import { getCurrentSensorSaga, editSensorSaga, getSensorDataSaga } from './sensors';
import { getCurrentRelaySaga, editRelaySaga, getRelayDataSaga } from './relays';

function* watchAuth() {
  yield takeEvery(actionTypes.SIGN_IN_USER, signInSaga)
  yield takeEvery(actionTypes.SIGN_UP_USER, signUpSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

function* watchDevices() {
  yield takeEvery(actionTypes.GET_DEVICES, getDevicesSaga)
  yield takeEvery(actionTypes.ADD_DEVICE, addDeviceSaga)
  yield takeEvery(actionTypes.GET_CURRENT_DEVICE, getCurrentDeviceSaga)
  yield takeEvery(actionTypes.EDIT_DEVICE, editDeviceSaga)
}

function* watchSensors() {
  yield takeEvery(actionTypes.GET_CURRENT_SENSOR, getCurrentSensorSaga)
  yield takeEvery(actionTypes.EDIT_SENSOR, editSensorSaga)
  yield takeEvery(actionTypes.GET_SENSOR_DATA, getSensorDataSaga)
}

function* watchRelays() {
  yield takeEvery(actionTypes.GET_CURRENT_RELAY, getCurrentRelaySaga)
  yield takeEvery(actionTypes.EDIT_RELAY, editRelaySaga)
  yield takeEvery(actionTypes.GET_RELAY_DATA, getRelayDataSaga)
}

export default function* rootSaga () {
  yield all([
    fork(watchAuth),
    fork(watchDevices),
    fork(watchSensors),
    fork(watchRelays),
  ]);
}