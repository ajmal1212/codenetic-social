
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "./PlatformIcon";
import { Heart, Share2, Eye, MessageCircle, TrendingUp, ExternalLink, MoreVertical } from "lucide-react";

const mockTopPosts = [
  {
    id: 1,
    content: "🚀 Just launched our new AI-powered social media analytics dashboard! The future of content creation is here. #AI #SocialMedia #Innovation",
    platform: "linkedin",
    likes: 1245,
    shares: 187,
    comments: 89,
    engagement: "8.2%",
    reach: 15200,
    date: "2 hours ago",
    thumbnail: null,
    type: "text"
  },
  {
    id: 2,
    content: "Behind the scenes of our product development process ✨ Swipe to see the journey from concept to reality! #ProductDevelopment #Tech #BehindTheScenes",
    platform: "instagram",
    likes: 2890,
    shares: 234,
    comments: 156,
    engagement: "7.8%",
    reach: 37200,
    date: "5 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    type: "carousel"
  },
  {
    id: 3,
    content: "Weekly industry insights: The rise of AI in social media marketing 📊 Thread below with key statistics and trends to watch in 2024.",
    platform: "twitter",
    likes: 567,
    shares: 89,
    comments: 45,
    engagement: "6.4%",
    reach: 8900,
    date: "1 day ago",
    thumbnail: null,
    type: "thread"
  },
  {
    id: 4,
    content: "🎯 5 proven strategies to boost your social media engagement in 2024. Save this post for later! Which strategy works best for you?",
    platform: "facebook",
    likes: 892,
    shares: 156,
    comments: 78,
    engagement: "9.1%",
    reach: 12400,
    date: "2 days ago",
    thumbnail: null,
    type: "text"
  }
];

export const TopPerformingPosts = () => {
  const getPlatformGradient = (platform: string) => {
    const gradients = {
      instagram: "from-pink-500 to-purple-600",
      linkedin: "from-blue-600 to-blue-700",
      twitter: "from-blue-400 to-blue-500",
      facebook: "from-blue-600 to-blue-700",
      youtube: "from-red-500 to-red-600",
      tiktok: "from-black to-gray-800"
    };
    return gradients[platform as keyof typeof gradients] || "from-gray-500 to-gray-600";
  };

  const getEngagementColor = (rate: string) => {
    const num = parseFloat(rate);
    if (num >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (num >= 6) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  return (
    <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            Top Performing Posts
          </CardTitle>
          <Button variant="outline" size="sm" className="text-xs">
            View All
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 px-6">
        {mockTopPosts.map((post, index) => (
          <div 
            key={post.id} 
            className="group p-4 rounded-xl border border-slate-100 bg-white/70 hover:bg-white hover:shadow-md transition-all duration-300"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-8 h-8 bg-gradient-to-r ${getPlatformGradient(post.platform)} rounded-lg flex items-center justify-center shadow-sm`}>
                    <PlatformIcon platform={post.platform} size={16} className="text-white" />
                  </div>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{index + 1}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm capitalize">{post.platform}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  {post.type !== 'text' && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {post.type}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                {post.content}
              </p>
              {post.thumbnail && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt="Post thumbnail" 
                    className="w-full h-32 object-cover bg-gray-100"
                  />
                </div>
              )}
            </div>

            {/* Engagement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-lg">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-red-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {post.likes.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Likes</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-3 h-3 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{post.shares}</div>
                  <div className="text-xs text-gray-500">Shares</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-lg">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="w-3 h-3 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {post.reach.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Reach</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Badge 
                  variant="outline" 
                  className={`px-2 py-1 font-semibold border ${getEngagementColor(post.engagement)}`}
                >
                  {post.engagement} Rate
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
