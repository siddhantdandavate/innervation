import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cmsAdminApi, CMSHistory } from '@/lib/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Palette, History, ArrowRight, ExternalLink } from 'lucide-react';
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
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    },
    {
      title: 'Blog Posts',
      value: blogCount,
      icon: BookOpen,
      href: '/admin/blogs',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    },
    {
      title: 'Theme Colors',
      value: '12',
      icon: Palette,
      href: '/admin/theme',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    },
    {
      title: 'History Records',
      value: recentHistory.length + '+',
      icon: History,
      href: '/admin/history',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50',
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-0 ${stat.bgColor}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                        {loading ? '...' : stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                      <stat.icon size={24} className={stat.iconColor} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="border-b border-slate-100 dark:border-slate-700">
              <CardTitle className="text-lg text-slate-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <Link
                to="/admin/content"
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">Edit Homepage Content</span>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
              <Link
                to="/admin/blogs"
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                    <BookOpen size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">Create New Blog Post</span>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
              <Link
                to="/admin/theme"
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <Palette size={18} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">Customize Theme Colors</span>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-700">
              <CardTitle className="text-lg text-slate-900 dark:text-white">Recent Activity</CardTitle>
              <Link to="/admin/history" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              {loading ? (
                <p className="text-slate-500 text-sm">Loading...</p>
              ) : recentHistory.length === 0 ? (
                <p className="text-slate-500 text-sm">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {recentHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                          {item.description || `${item.action} ${item.entity_type}`}
                        </p>
                        <p className="text-slate-500 text-xs">
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
        <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-blue-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white text-lg">View Your Website</h3>
                <p className="text-blue-100 mt-1">
                  Changes are applied in real-time. Open your website to see updates.
                </p>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
              >
                Open Website
                <ExternalLink size={16} />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
