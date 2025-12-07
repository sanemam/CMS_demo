const { Client } = require('pg');

async function testDirectDatabase() {
  const connectionString = 'postgresql://postgres:Sharavathi@2025@db.hwqkadhjdnjyxjmtthvo.supabase.co:5432/postgres';
  
  const client = new Client({ connectionString });
  
  try {
    console.log('🔗 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    // Check if contents table exists and get its structure
    console.log('\n🔍 Checking contents table structure...');
    const tableQuery = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'contents'
      ORDER BY ordinal_position;
    `;
    
    const tableResult = await client.query(tableQuery);
    console.log('📋 Table structure:');
    tableResult.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type}) - Nullable: ${row.is_nullable}`);
    });
    
    // Check if there's any data in the contents table
    console.log('\n📊 Checking for data...');
    const countQuery = 'SELECT COUNT(*) as total FROM public.contents;';
    const countResult = await client.query(countQuery);
    const totalRecords = parseInt(countResult.rows[0].total);
    console.log(`📈 Total records: ${totalRecords}`);
    
    if (totalRecords > 0) {
      // Get sample data
      console.log('\n📝 Fetching sample records...');
      const dataQuery = `
        SELECT id, title, description, contenttype, image, externalurl, platform, "createdAt", "updatedAt"
        FROM public.contents 
        ORDER BY "createdAt" DESC 
        LIMIT 3;
      `;
      
      const dataResult = await client.query(dataQuery);
      console.log(`✅ Found ${dataResult.rows.length} records`);
      
      dataResult.rows.forEach((row, index) => {
        console.log(`\n--- Record ${index + 1} ---`);
        console.log('ID:', row.id);
        console.log('Title:', row.title);
        console.log('Description:', row.description ? row.description.substring(0, 100) + '...' : 'null');
        console.log('Content Type:', row.contenttype);
        console.log('Image:', row.image);
        console.log('External URL:', row.externalurl);
        console.log('Platform:', row.platform);
        console.log('Created At:', row.createdat);
        console.log('Updated At:', row.updatedat);
      });
    } else {
      console.log('⚠️  No records found in contents table');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Connection closed');
  }
}

testDirectDatabase();
