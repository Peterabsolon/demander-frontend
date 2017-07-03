import routeParams from 'helpers/routeParams'
// import { PAGE_SIZE } from 'constants/misc'

const GET_SEGMENTS = 'api/segments/GET_SEGMENTS'
const GET_SEGMENTS_SUCCESS = 'api/segments/GET_SEGMENTS_SUCCESS'
const GET_SEGMENTS_FAIL = 'api/segments/GET_SEGMENTS_FAIL'

const GET_CATEGORIES = 'api/segments/GET_CATEGORIES'
const GET_CATEGORIES_SUCCESS = 'api/segments/GET_CATEGORIES_SUCCESS'
const GET_CATEGORIES_FAIL = 'api/segments/GET_CATEGORIES_FAIL'

const GET_SUBCATEGORIES = 'api/segments/GET_SUBCATEGORIES'
const GET_SUBCATEGORIES_SUCCESS = 'api/segments/GET_SUBCATEGORIES_SUCCESS'
const GET_SUBCATEGORIES_FAIL = 'api/segments/GET_SUBCATEGORIES_FAIL'

const initialState = {
  segments: {
    items: [],
    loaded: false,
    loading: false
  },
  categories: {
    items: [],
    loaded: false,
    loading: false
  },
  subcategories: {
    items: [],
    loaded: false,
    loading: false
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SEGMENTS:
      return {
        ...state,
        segments: {
          ...state.segments,
          loading: true
        }
      }
    case GET_SEGMENTS_SUCCESS: {
      return {
        ...state,
        segments: {
          ...state.segments,
          loading: false,
          loaded: true,
          items: action.result
        }
      }
    }
    case GET_SEGMENTS_FAIL:
      return {
        ...state,
        segments: {
          ...state.segments,
          loading: false,
          error: action.error
        }
      }

    // ----------------------------

    case GET_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true
        }
      }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          loaded: true,
          items: action.result
        }
      }
    }
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          error: action.error
        }
      }

    // ----------------------------

    case GET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: {
          ...state.subcategories,
          loading: true
        }
      }
    case GET_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        subcategories: {
          ...state.subcategories,
          loading: false,
          loaded: true,
          items: action.result
        }
      }
    }
    case GET_SUBCATEGORIES_FAIL:
      return {
        ...state,
        subcategories: {
          ...state.subcategories,
          loading: false,
          error: action.error
        }
      }

    // ----------------------------

    default:
      return state
  }
}

export const getSegments = (state, { noLoading } = {}) => {
  const url = `api/segments${routeParams(state, '')}`

  return {
    types: [GET_SEGMENTS, GET_SEGMENTS_SUCCESS, GET_SEGMENTS_FAIL],
    promise: client => client.get(url),
    noLoading
  }
}

export const getCategories = (state, { noLoading } = {}) => {
  const url = `api/segments/categories${routeParams(state, '')}`

  return {
    types: [GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL],
    promise: client => client.get(url),
    noLoading
  }
}

export const getSubcategories = (state, { noLoading } = {}) => {
  const url = `api/segments/subcategories${routeParams(state, '')}`

  return {
    types: [
      GET_SUBCATEGORIES,
      GET_SUBCATEGORIES_SUCCESS,
      GET_SUBCATEGORIES_FAIL
    ],
    promise: client => client.get(url),
    noLoading
  }
}
