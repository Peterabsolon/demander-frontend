const GET_CITIES = 'api/common/GET_CITIES'
const GET_CITIES_SUCCESS = 'api/common/GET_CITIES_SUCCESS'
const GET_CITIES_FAIL = 'api/common/GET_CITIES_FAIL'

const GET_TAGS = 'api/common/GET_TAGS'
const GET_TAGS_SUCCESS = 'api/common/GET_TAGS_SUCCESS'
const GET_TAGS_FAIL = 'api/common/GET_TAGS_FAIL'

const CREATE_TAG = 'api/common/CREATE_TAG'
const CREATE_TAG_SUCCESS = 'api/common/CREATE_TAG_SUCCESS'
const CREATE_TAG_FAIL = 'api/common/CREATE_TAG_FAIL'

const DELETE_TAG = 'api/common/DELETE_TAG'
const DELETE_TAG_SUCCESS = 'api/common/DELETE_TAG_SUCCESS'
const DELETE_TAG_FAIL = 'api/common/DELETE_TAG_FAIL'

const initialState = {
  cities: {
    loading: false,
    loaded: false,
    list: []
  },
  tags: {
    loading: false,
    loaded: false,
    list: []
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    /**
     * Data from here is not used because we search cities by term
     * <Select /> handles async, debounce and data normalization internally
     */
    case GET_CITIES:
      return {
        ...state,
        cities: {
          ...state.cities,
          loading: false
        }
      }
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: {
          list: action.result.items,
          loading: false,
          loaded: true
        }
      }
    case GET_CITIES_FAIL:
      return {
        ...state,
        cities: {
          error: action.error,
          loading: false
        }
      }

    // ---------------------------------------------

    case GET_TAGS:
      return {
        ...state,
        tags: {
          ...state.tags,
          loading: false
        }
      }
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: {
          list: action.result.items,
          loading: false,
          loaded: true
        }
      }
    case GET_TAGS_FAIL:
      return {
        ...state,
        tags: {
          error: action.error,
          loading: false
        }
      }

    // ----------------------------------------------

    case CREATE_TAG:
      return {
        ...state,
        submitting: true
      }
    case CREATE_TAG_SUCCESS:
      return {
        ...state,
        submitting: false
      }
    case CREATE_TAG_FAIL:
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

export function getCities(searchTerm) {
  const url = `api/cities?$filter=startswith(name,'${searchTerm}')`

  return {
    types: [GET_CITIES, GET_CITIES_SUCCESS, GET_CITIES_FAIL],
    promise: client => client.get(url)
  }
}

export function getTags() {
  return {
    types: [GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAIL],
    promise: client => client.get('api/tags')
  }
}

export const createTag = data => ({
  types: [CREATE_TAG, CREATE_TAG_SUCCESS, CREATE_TAG_FAIL],
  promise: client => client.post('api/tags', { data })
})

export const deleteTag = id => ({
  types: [DELETE_TAG, DELETE_TAG_SUCCESS, DELETE_TAG_FAIL],
  promise: client => client.del(`api/tags/${id}`)
})
