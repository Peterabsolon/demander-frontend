import routeParams from 'helpers/routeParams'
import { PAGE_SIZE } from 'constants/misc'

const GET_LIST = 'api/posts/GET_LIST'
const GET_LIST_SUCCESS = 'api/posts/GET_LIST_SUCCESS'
const GET_LIST_FAIL = 'api/posts/GET_LIST_FAIL'

const GET_BY_ID = 'api/posts/GET_BY_ID'
const GET_BY_ID_SUCCESS = 'api/posts/GET_BY_ID_SUCCESS'
const GET_BY_ID_FAIL = 'api/posts/GET_BY_ID_FAIL'

const SET_FILTER = 'api/posts/SET_FILTER'
const SET_PARAMS = 'api/posts/SET_PARAMS'

const SUBMIT = 'api/posts/SUBMIT'
const SUBMIT_SUCCESS = 'api/posts/SUBMIT_SUCCESS'
const SUBMIT_FAIL = 'api/posts/SUBMIT_FAIL'

const SUBMIT_DELETE = 'api/posts/SUBMIT_DELETE'
const SUBMIT_DELETE_SUCCESS = 'api/posts/SUBMIT_DELETE_SUCCESS'
const SUBMIT_DELETE_FAIL = 'api/posts/SUBMIT_DELETE_FAIL'

const initialState = {
  list: [],
  detail: {},
  filter: '',
  offset: 0,
  limit: PAGE_SIZE,
  count: 0,
  sort: '',
  detailLoading: false,
  listLoading: false,
  loaded: false,
  submitting: false,
  deleting: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        listLoading: !action.noLoading
      }
    case GET_LIST_SUCCESS: {
      return {
        ...state,
        listLoading: false,
        loaded: true,
        list: action.result.rows,
        count: action.result.count
      }
    }
    case GET_LIST_FAIL:
      return {
        ...state,
        listLoading: false,
        loaded: false,
        error: action.error
      }

    // ----------------------------------------------

    case GET_BY_ID:
      return {
        ...state,
        detailLoading: true
      }
    case GET_BY_ID_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        loaded: true,
        detail: action.result
      }
    case GET_BY_ID_FAIL:
      return {
        ...state,
        detailLoading: false,
        loaded: false,
        error: action.error
      }

    // ----------------------------------------------

    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      }

    // ----------------------------------------------

    case SET_PARAMS:
      return {
        ...state,
        limit: action.options.limit !== undefined
          ? action.options.limit
          : state.limit,
        offset: action.options.offset !== undefined
          ? action.options.offset
          : state.offset,
        filter: action.options.filter !== undefined
          ? action.options.filter
          : state.filter,
        sort: action.options.sort !== undefined
          ? action.options.sort
          : state.sort
      }

    // ----------------------------------------------

    case SUBMIT:
      return {
        ...state,
        submitting: true
      }
    case SUBMIT_SUCCESS:
      return {
        ...state,
        submitting: false
      }
    case SUBMIT_FAIL:
      return {
        ...state,
        submitting: false,
        error: action.error
      }

    // ----------------------------------------------

    case SUBMIT_DELETE:
      return {
        ...state,
        deleting: true
      }
    case SUBMIT_DELETE_SUCCESS:
      return {
        ...state,
        deleting: false
      }
    case SUBMIT_DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        error: action.error
      }

    // ----------------------------------------------

    default:
      return state
  }
}

export const getList = (state, { noLoading } = {}) => {
  const url = `api/posts${routeParams(state, '&include[tag]')}`

  return {
    types: [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAIL],
    promise: client => client.get(url),
    noLoading
  }
}

export const getById = id => ({
  types: [GET_BY_ID, GET_BY_ID_SUCCESS, GET_BY_ID_FAIL],
  promise: client => client.get(`api/posts/${id}?include[tag]&include[city]`)
})

export const setFilter = filter => ({
  type: SET_FILTER,
  filter
})

export const setParams = options => ({
  type: SET_PARAMS,
  options
})

export const createEntity = data => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  promise: client => client.post('api/posts', { data })
})

export const updateEntity = (id, data) => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  promise: client => client.put(`api/posts/${id}`, { data })
})

export const deleteEntity = id => ({
  types: [SUBMIT_DELETE, SUBMIT_DELETE_SUCCESS, SUBMIT_DELETE_FAIL],
  promise: client => client.del(`api/posts/${id}`)
})
