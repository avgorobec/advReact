import { all } from 'redux-saga/effects'
import { saga as authSaga } from './ducks/auth'
import { saga as peopleSaga } from './ducks/people'

export function* rootSaga() {
  yield all([authSaga(), peopleSaga()])
}
