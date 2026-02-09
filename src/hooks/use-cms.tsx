import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { cms, CMSContent, CMSTheme, CMSBlog } from '@/lib/cms';

interface CMSContextType {
  content: Record<string, Record<string, unknown>>;
  theme: CMSTheme | null;
  blogs: CMSBlog[];
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
  refreshBlogs: () => Promise<void>;
  getContent: (sectionKey: string) => Record<string, unknown> | null;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, Record<string, unknown>>>({});
  const [theme, setTheme] = useState<CMSTheme | null>(null);
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      const allContent = await cms.getAllContent();
      const contentMap: Record<string, Record<string, unknown>> = {};
      allContent.forEach((item) => {
        contentMap[item.section_key] = item.content as Record<string, unknown>;
      });
      setContent(contentMap);
    } catch (err) {
      console.error('Failed to load CMS content:', err);
      setError('Failed to load content');
    }
  };

  const loadTheme = async () => {
    try {
      const themeData = await cms.getTheme();
      setTheme(themeData);
      
      // Apply theme colors to CSS variables for BOTH light and dark modes
      if (themeData?.colors) {
        const root = document.documentElement;
        const style = document.createElement('style');
        style.id = 'cms-theme-variables';
        
        // Remove existing CMS theme style if present
        const existingStyle = document.getElementById('cms-theme-variables');
        if (existingStyle) {
          existingStyle.remove();
        }
        
        // Build CSS for light mode colors
        const lightModeVars: string[] = [];
        const darkModeVars: string[] = [];
        
        Object.entries(themeData.colors).forEach(([key, value]) => {
          if (key.includes('_dark')) {
            // Dark mode variable - map to correct CSS var name
            const cssVarName = key.replace('_dark', '');
            darkModeVars.push(`--${cssVarName}: ${value};`);
          } else {
            lightModeVars.push(`--${key}: ${value};`);
          }
        });
        
        // Create comprehensive CSS that updates all theme variables
        style.textContent = `
          :root {
            ${lightModeVars.join('\n            ')}
          }
          .dark {
            ${darkModeVars.join('\n            ')}
          }
        `;
        
        document.head.appendChild(style);
      }
    } catch (err) {
      console.error('Failed to load CMS theme:', err);
    }
  };

  const loadBlogs = async () => {
    try {
      const blogsData = await cms.getBlogs();
      setBlogs(blogsData);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    }
  };

  const refreshContent = async () => {
    setLoading(true);
    await Promise.all([loadContent(), loadTheme()]);
    setLoading(false);
  };

  const refreshBlogs = async () => {
    await loadBlogs();
  };

  const getContent = (sectionKey: string): Record<string, unknown> | null => {
    return content[sectionKey] || null;
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadContent(), loadTheme(), loadBlogs()]);
      setLoading(false);
    };
    init();
  }, []);

  return (
    <CMSContext.Provider
      value={{
        content,
        theme,
        blogs,
        loading,
        error,
        refreshContent,
        refreshBlogs,
        getContent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

// Hook for getting specific section content
export function useCMSContent<T = Record<string, unknown>>(sectionKey: string): {
  content: T | null;
  loading: boolean;
} {
  const { getContent, loading } = useCMS();
  return {
    content: getContent(sectionKey) as T | null,
    loading,
  };
}

// Helper hook for getting content with fallback values
export function useCMSContentWithFallback<T extends Record<string, unknown>>(
  sectionKey: string,
  fallback: T
): { content: T; loading: boolean } {
  const { getContent, loading } = useCMS();
  const cmsContent = getContent(sectionKey) as Partial<T> | null;
  
  // Merge CMS content with fallback, preferring CMS values when they exist
  const content: T = { ...fallback };
  if (cmsContent) {
    (Object.keys(fallback) as Array<keyof T>).forEach((key) => {
      const cmsValue = cmsContent[key];
      if (cmsValue !== undefined && cmsValue !== '') {
        content[key] = cmsValue as T[keyof T];
      }
    });
  }
  
  return { content, loading };
}
