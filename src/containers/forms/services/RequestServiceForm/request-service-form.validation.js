import memoize from 'lru-memoize'

import { createValidator, required, minLength } from 'utils/validation'

const validator = createValidator({
  message: [required, minLength(16)]
})

export default memoize(10)(validator)
