import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version, x-admin-token',
}

// ============================================
// INPUT VALIDATION
// ============================================

function validateString(value: unknown, fieldName: string, minLen = 1, maxLen = 10000): string {
  if (typeof value !== 'string') throw new Error(`${fieldName} must be a string`)
  const trimmed = value.trim()
  if (trimmed.length < minLen) throw new Error(`${fieldName} must be at least ${minLen} characters`)
  if (trimmed.length > maxLen) throw new Error(`${fieldName} must be at most ${maxLen} characters`)
  return trimmed
}

function validateBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value !== 'boolean') throw new Error(`${fieldName} must be a boolean`)
  return value
}

function validateObject(value: unknown, fieldName: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object`)
  }
  return value as Record<string, unknown>
}

// Allowlist-based HTML sanitizer — only permitted tags/attributes survive
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'em', 'u', 'b', 'i', 's', 'del', 'ins', 'sub', 'sup',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'hr',
])
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  'a': new Set(['href', 'title', 'target', 'rel']),
  'img': new Set(['src', 'alt', 'title', 'width', 'height', 'loading']),
  '*': new Set(['class', 'id']),
}
const DANGEROUS_URL_RE = /^\s*(javascript|data|vbscript)\s*:/i

function sanitizeHtml(html: string): string {
  // Step 1: Strip all event handlers (any attribute starting with "on")
  let clean = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (_match, tag: string, attrs: string) => {
    const tagLower = tag.toLowerCase()
    if (!ALLOWED_TAGS.has(tagLower)) return '' // Strip disallowed opening tags
    const allowedForTag = ALLOWED_ATTRS[tagLower] || new Set()
    const globalAttrs = ALLOWED_ATTRS['*']
    // Parse and filter attributes
    const safeAttrs: string[] = []
    const attrRegex = /([a-zA-Z][a-zA-Z0-9_-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g
    let m: RegExpExecArray | null
    while ((m = attrRegex.exec(attrs)) !== null) {
      const attrName = m[1].toLowerCase()
      const attrValue = m[2] ?? m[3] ?? m[4] ?? ''
      // Block all event handlers
      if (attrName.startsWith('on')) continue
      // Only allow whitelisted attributes
      if (!allowedForTag.has(attrName) && !globalAttrs.has(attrName)) continue
      // Block dangerous URLs in href/src
      if ((attrName === 'href' || attrName === 'src') && DANGEROUS_URL_RE.test(attrValue)) continue
      safeAttrs.push(`${attrName}="${attrValue.replace(/"/g, '&quot;')}"`)
    }
    return `<${tagLower}${safeAttrs.length ? ' ' + safeAttrs.join(' ') : ''}>`
  })
  // Step 2: Strip disallowed closing tags
  clean = clean.replace(/<\/([a-zA-Z][a-zA-Z0-9]*)>/g, (_match, tag: string) => {
    return ALLOWED_TAGS.has(tag.toLowerCase()) ? `</${tag.toLowerCase()}>` : ''
  })
  // Step 3: Remove any remaining script/iframe/object/embed blocks that slipped through
  clean = clean.replace(/<(script|iframe|object|embed|applet|form|input|textarea|select|button)\b[^]*?<\/\1>/gi, '')
  clean = clean.replace(/<(script|iframe|object|embed|applet|form|input|textarea|select|button)\b[^>]*\/?>/gi, '')
  return clean
}

function validateSlug(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (slug.length < 1 || slug.length > 200) throw new Error('Generated slug is invalid')
  return slug
}

function validateBlogInput(params: Record<string, unknown>) {
  const title = validateString(params.title, 'title', 1, 200)
  const content = sanitizeHtml(validateString(params.content, 'content', 1, 100000))
  const is_published = typeof params.is_published === 'boolean' ? params.is_published : false

  const result: Record<string, unknown> = { title, content, is_published }
  if (params.excerpt != null && params.excerpt !== '') result.excerpt = validateString(params.excerpt, 'excerpt', 0, 500)
  if (params.featured_image != null && params.featured_image !== '') result.featured_image = validateString(params.featured_image, 'featured_image', 0, 2000)
  if (params.meta_title != null && params.meta_title !== '') result.meta_title = validateString(params.meta_title, 'meta_title', 0, 200)
  if (params.meta_description != null && params.meta_description !== '') result.meta_description = validateString(params.meta_description, 'meta_description', 0, 500)
  return result
}

function validateThemeColors(colors: unknown): Record<string, string> {
  const colorsObj = validateObject(colors, 'colors')
  const validKeys = [
    'primary', 'secondary', 'accent', 'background', 'foreground',
    'muted', 'card', 'primary_dark', 'background_dark', 'foreground_dark',
    'muted_dark', 'card_dark', 'destructive', 'border', 'input', 'ring',
    'accent_foreground', 'card_foreground', 'muted_foreground', 'popover',
    'popover_foreground', 'primary_foreground', 'secondary_foreground',
    'destructive_foreground'
  ]
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(colorsObj)) {
    if (!validKeys.includes(key)) continue
    if (typeof value !== 'string') throw new Error(`Color ${key} must be a string`)
    result[key] = value.trim()
  }
  return result
}

// ============================================
// PASSWORD HASHING (PBKDF2 — no Worker dependency)
// ============================================

const PBKDF2_ITERATIONS = 100000
const SALT_LENGTH = 16
const KEY_LENGTH = 32

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key, KEY_LENGTH * 8
  )
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  const hashHex = Array.from(new Uint8Array(derived)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `pbkdf2:${PBKDF2_ITERATIONS}:${saltHex}:${hashHex}`
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    if (storedHash.startsWith('pbkdf2:')) {
      const [, iterStr, saltHex, hashHex] = storedHash.split(':')
      const iterations = parseInt(iterStr)
      const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(b => parseInt(b, 16)))
      const key = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
      )
      const derived = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, key, KEY_LENGTH * 8
      )
      const computedHex = Array.from(new Uint8Array(derived)).map(b => b.toString(16).padStart(2, '0')).join('')
      return computedHex === hashHex
    }
    // Fallback: check old SHA-256 hashes for migration
    const encoder = new TextEncoder()
    const data = encoder.encode(password + 'innervation_salt_2024')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const oldHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return oldHash === storedHash
  } catch {
    return false
  }
}

// ============================================
// SERVER-SIDE TOKEN MANAGEMENT
// ============================================

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function createAdminSession(supabase: SupabaseClient<any>): Promise<string> {
  const token = crypto.randomUUID()
  const tokenHash = await hashToken(token)
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await (supabase as any).from('cms_admin_sessions').insert({ token_hash: tokenHash, expires_at: expiresAt.toISOString() })
  return token
}

async function validateAdminToken(supabase: SupabaseClient<any>, token: string | null): Promise<boolean> {
  if (!token) return false
  try {
    const tokenHash = await hashToken(token)
    const { data, error } = await supabase
      .from('cms_admin_sessions')
      .select('id, expires_at')
      .eq('token_hash', tokenHash)
      .single()
    if (error || !data) return false
    if (new Date(data.expires_at) < new Date()) {
      await supabase.from('cms_admin_sessions').delete().eq('id', data.id)
      return false
    }
    return true
  } catch {
    return false
  }
}

// ============================================
// RATE LIMITING (LOGIN)
// ============================================

const loginAttempts = new Map<string, { count: number; firstAttempt: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = loginAttempts.get(ip)
  if (!record || now - record.firstAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now })
    return true
  }
  if (record.count >= MAX_ATTEMPTS) return false
  record.count++
  return true
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of loginAttempts.entries()) {
    if (now - record.firstAttempt > RATE_LIMIT_WINDOW) loginAttempts.delete(ip)
  }
}, 60000)

const PUBLIC_ACTIONS = ['check-setup', 'setup', 'login']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body = await req.json()
    const { action, ...params } = body

    if (!action || typeof action !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Action is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`CMS Admin action: ${action}`)

    // ============================================
    // AUTH CHECK FOR PROTECTED ACTIONS
    // ============================================
    if (!PUBLIC_ACTIONS.includes(action)) {
      const adminToken = req.headers.get('x-admin-token')
      const isValid = await validateAdminToken(supabase, adminToken)
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized - invalid or expired token' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    switch (action) {
      // ============ AUTH ============
      case 'setup': {
        const password = validateString(params.password, 'password', 8, 100)
        const { data: existing } = await supabase.from('cms_admin_settings').select('id').limit(1)
        if (existing && existing.length > 0) {
          return new Response(
            JSON.stringify({ error: 'Admin already setup' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        const hash = await hashPassword(password)
        const { error } = await supabase.from('cms_admin_settings').insert({ admin_password_hash: hash })
        if (error) throw error
        return new Response(
          JSON.stringify({ success: true, message: 'Admin setup complete' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'login': {
        // Rate limit check
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown'
        if (!checkRateLimit(ip)) {
          return new Response(
            JSON.stringify({ error: 'Too many login attempts. Please try again later.' }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const password = validateString(params.password, 'password', 1, 100)
        const { data: admin } = await supabase
          .from('cms_admin_settings')
          .select('id, admin_password_hash')
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
          return new Response(
            JSON.stringify({ error: 'Invalid password' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Auto-upgrade old SHA-256 hash to PBKDF2 on successful login
        if (!admin.admin_password_hash.startsWith('pbkdf2:')) {
          const newHash = await hashPassword(password)
          await supabase.from('cms_admin_settings').update({ admin_password_hash: newHash }).eq('id', admin.id)
        }

        const token = await createAdminSession(supabase)
        return new Response(
          JSON.stringify({ success: true, token }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'check-setup': {
        const { data: admin } = await supabase.from('cms_admin_settings').select('id').limit(1)
        return new Response(
          JSON.stringify({ needsSetup: !admin || admin.length === 0 }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'change-password': {
        const currentPassword = validateString(params.currentPassword, 'currentPassword', 1, 100)
        const newPassword = validateString(params.newPassword, 'newPassword', 8, 100)
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
        const { error } = await supabase.from('cms_admin_settings').update({ admin_password_hash: newHash }).eq('id', admin.id)
        if (error) throw error
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      case 'logout': {
        const adminToken = req.headers.get('x-admin-token')
        if (adminToken) {
          const tokenHash = await hashToken(adminToken)
          await supabase.from('cms_admin_sessions').delete().eq('token_hash', tokenHash)
        }
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // ============ CONTENT ============
      case 'get-all-content': {
        const { data, error } = await supabase.from('cms_content').select('*').order('section_key')
        if (error) throw error
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'update-content': {
        const sectionKey = validateString(params.sectionKey, 'sectionKey', 1, 100)
        const content = validateObject(params.content, 'content')
        // Fetch current row for history (may not exist yet)
        const { data: current } = await supabase.from('cms_content').select('*').eq('section_key', sectionKey).maybeSingle()
        let data
        let error
        if (current) {
          // Update existing
          const res = await supabase.from('cms_content').update({ content }).eq('section_key', sectionKey).select().single()
          data = res.data; error = res.error
        } else {
          // Insert new
          const res = await supabase.from('cms_content').insert({ section_key: sectionKey, content }).select().single()
          data = res.data; error = res.error
        }
        if (error) {
          console.error('update-content error:', JSON.stringify(error))
          throw error
        }
        await supabase.from('cms_history').insert({
          entity_type: 'content', entity_id: data.id, action: current ? 'update' : 'create',
          previous_data: current, new_data: data, description: `${current ? 'Updated' : 'Created'} ${sectionKey} content`
        })
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      // ============ THEME ============
      case 'get-theme': {
        const { data, error } = await supabase.from('cms_theme').select('*').eq('is_active', true).single()
        if (error && error.code !== 'PGRST116') throw error
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'update-theme': {
        const colors = validateThemeColors(params.colors)
        const { data: current } = await supabase.from('cms_theme').select('*').eq('is_active', true).maybeSingle()
        let data, error
        if (current) {
          const res = await supabase.from('cms_theme').update({ colors }).eq('is_active', true).select().single()
          data = res.data; error = res.error
        } else {
          const res = await supabase.from('cms_theme').insert({ colors, is_active: true, theme_name: 'default' }).select().single()
          data = res.data; error = res.error
        }
        if (error) {
          console.error('update-theme error:', JSON.stringify(error))
          throw error
        }
        await supabase.from('cms_history').insert({
          entity_type: 'theme', entity_id: data.id, action: current ? 'update' : 'create',
          previous_data: current, new_data: data, description: 'Updated theme colors'
        })
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      // ============ BLOGS ============
      case 'get-all-blogs': {
        const { data, error } = await supabase.from('cms_blogs').select('*').eq('is_deleted', false).order('created_at', { ascending: false })
        if (error) throw error
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'create-blog': {
        const validated = validateBlogInput(params)
        const slug = validateSlug(validated.title as string)
        const { data, error } = await supabase.from('cms_blogs').insert({
          title: validated.title, slug, content: validated.content,
          excerpt: validated.excerpt, featured_image: validated.featured_image,
          is_published: validated.is_published,
          meta_title: validated.meta_title || validated.title,
          meta_description: validated.meta_description || validated.excerpt,
          published_at: validated.is_published ? new Date().toISOString() : null
        }).select().single()
        if (error) throw error
        await supabase.from('cms_history').insert({
          entity_type: 'blog', entity_id: data.id, action: 'create',
          new_data: data, description: `Created blog: ${validated.title}`
        })
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'update-blog': {
        const id = validateString(params.id, 'id', 1, 100)
        const { data: current } = await supabase.from('cms_blogs').select('*').eq('id', id).single()
        if (!current) {
          return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }
        const updates: Record<string, unknown> = {}
        if (params.title !== undefined) {
          updates.title = validateString(params.title, 'title', 1, 200)
          updates.slug = validateSlug(updates.title as string)
        }
        if (params.content !== undefined) updates.content = sanitizeHtml(validateString(params.content, 'content', 1, 100000))
        if (params.excerpt !== undefined) updates.excerpt = params.excerpt ? validateString(params.excerpt, 'excerpt', 0, 500) : null
        if (params.featured_image !== undefined) updates.featured_image = params.featured_image ? validateString(params.featured_image, 'featured_image', 0, 2000) : null
        if (params.is_published !== undefined) {
          updates.is_published = validateBoolean(params.is_published, 'is_published')
          if (updates.is_published && !current.published_at) updates.published_at = new Date().toISOString()
        }
        if (params.meta_title !== undefined) updates.meta_title = params.meta_title ? validateString(params.meta_title, 'meta_title', 0, 200) : null
        if (params.meta_description !== undefined) updates.meta_description = params.meta_description ? validateString(params.meta_description, 'meta_description', 0, 500) : null

        const { data, error } = await supabase.from('cms_blogs').update(updates).eq('id', id).select().single()
        if (error) throw error
        await supabase.from('cms_history').insert({
          entity_type: 'blog', entity_id: data.id, action: 'update',
          previous_data: current, new_data: data, description: `Updated blog: ${data.title}`
        })
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'delete-blog': {
        const id = validateString(params.id, 'id', 1, 100)
        const { data: current } = await supabase.from('cms_blogs').select('*').eq('id', id).single()
        const { error } = await supabase.from('cms_blogs').update({ is_deleted: true }).eq('id', id)
        if (error) throw error
        await supabase.from('cms_history').insert({
          entity_type: 'blog', entity_id: id, action: 'delete',
          previous_data: current, description: `Deleted blog: ${current?.title}`
        })
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'restore-blog': {
        const id = validateString(params.id, 'id', 1, 100)
        const { data, error } = await supabase.from('cms_blogs').update({ is_deleted: false }).eq('id', id).select().single()
        if (error) throw error
        await supabase.from('cms_history').insert({
          entity_type: 'blog', entity_id: id, action: 'restore',
          new_data: data, description: `Restored blog: ${data.title}`
        })
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      // ============ HISTORY ============
      case 'get-history': {
        const limit = typeof params.limit === 'number' && params.limit > 0 && params.limit <= 200 ? params.limit : 50
        let query = supabase.from('cms_history').select('*').order('created_at', { ascending: false }).limit(limit)
        if (params.entityType && typeof params.entityType === 'string') {
          const validTypes = ['content', 'theme', 'blog']
          if (validTypes.includes(params.entityType)) query = query.eq('entity_type', params.entityType)
        }
        const { data, error } = await query
        if (error) throw error
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'revert-to-version': {
        const historyId = validateString(params.historyId, 'historyId', 1, 100)
        const { data: history } = await supabase.from('cms_history').select('*').eq('id', historyId).single()
        if (!history || !history.previous_data) {
          return new Response(
            JSON.stringify({ error: 'Cannot revert - no previous data' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        let result
        if (history.entity_type === 'content') {
          result = await supabase.from('cms_content').update({ content: history.previous_data.content }).eq('id', history.entity_id).select().single()
        } else if (history.entity_type === 'theme') {
          result = await supabase.from('cms_theme').update({ colors: history.previous_data.colors }).eq('id', history.entity_id).select().single()
        } else if (history.entity_type === 'blog') {
          result = await supabase.from('cms_blogs').update(history.previous_data).eq('id', history.entity_id).select().single()
        }
        if (result?.error) throw result.error
        await supabase.from('cms_history').insert({
          entity_type: history.entity_type, entity_id: history.entity_id, action: 'restore',
          previous_data: history.new_data, new_data: history.previous_data,
          description: `Reverted to version from ${new Date(history.created_at).toLocaleString()}`
        })
        return new Response(JSON.stringify({ success: true, data: result?.data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'get-deleted-blogs': {
        const { data, error } = await supabase.from('cms_blogs').select('*').eq('is_deleted', true).order('updated_at', { ascending: false })
        if (error) throw error
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('CMS Admin error:', error)
    const errMsg = error instanceof Error ? error.message : String(error)
    const message = errMsg.includes('must be') || errMsg.includes('at least') || errMsg.includes('at most')
      ? errMsg
      : `An error occurred: ${errMsg}`
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
