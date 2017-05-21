import routeParams from 'helpers/routeParams'
import { PAGE_SIZE } from 'constants/misc'

const GET_POSTS = 'api/posts/GET_POSTS'
const GET_POSTS_SUCCESS = 'api/posts/GET_POSTS_SUCCESS'
const GET_POSTS_FAIL = 'api/posts/GET_POSTS_FAIL'

const GET_POST = 'api/posts/GET_POST'
const GET_POST_SUCCESS = 'api/posts/GET_POST_SUCCESS'
const GET_POST_FAIL = 'api/posts/GET_POST_FAIL'

const SET_FILTER = 'api/posts/SET_FILTER'
const SET_PARAMS = 'api/posts/SET_PARAMS'

const SUBMIT = 'api/posts/SUBMIT'
const SUBMIT_SUCCESS = 'api/posts/SUBMIT_SUCCESS'
const SUBMIT_FAIL = 'api/posts/SUBMIT_FAIL'

const DELETE_POST = 'api/posts/DELETE_POST'
const DELETE_POST_SUCCESS = 'api/posts/DELETE_POST_SUCCESS'
const DELETE_POST_FAIL = 'api/posts/DELETE_POST_FAIL'

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
  submitting: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        listLoading: !action.noLoading
      }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        listLoading: false,
        loaded: true,
        list: action.result.rows,
        count: action.result.count
      }
    }
    case GET_POSTS_FAIL:
      return {
        ...state,
        listLoading: false,
        loaded: false,
        error: action.error
      }

    // ----------------------------------------------

    case GET_POST:
      return {
        ...state,
        detailLoading: true
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        loaded: true,
        detail: action.result
      }
    case GET_POST_FAIL:
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

    default:
      return state
  }
}

/**
 * Actions
 */
export const getPosts = (posts, { noLoading } = {}) => {
  const url = `api/posts${routeParams(posts, '&include[tag]')}`

  return {
    types: [GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL],
    promise: client => client.get(url),
    noLoading
  }
}

export const getPost = id => ({
  types: [GET_POST, GET_POST_SUCCESS, GET_POST_FAIL],
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

export const createPost = data => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  promise: client => client.post('api/posts', { data })
})

export const updatePost = (id, data) => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  promise: client => client.put(`api/posts/${id}`, { data })
})

export const deletePost = id => ({
  types: [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL],
  promise: client => client.del(`api/posts/${id}`)
})
