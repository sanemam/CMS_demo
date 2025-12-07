import supabase from '../../../lib/supabase';

export async function GET() {
  try {
    if (!supabase) {
      return new Response(JSON.stringify({ error: 'Supabase not initialized' }), { status: 500 });
    }

    // Try to get the table info by attempting to get a single row
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .limit(1);

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'Failed to query table', 
        details: error,
        message: error.message,
        code: error.code
      }), { status: 400 });
    }

    // If we got here, get all columns using information_schema
    const { data: columns, error: colError } = await supabase
      .rpc('get_table_columns', { table_name: 'contents' })
      .catch(e => ({ data: null, error: e }));

    return new Response(JSON.stringify({
      status: 'success',
      sample_data: data,
      sample_count: data ? data.length : 0,
      columns: columns,
      note: 'Sample query worked - table exists',
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
