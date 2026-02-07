import { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSHistory } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  RotateCcw, 
  FileText, 
  Palette, 
  BookOpen, 
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const ITEMS_PER_PAGE = 20;

export default function AdminHistory() {
  const [history, setHistory] = useState<CMSHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [isRevertDialogOpen, setIsRevertDialogOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, [filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const entityType = filter === 'all' ? undefined : filter;
      const res = await cmsAdminApi.getHistory(entityType, 500);
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

  // Filter and paginate
  const filteredHistory = useMemo(() => {
    if (!searchQuery) return history;
    const query = searchQuery.toLowerCase();
    return history.filter(
      item =>
        item.description?.toLowerCase().includes(query) ||
        item.action.toLowerCase().includes(query) ||
        item.entity_type.toLowerCase().includes(query)
    );
  }, [history, searchQuery]);

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHistory.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHistory, currentPage]);

  // Group by date
  const groupedHistory = useMemo(() => {
    const groups: Record<string, CMSHistory[]> = {};
    paginatedHistory.forEach(item => {
      const date = new Date(item.created_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  }, [paginatedHistory]);

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

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
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

  const getIconBg = (entityType: string) => {
    switch (entityType) {
      case 'content':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400';
      case 'theme':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400';
      case 'blog':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'update':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'delete':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'restore':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const formatDataPreview = (data: Record<string, unknown> | undefined) => {
    if (!data) return null;
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return null;
    }
  };

  return (
    <AdminLayout title="Version History">
      <div className="space-y-4">
        {/* Filters */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['all', 'content', 'theme', 'blog'].map((type) => (
                  <Button
                    key={type}
                    variant={filter === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(type)}
                    className={filter === type 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredHistory.length === 0 ? (
          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">No history records found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date} className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <Calendar className="w-4 h-4" />
                  {date}
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <Card key={item.id} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                      <Collapsible>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${getIconBg(item.entity_type)}`}>
                                {getIcon(item.entity_type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="font-medium text-slate-900 dark:text-white">
                                    {item.description || `${item.action} ${item.entity_type}`}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${getActionBadge(
                                      item.action
                                    )}`}
                                  >
                                    {item.action}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  {new Date(item.created_at).toLocaleTimeString()}
                                </div>
                                
                                {/* Data Preview Toggle */}
                                {(item.previous_data || item.new_data) && (
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleExpanded(item.id)}
                                      className="mt-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto"
                                    >
                                      {expandedItems.has(item.id) ? 'Hide' : 'Show'} details
                                      <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${expandedItems.has(item.id) ? 'rotate-90' : ''}`} />
                                    </Button>
                                  </CollapsibleTrigger>
                                )}
                              </div>
                            </div>
                            {item.previous_data && item.action !== 'restore' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setRevertingId(item.id);
                                  setIsRevertDialogOpen(true);
                                }}
                                className="border-orange-300 text-orange-700 hover:bg-orange-50 flex-shrink-0"
                              >
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Revert
                              </Button>
                            )}
                          </div>
                          
                          <CollapsibleContent>
                            {(item.previous_data || item.new_data) && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {item.previous_data && (
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-slate-500">Previous Data</h4>
                                    <pre className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-xs overflow-x-auto max-h-40 text-red-800 dark:text-red-200">
                                      {formatDataPreview(item.previous_data)}
                                    </pre>
                                  </div>
                                )}
                                {item.new_data && (
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-slate-500">New Data</h4>
                                    <pre className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-xs overflow-x-auto max-h-40 text-emerald-800 dark:text-emerald-200">
                                      {formatDataPreview(item.new_data)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </CollapsibleContent>
                        </CardContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-sm text-slate-500">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredHistory.length)} of{' '}
                  {filteredHistory.length} records
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-slate-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-slate-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Revert Confirmation Dialog */}
      <AlertDialog open={isRevertDialogOpen} onOpenChange={setIsRevertDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900 dark:text-white">Revert to Previous Version?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This will restore the content to its previous state before this change was made.
              A new history record will be created for this revert action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevert} className="bg-orange-600 hover:bg-orange-700 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
