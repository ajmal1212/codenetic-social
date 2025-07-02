
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Check, Calendar } from "lucide-react";
import { PlatformIcon } from "@/components/PlatformIcon";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const todaysPosts = [
    {
      id: 1,
      content: "Check out our latest product update! 🚀",
      platforms: ["facebook", "twitter", "linkedin"],
      scheduledTime: "2:00 PM",
      status: "scheduled"
    },
    {
      id: 2,
      content: "Behind the scenes at our team meeting",
      platforms: ["instagram", "facebook"],
      scheduledTime: "4:30 PM",
      status: "scheduled"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Posted successfully",
      platform: "facebook",
      time: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      action: "Post scheduled",
      platform: "instagram",
      time: "3 hours ago",
      status: "scheduled"
    },
    {
      id: 3,
      action: "Posted successfully",
      platform: "twitter",
      time: "5 hours ago",
      status: "success"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your social media overview.</p>
        </div>
        <Button onClick={() => navigate("/compose")} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Posts"
          value="156"
          change="+12% from last month"
          changeType="positive"
          icon={<Check className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Followers"
          value="12.4K"
          change="+8.2% from last month"
          changeType="positive"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          title="Engagement Rate"
          value="4.7%"
          change="+0.5% from last month"
          changeType="positive"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatsCard
          title="Scheduled Posts"
          value="23"
          change="Next 7 days"
          changeType="neutral"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Scheduled Posts */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Today's Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysPosts.map((post) => (
              <div key={post.id} className="p-4 border border-border rounded-lg">
                <p className="text-sm text-foreground mb-2">{post.content}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {post.platforms.map((platform) => (
                      <PlatformIcon key={platform} platform={platform} size={16} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.scheduledTime}
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/calendar")}
            >
              View All Scheduled Posts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={activity.platform} size={20} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-secondary' : 'bg-yellow-500'
                }`} />
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/analytics")}
            >
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to create your next post?</h3>
              <p className="opacity-90">Compose and schedule content across all your social media platforms</p>
            </div>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/compose")}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
