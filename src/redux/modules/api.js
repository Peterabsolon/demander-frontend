import { combineReducers } from 'redux'

import categories from './api/categories'
import services from './api/services'
import demands from './api/demands'
import companies from './api/companies'

export default combineReducers({
  services,
  categories,
  demands,
  companies
})
