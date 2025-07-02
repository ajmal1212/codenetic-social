
import { PostComposerForm } from "@/components/PostComposerForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Calendar, Target } from "lucide-react";

const PostComposer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Full-width Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight">
                Create Amazing Content
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Share your content across multiple platforms with our intelligent posting system. 
              Reach your audience wherever they are with beautiful, engaging posts.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights - Full Width */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Instant Publishing</h3>
                <p className="text-blue-700 leading-relaxed">Post to all platforms simultaneously with one click</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Smart Scheduling</h3>
                <p className="text-green-700 leading-relaxed">Optimize posting times for maximum engagement</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Multi-Platform</h3>
                <p className="text-purple-700 leading-relaxed">Reach audiences on all major networks</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Form Section - Full Width */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <PostComposerForm />
        </div>
      </div>

      {/* Tips Section - Full Width */}
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              Pro Tips for Better Engagement
            </h3>
            <p className="text-gray-300 text-lg">Master the art of social media with these proven strategies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <Badge className="bg-blue-500 text-white mb-4 text-sm px-3 py-1">Content</Badge>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Use compelling visuals to increase engagement by 650%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Ask questions to encourage comments and interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Share behind-the-scenes content for authenticity</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <Badge className="bg-green-500 text-white mb-4 text-sm px-3 py-1">Timing</Badge>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Post when your audience is most active</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Use scheduling to maintain consistent presence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Consider time zones for global audiences</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <Badge className="bg-purple-500 text-white mb-4 text-sm px-3 py-1">Engagement</Badge>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Respond to comments within 2 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Use trending hashtags strategically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Cross-promote content between platforms</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <Badge className="bg-pink-500 text-white mb-4 text-sm px-3 py-1">Analytics</Badge>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Track performance metrics regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>A/B test different content formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Analyze competitor strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
