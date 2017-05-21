import memoize from 'lru-memoize'

import {
  createValidator,
  required,
  isValidUrl,
  requiredUrl
} from 'utils/validation'

const validator = createValidator({
  author: [required],
  title: [required],
  contentUrl: [required, isValidUrl, requiredUrl],
  imageUrl: [required, isValidUrl]
})

export default memoize(10)(validator)
