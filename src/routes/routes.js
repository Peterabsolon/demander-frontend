import React from 'react'
import { get } from 'lodash'
import { IndexRoute, Route } from 'react-router'
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth'
import {
  isLoaded as isConfigLoaded,
  load as loadConfig
} from 'redux/modules/config'
import App from '../app'

import * as Page from 'containers/pages'
import * as Layout from 'containers/layouts'

export default store => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState()

      if (!get(user, 'token')) {
        replace('/login')
      }

      cb()
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth)
    } else {
      checkAuth()
    }
  }

  console.log('requireLogin', requireLogin)

  const preload = (nextState, replaceState, cb) => {
    if (!isConfigLoaded()) {
      store
        .dispatch(loadConfig())
        .then(() => preload(nextState, replaceState, cb))
    } else if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => cb())
    } else {
      cb()
    }
  }

  return (
    <Route path="/" onEnter={preload} component={App}>

      <Route isHome component={Layout.Unauthorized}>
        <IndexRoute component={Page.Home} />
      </Route>

      <Route component={Layout.Unauthorized}>
        <Route path="demands" component={Page.Demands} />
      </Route>

      <Route
        // onEnter={requireLogin}
        component={Layout.Authorized}
      >
        <Route path="vytvorit-otazku" component={Page.QuestionNew} />
        <Route path="otazky" component={Page.Questions}>
          <Route path=":id" component={Page.QuestionDetail} />
        </Route>

        <Route path="vytvorit-clanok" component={Page.PostNew} />
        <Route path="clanky" component={Page.Posts}>
          <Route path=":id" component={Page.PostDetail} />
        </Route>

        <Route path="nastavenia" component={Page.Settings} />
      </Route>

      <Route path="*" component={Page.NotFound} />
    </Route>
  )
}
