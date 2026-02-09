import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSTheme } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, RotateCcw, Check, Sparkles, Sun, Moon, Palette, Contrast } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ColorField {
  key: string;
  label: string;
  description: string;
}

interface ThemePreset {
  name: string;
  description: string;
  category: 'light' | 'dark' | 'modern' | 'accessibility';
  colors: Record<string, string>;
}

const lightColors: ColorField[] = [
  { key: 'primary', label: 'Primary', description: 'Main brand color' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary elements' },
  { key: 'accent', label: 'Accent', description: 'Accent highlights' },
  { key: 'background', label: 'Background', description: 'Page background' },
  { key: 'foreground', label: 'Foreground', description: 'Text color' },
  { key: 'muted', label: 'Muted', description: 'Muted backgrounds' },
  { key: 'card', label: 'Card', description: 'Card backgrounds' },
];

const darkColors: ColorField[] = [
  { key: 'primary_dark', label: 'Primary (Dark)', description: 'Main brand color in dark mode' },
  { key: 'background_dark', label: 'Background (Dark)', description: 'Dark mode background' },
  { key: 'foreground_dark', label: 'Foreground (Dark)', description: 'Dark mode text' },
  { key: 'muted_dark', label: 'Muted (Dark)', description: 'Dark mode muted backgrounds' },
  { key: 'card_dark', label: 'Card (Dark)', description: 'Dark mode card backgrounds' },
];

// Extended Theme Presets - 22 Professional Themes
const themePresets: ThemePreset[] = [
  // ========== LIGHT / PROFESSIONAL THEMES ==========
  {
    name: 'Default Light',
    description: 'Clean default light theme',
    category: 'light',
    colors: {
      primary: '222 47% 11%',
      secondary: '210 40% 96%',
      accent: '75 100% 45%',
      background: '0 0% 100%',
      foreground: '222 47% 11%',
      muted: '210 40% 96%',
      card: '210 40% 98%',
      primary_dark: '210 40% 98%',
      background_dark: '222 47% 8%',
      foreground_dark: '210 40% 98%',
      muted_dark: '222 47% 16%',
      card_dark: '222 47% 11%',
    },
  },
  {
    name: 'Professional White',
    description: 'Ultra-clean corporate look',
    category: 'light',
    colors: {
      primary: '220 14% 10%',
      secondary: '220 13% 95%',
      accent: '217 91% 60%',
      background: '0 0% 100%',
      foreground: '220 14% 10%',
      muted: '220 14% 96%',
      card: '0 0% 100%',
      primary_dark: '217 91% 70%',
      background_dark: '220 14% 6%',
      foreground_dark: '0 0% 95%',
      muted_dark: '220 14% 15%',
      card_dark: '220 14% 10%',
    },
  },
  {
    name: 'Minimal Gray',
    description: 'Subtle grayscale aesthetic',
    category: 'light',
    colors: {
      primary: '0 0% 15%',
      secondary: '0 0% 95%',
      accent: '0 0% 45%',
      background: '0 0% 100%',
      foreground: '0 0% 10%',
      muted: '0 0% 96%',
      card: '0 0% 100%',
      primary_dark: '0 0% 100%',
      background_dark: '0 0% 5%',
      foreground_dark: '0 0% 95%',
      muted_dark: '0 0% 15%',
      card_dark: '0 0% 10%',
    },
  },
  {
    name: 'Soft Blue Light',
    description: 'Gentle blue tones',
    category: 'light',
    colors: {
      primary: '214 80% 45%',
      secondary: '214 50% 96%',
      accent: '199 89% 48%',
      background: '214 30% 99%',
      foreground: '214 50% 15%',
      muted: '214 30% 95%',
      card: '0 0% 100%',
      primary_dark: '214 80% 60%',
      background_dark: '214 50% 8%',
      foreground_dark: '214 20% 95%',
      muted_dark: '214 40% 15%',
      card_dark: '214 50% 12%',
    },
  },
  {
    name: 'Elegant Beige',
    description: 'Warm sophisticated tones',
    category: 'light',
    colors: {
      primary: '30 30% 20%',
      secondary: '30 30% 95%',
      accent: '25 75% 50%',
      background: '40 30% 98%',
      foreground: '30 25% 15%',
      muted: '35 25% 93%',
      card: '40 30% 99%',
      primary_dark: '30 30% 90%',
      background_dark: '30 20% 8%',
      foreground_dark: '35 20% 92%',
      muted_dark: '30 20% 15%',
      card_dark: '30 20% 12%',
    },
  },
  {
    name: 'Corporate Clean',
    description: 'Professional business theme',
    category: 'light',
    colors: {
      primary: '215 25% 27%',
      secondary: '214 32% 96%',
      accent: '199 89% 48%',
      background: '0 0% 100%',
      foreground: '215 25% 17%',
      muted: '214 32% 96%',
      card: '0 0% 100%',
      primary_dark: '199 89% 60%',
      background_dark: '215 25% 9%',
      foreground_dark: '0 0% 95%',
      muted_dark: '215 25% 17%',
      card_dark: '215 25% 12%',
    },
  },

  // ========== DARK THEMES ==========
  {
    name: 'Dark Classic',
    description: 'Classic dark mode',
    category: 'dark',
    colors: {
      primary: '0 0% 98%',
      secondary: '240 5% 26%',
      accent: '75 100% 45%',
      background: '240 10% 4%',
      foreground: '0 0% 95%',
      muted: '240 4% 16%',
      card: '240 6% 10%',
      primary_dark: '0 0% 98%',
      background_dark: '240 10% 4%',
      foreground_dark: '0 0% 95%',
      muted_dark: '240 4% 16%',
      card_dark: '240 6% 10%',
    },
  },
  {
    name: 'Deep Dark',
    description: 'True black experience',
    category: 'dark',
    colors: {
      primary: '0 0% 100%',
      secondary: '0 0% 15%',
      accent: '142 76% 46%',
      background: '0 0% 0%',
      foreground: '0 0% 98%',
      muted: '0 0% 10%',
      card: '0 0% 5%',
      primary_dark: '0 0% 100%',
      background_dark: '0 0% 0%',
      foreground_dark: '0 0% 98%',
      muted_dark: '0 0% 10%',
      card_dark: '0 0% 5%',
    },
  },
  {
    name: 'Midnight Blue',
    description: 'Deep blue night theme',
    category: 'dark',
    colors: {
      primary: '210 100% 80%',
      secondary: '217 33% 20%',
      accent: '217 91% 60%',
      background: '222 47% 8%',
      foreground: '210 40% 95%',
      muted: '217 33% 17%',
      card: '222 47% 11%',
      primary_dark: '210 100% 80%',
      background_dark: '222 47% 8%',
      foreground_dark: '210 40% 95%',
      muted_dark: '217 33% 17%',
      card_dark: '222 47% 11%',
    },
  },
  {
    name: 'Graphite Dark',
    description: 'Elegant graphite tones',
    category: 'dark',
    colors: {
      primary: '0 0% 95%',
      secondary: '220 10% 18%',
      accent: '210 40% 60%',
      background: '220 15% 6%',
      foreground: '0 0% 93%',
      muted: '220 10% 14%',
      card: '220 12% 10%',
      primary_dark: '0 0% 95%',
      background_dark: '220 15% 6%',
      foreground_dark: '0 0% 93%',
      muted_dark: '220 10% 14%',
      card_dark: '220 12% 10%',
    },
  },
  {
    name: 'Dark Purple',
    description: 'Rich purple dark mode',
    category: 'dark',
    colors: {
      primary: '270 80% 85%',
      secondary: '270 30% 18%',
      accent: '271 81% 65%',
      background: '270 40% 5%',
      foreground: '270 20% 95%',
      muted: '270 25% 15%',
      card: '270 35% 10%',
      primary_dark: '270 80% 85%',
      background_dark: '270 40% 5%',
      foreground_dark: '270 20% 95%',
      muted_dark: '270 25% 15%',
      card_dark: '270 35% 10%',
    },
  },

  // ========== MODERN / COLORFUL THEMES ==========
  {
    name: 'Modern Blue',
    description: 'Vibrant blue tones',
    category: 'modern',
    colors: {
      primary: '217 91% 60%',
      secondary: '210 40% 96%',
      accent: '217 91% 60%',
      background: '0 0% 100%',
      foreground: '224 71% 4%',
      muted: '220 14% 96%',
      card: '0 0% 100%',
      primary_dark: '217 91% 60%',
      background_dark: '224 71% 4%',
      foreground_dark: '210 40% 98%',
      muted_dark: '215 27% 17%',
      card_dark: '224 71% 4%',
    },
  },
  {
    name: 'Purple Gradient',
    description: 'Rich purple aesthetic',
    category: 'modern',
    colors: {
      primary: '271 81% 56%',
      secondary: '270 50% 95%',
      accent: '326 78% 60%',
      background: '0 0% 100%',
      foreground: '270 50% 15%',
      muted: '270 30% 96%',
      card: '270 30% 99%',
      primary_dark: '271 81% 65%',
      background_dark: '270 50% 5%',
      foreground_dark: '270 20% 95%',
      muted_dark: '270 30% 15%',
      card_dark: '270 40% 10%',
    },
  },
  {
    name: 'Ocean Cyan',
    description: 'Fresh ocean vibes',
    category: 'modern',
    colors: {
      primary: '187 92% 35%',
      secondary: '187 50% 95%',
      accent: '187 92% 42%',
      background: '187 20% 99%',
      foreground: '187 50% 10%',
      muted: '187 30% 95%',
      card: '0 0% 100%',
      primary_dark: '187 92% 50%',
      background_dark: '187 50% 6%',
      foreground_dark: '187 20% 95%',
      muted_dark: '187 30% 15%',
      card_dark: '187 40% 10%',
    },
  },
  {
    name: 'Emerald Green',
    description: 'Fresh green energy',
    category: 'modern',
    colors: {
      primary: '155 70% 35%',
      secondary: '155 40% 95%',
      accent: '142 76% 46%',
      background: '150 20% 99%',
      foreground: '155 50% 10%',
      muted: '150 25% 95%',
      card: '0 0% 100%',
      primary_dark: '142 76% 50%',
      background_dark: '155 40% 6%',
      foreground_dark: '150 20% 95%',
      muted_dark: '155 30% 15%',
      card_dark: '155 40% 10%',
    },
  },
  {
    name: 'Sunset Orange',
    description: 'Warm energetic tones',
    category: 'modern',
    colors: {
      primary: '25 95% 53%',
      secondary: '25 60% 96%',
      accent: '38 92% 50%',
      background: '30 20% 99%',
      foreground: '20 14% 17%',
      muted: '25 30% 94%',
      card: '30 30% 99%',
      primary_dark: '25 95% 60%',
      background_dark: '20 14% 8%',
      foreground_dark: '30 20% 95%',
      muted_dark: '20 14% 17%',
      card_dark: '20 14% 12%',
    },
  },
  {
    name: 'Royal Indigo',
    description: 'Luxurious indigo palette',
    category: 'modern',
    colors: {
      primary: '243 75% 60%',
      secondary: '243 40% 95%',
      accent: '250 80% 65%',
      background: '240 20% 99%',
      foreground: '243 50% 15%',
      muted: '240 25% 95%',
      card: '0 0% 100%',
      primary_dark: '243 80% 70%',
      background_dark: '243 50% 6%',
      foreground_dark: '240 20% 95%',
      muted_dark: '243 30% 15%',
      card_dark: '243 40% 10%',
    },
  },
  {
    name: 'Rose Pink',
    description: 'Soft rose aesthetic',
    category: 'modern',
    colors: {
      primary: '340 75% 55%',
      secondary: '340 40% 96%',
      accent: '330 80% 60%',
      background: '340 20% 99%',
      foreground: '340 50% 15%',
      muted: '340 25% 95%',
      card: '0 0% 100%',
      primary_dark: '340 75% 65%',
      background_dark: '340 40% 6%',
      foreground_dark: '340 20% 95%',
      muted_dark: '340 30% 15%',
      card_dark: '340 40% 10%',
    },
  },
  {
    name: 'Teal Modern',
    description: 'Contemporary teal look',
    category: 'modern',
    colors: {
      primary: '173 80% 35%',
      secondary: '173 40% 95%',
      accent: '173 80% 42%',
      background: '170 20% 99%',
      foreground: '173 50% 10%',
      muted: '170 25% 95%',
      card: '0 0% 100%',
      primary_dark: '173 80% 50%',
      background_dark: '173 50% 6%',
      foreground_dark: '170 20% 95%',
      muted_dark: '173 30% 15%',
      card_dark: '173 40% 10%',
    },
  },

  // ========== HIGH CONTRAST / ACCESSIBILITY THEMES ==========
  {
    name: 'High Contrast Light',
    description: 'Maximum readability light',
    category: 'accessibility',
    colors: {
      primary: '0 0% 0%',
      secondary: '0 0% 95%',
      accent: '220 90% 45%',
      background: '0 0% 100%',
      foreground: '0 0% 0%',
      muted: '0 0% 92%',
      card: '0 0% 100%',
      primary_dark: '0 0% 100%',
      background_dark: '0 0% 0%',
      foreground_dark: '0 0% 100%',
      muted_dark: '0 0% 15%',
      card_dark: '0 0% 8%',
    },
  },
  {
    name: 'High Contrast Dark',
    description: 'Maximum readability dark',
    category: 'accessibility',
    colors: {
      primary: '0 0% 100%',
      secondary: '0 0% 15%',
      accent: '48 100% 50%',
      background: '0 0% 0%',
      foreground: '0 0% 100%',
      muted: '0 0% 12%',
      card: '0 0% 5%',
      primary_dark: '0 0% 100%',
      background_dark: '0 0% 0%',
      foreground_dark: '0 0% 100%',
      muted_dark: '0 0% 12%',
      card_dark: '0 0% 5%',
    },
  },
];

// Convert HSL string to hex for color picker
function hslToHex(hsl: string): string {
  try {
    const [h, s, l] = hsl.split(' ').map((v) => parseFloat(v.replace('%', '')));
    const sNorm = s / 100;
    const lNorm = l / 100;
    const a = sNorm * Math.min(lNorm, 1 - lNorm);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return '#3b82f6';
  }
}

// Convert hex to HSL string
function hexToHsl(hex: string): string {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '217 91% 60%';

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return '217 91% 60%';
  }
}

const categoryConfig = {
  light: { label: 'Light / Professional', icon: Sun, color: 'text-amber-500' },
  dark: { label: 'Dark Themes', icon: Moon, color: 'text-indigo-400' },
  modern: { label: 'Modern / Colorful', icon: Palette, color: 'text-pink-500' },
  accessibility: { label: 'High Contrast', icon: Contrast, color: 'text-green-500' },
};

export default function AdminTheme() {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showCustomColors, setShowCustomColors] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'light' | 'dark' | 'modern' | 'accessibility'>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const res = await cmsAdminApi.getTheme();
      if (res.data?.colors) {
        setColors(res.data.colors as unknown as Record<string, string>);
        // Check if current colors match any preset
        const matchingPreset = themePresets.find(preset => 
          preset.colors.primary === (res.data.colors as Record<string, string>).primary
        );
        if (matchingPreset) {
          setActivePreset(matchingPreset.name);
        } else {
          setActivePreset(null);
          setShowCustomColors(true);
        }
      }
    } catch (err) {
      console.error('Error loading theme:', err);
      toast({
        title: 'Error',
        description: 'Failed to load theme',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (key: string, hex: string) => {
    const hsl = hexToHsl(hex);
    setColors((prev) => ({
      ...prev,
      [key]: hsl,
    }));
    setActivePreset(null);
  };

  const handlePresetSelect = async (preset: ThemePreset) => {
    setColors(preset.colors);
    setActivePreset(preset.name);
    
    // Auto-save when selecting a preset
    setSaving(true);
    try {
      await cmsAdminApi.updateTheme(preset.colors as unknown as CMSTheme['colors']);
      toast({
        title: 'Theme Applied',
        description: `${preset.name} theme has been applied. Refresh the website to see changes.`,
      });
    } catch (err) {
      console.error('Error applying theme:', err);
      toast({
        title: 'Error',
        description: 'Failed to apply theme',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsAdminApi.updateTheme(colors as unknown as CMSTheme['colors']);
      toast({
        title: 'Saved',
        description: 'Theme updated successfully. Refresh the website to see changes.',
      });
    } catch (err) {
      console.error('Error saving theme:', err);
      toast({
        title: 'Error',
        description: 'Failed to save theme',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const defaultPreset = themePresets[0];
    setColors(defaultPreset.colors);
    setActivePreset(defaultPreset.name);
  };

  const filteredPresets = selectedCategory === 'all' 
    ? themePresets 
    : themePresets.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <AdminLayout title="Theme Editor">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Theme Editor">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-slate-600 dark:text-slate-300">
              Choose from 22 professional theme presets or customize individual colors
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Theme
            </Button>
          </div>
        </div>

        {/* Theme Presets */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <CardTitle className="text-lg text-slate-900 dark:text-white">Theme Presets</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Select a preset to instantly apply a complete theme across your entire website
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Category Filter Tabs */}
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as typeof selectedCategory)} className="mb-6">
              <TabsList className="grid grid-cols-5 bg-slate-100 dark:bg-slate-700/50">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="light" className="text-xs sm:text-sm flex items-center gap-1">
                  <Sun className="w-3 h-3 hidden sm:block" />
                  Light
                </TabsTrigger>
                <TabsTrigger value="dark" className="text-xs sm:text-sm flex items-center gap-1">
                  <Moon className="w-3 h-3 hidden sm:block" />
                  Dark
                </TabsTrigger>
                <TabsTrigger value="modern" className="text-xs sm:text-sm flex items-center gap-1">
                  <Palette className="w-3 h-3 hidden sm:block" />
                  Modern
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="text-xs sm:text-sm flex items-center gap-1">
                  <Contrast className="w-3 h-3 hidden sm:block" />
                  A11y
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPresets.map((preset) => {
                const CategoryIcon = categoryConfig[preset.category].icon;
                return (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    disabled={saving}
                    className={cn(
                      'relative p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg group',
                      activePreset === preset.name
                        ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900'
                        : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                    )}
                  >
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <CategoryIcon className={cn('w-4 h-4', categoryConfig[preset.category].color)} />
                    </div>

                    {/* Color Preview */}
                    <div className="flex gap-1 mb-3 mt-4">
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/5" 
                        style={{ backgroundColor: `hsl(${preset.colors.primary})` }}
                        title="Primary"
                      />
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/5" 
                        style={{ backgroundColor: `hsl(${preset.colors.accent})` }}
                        title="Accent"
                      />
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/10" 
                        style={{ backgroundColor: `hsl(${preset.colors.background})` }}
                        title="Light BG"
                      />
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-white/10" 
                        style={{ backgroundColor: `hsl(${preset.colors.background_dark})` }}
                        title="Dark BG"
                      />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {preset.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{preset.description}</p>
                    {activePreset === preset.name && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Toggle for Custom Colors */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setShowCustomColors(!showCustomColors)}
            className="text-slate-700 dark:text-slate-300"
          >
            {showCustomColors ? 'Hide' : 'Show'} Custom Color Editor
          </Button>
        </div>

        {/* Custom Colors */}
        {showCustomColors && (
          <>
            <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="text-lg text-slate-900 dark:text-white">Light Mode Colors</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lightColors.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {field.label}
                        </label>
                        <div
                          className="w-8 h-8 rounded-lg border border-slate-200 shadow-sm"
                          style={{ backgroundColor: hslToHex(colors[field.key] || '217 91% 60%') }}
                        />
                      </div>
                      <Input
                        type="color"
                        value={hslToHex(colors[field.key] || '217 91% 60%')}
                        onChange={(e) => handleColorChange(field.key, e.target.value)}
                        className="h-10 cursor-pointer border-slate-200"
                      />
                      <p className="text-xs text-slate-500">{field.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="text-lg text-slate-900 dark:text-white">Dark Mode Colors</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {darkColors.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {field.label}
                        </label>
                        <div
                          className="w-8 h-8 rounded-lg border border-slate-200 shadow-sm"
                          style={{ backgroundColor: hslToHex(colors[field.key] || '217 91% 60%') }}
                        />
                      </div>
                      <Input
                        type="color"
                        value={hslToHex(colors[field.key] || '217 91% 60%')}
                        onChange={(e) => handleColorChange(field.key, e.target.value)}
                        className="h-10 cursor-pointer border-slate-200"
                      />
                      <p className="text-xs text-slate-500">{field.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="text-lg text-slate-900 dark:text-white">Live Preview</CardTitle>
                <CardDescription className="text-slate-500">
                  Preview how your theme will look on the website
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Light Mode Preview */}
                  <div 
                    className="rounded-xl p-6 border"
                    style={{ 
                      backgroundColor: `hsl(${colors.background || '0 0% 100%'})`,
                      color: `hsl(${colors.foreground || '0 0% 10%'})`,
                      borderColor: `hsl(${colors.muted || '0 0% 90%'})`
                    }}
                  >
                    <div className="text-sm text-slate-500 mb-4">Light Mode</div>
                    <div 
                      className="p-4 rounded-lg mb-4"
                      style={{ backgroundColor: `hsl(${colors.card || '0 0% 100%'})` }}
                    >
                      <h3 className="font-bold mb-2" style={{ color: `hsl(${colors.foreground || '0 0% 10%'})` }}>
                        Card Title
                      </h3>
                      <p className="text-sm opacity-70">Card description text goes here.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `hsl(${colors.primary || '220 14% 10%'})`,
                          color: `hsl(${colors.background || '0 0% 100%'})`
                        }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `hsl(${colors.accent || '217 91% 60%'})`,
                          color: 'white'
                        }}
                      >
                        Accent Button
                      </button>
                    </div>
                  </div>

                  {/* Dark Mode Preview */}
                  <div 
                    className="rounded-xl p-6 border"
                    style={{ 
                      backgroundColor: `hsl(${colors.background_dark || '220 14% 6%'})`,
                      color: `hsl(${colors.foreground_dark || '0 0% 95%'})`,
                      borderColor: `hsl(${colors.muted_dark || '220 14% 15%'})`
                    }}
                  >
                    <div className="text-sm opacity-60 mb-4">Dark Mode</div>
                    <div 
                      className="p-4 rounded-lg mb-4"
                      style={{ backgroundColor: `hsl(${colors.card_dark || '220 14% 10%'})` }}
                    >
                      <h3 className="font-bold mb-2" style={{ color: `hsl(${colors.foreground_dark || '0 0% 95%'})` }}>
                        Card Title
                      </h3>
                      <p className="text-sm opacity-70">Card description text goes here.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `hsl(${colors.primary_dark || '217 91% 70%'})`,
                          color: `hsl(${colors.background_dark || '220 14% 6%'})`
                        }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `hsl(${colors.accent || '217 91% 60%'})`,
                          color: 'white'
                        }}
                      >
                        Accent Button
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
