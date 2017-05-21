import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import ApiClient from 'helpers/ApiClient'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { useScroll } from 'react-router-scroll'
import getRoutes from './routes/routes'

const client = new ApiClient()
const dest = document.getElementById('content')
const store = createStore(browserHistory, client, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

if (!global.Intl) {
  require('intl')
  require('intl/locale-data/jsonp/en')
}

if ('serviceWorker' in navigator) {
  // Your service-worker.js *must* be located at the top-level directory relative to your site.
  // It won't be able to control pages unless it's located at the same level or higher than them.
  // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
  // See https://github.com/slightlyoff/ServiceWorker/issues/468
  navigator.serviceWorker.register('/dist/my-service-worker.js').then(reg => {
    // updatefound is fired if service-worker.js changes.
    reg.onupdatefound = () => {
      // The updatefound event implies that reg.installing is set; see
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
      const installingWorker = reg.installing

      installingWorker.onstatechange = () => {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available; please refresh."
              // message in the page's interface.
              console.log('New or updated content is available.')
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.
              console.log('Content is now available offline!')
            }
            break

          case 'redundant':
            console.error('The installing service worker became redundant.')
            break

          default:
            console.log(navigator.serviceWorker.controller)
        }
      }
    }
  }).catch(e => {
    console.error('Error during service worker registration:', e)
  })
}

const component = (
  <Router
    render={props =>
      <ReduxAsyncConnect
        {...props}
        helpers={{ client }}
        filter={item => !item.deferred}
        render={applyRouterMiddleware(useScroll())}
      />
    }
    history={history}
  >
    {getRoutes(store)}
  </Router>
)

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
)

if (process.env.NODE_ENV !== 'production') {
  const Perf = require('react-addons-perf')

  window.React = React
  window.Perf = Perf

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./redux/DevTools')

  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  )
}
