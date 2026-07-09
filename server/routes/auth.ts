import { Router } from 'express'

const router = Router()

const ADMIN_USER = 'streamon001'
const ADMIN_PASS = 'streamon001'

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.user = { username }
    res.json({ ok: true, username })
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true })
  })
})

router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user })
  } else {
    res.status(401).json({ error: 'No autenticado' })
  }
})

export default router
