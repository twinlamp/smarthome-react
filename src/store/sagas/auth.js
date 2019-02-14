import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* authSaga(action) {
  yield put(actions.authStart())
  const authData = {
      email: action.email,
      password: action.password,
  };
  const response = yield fetch('/api/session/create', { method: 'POST', body: JSON.stringify(authData) })
  const jsonResponse = yield response.json()
  if (jsonResponse.status === 'success') {
    localStorage.setItem('token', jsonResponse.data.token);
    // localStorage.setItem('expirationDate', response.data.data.expire);
    localStorage.setItem('email', action.email);
    yield put(actions.authSuccess(jsonResponse.data.token, action.email))
    // yield put(actions.checkAuthTimeout(response.data.expiresIn))
  } else {
    yield put(actions.authFail('Неверный email или пароль'))
  }
}