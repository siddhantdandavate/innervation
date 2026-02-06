import { supabase } from "@/integrations/supabase/client";

// Types for CMS data
export interface CMSContent {
  id: string;
  section_key: string;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CMSTheme {
  id: string;
  theme_name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    card: string;
    primary_dark?: string;
    background_dark?: string;
    foreground_dark?: string;
    muted_dark?: string;
    card_dark?: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CMSBlog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  is_published: boolean;
  is_deleted: boolean;
  author: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface CMSHistory {
  id: string;
  entity_type: 'content' | 'theme' | 'blog';
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'restore';
  previous_data?: Record<string, unknown>;
  new_data?: Record<string, unknown>;
  description?: string;
  created_at: string;
}

// Admin session management
const ADMIN_TOKEN_KEY = 'cms_admin_token';

export const cmsAdmin = {
  getToken: () => sessionStorage.getItem(ADMIN_TOKEN_KEY),
  setToken: (token: string) => sessionStorage.setItem(ADMIN_TOKEN_KEY, token),
  clearToken: () => sessionStorage.removeItem(ADMIN_TOKEN_KEY),
  isLoggedIn: () => !!sessionStorage.getItem(ADMIN_TOKEN_KEY),
};

// API helper for admin operations
async function adminApi(action: string, params: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke('cms-admin', {
    body: { action, ...params },
  });

  if (error) throw error;
  if (data.error) throw new Error(data.error);
  return data;
}

// Public CMS API (for frontend)
export const cms = {
  // Get content by section key
  async getContent(sectionKey: string): Promise<Record<string, unknown> | null> {
    const { data, error } = await supabase
      .from('cms_content')
      .select('content')
      .eq('section_key', sectionKey)
      .single();

    if (error) {
      console.error(`Error fetching content for ${sectionKey}:`, error);
      return null;
    }
    return data?.content as Record<string, unknown>;
  },

  // Get all content
  async getAllContent(): Promise<CMSContent[]> {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .order('section_key');

    if (error) {
      console.error('Error fetching all content:', error);
      return [];
    }
    return data as CMSContent[];
  },

  // Get active theme
  async getTheme(): Promise<CMSTheme | null> {
    const { data, error } = await supabase
      .from('cms_theme')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching theme:', error);
      return null;
    }
    return data as CMSTheme;
  },

  // Get published blogs
  async getBlogs(): Promise<CMSBlog[]> {
    const { data, error } = await supabase
      .from('cms_blogs')
      .select('*')
      .eq('is_published', true)
      .eq('is_deleted', false)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
    return data as CMSBlog[];
  },

  // Get single blog by slug
  async getBlogBySlug(slug: string): Promise<CMSBlog | null> {
    const { data, error } = await supabase
      .from('cms_blogs')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .eq('is_deleted', false)
      .single();

    if (error) {
      console.error(`Error fetching blog ${slug}:`, error);
      return null;
    }
    return data as CMSBlog;
  },
};

// Admin CMS API (for admin panel)
export const cmsAdminApi = {
  // Auth
  async checkSetup(): Promise<{ needsSetup: boolean }> {
    return adminApi('check-setup');
  },

  async setup(password: string): Promise<void> {
    await adminApi('setup', { password });
  },

  async login(password: string): Promise<{ token: string }> {
    const result = await adminApi('login', { password });
    if (result.token) {
      cmsAdmin.setToken(result.token);
    }
    return result;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await adminApi('change-password', { currentPassword, newPassword });
  },

  // Content
  async getAllContent(): Promise<{ data: CMSContent[] }> {
    return adminApi('get-all-content');
  },

  async updateContent(sectionKey: string, content: Record<string, unknown>): Promise<{ data: CMSContent }> {
    return adminApi('update-content', { sectionKey, content });
  },

  // Theme
  async getTheme(): Promise<{ data: CMSTheme }> {
    return adminApi('get-theme');
  },

  async updateTheme(colors: CMSTheme['colors']): Promise<{ data: CMSTheme }> {
    return adminApi('update-theme', { colors });
  },

  // Blogs
  async getAllBlogs(): Promise<{ data: CMSBlog[] }> {
    return adminApi('get-all-blogs');
  },

  async createBlog(blog: Partial<CMSBlog>): Promise<{ data: CMSBlog }> {
    return adminApi('create-blog', blog);
  },

  async updateBlog(id: string, updates: Partial<CMSBlog>): Promise<{ data: CMSBlog }> {
    return adminApi('update-blog', { id, ...updates });
  },

  async deleteBlog(id: string): Promise<void> {
    await adminApi('delete-blog', { id });
  },

  async restoreBlog(id: string): Promise<{ data: CMSBlog }> {
    return adminApi('restore-blog', { id });
  },

  async getDeletedBlogs(): Promise<{ data: CMSBlog[] }> {
    return adminApi('get-deleted-blogs');
  },

  // History
  async getHistory(entityType?: string, limit?: number): Promise<{ data: CMSHistory[] }> {
    return adminApi('get-history', { entityType, limit });
  },

  async revertToVersion(historyId: string): Promise<void> {
    await adminApi('revert-to-version', { historyId });
  },
};
