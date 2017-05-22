import { combineReducers } from 'redux'

import common from './api/common'
import questions from './api/questions'
import categories from './api/categories'
import services from './api/services'
import demands from './api/demands'
import companies from './api/companies'
import posts from './api/posts'

export default combineReducers({
  services,
  categories,
  demands,
  common,
  companies,
  questions,
  posts
})
