import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'

import app, { APP_RESET_STATE } from './app'
import api from './api'
import { reducer as form } from 'redux-form'

const appReducer = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  app,
  form,
  api
})

const rootReducer = (state, action) => {
  if (action.type === APP_RESET_STATE) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
