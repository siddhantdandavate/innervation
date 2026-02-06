import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

// Simple hash function for password (in production, use bcrypt via edge function)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'innervation_salt_2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const inputHash = await hashPassword(password)
  return inputHash === hash
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { action, ...params } = await req.json()
    console.log(`CMS Admin action: ${action}`)

    switch (action) {
      // ============ AUTH ============
      case 'setup': {
        // First-time setup - create admin password
        const { password } = params
        if (!password || password.length < 6) {
          return new Response(
            JSON.stringify({ error: 'Password must be at least 6 characters' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Check if admin already exists
        const { data: existing } = await supabase
          .from('cms_admin_settings')
          .select('id')
          .limit(1)

        if (existing && existing.length > 0) {
          return new Response(
            JSON.stringify({ error: 'Admin already setup' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const hash = await hashPassword(password)
        const { error } = await supabase
          .from('cms_admin_settings')
          .insert({ admin_password_hash: hash })

        if (error) throw error

        console.log('Admin setup complete')
        return new Response(
          JSON.stringify({ success: true, message: 'Admin setup complete' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'login': {
        const { password } = params
        if (!password) {
          return new Response(
            JSON.stringify({ error: 'Password required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const { data: admin } = await supabase
          .from('cms_admin_settings')
          .select('admin_password_hash')
          .limit(1)
          .single()

        if (!admin) {
          return new Response(
            JSON.stringify({ error: 'Admin not setup', needsSetup: true }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const valid = await verifyPassword(password, admin.admin_password_hash)
        if (!valid) {
          console.log('Invalid password attempt')
          return new Response(
            JSON.stringify({ error: 'Invalid password' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Generate session token
        const token = crypto.randomUUID()
        console.log('Admin login successful')
        
        return new Response(
          JSON.stringify({ success: true, token }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'check-setup': {
        const { data: admin } = await supabase
          .from('cms_admin_settings')
          .select('id')
          .limit(1)

        return new Response(
          JSON.stringify({ needsSetup: !admin || admin.length === 0 }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'change-password': {
        const { currentPassword, newPassword } = params
        
        const { data: admin } = await supabase
          .from('cms_admin_settings')
          .select('id, admin_password_hash')
          .limit(1)
          .single()

        if (!admin) {
          return new Response(
            JSON.stringify({ error: 'Admin not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const valid = await verifyPassword(currentPassword, admin.admin_password_hash)
        if (!valid) {
          return new Response(
            JSON.stringify({ error: 'Current password is incorrect' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const newHash = await hashPassword(newPassword)
        const { error } = await supabase
          .from('cms_admin_settings')
          .update({ admin_password_hash: newHash })
          .eq('id', admin.id)

        if (error) throw error

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // ============ CONTENT ============
      case 'get-all-content': {
        const { data, error } = await supabase
          .from('cms_content')
          .select('*')
          .order('section_key')

        if (error) throw error
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'update-content': {
        const { sectionKey, content } = params
        
        // Get current content for history
        const { data: current } = await supabase
          .from('cms_content')
          .select('*')
          .eq('section_key', sectionKey)
          .single()

        const { data, error } = await supabase
          .from('cms_content')
          .update({ content })
          .eq('section_key', sectionKey)
          .select()
          .single()

        if (error) throw error

        // Save to history
        await supabase.from('cms_history').insert({
          entity_type: 'content',
          entity_id: data.id,
          action: 'update',
          previous_data: current,
          new_data: data,
          description: `Updated ${sectionKey} content`
        })

        console.log(`Content updated: ${sectionKey}`)
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // ============ THEME ============
      case 'get-theme': {
        const { data, error } = await supabase
          .from('cms_theme')
          .select('*')
          .eq('is_active', true)
          .single()

        if (error && error.code !== 'PGRST116') throw error
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'update-theme': {
        const { colors } = params

        const { data: current } = await supabase
          .from('cms_theme')
          .select('*')
          .eq('is_active', true)
          .single()

        const { data, error } = await supabase
          .from('cms_theme')
          .update({ colors })
          .eq('is_active', true)
          .select()
          .single()

        if (error) throw error

        // Save to history
        await supabase.from('cms_history').insert({
          entity_type: 'theme',
          entity_id: data.id,
          action: 'update',
          previous_data: current,
          new_data: data,
          description: 'Updated theme colors'
        })

        console.log('Theme updated')
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // ============ BLOGS ============
      case 'get-all-blogs': {
        const { data, error } = await supabase
          .from('cms_blogs')
          .select('*')
          .eq('is_deleted', false)
          .order('created_at', { ascending: false })

        if (error) throw error
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'create-blog': {
        const { title, content, excerpt, featured_image, is_published, meta_title, meta_description } = params
        
        // Generate slug
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')

        const { data, error } = await supabase
          .from('cms_blogs')
          .insert({
            title,
            slug,
            content,
            excerpt,
            featured_image,
            is_published,
            meta_title: meta_title || title,
            meta_description: meta_description || excerpt,
            published_at: is_published ? new Date().toISOString() : null
          })
          .select()
          .single()

        if (error) throw error

        // Save to history
        await supabase.from('cms_history').insert({
          entity_type: 'blog',
          entity_id: data.id,
          action: 'create',
          new_data: data,
          description: `Created blog: ${title}`
        })

        console.log(`Blog created: ${title}`)
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'update-blog': {
        const { id, ...updates } = params

        const { data: current } = await supabase
          .from('cms_blogs')
          .select('*')
          .eq('id', id)
          .single()

        // Update slug if title changed
        if (updates.title && updates.title !== current?.title) {
          updates.slug = updates.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }

        // Set published_at if publishing
        if (updates.is_published && !current?.published_at) {
          updates.published_at = new Date().toISOString()
        }

        const { data, error } = await supabase
          .from('cms_blogs')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error

        // Save to history
        await supabase.from('cms_history').insert({
          entity_type: 'blog',
          entity_id: data.id,
          action: 'update',
          previous_data: current,
          new_data: data,
          description: `Updated blog: ${data.title}`
        })

        console.log(`Blog updated: ${data.title}`)
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'delete-blog': {
        const { id } = params

        const { data: current } = await supabase
          .from('cms_blogs')
          .select('*')
          .eq('id', id)
          .single()

        // Soft delete
        const { error } = await supabase
          .from('cms_blogs')
          .update({ is_deleted: true })
          .eq('id', id)

        if (error) throw error

        // Save to history
        await supabase.from('cms_history').insert({
          entity_type: 'blog',
          entity_id: id,
          action: 'delete',
          previous_data: current,
          description: `Deleted blog: ${current?.title}`
        })

        console.log(`Blog deleted: ${current?.title}`)
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'restore-blog': {
        const { id } = params

        const { data, error } = await supabase
          .from('cms_blogs')
          .update({ is_deleted: false })
          .eq('id', id)
          .select()
          .single()

        if (error) throw error

        // Save to history
        await supabase.from('cms_history').insert({
          entity_type: 'blog',
          entity_id: id,
          action: 'restore',
          new_data: data,
          description: `Restored blog: ${data.title}`
        })

        console.log(`Blog restored: ${data.title}`)
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // ============ HISTORY ============
      case 'get-history': {
        const { entityType, limit = 50 } = params

        let query = supabase
          .from('cms_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit)

        if (entityType) {
          query = query.eq('entity_type', entityType)
        }

        const { data, error } = await query

        if (error) throw error
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'revert-to-version': {
        const { historyId } = params

        const { data: history } = await supabase
          .from('cms_history')
          .select('*')
          .eq('id', historyId)
          .single()

        if (!history || !history.previous_data) {
          return new Response(
            JSON.stringify({ error: 'Cannot revert - no previous data' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        let result
        if (history.entity_type === 'content') {
          result = await supabase
            .from('cms_content')
            .update({ content: history.previous_data.content })
            .eq('id', history.entity_id)
            .select()
            .single()
        } else if (history.entity_type === 'theme') {
          result = await supabase
            .from('cms_theme')
            .update({ colors: history.previous_data.colors })
            .eq('id', history.entity_id)
            .select()
            .single()
        } else if (history.entity_type === 'blog') {
          result = await supabase
            .from('cms_blogs')
            .update(history.previous_data)
            .eq('id', history.entity_id)
            .select()
            .single()
        }

        if (result?.error) throw result.error

        // Save revert to history
        await supabase.from('cms_history').insert({
          entity_type: history.entity_type,
          entity_id: history.entity_id,
          action: 'restore',
          previous_data: history.new_data,
          new_data: history.previous_data,
          description: `Reverted to version from ${new Date(history.created_at).toLocaleString()}`
        })

        console.log(`Reverted ${history.entity_type} to previous version`)
        return new Response(
          JSON.stringify({ success: true, data: result?.data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'get-deleted-blogs': {
        const { data, error } = await supabase
          .from('cms_blogs')
          .select('*')
          .eq('is_deleted', true)
          .order('updated_at', { ascending: false })

        if (error) throw error
        return new Response(
          JSON.stringify({ data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('CMS Admin error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
