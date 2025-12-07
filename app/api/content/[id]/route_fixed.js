import supabase from '../../../../lib/supabase';
import { readContents, writeContents } from '../../../../lib/storage';
import db from '../../../../lib/db'

export async function GET(request, { params }) {
  try {
    // If a direct DB connection string is provided, use it server-side
    if (db && process.env.SUPABASE_DB_URL) {
      try {
        const res = await db.query('SELECT id, title, description, contenttype, image, externalurl, platform, "createdAt", "updatedAt" FROM public.contents WHERE id = $1', [params.id])
        const row = res.rows && res.rows[0] ? res.rows[0] : null
        if (row) {
          const mapped = {
            id: row.id,
            title: row.title,
            description: row.description ?? row.text ?? null,
            contentType: row.contenttype ?? null,
            image: row.image ?? null,
            externalUrl: row.externalurl ?? null,
            platform: row.platform ?? null,
            createdAt: row.createdAt ?? null,
            updatedAt: row.updatedAt ?? null,
          }
          return new Response(JSON.stringify(mapped), { status: 200 })
        }
      } catch (err) {
        console.error('Direct DB GET failed, falling back to supabase:', err.message || err)
      }
    }

    // If Supabase is configured, try it first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contents')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) {
          console.error('Supabase GET error:', error);
          throw error;
        }
        if (data) {
          const out = {
            id: data.id,
            title: data.title,
            description: data.description ?? data.text ?? null,
            contentType: data.contentType ?? data.contenttype ?? null,
            image: data.image ?? null,
            externalUrl: data.externalUrl ?? data.externalurl ?? null,
            platform: data.platform ?? null,
            createdAt: data.createdAt ?? data.createdat ?? null,
            updatedAt: data.updatedAt ?? data.updatedat ?? null,
          }
          return new Response(JSON.stringify(out), { status: 200 });
        }
      } catch (supabaseError) {
        console.error('Supabase connection failed, falling back to local storage:', supabaseError.message);
      }
    }

    // Fallback to file storage
    const contents = await readContents();
    const content = contents.find(c => c.id === params.id || c._id === params.id);
    if (!content) {
      return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    let body = await request.json();
    
    // Use exact column names as defined in Supabase
    const mappedBody = {
      title: body.title,
      description: body.text || body.description,
      contentType: body.contentType,
      image: body.image || null,
      externalUrl: body.externalUrl || null,
      platform: body.platform || null,
    };

    // If a direct DB connection string is provided, use it server-side for updates
    if (db && process.env.SUPABASE_DB_URL) {
      try {
        // First, get the existing content to preserve contentType
        const getRes = await db.query('SELECT contenttype FROM public.contents WHERE id = $1', [params.id])
        const existingRow = getRes.rows && getRes.rows[0] ? getRes.rows[0] : null
        
        if (!existingRow) {
          return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
        }

        const now = new Date()
        const sql = `UPDATE public.contents SET title = $1, description = $2, contenttype = $3, image = $4, externalurl = $5, platform = $6, "updatedAt" = $7 WHERE id = $8 RETURNING *`
        const values = [
          mappedBody.title, 
          mappedBody.description, 
          existingRow.contenttype,  // Use existing contenttype
          mappedBody.image, 
          mappedBody.externalUrl, 
          mappedBody.platform, 
          now, 
          params.id
        ]
        const res = await db.query(sql, values)
        const row = res.rows && res.rows[0] ? res.rows[0] : null
        if (row) {
          const response = {
            ...row,
            contentType: row.contenttype ?? null,
            externalUrl: row.externalurl ?? null,
            createdAt: row.createdAt ?? null,
            updatedAt: row.updatedAt ?? null,
          }
          return new Response(JSON.stringify(response), { status: 200 })
        }
      } catch (err) {
        console.error('Direct DB PUT failed, falling back to supabase:', err.message || err)
      }
    }
    
    // If Supabase is configured, try it first
    if (supabase) {
      try {
        // Try camelCase update first
        let res = await supabase.from('contents').update(mappedBody).eq('id', params.id).select().single();
        if (res.error) {
          if (res.error.code === 'PGRST204' || String(res.error.message).includes('Could not find')) {
            const lower = {
              title: mappedBody.title,
              description: mappedBody.description,
              contenttype: mappedBody.contentType,
              image: mappedBody.image,
              externalurl: mappedBody.externalUrl,
              platform: mappedBody.platform,
            }
            res = await supabase.from('contents').update(lower).eq('id', params.id).select().single();
          }
        }

        if (res.error) {
          console.error('Supabase PUT error:', res.error);
          throw res.error;
        }
        if (res.data) {
          const data = res.data
          const out = {
            id: data.id,
            title: data.title,
            description: data.description ?? data.text ?? null,
            contentType: data.contentType ?? data.contenttype ?? null,
            image: data.image ?? null,
            externalUrl: data.externalUrl ?? data.externalurl ?? null,
            platform: data.platform ?? null,
            createdAt: data.createdAt ?? data.createdat ?? null,
            updatedAt: data.updatedAt ?? data.updatedat ?? null,
          }
          return new Response(JSON.stringify(out), { status: 200 });
        }
      } catch (supabaseError) {
        console.error('Supabase connection failed, falling back to local storage:', supabaseError.message);
      }
    }

    // Fallback to file storage
    const contents = await readContents();
    const index = contents.findIndex(c => c.id === params.id || c._id === params.id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
    }
    contents[index] = { 
      ...contents[index], 
      ...mappedBody,
      text: mappedBody.description,
      description: undefined
    };
    await writeContents(contents);
    return new Response(JSON.stringify(contents[index]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update content' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // If a direct DB connection string is provided, use it server-side for deletes
    if (db && process.env.SUPABASE_DB_URL) {
      try {
        const sql = `DELETE FROM public.contents WHERE id = $1`
        const values = [params.id]
        const res = await db.query(sql, values)
        return new Response(JSON.stringify({ message: 'Content deleted' }), { status: 200 })
      } catch (err) {
        console.error('Direct DB DELETE failed, falling back to supabase:', err.message || err)
      }
    }

    // If Supabase is configured, use it
    if (supabase) {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', params.id);
      
      if (error) throw error;
      return new Response(JSON.stringify({ message: 'Content deleted' }), { status: 200 });
    }

    // Fallback to file storage
    const contents = await readContents();
    const index = contents.findIndex(c => c.id === params.id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
    }
    1);
    await writeContents(contents);
    return contents.splice(index, new Response(JSON.stringify({ message: 'Content deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete content' }), { status: 500 });
  }
}
