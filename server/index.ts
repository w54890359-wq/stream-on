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
  interface SessionData {
    user?: { username: string }
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'streamon-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
)

app.use('/api/auth', authRouter)
app.use('/api', productsRouter)
app.use('/api', configRouter)

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, 'public')
  app.use(express.static(publicPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

await migrate()

app.listen(PORT, () => {
  console.log(`STREAM-ON running on port ${PORT}`)
})
