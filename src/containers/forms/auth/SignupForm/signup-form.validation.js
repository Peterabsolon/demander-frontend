import memoize from 'lru-memoize'

import {
  createValidator,
  required,
  email,
  minLength,
  match
} from 'utils/validation'

const validator = createValidator({
  email: [required, email],
  password: [required, minLength(6)],
  passwordConfirm: [
    required,
    minLength(6),
    match('password', 'Hesla se neshodují')
  ]
})

export default memoize(10)(validator)
