import { combineReducers } from 'redux'

import auth from './api/auth'
import categories from './api/categories'
import conversations from './api/conversations'
import companies from './api/companies'
import demands from './api/demands'
import services from './api/services'

export default combineReducers({
  auth,
  categories,
  conversations,
  companies,
  demands,
  services
})
