import routeParams from 'helpers/routeParams'
import { PAGE_SIZE } from 'constants/misc'

const CREATE = 'api/conversations/CREATE'
const CREATE_SUCCESS = 'api/conversations/CREATE_SUCCESS'
const CREATE_FAIL = 'api/conversations/CREATE_FAIL'

const GET_DETAIL = 'api/conversations/GET_DETAIL'
const GET_DETAIL_SUCCESS = 'api/conversations/GET_DETAIL_SUCCESS'
const GET_DETAIL_FAIL = 'api/conversations/GET_DETAIL_FAIL'

const GET_LIST = 'api/conversations/GET_LIST'
const GET_LIST_SUCCESS = 'api/conversations/GET_LIST_SUCCESS'
const GET_LIST_FAIL = 'api/conversations/GET_LIST_FAIL'

const SET_LIST_PARAMS = 'api/conversations/SET_LIST_PARAMS'

const SEND_MESSAGE = 'api/conversations/SEND_MESSAGE'
const SEND_MESSAGE_SUCCESS = 'api/conversations/SEND_MESSAGE_SUCCESS'
const SEND_MESSAGE_FAIL = 'api/conversations/SEND_MESSAGE_FAIL'

const PUT_MESSAGE = 'api/conversations/PUT_MESSAGE'

const initialState = {
  list: {
    items: [],
    offset: 0,
    limit: PAGE_SIZE,
    count: null,
    loading: false,
    loaded: false,
    submitting: false,
    submitted: false,
    error: null
  },
  detail: {
    data: null,
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

    case GET_DETAIL:
      return {
        ...state,
        detail: {
          ...state.detail,
          loaded: false,
          loading: true,
          error: null
        }
      }
    case GET_DETAIL_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          loaded: true,
          loading: false,
          data: action.result
        }
      }
    case GET_DETAIL_FAIL:
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
          loading: !action.noLoading,
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

    case SET_LIST_PARAMS:
      return {
        ...state,
        list: {
          ...state.list,
          limit:
            action.options.limit !== undefined
              ? action.options.limit
              : state.limit,
          offset:
            action.options.offset !== undefined
              ? action.options.offset
              : state.offset
          // filter: action.options.filter !== undefined
          //   ? action.options.filter
          //   : state.filter,
          // sort: action.options.sort !== undefined
          //   ? action.options.sort
          //   : state.sort
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

    // --------------------------------------

    case PUT_MESSAGE:
      return {
        ...state,
        detail: {
          ...state.detail,
          data: {
            ...state.detail.data,
            messages: {
              ...state.detail.data.messages,
              items: [...state.detail.data.messages.items, action.message],
              count: state.detail.data.messages.count + 1
            }
          }
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

export const getDetail = id => ({
  types: [GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_FAIL],
  promise: client => client.get(`api/conversations/${id}`)
})

export const getList = (state, companyId, { noLoading } = {}) => {
  const url = companyId
    ? `api/conversations/company/${companyId}`
    : 'api/conversations/user/me'

  return {
    types: [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAIL],
    promise: client => client.get(`${url}${routeParams(state)}`),
    noLoading
  }
}

export const sendMessage = (conversationId, data) => ({
  types: [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL],
  promise: client =>
    client.post(`api/conversations/${conversationId}`, { data })
})

export const setListParams = options => ({
  type: SET_LIST_PARAMS,
  options
})

export const putMessage = message => ({
  type: PUT_MESSAGE,
  message
})
