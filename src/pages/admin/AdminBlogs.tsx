import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSBlog } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Loader2,
  RotateCcw,
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

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [deletedBlogs, setDeletedBlogs] = useState<CMSBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingBlog, setEditingBlog] = useState<CMSBlog | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(emptyBlog);
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

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

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData(emptyBlog);
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
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const displayBlogs = showDeleted ? deletedBlogs : blogs;

  return (
    <AdminLayout title="Blog Manager">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={!showDeleted ? 'default' : 'outline'}
              onClick={() => setShowDeleted(false)}
            >
              Active ({blogs.length})
            </Button>
            <Button
              variant={showDeleted ? 'default' : 'outline'}
              onClick={() => setShowDeleted(true)}
            >
              Trash ({deletedBlogs.length})
            </Button>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        {displayBlogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {showDeleted ? 'No deleted blogs' : 'No blog posts yet'}
              </p>
              {!showDeleted && (
                <Button className="mt-4" onClick={handleCreate}>
                  Create your first blog post
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {displayBlogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{blog.title}</h3>
                        {blog.is_published ? (
                          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {blog.excerpt || blog.content.substring(0, 150)}...
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(blog.created_at).toLocaleDateString()}
                        {blog.published_at && ` • Published ${new Date(blog.published_at).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {showDeleted ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRestore(blog.id)}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(blog)}
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
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Blog Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short description for blog list"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content *</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog content here..."
                rows={10}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Featured Image URL</label>
              <Input
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Title (SEO)</label>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="SEO title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Description (SEO)</label>
                <Input
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="SEO description"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_published" className="text-sm">
                Publish immediately
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This will move the blog post to trash. You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
