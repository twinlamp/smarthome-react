import * as actionTypes from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import { authSaga, logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga } from './auth';
import { getDevicesSaga } from './devices';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)

  yield takeEvery(actionTypes.GET_DEVICES, getDevicesSaga)
}