import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions'

export function* signInSaga(action) {
  yield put(actions.signInStart())
  const signInData = {
    email: action.email,
    password: action.password,
  };
  const response = yield fetch('/api/v1/auth/sign_in', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(signInData)
  })
  const jsonResponse = yield response.json()
  if (response.ok) {
    yield localStorage.setItem('token', jsonResponse.token);
    yield localStorage.setItem('expirationDate', jsonResponse.expire);
    yield localStorage.setItem('email', action.email);
    yield put(actions.signInFinish(jsonResponse.token, action.email))
    yield put(actions.checkAuthTimeout(jsonResponse.expire))
  } else {
    yield put(actions.signInFail(jsonResponse.errors))
  }
}

export function* signUpSaga(action) {
  yield put(actions.signUpStart())
  const signUpData = {
    email: action.email,
    password: action.password,
  };
  const response = yield fetch('/api/v1/auth/sign_up', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(signUpData)
  })
  const jsonResponse = yield response.json()
  if (response.ok) {
    yield put(actions.signUpFinish())
  } else {
    yield put(actions.signUpFail(jsonResponse.errors))
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
      yield put(actions.signInFinish(token, email));
      yield put(actions.checkAuthTimeout(localStorage.getItem('expirationDate')));
    }
  }
}