import { appName } from '../../config'
import { Record } from 'immutable'
import apiService from '../../services/api'
import { put, call, select, take, delay } from 'redux-saga/effects'
import { all } from '@redux-saga/core/effects'
/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`
export const SIGN_UP_LIMIT_TIMEOUT = `${prefix}/SIGN_UP_LIMIT_TIMEOUT`
export const SIGN_UP_LIMIT_ERROR = `${prefix}/SIGN_UP_LIMIT_ERROR`

export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  loading: true,
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
      return state.set('loading', true).set('error', null)

    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload.user)
        .set('error', null)

    case SIGN_UP_ERROR:
      return state.set('error', error.message).set('loading', false)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const loadingSelector = (state) => state[moduleName].loading
export const errorSelector = (state) => state[moduleName].error

/**
 * Action Creators
 * */

/**
 * Saga
 **/

export function signUp({ email, password }) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

export function* signUpSaga() {
  let tries = 0

  while (true) {
    const action = yield take(SIGN_UP_REQUEST)
    tries++

    if (tries === 3) {
      yield put({
        type: SIGN_UP_LIMIT_TIMEOUT
      })
      yield delay(3000)
      continue
    } else if (tries === 5) {
      yield put({
        type: SIGN_UP_LIMIT_ERROR
      })
      return
    }

    const { email, password } = action.payload
    const loading = yield select(loadingSelector)
    yield put({
      type: SIGN_UP_START
    })

    if (loading) {
      return
    }

    try {
      const user = yield call(apiService.signUp, email, password)
      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

export function* saga() {
  yield all([signUpSaga()])
}

/**
 * Init
 **/

export function init(store) {
  apiService.onAuthChange((user) => {
    if (user) {
      store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    }
  })
}
