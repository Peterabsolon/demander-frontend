import { get } from 'lodash'

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
        const token = get(store.auth, 'user.token', false)

        client.token = token

        next({ ...rest, type: REQUEST })

        const actionPromise = promise(client)

        actionPromise
          .then(
            result => {
              console.log('wtf')

              return next({
                ...rest,
                result: result.body || {},
                headers: result.headers,
                type: SUCCESS
              })
            },
            error => next({ ...rest, error, type: FAILURE })
          )
          .catch(error => {
            console.error('MIDDLEWARE ERROR:', error)
            next({ ...rest, error, type: FAILURE })
          })

        return actionPromise
      }
  }
}
