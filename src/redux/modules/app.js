import store from 'store'

const NOTIFICATION = 'react-template/app/NOTIFICATION'
const CHANGE_LOCALE = 'react-template/app/CHANGE_LOCALE'
const TOGGLE_MODAL = 'react-template/app/TOGGLE_MODAL'

export const APP_RESET_STATE = 'react-template/app/APP_RESET_STATE'

const initialState = {
  notification: {
    message: '',
    level: '',
    options: {},
    active: false
  },
  locale: {
    lang: store.get('locale') ? store.get('locale') : 'sk',
    willUpdate: false
  },
  modal: {
    id: null,
    next: null
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFICATION:
      return Object.assign({}, state, {
        notification: {
          message: action.message,
          level: typeof action.options === 'string' ? action.options : 'info',
          options: typeof action.options === 'object' ? action.options : {},
          active: action.active === undefined
        }
      })

    case CHANGE_LOCALE:
      return Object.assign({}, state, {
        locale: {
          lang: action.locale,
          willUpdate: true
        }
      })

    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        modal: {
          id: action.id,
          next: action.next
        }
      })
    default:
      return state
  }
}

export function notification(message, options, active) {
  return {
    type: NOTIFICATION,
    message,
    options,
    active
  }
}

export function changeLocale(locale = {}) {
  return {
    type: CHANGE_LOCALE,
    locale
  }
}

export function modal(id, next) {
  return {
    type: TOGGLE_MODAL,
    id,
    next
  }
}

export function resetState() {
  return {
    type: APP_RESET_STATE
  }
}
