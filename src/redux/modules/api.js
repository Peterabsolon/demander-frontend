import { combineReducers } from 'redux'

import common from './api/common'
import questions from './api/questions'
import posts from './api/posts'

export default combineReducers({
  common,
  questions,
  posts
})
