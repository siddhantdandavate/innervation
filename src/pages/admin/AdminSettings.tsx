import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Eye, EyeOff, Shield, Info, ExternalLink } from 'lucide-react';

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'All fields are required',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'New password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      await cmsAdminApi.changePassword(currentPassword, newPassword);
      toast({
        title: 'Success',
        description: 'Password changed successfully',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: 'Error',
        description: error.message || 'Failed to change password',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6 max-w-xl">
        {/* Change Password Card */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg text-slate-900 dark:text-white">Change Password</CardTitle>
            </div>
            <CardDescription className="text-slate-500">
              Update your admin password for security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Current Password</label>
              <Input
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">New Password</label>
              <Input
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Confirm New Password</label>
              <Input
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="border-slate-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
              >
                {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPasswords ? 'Hide' : 'Show'} passwords
              </button>
            </div>
            <Button 
              onClick={handleChangePassword} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* CMS Information Card */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-600" />
              <CardTitle className="text-lg text-slate-900 dark:text-white">CMS Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-0 pt-4">
            <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-500">Version</span>
              <span className="font-medium text-slate-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-500">Website</span>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View Website
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-slate-500">Storage</span>
              <span className="font-medium text-slate-900 dark:text-white">Cloud Database</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
