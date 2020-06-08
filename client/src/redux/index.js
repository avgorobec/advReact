import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import reducer from './reducer'
import history from '../history'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './saga'
import { init as authInit } from './ducks/auth'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

authInit(store)

export default store
