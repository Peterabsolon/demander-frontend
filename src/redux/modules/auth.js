const config = require('../../config')

const LOAD = 'auth/LOAD'
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS'
const LOAD_FAIL = 'auth/LOAD_FAIL'

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'auth/LOGIN_FAIL'

const LOGOUT = 'auth/LOGOUT'
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL'

const SAVE_USER = 'auth/SAVE_USER'
const SAVE_USER_SUCCESS = 'auth/SAVE_USER_SUCCESS'
const SAVE_USER_FAIL = 'auth/SAVE_USER_FAIL'

const CLEAR_LOGIN_ERROR = 'auth/CLEAR_LOGIN_ERROR'

const initialState = {
  loaded: false
}

export default function reducer(state = initialState, action = {}) {
  let tempUser

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      tempUser = config.autoLogin ? state.user : null

      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result ? action.result : tempUser
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }

    // ----------------------------------------------------------------

    case LOGIN:
      return {
        ...state,
        isLoggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.result
      }
    case LOGIN_FAIL: {
      let error = null

      switch (action.error.statusCode) {
        case 401:
          error = 'Nesprávne heslo.'
          break
        case 404:
          error = 'Pre tento email neexistuje účet.'
          break
        default:
          error = 'Pri prihlasovaní došlo k neznámej chybe.'
      }

      return {
        ...state,
        isLoggingIn: false,
        user: null,
        loginError: error
      }
    }

    // ----------------------------------------------------------------

    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      }

    // ----------------------------------------------------------------

    case SAVE_USER:
      return {
        ...state
      }
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        user: action.result
      }
    case SAVE_USER_FAIL:
      return {
        ...state
      }

    // ----------------------------------------------------------------

    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: null
      }

    default:
      return state
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/loadAuth')
  }
}

export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.post('api/login', { data })
  }
}

export function saveUser(response) {
  return {
    types: [SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAIL],
    promise: client =>
      client.post('/save-user', {
        data: {
          ...response.body
        }
      })
  }
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: client => client.post('/logout')
  }
}

export function clearLoginError() {
  return {
    type: CLEAR_LOGIN_ERROR
  }
}
