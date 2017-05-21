import { get } from 'lodash'
import { browserHistory } from 'react-router'

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next =>
      action => {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }

        const { promise, types, ...rest } = action

        if (!promise) {
          return next(action)
        }

        const [REQUEST, SUCCESS, FAILURE] = types
        const store = getState()

        client.token = get(store, 'auth.user.token')
        client.locale = get(store, 'app.locale.code')

        next({ ...rest, type: REQUEST })

        const actionPromise = promise(client)

        actionPromise
          .then(
            ({ body, headers }) =>
              next({ ...rest, result: body || {}, headers, type: SUCCESS }),
            props => {
              const { body = {} } = props
              const parsedBody = typeof body !== 'object'
                ? JSON.parse(body)
                : body

              if (parsedBody.errorCode === 401 && client.unauthorizedAction) {
                browserHistory &&
                  browserHistory.push({
                    pathname: '/login',
                    state: { notAuthorized: true }
                  })
                next({ ...rest, error: body, type: FAILURE })
              } else {
                next({ ...rest, error: body, type: FAILURE })
              }
            }
          )
          .catch(error => {
            console.error('MIDDLEWARE ERROR:', error)
            next({ ...rest, error, type: FAILURE })
          })

        return actionPromise
      }
  }
}
