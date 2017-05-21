import memoize from 'lru-memoize'

const validator = values => {
  const errors = {}

  if (values.tags && values.tags.length > 0) {
    values.tags.map(value => {
      if (value.name.length > 24) {
        errors.tags = 'Tag môže mať max 24 znakov'
      }
    })
  }

  return errors
}

export default memoize(10)(validator)
