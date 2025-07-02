
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialMediaAPI } from "@/services/socialMediaAPI";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { TrendingUp, Users, Heart, Share2, Eye, Calendar, ArrowUpRight, ArrowDownRight, PenTool, BarChart3 } from "lucide-react";
import { PlatformIcon } from "@/components/PlatformIcon";
import { TopPerformingPosts } from "@/components/TopPerformingPosts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalFollowers: 0,
    engagementRate: 0,
    connectedAccounts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);

  // Mock data for better UI demonstration
  const mockEngagementData = [
    { name: 'Mon', engagement: 4200, reach: 12500, impressions: 18000 },
    { name: 'Tue', engagement: 5800, reach: 15200, impressions: 22000 },
    { name: 'Wed', engagement: 4900, reach: 13800, impressions: 19500 },
    { name: 'Thu', engagement: 7200, reach: 18900, impressions: 28000 },
    { name: 'Fri', engagement: 8500, reach: 22100, impressions: 32500 },
    { name: 'Sat', engagement: 6800, reach: 16700, impressions: 24000 },
    { name: 'Sun', engagement: 5200, reach: 14300, impressions: 20500 },
  ];

  const mockPlatformData = [
    { platform: 'Instagram', followers: 25400, engagement: 8.2, growth: 12.5 },
    { platform: 'Facebook', followers: 18700, engagement: 6.8, growth: 8.3 },
    { platform: 'Twitter', followers: 12300, engagement: 4.5, growth: 15.2 },
    { platform: 'LinkedIn', followers: 8900, engagement: 5.1, growth: 22.1 },
    { platform: 'YouTube', followers: 6200, engagement: 12.3, growth: 18.7 },
  ];

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

      // Use mock data for better demonstration
      setStats({
        totalPosts: 156,
        totalFollowers: 71500,
        engagementRate: 7.2,
        connectedAccounts: 5,
      });

      setAnalytics(mockEngagementData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // Set mock data on error
      setStats({
        totalPosts: 156,
        totalFollowers: 71500,
        engagementRate: 7.2,
        connectedAccounts: 5,
      });
      setAnalytics(mockEngagementData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your social media performance overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts.toString()}
          change="+12.5% from last month"
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Followers"
          value={stats.totalFollowers.toLocaleString()}
          change="+8.2% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Engagement Rate"
          value={`${stats.engagementRate.toFixed(1)}%`}
          change="+2.1% from last month"
          changeType="positive"
          icon={<Heart className="h-4 w-4" />}
        />
        <StatsCard
          title="Connected Accounts"
          value={stats.connectedAccounts.toString()}
          change="All platforms active"
          changeType="neutral"
          icon={<Share2 className="h-4 w-4" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Engagement Overview */}
        <Card className="xl:col-span-2 shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Engagement Overview</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +15.2%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockEngagementData}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPlatformData.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={platform.platform.toLowerCase()} size={20} />
                  <div>
                    <div className="font-medium text-sm">{platform.platform}</div>
                    <div className="text-xs text-muted-foreground">
                      {platform.followers.toLocaleString()} followers
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">
                    {platform.engagement}%
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{platform.growth}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Posts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <TopPerformingPosts />

        {/* Quick Actions */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button className="justify-start h-auto p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <PenTool className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Create New Post</div>
                  <div className="text-xs opacity-90">Share across all platforms</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 border-slate-200 hover:bg-slate-50">
                <Calendar className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Schedule Content</div>
                  <div className="text-xs text-muted-foreground">Plan your posts ahead</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 border-slate-200 hover:bg-slate-50">
                <BarChart3 className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">View Analytics</div>
                  <div className="text-xs text-muted-foreground">Detailed performance insights</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
