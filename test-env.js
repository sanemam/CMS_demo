// Test environment and database connection
const db = require('./lib/db');

async function testDbConnection() {
  console.log('Testing direct database connection...');
  console.log('SUPABASE_DB_URL:', process.env.SUPABASE_DB_URL ? '✓ Set' : '✗ Missing');
  
  try {
    console.log('\n🔍 Testing query...');
    const res = await db.query('SELECT id, title, description, contenttype, image, externalurl, platform, "createdAt", "updatedAt" FROM public.contents ORDER BY "createdAt" DESC LIMIT 100');
    const rows = res.rows || [];
    console.log('✅ Query successful!');
    console.log('📊 Records found:', rows.length);
    
    if (rows.length > 0) {
      console.log('\n📝 Sample record:');
      console.log(JSON.stringify(rows[0], null, 2));
    }
    
  } catch (err) {
    console.error('❌ Database error:', err.message);
    console.error('Full error:', err);
  }
}

testDbConnection();
