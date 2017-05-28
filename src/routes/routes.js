import React from 'react'
import { get } from 'lodash'
import { IndexRoute, Route } from 'react-router'
import {
  isLoaded as isAuthLoaded,
  load as loadAuth
} from 'redux/modules/api/auth'
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
        <Route path="prihlaseni" component={Page.Login} />
        <Route path="registrace" component={Page.Signup} />

        {/* COMPANIES */}
        <Route path="dodavatele">
          <IndexRoute component={Page.Companies} />
          <Route path="vytvorit" component={Page.CompanyNew} />
          <Route path=":id">
            <IndexRoute component={Page.CompanyDetail} />
            <Route path="upravit" component={Page.CompanyEdit} />
          </Route>
        </Route>

        {/* SERVICES */}
        <Route path="sluzby">
          <IndexRoute component={Page.Services} />
          <Route path="pridat" component={Page.ServiceNew} />
          <Route path=":id">
            <IndexRoute component={Page.ServiceDetail} />
            <Route path="upravit" component={Page.ServiceEdit} />
          </Route>
        </Route>

        {/* DEMANDS */}
        <Route path="poptavky">
          <IndexRoute component={Page.Demands} />
          <Route path="vytvorit" component={Page.DemandNew} />
          <Route path=":id">
            <IndexRoute component={Page.DemandDetail} />
            <Route path="upravit" component={Page.DemandEdit} />
          </Route>
        </Route>
      </Route>

      <Route onEnter={requireLogin} component={Layout.Authorized}>
        <Route path="loggedIn" />
      </Route>

      <Route path="*" component={Page.NotFound} />
    </Route>
  )
}
