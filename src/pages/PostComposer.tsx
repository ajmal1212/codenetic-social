
import { PostComposerForm } from "@/components/PostComposerForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Calendar, Target } from "lucide-react";

const PostComposer = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Create Amazing Content
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Share your content across multiple platforms with our intelligent posting system. 
          Reach your audience wherever they are.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900">Instant Publishing</h3>
            <p className="text-sm text-blue-700">Post to all platforms simultaneously</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900">Smart Scheduling</h3>
            <p className="text-sm text-green-700">Optimize posting times for engagement</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-sm">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900">Multi-Platform</h3>
            <p className="text-sm text-purple-700">Reach audiences on all networks</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <PostComposerForm />
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-0 bg-gradient-to-r from-slate-50 to-slate-100/50 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Pro Tips for Better Engagement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">Content</Badge>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use compelling visuals to increase engagement by 650%</li>
                <li>• Ask questions to encourage comments and interactions</li>
                <li>• Share behind-the-scenes content for authenticity</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">Timing</Badge>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Post when your audience is most active</li>
                <li>• Use scheduling to maintain consistent presence</li>
                <li>• Consider time zones for global audiences</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostComposer;
