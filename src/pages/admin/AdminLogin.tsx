import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cmsAdmin, cmsAdminApi } from '@/lib/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    if (cmsAdmin.isLoggedIn()) {
      navigate('/admin/dashboard');
      return;
    }

    // Check if setup is needed
    const checkSetup = async () => {
      try {
        const result = await cmsAdminApi.checkSetup();
        setNeedsSetup(result.needsSetup);
      } catch (err) {
        console.error('Error checking setup:', err);
        setNeedsSetup(true);
      }
    };
    checkSetup();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (needsSetup) {
        // Setup mode
        if (password.length < 6) {
          toast({
            title: 'Error',
            description: 'Password must be at least 6 characters',
            variant: 'destructive',
          });
          return;
        }
        if (password !== confirmPassword) {
          toast({
            title: 'Error',
            description: 'Passwords do not match',
            variant: 'destructive',
          });
          return;
        }

        await cmsAdminApi.setup(password);
        toast({
          title: 'Success',
          description: 'Admin account created. Please login.',
        });
        setNeedsSetup(false);
        setPassword('');
        setConfirmPassword('');
      } else {
        // Login mode
        await cmsAdminApi.login(password);
        toast({
          title: 'Welcome',
          description: 'Successfully logged in',
        });
        navigate('/admin/dashboard');
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: 'Error',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (needsSetup === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {needsSetup ? 'Setup Admin' : 'Admin Login'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {needsSetup
                ? 'Create your admin password to get started'
                : 'Enter your password to access the CMS'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {needsSetup ? 'Create Password' : 'Password'}
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {needsSetup && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Please wait...' : needsSetup ? 'Create Admin' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Innervation CMS Admin Panel
        </p>
      </div>
    </div>
  );
}
