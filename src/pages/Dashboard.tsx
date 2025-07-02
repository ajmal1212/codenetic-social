
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialMediaAPI } from "@/services/socialMediaAPI";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalFollowers: 0,
    engagementRate: 0,
    connectedAccounts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [accounts, posts, analyticsData] = await Promise.all([
        SocialMediaAPI.getSocialAccounts(),
        SocialMediaAPI.getPosts(),
        SocialMediaAPI.getAnalytics(),
      ]);

      const connectedAccounts = accounts.filter(acc => acc.is_connected);
      const totalFollowers = connectedAccounts.reduce(
        (sum, acc) => sum + (acc.followers_count || 0), 0
      );

      const avgEngagement = analyticsData.length > 0
        ? analyticsData.reduce((sum, item) => sum + item.engagement_rate, 0) / analyticsData.length
        : 0;

      setStats({
        totalPosts: posts.length,
        totalFollowers,
        engagementRate: avgEngagement,
        connectedAccounts: connectedAccounts.length,
      });

      setRecentPosts(posts.slice(0, 5));
      setAnalytics(analyticsData.slice(0, 7));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const chartData = analytics.map((item, index) => ({
    name: `Day ${index + 1}`,
    engagement: item.engagement_rate,
    views: item.views_count / 100, // Scale down for better visualization
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your social media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts.toString()}
          change="+12%"
          trend="up"
        />
        <StatsCard
          title="Total Followers"
          value={stats.totalFollowers.toLocaleString()}
          change="+5.2%"
          trend="up"
        />
        <StatsCard
          title="Engagement Rate"
          value={`${stats.engagementRate.toFixed(1)}%`}
          change="+2.1%"
          trend="up"
        />
        <StatsCard
          title="Connected Accounts"
          value={stats.connectedAccounts.toString()}
          change="0%"
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#2D5BFF" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="border-b pb-3 last:border-b-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {post.platforms.join(", ")}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No posts yet. Create your first post!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
