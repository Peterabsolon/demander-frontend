import _ from 'lodash'
import isUrl from 'is-url'

// const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const isEmpty = value =>
  value === undefined ||
  value === null ||
  value === '' ||
  _.isEmpty(value) ||
  value === ' '
const isPhoneEmpty = value =>
  value === undefined || value === null || value === '' || value === '+'
const join = rules =>
  (value, data) =>
    rules.map(rule => rule(value, data)).filter(error => Boolean(error))[0]

const checkEmail = value => {
  return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  )
}

// export function phone(value = '') {
//   let isValid = true
//
//   if (isEmpty(value)) {
//     return
//   }
//
//   value = value.replace(/[^0-9]/g, '')
//   value = `+${value}`
//
//   try {
//     value = phoneUtil.parse(value, '')
//     isValid = phoneUtil.isValidNumber(value)
//     if (!isValid) {
//       return {
//         text: 'Invalid phone format',
//         intlKey: 'errors.invalid_phone_format',
//         values: {}
//       }
//     }
//   } catch (e) {
//     return {
//       text: 'Invalid phone format',
//       intlKey: 'errors.invalid_phone_format',
//       values: {}
//     }
//   }
// }

export function email(value) {
  if (!isEmpty(value) && checkEmail(value)) {
    return {
      text: 'Neplatná emailová adresa',
      intlKey: 'errors.invalid_email_address',
      values: {}
    }
  }
}

export function isEmail(value) {
  if (!isEmpty(value) && checkEmail(value)) {
    return false
  }
  return true
}

export function required(value) {
  if (isEmpty(value)) {
    return {
      text: 'Povinné pole',
      intlKey: 'errors.required_field',
      values: {}
    }
  }
}

export function requiredPhone(value) {
  if (isPhoneEmpty(value)) {
    return {
      text: 'Required field',
      intlKey: 'errors.required_field',
      values: {}
    }
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return {
        text: 'Min {min} znakov',
        intlKey: 'errors.must_be_at_least',
        values: { min }
      }
    }
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return {
        text: 'Must be no more than {max} characters',
        intlKey: 'errors.must_be_no_more_than',
        values: { max }
      }
    }
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return {
      text: 'Must be an integer',
      intlKey: 'errors.must_be_an_integer',
      values: {}
    }
  }
}

export function oneOf(enumeration) {
  return value => {
    if (enumeration.indexOf(value) !== -1) {
      return {
        text: 'Must be one of: {enums}',
        intlKey: 'errors.must_be_one_of',
        values: { enums: enumeration.join(', ') }
      }
    }
  }
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return {
          text: 'Do not match',
          intlKey: 'errors.do_not_match'
        }
      }
    }
  }
}

export function moreThan(limit) {
  return value => {
    if (value <= limit) {
      return {
        text: 'Must be more than {limit}',
        intlKey: 'errors.must_be_more_than',
        values: {
          limit
        }
      }
    }
  }
}

export function logsMin(limit) {
  return value => {
    if (value < limit) {
      return {
        text: 'Minimal duration is 30 min',
        intlKey: 'errors.minimal_duration_is',
        values: {
          limit
        }
      }
    }
  }
}

export function requiredUrl(value) {
  if (value === 'http://' || value === 'https://') {
    return {
      text: 'Prázdna URL'
    }
  }
}

export function isValidUrl(value) {
  if (value && !isUrl(value)) {
    return {
      text: 'Neplatná URL',
      intlKey: 'errors.invalid_url'
    }
  }
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {}

    Object.keys(rules).forEach(key => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]))
      const error = rule(data[key], data)

      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}
