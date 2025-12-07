const { Pool } = require('pg')

const connectionString = process.env.SUPABASE_DB_URL || ''

let pool = null
if (connectionString) {
  pool = new Pool({ connectionString })
}

async function query(text, params) {
  if (!pool) throw new Error('Database pool not configured')
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}

module.exports = { query, pool }
