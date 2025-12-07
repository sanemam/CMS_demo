import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ 
        error: 'Missing Supabase credentials',
        url: supabaseUrl ? 'present' : 'missing',
        key: supabaseKey ? 'present' : 'missing'
      }), { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try several select variants to discover which column names work
    const attempts = [];

    const variants = [
      { name: 'select_all', cols: '*' },
      { name: 'lowercase_columns', cols: 'id,title,description,contenttype,image,externalurl,platform,createdat,updatedat' },
      { name: 'camelcase_unquoted', cols: 'id,title,description,contentType,image,externalUrl,platform,createdAt,updatedAt' },
      { name: 'camelcase_quoted', cols: '"id","title","description","contentType","image","externalUrl","platform","createdAt","updatedAt"' },
    ];

    for (const v of variants) {
      try {
        const res = await supabase.from('contents').select(v.cols).limit(3);
        // supabase-js returns { data, error }
        if (res.error) {
          attempts.push({ variant: v.name, ok: false, error: { code: res.error.code, message: res.error.message, hint: res.error.hint } });
        } else {
          attempts.push({ variant: v.name, ok: true, count: res.data ? res.data.length : 0, sample: res.data && res.data.length ? res.data[0] : null, keys: res.data && res.data.length ? Object.keys(res.data[0]) : [] });
        }
      } catch (err) {
        attempts.push({ variant: v.name, ok: false, error: String(err) });
      }
    }

    return new Response(JSON.stringify({ success: true, attempts }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Server error',
      message: error.message
    }), { status: 500 });
  }
}
