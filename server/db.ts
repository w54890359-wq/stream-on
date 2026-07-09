import pg from 'pg'

    const { Pool } = pg

    const connStr = (process.env.DATABASE_URL || '').replace('channel_binding=require&', '').replace('&channel_binding=require', '')

    export const pool = new Pool({
    connectionString: connStr || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    })
    