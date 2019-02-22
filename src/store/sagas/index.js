import * as actionTypes from '../actions/actionTypes';
import { takeEvery, fork, all } from 'redux-saga/effects';
import { authSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from './auth';
import { getDevicesSaga, addDeviceSaga, getCurrentDeviceSaga, editDeviceSaga } from './devices';

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authSaga)
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

export default function* rootSaga () {
  yield all([
    fork(watchAuth),
    fork(watchDevices),
  ]);
}