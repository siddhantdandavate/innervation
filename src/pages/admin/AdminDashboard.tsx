import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSContent, CMSBlog, CMSHistory } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Palette, History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [contentCount, setContentCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [recentHistory, setRecentHistory] = useState<CMSHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contentRes, blogRes, historyRes] = await Promise.all([
          cmsAdminApi.getAllContent(),
          cmsAdminApi.getAllBlogs(),
          cmsAdminApi.getHistory(undefined, 5),
        ]);
        setContentCount(contentRes.data.length);
        setBlogCount(blogRes.data.length);
        setRecentHistory(historyRes.data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    {
      title: 'Content Sections',
      value: contentCount,
      icon: FileText,
      href: '/admin/content',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Blog Posts',
      value: blogCount,
      icon: BookOpen,
      href: '/admin/blogs',
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Theme Colors',
      value: '12',
      icon: Palette,
      href: '/admin/theme',
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'History Records',
      value: recentHistory.length + '+',
      icon: History,
      href: '/admin/history',
      color: 'bg-orange-500/10 text-orange-500',
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{loading ? '...' : stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/admin/content"
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-primary" />
                  <span className="font-medium">Edit Homepage Content</span>
                </div>
                <ArrowRight size={18} className="text-muted-foreground" />
              </Link>
              <Link
                to="/admin/blogs"
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-primary" />
                  <span className="font-medium">Create New Blog Post</span>
                </div>
                <ArrowRight size={18} className="text-muted-foreground" />
              </Link>
              <Link
                to="/admin/theme"
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Palette size={18} className="text-primary" />
                  <span className="font-medium">Customize Theme Colors</span>
                </div>
                <ArrowRight size={18} className="text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Link to="/admin/history" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground text-sm">Loading...</p>
              ) : recentHistory.length === 0 ? (
                <p className="text-muted-foreground text-sm">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {recentHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{item.description || `${item.action} ${item.entity_type}`}</p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Website Preview Link */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">View Your Website</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Changes are applied in real-time. Open your website to see updates.
                </p>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Open Website
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
