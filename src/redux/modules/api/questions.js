import routeParams from 'helpers/routeParams'
import { PAGE_SIZE } from 'constants/misc'

const GET_QUESTIONS = 'api/questions/GET_QUESTIONS'
const GET_QUESTIONS_SUCCESS = 'api/questions/GET_QUESTIONS_SUCCESS'
const GET_QUESTIONS_FAIL = 'api/questions/GET_QUESTIONS_FAIL'

const GET_QUESTION = 'api/questions/GET_QUESTION'
const GET_QUESTION_SUCCESS = 'api/questions/GET_QUESTION_SUCCESS'
const GET_QUESTION_FAIL = 'api/questions/GET_QUESTION_FAIL'

const SET_FILTER = 'api/questions/SET_FILTER'
const SET_PARAMS = 'api/questions/SET_PARAMS'

const SUBMIT = 'api/questions/SUBMIT'
const SUBMIT_SUCCESS = 'api/questions/SUBMIT_SUCCESS'
const SUBMIT_FAIL = 'api/questions/SUBMIT_FAIL'

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
    case GET_QUESTIONS:
      return {
        ...state,
        listLoading: !action.noLoading
      }
    case GET_QUESTIONS_SUCCESS: {
      return {
        ...state,
        listLoading: false,
        loaded: true,
        list: action.result.rows,
        count: action.result.count
      }
    }
    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        listLoading: false,
        loaded: false,
        error: action.error
      }

    // ----------------------------------------------

    case GET_QUESTION:
      return {
        ...state,
        detailLoading: true
      }
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        loaded: true,
        detail: action.result
      }
    case GET_QUESTION_FAIL:
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
export const getQuestions = (questions, { noLoading } = {}) => {
  const url = `api/questions${routeParams(questions, '&include[tag]')}`

  return {
    types: [GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL],
    promise: client => client.get(url),
    noLoading
  }
}

export const getQuestion = id => ({
  types: [GET_QUESTION, GET_QUESTION_SUCCESS, GET_QUESTION_FAIL],
  promise: client =>
    client.get(`api/questions/${id}?include[tag]&include[city]`)
})

export const setFilter = filter => ({
  type: SET_FILTER,
  filter
})

export const setParams = options => ({
  type: SET_PARAMS,
  options
})

export const createQuestion = data => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  promise: client => client.post('api/questions', { data })
})

export const updateQuestion = (id, data) => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  promise: client => client.put(`api/questions/${id}`, { data })
})
