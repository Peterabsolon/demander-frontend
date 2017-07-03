import { combineReducers } from 'redux'

import auth from './api/auth'
import segments from './api/segments'
import conversations from './api/conversations'
import companies from './api/companies'
import demands from './api/demands'
import services from './api/services'

export default combineReducers({
  auth,
  segments,
  conversations,
  companies,
  demands,
  services
})
