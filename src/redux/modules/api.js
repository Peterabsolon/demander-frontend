import { combineReducers } from 'redux'

import common from './api/common'
import questions from './api/questions'
import companies from './api/companies'
import posts from './api/posts'

export default combineReducers({
  common,
  companies,
  questions,
  posts
})
