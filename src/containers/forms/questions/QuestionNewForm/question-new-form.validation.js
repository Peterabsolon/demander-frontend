import memoize from 'lru-memoize'

import { createValidator, required } from 'utils/validation'

const validator = createValidator({
  author: [required],
  title: [required],
  text: [required],
  availableTo: [required]
})

export default memoize(10)(validator)
