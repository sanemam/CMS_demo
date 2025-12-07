const { Client } = require('pg');

async function testDirectIdQuery() {
  const connectionString = 'postgresql://postgres:Sharavathi%402025@db.hwqkadhjdnjyxjmtthvo.supabase.co:5432/postgres';
  const contentId = '3528c4ee-4ec0-48d2-b8a8-330c00501fac';
  
  const client = new Client({ connectionString });
  
  try {
    console.log('🔗 Testing direct DB query by ID...');
    await client.connect();
    
    // Test the exact query from the individual route
    const query = 'SELECT id, title, description, contenttype, image, externalurl, platform, "createdAt", "updatedAt" FROM public.contents WHERE id = $1';
    const res = await client.query(query, [contentId]);
    
    console.log('✅ Query successful!');
    console.log('📊 Rows returned:', res.rows.length);
    
    if (res.rows.length > 0) {
      console.log('📝 Found record:');
      console.log(JSON.stringify(res.rows[0], null, 2));
    } else {
      console.log('⚠️  No record found with ID:', contentId);
      
      // Let's check what IDs actually exist
      console.log('\n🔍 Checking all existing IDs...');
      const allQuery = 'SELECT id FROM public.contents LIMIT 5';
      const allRes = await client.query(allQuery);
      console.log('All existing IDs:');
      allRes.rows.forEach(row => console.log('  -', row.id));
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Connection closed');
  }
}

testDirectIdQuery();
