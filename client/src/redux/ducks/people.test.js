import { put, call } from 'redux-saga/effects'
import {
  addPersonSaga,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_REQUEST,
  ADD_PERSON_START,
  addPerson
} from './people'
import apiServices from '../../services/api'

describe('People Duck', () => {
  describe('Saga', () => {
    describe('Add person', () => {
      it('should add a person', () => {
        const person = {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com'
        }
        const action = addPerson(person)
        const saga = addPersonSaga(action)

        expect(saga.next().value).toEqual(put({ type: ADD_PERSON_START }))

        expect(saga.next().value).toEqual(call(apiServices.addPerson, person))

        expect(saga.next().value).toEqual(put({ type: ADD_PERSON_SUCCESS }))
      })
    })
  })
})
