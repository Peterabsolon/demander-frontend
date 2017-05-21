require('babel-polyfill')
const ip = require('ip')

const environment = {
  development: {
    isProduction: false,
    apiURL: process.env.API_URL || 'http://localhost:8000',
    apiURLfromServer: process.env.API_URL_FROM_SERVER ||
      process.env.API_URL ||
      'http://localhost:8000',
    openBrowserAfterBuild: false,
    host: ip.address(),
    autoLogin: false,
    debug: true,
    tempUser: {
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE0OTk4LCJoYXNoIjoiNGE0NjM2YTljMzg5OTdmOGU2YjQxOTljNjE5OWFjZDZhZGRkYWY4MzA5YzM1NGNiMTMyODhjYjU3YTZiZjU0ZSIsImlhdCI6MTQ2Mjg2NzQ4NSwiZXhwIjoxNDYyODg1NDg1fQ.MQRFIvC9Zol8NcpY0jcuUf3C-_k9B_4gu6p34K_rEhM',
      id: 6,
      email: 'dummy@dumm.com',
      firstName: 'Dummy',
      lastName: 'Dumm'
    },
    webAppAddress: 'https://dofe-web-development.herokuapp.com'
  },
  production: {
    isProduction: true,
    apiURL: process.env.API_URL || 'http://localhost:8000',
    apiURLfromServer: process.env.API_URL_FROM_SERVER ||
      process.env.API_URL ||
      'http://localhost:8000',
    host: process.env.HOST || ip.address(),
    webAppAddress: 'https://dofe-web-development.herokuapp.com'
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign(
  {
    port: process.env.PORT
  },
  environment
)
