const { createClient } = require('@supabase/supabase-js');

// Read environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl ? '✓ Present' : '✗ Missing');
console.log('Key:', supabaseKey ? '✓ Present' : '✗ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔍 Testing contents table...');
    
    // Test basic query
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('❌ Query error:', error);
      return;
    }
    
    console.log('✅ Query successful!');
    console.log('📊 Records found:', data?.length || 0);
    
    if (data && data.length > 0) {
      console.log('\n📝 Sample record:');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('\n⚠️  No records found in contents table');
    }
    
    // Test table structure
    console.log('\n🔍 Testing table structure...');
    const { data: structure, error: structError } = await supabase
      .from('contents')
      .select('id')
      .limit(1);
    
    if (structError) {
      console.error('❌ Structure test failed:', structError);
    } else {
      console.log('✅ Table accessible');
    }
    
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
  }
}

testConnection();
