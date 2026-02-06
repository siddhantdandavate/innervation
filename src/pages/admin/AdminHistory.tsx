import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSHistory } from '@/lib/cms';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RotateCcw, FileText, Palette, BookOpen } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminHistory() {
  const [history, setHistory] = useState<CMSHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [isRevertDialogOpen, setIsRevertDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, [filter]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const entityType = filter === 'all' ? undefined : filter;
      const res = await cmsAdminApi.getHistory(entityType, 100);
      setHistory(res.data);
    } catch (err) {
      console.error('Error loading history:', err);
      toast({
        title: 'Error',
        description: 'Failed to load history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevert = async () => {
    if (!revertingId) return;

    try {
      await cmsAdminApi.revertToVersion(revertingId);
      toast({
        title: 'Reverted',
        description: 'Successfully reverted to previous version',
      });
      setIsRevertDialogOpen(false);
      setRevertingId(null);
      loadHistory();
    } catch (err) {
      console.error('Error reverting:', err);
      toast({
        title: 'Error',
        description: 'Failed to revert to previous version',
        variant: 'destructive',
      });
    }
  };

  const getIcon = (entityType: string) => {
    switch (entityType) {
      case 'content':
        return <FileText className="w-4 h-4" />;
      case 'theme':
        return <Palette className="w-4 h-4" />;
      case 'blog':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-700';
      case 'update':
        return 'bg-blue-100 text-blue-700';
      case 'delete':
        return 'bg-red-100 text-red-700';
      case 'restore':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout title="Version History">
      <div className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'content', 'theme', 'blog'].map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : history.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No history records found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {getIcon(item.entity_type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {item.description || `${item.action} ${item.entity_type}`}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded ${getActionColor(
                              item.action
                            )}`}
                          >
                            {item.action}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {item.previous_data && item.action !== 'restore' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRevertingId(item.id);
                          setIsRevertDialogOpen(true);
                        }}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Revert
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Revert Confirmation Dialog */}
      <AlertDialog open={isRevertDialogOpen} onOpenChange={setIsRevertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revert to Previous Version?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore the content to its previous state before this change was made.
              A new history record will be created for this revert action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevert}>
              Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
