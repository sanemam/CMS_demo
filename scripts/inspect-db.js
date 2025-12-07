const { Client } = require('pg')

async function main() {
  const conn = process.env.SUPABASE_DB_URL
  if (!conn) {
    console.error(JSON.stringify({ error: 'MISSING_ENV', message: 'Please set SUPABASE_DB_URL environment variable before running this script.' }))
    process.exit(2)
  }

  const client = new Client({ connectionString: conn })
  try {
    await client.connect()

    const columnsRes = await client.query(
      `SELECT column_name, data_type, is_nullable, column_default
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'contents'
       ORDER BY ordinal_position;`
    )

    const rlsRes = await client.query(
      `SELECT relrowsecurity
       FROM pg_class
       WHERE relname = 'contents';`
    )

    const result = {
      columns: columnsRes.rows,
      rls: rlsRes.rows && rlsRes.rows[0] ? rlsRes.rows[0].relrowsecurity : null
    }

    console.log(JSON.stringify({ success: true, result }, null, 2))
    await client.end()
    process.exit(0)
  } catch (err) {
    console.error(JSON.stringify({ error: 'QUERY_FAILED', message: err.message, stack: err.stack }))
    try { await client.end() } catch (_) {}
    process.exit(1)
  }
}

main()
