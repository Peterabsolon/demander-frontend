import { Router } from 'express'

const router = new Router()

router.get('/config', (req, res) => {
  res.json({
    API_URL: process.env.API_URL
  })
})

export default router
