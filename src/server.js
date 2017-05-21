import Express from 'express'
import config from './config'
import favicon from 'serve-favicon'
import compression from 'compression'
import httpProxy from 'http-proxy'
import path from 'path'
import http from 'http'
import open from 'open'
import bodyParser from 'body-parser'

/*
 * Auth
 */
const Auth = require('./utils/auth')
const Config = require('./utils/config')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

/*
 * Views
 */
import mainView from './index'

const app = new Express()
const server = new http.Server(app)

const targetUrl = 'http://' + config.host + ':' + config.port

httpProxy.createProxyServer({
  target: targetUrl,
  ws: false
})

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

app.use(Express.static(path.join(__dirname, '..', 'static')))

app.use(
  session({
    store: new RedisStore({
      url: process.env.REDIS_URL,
      ttl: 100000000
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100000000 }
  })
)

app.use(Auth)
app.use(Config)
app.use(mainView)

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err)
    }
    console.info(
      '==> 💻  Open http://%s:%s in a browser to view the app.',
      config.host,
      config.port
    )
    if (config.openBrowserAfterBuild) {
      setTimeout(() => open('http://localhost:3000'), 2000)
    }
  })
} else {
  console.error(
    '==>     ERROR: No PORT environment variable has been specified'
  )
}
