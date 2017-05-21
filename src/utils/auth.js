import { Router } from 'express'
import request from 'request'
import config from 'config'

const router = new Router()

router.post('/save-user', (req, res) => {
  req.session.user = req.body
  res.json(req.session.user)
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  return res.json({})
})

router.get('/loadAuth', (req, res) => {
  res.json((req.session && req.session.user) || null)
})

router.post('/authenticate', (req, res) => {
  request.post({ url: `${config.apiURLfromServer}/authenticate`,
    form: {
      ...req.body,
      client_secret: process.env.CLIENT_SECRET //eslint-disable-line
    }
  }, (err, httpResponse, body) => {
    if (err) {
      console.log(err)
    }
    res.status(httpResponse.statusCode).send(body)
  })
})

export default router
