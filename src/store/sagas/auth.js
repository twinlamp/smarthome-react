import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions'

export function* authSaga(action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    passConfirm: action.password
  };
  const url = action.isSignup ? '/api/user/add' : '/api/session/create'
  const response = yield fetch(url, { method: 'POST', body: JSON.stringify(authData) })
  const jsonResponse = yield response.json()
  if (jsonResponse.status === 'success') {
    yield localStorage.setItem('token', jsonResponse.data.token);
    yield localStorage.setItem('expirationDate', jsonResponse.data.expire);
    yield localStorage.setItem('email', action.email);
    yield put(actions.authSuccess(jsonResponse.data.token, action.email))
    yield put(actions.checkAuthTimeout(jsonResponse.data.expire))
  } else {
    const errorMsg = action.isSignup ? 'Email is taken' : 'Wrong email or password'
    yield put(actions.authFail(errorMsg))
  }
}

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('email');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  const diff = new Date(action.expirationDate) - new Date()
  yield delay(Math.min(diff, 2147483647))
  yield put(actions.logout())
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    if (new Date(localStorage.getItem('expirationDate')) <= new Date()) {
      yield put(actions.logout());
    } else {
      const email = localStorage.getItem('email');
      yield put(actions.authSuccess(token, email));
      yield put(actions.checkAuthTimeout(localStorage.getItem('expirationDate')));
    }
  }
}