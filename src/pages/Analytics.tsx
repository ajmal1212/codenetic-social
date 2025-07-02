
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import { PlatformIcon } from "@/components/PlatformIcon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Calendar, Download, TrendingUp, Users, Heart, Share2, Eye, ArrowUpRight, Filter, Zap } from "lucide-react";

const Analytics = () => {
  // Enhanced mock data for better visualization
  const engagementData = [
    { name: 'Week 1', engagement: 2400, reach: 12000, impressions: 18000 },
    { name: 'Week 2', engagement: 3800, reach: 15000, impressions: 22000 },
    { name: 'Week 3', engagement: 2900, reach: 13500, impressions: 19500 },
    { name: 'Week 4', engagement: 5200, reach: 18000, impressions: 28000 },
  ];

  const platformData = [
    { platform: 'Instagram', followers: 25400, engagement: 680, growth: 12.5, color: '#E1306C' },
    { platform: 'Facebook', followers: 18700, engagement: 520, growth: 8.3, color: '#1877F2' },
    { platform: 'Twitter', followers: 12300, engagement: 320, growth: 15.2, color: '#1DA1F2' },
    { platform: 'LinkedIn', followers: 8900, engagement: 280, growth: 22.1, color: '#0077B5' },
    { platform: 'YouTube', followers: 6200, engagement: 420, growth: 18.7, color: '#FF0000' },
  ];

  const contentTypeData = [
    { name: 'Images', value: 45, color: '#3B82F6' },
    { name: 'Videos', value: 30, color: '#10B981' },
    { name: 'Text Posts', value: 15, color: '#F59E0B' },
    { name: 'Links', value: 10, color: '#EF4444' },
  ];

  const topPosts = [
    {
      id: 1,
      content: "🚀 Just launched our new AI-powered social media analytics dashboard! The future of content creation is here. #AI #SocialMedia #Analytics",
      platform: "linkedin",
      likes: 1245,
      shares: 187,
      comments: 89,
      engagement: "8.2%",
      reach: 15200,
      date: "2024-01-15",
      performance: "excellent"
    },
    {
      id: 2,
      content: "Behind the scenes of our product development process ✨ Building the future, one line of code at a time! #ProductDevelopment #Tech #Innovation",
      platform: "instagram",
      likes: 2890,
      shares: 234,
      comments: 156,
      engagement: "7.8%",
      reach: 37200,
      date: "2024-01-14",
      performance: "excellent"
    },
    {
      id: 3,
      content: "Weekly industry insights: The rise of AI in social media marketing 📊 How are you leveraging AI in your marketing strategy?",
      platform: "twitter",
      likes: 567,
      shares: 89,
      comments: 45,
      engagement: "6.4%",
      reach: 8900,
      date: "2024-01-13",
      performance: "good"
    },
    {
      id: 4,
      content: "Client success story: How we helped increase engagement by 300% in just 30 days! 📈 #ClientSuccess #SocialMediaMarketing",
      platform: "facebook",
      likes: 892,
      shares: 156,
      comments: 78,
      engagement: "5.9%",
      reach: 12400,
      date: "2024-01-12",
      performance: "good"
    }
  ];

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Good</Badge>;
      case 'average':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Average</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your social media performance and audience engagement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reach"
          value="125.2K"
          change="+18.5% from last month"
          changeType="positive"
          icon={<Eye className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Followers"
          value="71.5K"
          change="+12.3% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Avg. Engagement Rate"
          value="7.2%"
          change="+2.8% from last month"
          changeType="positive"
          icon={<Heart className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Shares"
          value="8.9K"
          change="+25.1% from last month"
          changeType="positive"
          icon={<Share2 className="h-4 w-4" />}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Engagement Trend */}
        <Card className="xl:col-span-2 shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Engagement Trends</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +24.3%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={engagementData}>
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
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Type Distribution */}
        <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Content Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {contentTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="platform" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Top Performing Posts
            </CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {topPosts.map((post) => (
            <div key={post.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50/30 hover:bg-slate-50/50 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium flex-1 pr-4 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={post.platform} size={16} />
                  {getPerformanceBadge(post.performance)}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-sm font-semibold flex items-center justify-center gap-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    {post.likes.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div>
                  <div className="text-sm font-semibold flex items-center justify-center gap-1">
                    <Share2 className="h-3 w-3 text-blue-500" />
                    {post.shares}
                  </div>
                  <div className="text-xs text-muted-foreground">Shares</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">{post.comments}</div>
                  <div className="text-xs text-muted-foreground">Comments</div>
                </div>
                <div>
                  <div className="text-sm font-semibold flex items-center justify-center gap-1">
                    <Eye className="h-3 w-3 text-green-500" />
                    {post.reach.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Reach</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-purple-600">{post.engagement}</div>
                  <div className="text-xs text-muted-foreground">Rate</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
