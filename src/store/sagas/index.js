import * as actionTypes from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import { authSaga, logoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}