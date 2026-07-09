import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { migrate } from './migrate.js'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import configRouter from './routes/config.js'

declare module 'express-session' {
  interface SessionData { user?: { username: string } }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))
app.use(session({
  secret: process.env.SESSION_SECRET || 'streamon-dev-secret',
  resave: false, saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, maxAge: 86400000 },
}))

app.use('/api/auth', authRouter)
app.use('/api', productsRouter)
app.use('/api', configRouter)

if (process.env.NODE_ENV === 'production') {
  const pub = path.join(__dirname, 'public')
  app.use(express.static(pub))
  app.get('*', (_req, res) => res.sendFile(path.join(pub, 'index.html')))
}

try { await migrate() } catch(e) { console.error('Migration error:', e) }

app.listen(PORT, '0.0.0.0', () => {
  console.log('STREAM-ON port', PORT)

  // Keep-alive: ping every 14 minutes so Render free tier never sleeps
  if (process.env.NODE_ENV === 'production') {
    const SITE_URL = 'https://stream-on-e9s1.onrender.com/api/config'
    setInterval(async () => {
      try {
        await fetch(SITE_URL)
        console.log('[keep-alive] ping ok')
      } catch (e) {
        console.log('[keep-alive] ping error:', e)
      }
    }, 14 * 60 * 1000)
  }
})
