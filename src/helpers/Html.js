import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props
    const content = component ? ReactDOM.renderToString(component) : ''
    const head = Helmet.rewind()

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-16x16.png"
            sizes="16x16"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* <link
            href="https://fonts.googleapis.com/css?family=Merriweather:900&amp;subset=latin-ext"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Nunito:400,600,800&amp;subset=latin-ext"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link rel="stylesheet" type="text/css" href="/dist/iconfont.css" />
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${serialize(store.getState())};`
            }}
            charSet="UTF-8"
          />

          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
          {__DEVELOPMENT__ && [
            <script
              key="dlls__vendor"
              src="/dist/dlls/dll__vendor.js"
              charSet="UTF-8"
            />
          ]}

          {!__DEVELOPMENT__ && [
            <script src={assets.javascript.vendor} charSet="UTF-8" />
          ]}

          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    )
  }
}
