import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions'

export function* signInSaga(action) {
  yield put(actions.signInStart())
  const signInData = {
    email: action.email,
    password: action.password,
    passConfirm: action.password
  };
  const response = yield fetch('/api/session/create', { method: 'POST', body: JSON.stringify(signInData) })
  const jsonResponse = yield response.json()
  if (jsonResponse.status === 'success') {
    yield localStorage.setItem('token', jsonResponse.data.token);
    yield localStorage.setItem('expirationDate', jsonResponse.data.expire);
    yield localStorage.setItem('email', action.email);
    yield put(actions.signInSuccess(jsonResponse.data.token, action.email))
    yield put(actions.checkAuthTimeout(jsonResponse.data.expire))
  } else {
    yield put(actions.signInFail('Wrong email or password'))
  }
}

export function* signUpSaga(action) {
  yield put(actions.signUpStart())
  const signUpData = {
    email: action.email,
    password: action.password,
    passConfirm: action.password
  };
  const response = yield fetch('/api/user/add', { method: 'POST', body: JSON.stringify(signUpData) })
  const jsonResponse = yield response.json()
  if (jsonResponse.status === 'success') {
    yield localStorage.setItem('token', jsonResponse.data.token);
    yield localStorage.setItem('expirationDate', jsonResponse.data.expire);
    yield localStorage.setItem('email', action.email);
    yield put(actions.signUpSuccess())
  } else {
    yield put(actions.signUpFail('Email already taken'))
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
      yield put(actions.signInSuccess(token, email));
      yield put(actions.checkAuthTimeout(localStorage.getItem('expirationDate')));
    }
  }
}