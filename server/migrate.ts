import { pool } from './db.js'

export async function migrate() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        service TEXT NOT NULL DEFAULT '',
        type TEXT NOT NULL DEFAULT 'cuenta_completa',
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        account_duration TEXT NOT NULL DEFAULT '1 mes',
        guarantee_days INTEGER NOT NULL DEFAULT 30,
        features TEXT[] NOT NULL DEFAULT '{}',
        whatsapp_message TEXT NOT NULL DEFAULT '',
        image_base64 TEXT,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS config (
        id SERIAL PRIMARY KEY,
        site_name TEXT NOT NULL DEFAULT 'STREAM-ON',
        whatsapp_number TEXT NOT NULL DEFAULT '',
        hero_message TEXT NOT NULL DEFAULT 'Con los mejores precios del mercado. Somos de confianza, somos los mejores.',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      INSERT INTO config (id, site_name, whatsapp_number, hero_message)
      VALUES (1, 'STREAM-ON', '', 'Con los mejores precios del mercado. Somos de confianza, somos los mejores.')
      ON CONFLICT (id) DO NOTHING;
    `)
    console.log('Database ready')
  } finally {
    client.release()
  }
}
