import { useState, useEffect, useMemo, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSBlog } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Loader2,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
}

const emptyBlog: BlogFormData = {
  title: '',
  excerpt: '',
  content: '',
  featured_image: '',
  is_published: false,
  meta_title: '',
  meta_description: '',
};

const ITEMS_PER_PAGE = 10;

type SortField = 'title' | 'created_at' | 'updated_at';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'all' | 'published' | 'draft';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [deletedBlogs, setDeletedBlogs] = useState<CMSBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingBlog, setEditingBlog] = useState<CMSBlog | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(emptyBlog);
  
  // Table state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();

  // Auto-save draft interval
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!isDialogOpen || !formData.title.trim()) return;
    
    const interval = setInterval(() => {
      if (formData.title.trim() && formData.content.trim()) {
        setLastSaved(new Date());
        // Could implement actual auto-save to backend here
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isDialogOpen, formData]);

  const loadBlogs = async () => {
    try {
      const [activeRes, deletedRes] = await Promise.all([
        cmsAdminApi.getAllBlogs(),
        cmsAdminApi.getDeletedBlogs(),
      ]);
      setBlogs(activeRes.data);
      setDeletedBlogs(deletedRes.data);
    } catch (err) {
      console.error('Error loading blogs:', err);
      toast({
        title: 'Error',
        description: 'Failed to load blogs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let result = showDeleted ? [...deletedBlogs] : [...blogs];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        blog =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt?.toLowerCase().includes(query) ||
          blog.content.toLowerCase().includes(query)
      );
    }

    // Apply status filter (only for active blogs)
    if (!showDeleted && statusFilter !== 'all') {
      result = result.filter(blog =>
        statusFilter === 'published' ? blog.is_published : !blog.is_published
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'updated_at':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [blogs, deletedBlogs, showDeleted, searchQuery, statusFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedBlogs, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, showDeleted]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedBlogs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedBlogs.map(b => b.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData(emptyBlog);
    setLastSaved(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (blog: CMSBlog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content,
      featured_image: blog.featured_image || '',
      is_published: blog.is_published,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
    });
    setLastSaved(null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: 'Error',
        description: 'Title and content are required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (editingBlog) {
        await cmsAdminApi.updateBlog(editingBlog.id, formData);
        toast({ title: 'Success', description: 'Blog updated successfully' });
      } else {
        await cmsAdminApi.createBlog(formData);
        toast({ title: 'Success', description: 'Blog created successfully' });
      }
      setIsDialogOpen(false);
      loadBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
      toast({
        title: 'Error',
        description: 'Failed to save blog',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBlogId) return;

    try {
      await cmsAdminApi.deleteBlog(deletingBlogId);
      toast({ title: 'Deleted', description: 'Blog moved to trash' });
      setIsDeleteDialogOpen(false);
      setDeletingBlogId(null);
      loadBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete blog',
        variant: 'destructive',
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        Array.from(selectedIds).map(id => cmsAdminApi.deleteBlog(id))
      );
      toast({ title: 'Deleted', description: `${selectedIds.size} blogs moved to trash` });
      setIsBulkDeleteDialogOpen(false);
      setSelectedIds(new Set());
      loadBlogs();
    } catch (err) {
      console.error('Error bulk deleting blogs:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete some blogs',
        variant: 'destructive',
      });
    }
  };

  const handleBulkPublish = async (publish: boolean) => {
    try {
      await Promise.all(
        Array.from(selectedIds).map(id => 
          cmsAdminApi.updateBlog(id, { is_published: publish })
        )
      );
      toast({ 
        title: publish ? 'Published' : 'Unpublished', 
        description: `${selectedIds.size} blogs ${publish ? 'published' : 'unpublished'}` 
      });
      setSelectedIds(new Set());
      loadBlogs();
    } catch (err) {
      console.error('Error bulk updating blogs:', err);
      toast({
        title: 'Error',
        description: 'Failed to update some blogs',
        variant: 'destructive',
      });
    }
  };

  const handleBulkRestore = async () => {
    try {
      await Promise.all(
        Array.from(selectedIds).map(id => cmsAdminApi.restoreBlog(id))
      );
      toast({ title: 'Restored', description: `${selectedIds.size} blogs restored` });
      setSelectedIds(new Set());
      loadBlogs();
    } catch (err) {
      console.error('Error bulk restoring blogs:', err);
      toast({
        title: 'Error',
        description: 'Failed to restore some blogs',
        variant: 'destructive',
      });
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await cmsAdminApi.restoreBlog(id);
      toast({ title: 'Restored', description: 'Blog restored successfully' });
      loadBlogs();
    } catch (err) {
      console.error('Error restoring blog:', err);
      toast({
        title: 'Error',
        description: 'Failed to restore blog',
        variant: 'destructive',
      });
    }
  };

  const handleTogglePublish = async (blog: CMSBlog) => {
    try {
      await cmsAdminApi.updateBlog(blog.id, { is_published: !blog.is_published });
      toast({
        title: blog.is_published ? 'Unpublished' : 'Published',
        description: `Blog ${blog.is_published ? 'hidden from' : 'visible on'} website`,
      });
      loadBlogs();
    } catch (err) {
      console.error('Error updating blog:', err);
      toast({
        title: 'Error',
        description: 'Failed to update blog',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Blog Manager">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog Manager">
      <div className="space-y-4">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={!showDeleted ? 'default' : 'outline'}
              onClick={() => { setShowDeleted(false); setSelectedIds(new Set()); }}
              className={!showDeleted ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-slate-300 text-slate-700'}
            >
              Active ({blogs.length})
            </Button>
            <Button
              variant={showDeleted ? 'default' : 'outline'}
              onClick={() => { setShowDeleted(true); setSelectedIds(new Set()); }}
              className={showDeleted ? 'bg-red-600 hover:bg-red-700 text-white' : 'border-slate-300 text-slate-700'}
            >
              Trash ({deletedBlogs.length})
            </Button>
          </div>
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
              {!showDeleted && (
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                  <SelectTrigger className="w-[150px] border-slate-200">
                    <Filter className="w-4 h-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <Card className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <CardContent className="p-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {selectedIds.size} item(s) selected
                </span>
                <div className="flex items-center gap-2">
                  {showDeleted ? (
                    <Button size="sm" variant="outline" onClick={handleBulkRestore} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Restore All
                    </Button>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleBulkPublish(true)} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                        <Eye className="w-4 h-4 mr-1" />
                        Publish
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkPublish(false)} className="border-slate-300 text-slate-700 hover:bg-slate-50">
                        <EyeOff className="w-4 h-4 mr-1" />
                        Unpublish
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsBulkDeleteDialogOpen(true)} className="border-red-300 text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())} className="text-slate-500">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blog Table */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
          {filteredAndSortedBlogs.length === 0 ? (
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">
                {showDeleted ? 'No deleted blogs' : searchQuery ? 'No blogs match your search' : 'No blog posts yet'}
              </p>
              {!showDeleted && !searchQuery && (
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreate}>
                  Create your first blog post
                </Button>
              )}
            </CardContent>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedIds.size === paginatedBlogs.length && paginatedBlogs.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-slate-900"
                        onClick={() => handleSort('title')}
                      >
                        <div className="flex items-center gap-1">
                          Title
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-28">Status</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-slate-900 w-36"
                        onClick={() => handleSort('created_at')}
                      >
                        <div className="flex items-center gap-1">
                          Created
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-slate-900 w-36"
                        onClick={() => handleSort('updated_at')}
                      >
                        <div className="flex items-center gap-1">
                          Updated
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="w-28 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedBlogs.map((blog) => (
                      <TableRow key={blog.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.has(blog.id)}
                            onCheckedChange={() => handleSelectOne(blog.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="max-w-sm">
                            <p className="font-medium text-slate-900 dark:text-white truncate">{blog.title}</p>
                            <p className="text-sm text-slate-500 truncate">
                              {blog.excerpt || blog.content.substring(0, 60)}...
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {blog.is_published ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                              Draft
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {new Date(blog.updated_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {showDeleted ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRestore(blog.id)}
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            ) : (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTogglePublish(blog)}
                                  className="text-slate-500 hover:text-slate-700"
                                >
                                  {blog.is_published ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(blog)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setDeletingBlogId(blog.id);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedBlogs.length)} of{' '}
                    {filteredAndSortedBlogs.length} results
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
            </>
          )}
        </Card>
      </div>

      {/* Blog Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">
              {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
            </DialogTitle>
            {lastSaved && (
              <p className="text-xs text-slate-500">
                Draft auto-saved at {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog title"
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Excerpt</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short description for blog list"
                rows={2}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Content *</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog content here..."
                rows={12}
                className="border-slate-200 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Featured Image URL</label>
              <Input
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="border-slate-200"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Meta Title (SEO)</label>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="SEO title"
                  className="border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Meta Description (SEO)</label>
                <Input
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="SEO description"
                  className="border-slate-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <Checkbox
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked as boolean })}
              />
              <label htmlFor="is_published" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Publish immediately
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {editingBlog ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900 dark:text-white">Delete Blog Post?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This will move the blog post to trash. You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900 dark:text-white">Delete {selectedIds.size} Blog Posts?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This will move the selected blog posts to trash. You can restore them later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
