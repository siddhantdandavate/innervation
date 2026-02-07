import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSTheme } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, RotateCcw, Check, Sparkles, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorField {
  key: string;
  label: string;
  description: string;
}

interface ThemePreset {
  name: string;
  description: string;
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

// Theme presets
const themePresets: ThemePreset[] = [
  {
    name: 'Default Blue',
    description: 'Professional blue theme',
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
    name: 'Dark Elegance',
    description: 'Modern dark theme',
    colors: {
      primary: '0 0% 98%',
      secondary: '240 5% 26%',
      accent: '262 83% 58%',
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
    name: 'Modern Blue',
    description: 'Vibrant blue tones',
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
    name: 'Professional Light',
    description: 'Clean corporate look',
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
  {
    name: 'Warm Orange',
    description: 'Energetic warm tones',
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
    name: 'Minimal Gray',
    description: 'Clean minimal design',
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

export default function AdminTheme() {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showCustomColors, setShowCustomColors] = useState(false);
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
              Choose a theme preset or customize individual colors
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
              Select a preset to instantly apply a complete theme
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {themePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  disabled={saving}
                  className={cn(
                    'relative p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg',
                    activePreset === preset.name
                      ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900'
                      : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                  )}
                >
                  {/* Color Preview */}
                  <div className="flex gap-1 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg shadow-sm" 
                      style={{ backgroundColor: `hsl(${preset.colors.primary})` }}
                    />
                    <div 
                      className="w-8 h-8 rounded-lg shadow-sm" 
                      style={{ backgroundColor: `hsl(${preset.colors.accent})` }}
                    />
                    <div 
                      className="w-8 h-8 rounded-lg shadow-sm border border-slate-200" 
                      style={{ backgroundColor: `hsl(${preset.colors.background})` }}
                    />
                    <div 
                      className="w-8 h-8 rounded-lg shadow-sm" 
                      style={{ backgroundColor: `hsl(${preset.colors.background_dark})` }}
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
              ))}
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
          </>
        )}

        {/* Live Preview */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg text-slate-900 dark:text-white">Live Preview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-xl shadow-lg"
                style={{
                  backgroundColor: `hsl(${colors.background || '0 0% 100%'})`,
                  color: `hsl(${colors.foreground || '224 71% 4%'})`,
                }}
              >
                <h3 className="font-bold mb-2 text-lg">Light Mode Preview</h3>
                <p className="text-sm mb-4 opacity-80">This is how your light theme will look on the website.</p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: `hsl(${colors.primary || '217 91% 60%'})` }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all"
                    style={{ 
                      backgroundColor: `hsl(${colors.accent || '75 100% 45%'})`,
                      color: `hsl(${colors.foreground || '224 71% 4%'})`,
                    }}
                  >
                    Accent Button
                  </button>
                </div>
              </div>
              <div
                className="p-6 rounded-xl shadow-lg"
                style={{
                  backgroundColor: `hsl(${colors.background_dark || '224 71% 4%'})`,
                  color: `hsl(${colors.foreground_dark || '210 40% 98%'})`,
                }}
              >
                <h3 className="font-bold mb-2 text-lg">Dark Mode Preview</h3>
                <p className="text-sm mb-4 opacity-80">This is how your dark theme will look on the website.</p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ 
                      backgroundColor: `hsl(${colors.primary_dark || '217 91% 60%'})`,
                      color: `hsl(${colors.background_dark || '224 71% 4%'})`,
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all"
                    style={{ 
                      backgroundColor: `hsl(${colors.accent || '75 100% 50%'})`,
                      color: `hsl(${colors.background_dark || '224 71% 4%'})`,
                    }}
                  >
                    Accent Button
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
