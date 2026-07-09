import pg from 'pg'
const { Pool } = pg
const url = (process.env.DATABASE_URL || '').replace(/[&?]channel_binding=require/g, '')
export const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } })
