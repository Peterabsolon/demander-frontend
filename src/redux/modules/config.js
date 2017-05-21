import config from 'config'
const LOAD = 'app/config/LOAD'
const LOAD_SUCCESS = 'app/config/LOAD_SUCCESS'
const LOAD_FAIL = 'app/config/LOAD_FAIL'

export function isLoaded() {
  return Boolean(config.configLoaded)
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => {
      return client.get('/config').then(res => {
        config.configLoaded = true
        const keys = Object.keys(res.body)

        keys.forEach(key => {
          config[key] = res.body[key]
        })
        return res
      })
    }
  }
}
