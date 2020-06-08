import { appName } from '../../config'
import { OrderedMap, Record } from 'immutable'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import apiService from '../../services/api'
import { arrToMap } from '../../services/utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_PEOPLE_REQUEST = `${prefix}/FETCH_PEOPLE_REQUEST`
export const FETCH_PEOPLE_START = `${prefix}/FETCH_PEOPLE_START`
export const FETCH_PEOPLE_SUCCESS = `${prefix}/FETCH_PEOPLE_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  entities: OrderedMap({}),
  loading: false,
  loaded: false
})

export const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_PEOPLE_START:
      return state.set('loading', true)
    case FETCH_PEOPLE_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', arrToMap(payload.people, PersonRecord))
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const peopleListSelector = (state) =>
  state[moduleName].entities.valueSeq().toArray()

/**
 * Action Creators
 * */

export const addPerson = ({ firstName, lastName, email }) => ({
  type: ADD_PERSON_REQUEST,
  payload: { firstName, lastName, email }
})

export const fetchPeople = () => ({
  type: FETCH_PEOPLE_REQUEST
})

/**
 * Saga
 **/

export const addPersonSaga = function*({ payload }) {
  yield put({
    type: ADD_PERSON_START
  })
  yield call(apiService.addPerson, payload)
  yield put({
    type: ADD_PERSON_SUCCESS
  })
}

export const fetchPeopleSaga = function*() {
  yield put({
    type: FETCH_PEOPLE_START
  })

  const people = yield call(apiService.fetchPeople)

  yield put({
    type: FETCH_PEOPLE_SUCCESS,
    payload: { people }
  })
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_PEOPLE_REQUEST, fetchPeopleSaga)
  ])
}

/**
 * Init
 **/
