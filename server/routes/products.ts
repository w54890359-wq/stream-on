import { Router, Request, Response, NextFunction } from 'express'
    import { pool } from '../db.js'

    const router = Router()

    function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) return next()
    res.status(401).json({ error: 'No autorizado' })
    }

    function rowToProduct(row: Record<string, unknown>) {
    return {
      id: row.id,
      name: row.name,
      service: row.service,
      type: row.type,
      price: parseFloat(row.price as string),
      accountDuration: row.account_duration,
      guaranteeDuration: row.guarantee_duration,
      features: row.features || [],
      whatsappMessage: row.whatsapp_message,
      imageBase64: row.image_base64 || null,
      active: row.active,
      createdAt: row.created_at,
    }
    }

    // Public: list active products
    router.get('/products', async (_req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE active=true ORDER BY created_at DESC'
    )
    res.json(rows.map(rowToProduct))
    })

    // Admin: list all products
    router.get('/admin/products', requireAuth, async (_req, res) => {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC')
    res.json(rows.map(rowToProduct))
    })

    // Admin: create product
    router.post('/admin/products', requireAuth, async (req, res) => {
    const {
      name, service, type, price, accountDuration,
      guaranteeDuration, features, whatsappMessage, imageBase64
    } = req.body

    const featuresArr = Array.isArray(features)
      ? features
      : typeof features === 'string'
      ? features.split('\n').map((f: string) => f.trim()).filter(Boolean)
      : []

    const { rows } = await pool.query(
      `INSERT INTO products (name, service, type, price, account_duration, guarantee_duration, features, whatsapp_message, image_base64)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [name, service || '', type || 'cuenta_completa', price || 0,
       accountDuration || '1 mes', guaranteeDuration || '30 días',
       featuresArr, whatsappMessage || '', imageBase64 || null]
    )
    res.status(201).json(rowToProduct(rows[0]))
    })

    // Admin: update product
    router.put('/admin/products/:id', requireAuth, async (req, res) => {
    const id = parseInt(req.params.id as string, 10)
    const {
      name, service, type, price, accountDuration,
      guaranteeDuration, features, whatsappMessage, imageBase64, active
    } = req.body

    const featuresArr = Array.isArray(features)
      ? features
      : typeof features === 'string'
      ? features.split('\n').map((f: string) => f.trim()).filter(Boolean)
      : []

    const { rows } = await pool.query(
      `UPDATE products SET
        name=$1, service=$2, type=$3, price=$4, account_duration=$5,
        guarantee_duration=$6, features=$7, whatsapp_message=$8,
        image_base64=COALESCE($9, image_base64),
        active=$10, updated_at=NOW()
       WHERE id=$11 RETURNING *`,
      [name, service || '', type || 'cuenta_completa', price,
       accountDuration || '1 mes', guaranteeDuration || '30 días',
       featuresArr, whatsappMessage || '',
       imageBase64 || null, active !== undefined ? active : true, id]
    )
    if (!rows[0]) { res.status(404).json({ error: 'No encontrado' }); return }
    res.json(rowToProduct(rows[0]))
    })

    // Admin: toggle active
    router.patch('/admin/products/:id/toggle', requireAuth, async (req, res) => {
    const id = parseInt(req.params.id as string, 10)
    const { rows } = await pool.query(
      'UPDATE products SET active = NOT active, updated_at=NOW() WHERE id=$1 RETURNING *',
      [id]
    )
    if (!rows[0]) { res.status(404).json({ error: 'No encontrado' }); return }
    res.json(rowToProduct(rows[0]))
    })

    // Admin: delete product
    router.delete('/admin/products/:id', requireAuth, async (req, res) => {
    const id = parseInt(req.params.id as string, 10)
    await pool.query('DELETE FROM products WHERE id=$1', [id])
    res.status(204).send()
    })

    export default router
    