import * as actionTypes from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import { authSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authSaga)
}