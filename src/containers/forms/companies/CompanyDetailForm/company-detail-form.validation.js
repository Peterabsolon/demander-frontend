import memoize from 'lru-memoize'

import { createValidator, required } from 'utils/validation'

const validator = createValidator({
  company_name: [required],
  // category_id: [required],
  web_url: [required],
  company_description: [required],
  contact_email: [required],
  contact_person: [required]
})

export default memoize(10)(validator)
