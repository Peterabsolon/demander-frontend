import memoize from 'lru-memoize'

import { createValidator, required, minLength } from 'utils/validation'

const validator = createValidator({
  title: [required],
  // category_id: [required],
  description: [required, minLength(16)]
})

export default memoize(10)(validator)
