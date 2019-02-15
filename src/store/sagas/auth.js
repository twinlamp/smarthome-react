import { put } from 'redux-saga/effects'
import * as actions from '../actions'
import * as actionTypes from '../actions/actionTypes'

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
  console.log(jsonResponse)
  if (jsonResponse.status === 'success') {
    yield localStorage.setItem('token', jsonResponse.data.token);
    // localStorage.setItem('expirationDate', response.data.data.expire);
    yield localStorage.setItem('email', action.email);
    yield put(actions.authSuccess(jsonResponse.data.token, action.email))
    // yield put(actions.checkAuthTimeout(response.data.expiresIn))
  } else {
    const errorMsg = action.isSignup ? 'Email is taken' : 'Wrong email or password'
    yield put(actions.authFail(errorMsg))
  }
}

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  // yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('email');
  yield put({type: actionTypes.AUTH_LOGOUT});
}