import routeParams from 'helpers/routeParams'

const CREATE = 'api/conversations/CREATE'
const CREATE_SUCCESS = 'api/conversations/CREATE_SUCCESS'
const CREATE_FAIL = 'api/conversations/CREATE_FAIL'

const GET_BY_ID = 'api/conversations/GET_BY_ID'
const GET_BY_ID_SUCCESS = 'api/conversations/GET_BY_ID_SUCCESS'
const GET_BY_ID_FAIL = 'api/conversations/GET_BY_ID_FAIL'

const GET_LIST = 'api/conversations/GET_LIST'
const GET_LIST_SUCCESS = 'api/conversations/GET_LIST_SUCCESS'
const GET_LIST_FAIL = 'api/conversations/GET_LIST_FAIL'

const SEND_MESSAGE = 'api/conversations/SEND_MESSAGE'
const SEND_MESSAGE_SUCCESS = 'api/conversations/SEND_MESSAGE_SUCCESS'
const SEND_MESSAGE_FAIL = 'api/conversations/SEND_MESSAGE_FAIL'

const initialState = {
  list: {
    items: [],
    offset: 0,
    limit: 20,
    count: null,
    loading: false,
    loaded: false,
    submitting: false,
    submitted: false,
    error: null
  },
  detail: {
    messages: [],
    offset: 0,
    limit: 100,
    loading: false,
    loaded: false,
    submitting: false,
    submitted: false,
    error: null
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        list: {
          ...state.list,
          submitted: false,
          submitting: true,
          error: null
        }
      }
    case CREATE_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          submitted: true,
          submitting: false
        }
      }
    case CREATE_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          submitted: true,
          submitting: false,
          error: action.error
        }
      }

    // --------------------------------------

    case GET_BY_ID:
      return {
        ...state,
        detail: {
          ...state.detail,
          loaded: false,
          loading: true,
          error: null
        }
      }
    case GET_BY_ID_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          loaded: true,
          loading: false
        }
      }
    case GET_BY_ID_FAIL:
      return {
        ...state,
        detail: {
          ...state.detail,
          loaded: false,
          loading: false,
          error: action.error
        }
      }

    // --------------------------------------

    case GET_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          loaded: false,
          loading: true,
          error: null
        }
      }
    case GET_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          loaded: true,
          loading: false,
          items: action.result.items,
          count: action.result.count
        }
      }
    case GET_LIST_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          loaded: false,
          loading: false,
          error: action.error
        }
      }

    // --------------------------------------

    case SEND_MESSAGE:
      return {
        ...state,
        detail: {
          ...state.detail,
          submitted: false,
          submitting: true,
          error: null
        }
      }
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          submitted: true,
          submitting: false
        }
      }
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        detail: {
          ...state.detail,
          submitted: true,
          submitting: false,
          error: action.error
        }
      }

    default:
      return state
  }
}

export const createConversation = data => ({
  types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
  promise: client => client.post('api/conversations', { data })
})

export const getConversation = id => ({
  types: [GET_BY_ID, GET_BY_ID_SUCCESS, GET_BY_ID_FAIL],
  promise: client => client.get(`api/conversations/${id}`)
})

export const getConversations = (state, companyId) => ({
  types: [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAIL],
  promise: client =>
    client.get(`api/conversations/company/${companyId}${routeParams(state)}`)
})

export const sendMessage = (conversationId, data) => ({
  types: [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL],
  promise: client =>
    client.post(`api/conversations/${conversationId}`, { data })
})
