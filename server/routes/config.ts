import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../db.js'

const router = Router()

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) return next()
  res.status(401).json({ error: 'No autorizado' })
}

router.get('/config', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM config WHERE id=1')
  res.json(rows[0] ? {
    id: rows[0].id,
    siteName: rows[0].site_name,
    whatsappNumber: rows[0].whatsapp_number,
    heroMessage: rows[0].hero_message,
  } : {})
})

router.put('/admin/config', requireAuth, async (req, res) => {
  const { siteName, whatsappNumber, heroMessage } = req.body
  const { rows } = await pool.query(
    `UPDATE config SET site_name=$1, whatsapp_number=$2, hero_message=$3, updated_at=NOW()
     WHERE id=1 RETURNING *`,
    [siteName || 'STREAM-ON', whatsappNumber || '', heroMessage || '']
  )
  res.json({
    id: rows[0].id,
    siteName: rows[0].site_name,
    whatsappNumber: rows[0].whatsapp_number,
    heroMessage: rows[0].hero_message,
  })
})

export default router
