
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { PlatformIcon } from "@/components/PlatformIcon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Calendar, Download, TrendingUp, Users, Heart, Share2 } from "lucide-react";

const Analytics = () => {
  // Mock data for charts
  const engagementData = [
    { name: 'Mon', engagement: 240 },
    { name: 'Tue', engagement: 380 },
    { name: 'Wed', engagement: 290 },
    { name: 'Thu', engagement: 520 },
    { name: 'Fri', engagement: 650 },
    { name: 'Sat', engagement: 480 },
    { name: 'Sun', engagement: 320 },
  ];

  const platformData = [
    { platform: 'Facebook', followers: 12400, engagement: 450 },
    { platform: 'Instagram', followers: 8900, engagement: 680 },
    { platform: 'Twitter', followers: 5600, engagement: 320 },
    { platform: 'LinkedIn', followers: 3200, engagement: 180 },
  ];

  const topPosts = [
    {
      id: 1,
      content: "Check out our latest product update! 🚀",
      platform: "instagram",
      likes: 245,
      shares: 32,
      comments: 18,
      engagement: "4.2%"
    },
    {
      id: 2,
      content: "Behind the scenes at our team meeting",
      platform: "facebook",
      likes: 189,
      shares: 28,
      comments: 15,
      engagement: "3.8%"
    },
    {
      id: 3,
      content: "Weekly newsletter is out now!",
      platform: "twitter",
      likes: 156,
      shares: 45,
      comments: 12,
      engagement: "3.5%"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your social media performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reach"
          value="45.2K"
          change="+12.5% from last month"
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Followers"
          value="30.1K"
          change="+8.2% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Avg. Engagement Rate"
          value="4.7%"
          change="+0.5% from last month"
          changeType="positive"
          icon={<Heart className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Shares"
          value="1.2K"
          change="+15.3% from last month"
          changeType="positive"
          icon={<Share2 className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPosts.map((post) => (
              <div key={post.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm text-foreground font-medium flex-1">{post.content}</p>
                  <PlatformIcon platform={post.platform} size={16} className="ml-3" />
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-foreground">{post.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{post.shares}</div>
                    <div className="text-xs text-muted-foreground">Shares</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{post.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-secondary">{post.engagement}</div>
                    <div className="text-xs text-muted-foreground">Rate</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={platform.platform.toLowerCase()} size={20} />
                  <div>
                    <div className="font-medium text-foreground">{platform.platform}</div>
                    <div className="text-sm text-muted-foreground">{platform.followers.toLocaleString()} followers</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-secondary">{platform.engagement}</div>
                  <div className="text-xs text-muted-foreground">engagement</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
