
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlatformIcon } from "./PlatformIcon";
import { MediaUpload, MediaItem } from "./MediaUpload";
import { MobilePreview } from "./MobilePreview";
import { SocialMediaAPI } from "@/services/socialMediaAPI";
import { toast } from "sonner";
import { Send, Clock, Eye } from "lucide-react";

const PLATFORMS = [
  "facebook",
  "instagram", 
  "twitter",
  "linkedin",
  "youtube",
  "tiktok",
  "pinterest"
];

export const PostComposerForm = () => {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledTime, setScheduledTime] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePost = async () => {
    if (!content.trim() && mediaItems.length === 0) {
      toast.error("Please enter content or add media for your post");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    setIsPosting(true);

    try {
      // In a real app, you'd upload media files first and get URLs
      const mediaUrls = mediaItems.map(item => item.preview);

      await SocialMediaAPI.createPost({
        content,
        platforms: selectedPlatforms,
        scheduled_time: scheduledTime || undefined,
        media_urls: mediaUrls.length > 0 ? mediaUrls : undefined,
      });

      toast.success(
        scheduledTime 
          ? "Post scheduled successfully!" 
          : "Post published successfully!"
      );

      // Reset form
      setContent("");
      setSelectedPlatforms([]);
      setScheduledTime("");
      setMediaItems([]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Main Form - Takes 3 columns on XL screens */}
      <div className="xl:col-span-3 space-y-8">
        {/* Content Creation Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Send className="h-5 w-5 text-white" />
              </div>
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div>
              <Label htmlFor="content" className="text-lg font-semibold mb-3 block">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind? Share your thoughts, insights, or updates..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="text-lg leading-relaxed resize-none border-2 focus:border-blue-500 transition-colors"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Make it engaging and authentic</span>
                <span>{content.length}/2200</span>
              </div>
            </div>

            <MediaUpload
              mediaItems={mediaItems}
              onMediaChange={setMediaItems}
              maxItems={10}
            />
          </CardContent>
        </Card>

        {/* Platform Selection Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Eye className="h-5 w-5 text-white" />
              </div>
              Select Platforms ({selectedPlatforms.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform}
                  className={`flex flex-col items-center space-y-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedPlatforms.includes(platform)
                      ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handlePlatformToggle(platform)}
                >
                  <Checkbox
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                    className="mb-2"
                  />
                  <div className="w-12 h-12 flex items-center justify-center">
                    <PlatformIcon platform={platform} size={24} />
                  </div>
                  <span className="text-sm font-medium capitalize text-center">{platform}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduling and Publishing Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              Schedule & Publish
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div>
              <Label htmlFor="schedule" className="text-lg font-semibold mb-3 block">
                Schedule for later (optional)
              </Label>
              <Input
                id="schedule"
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="text-lg border-2 focus:border-purple-500 transition-colors"
              />
              <p className="text-sm text-gray-600 mt-2">
                Leave empty to publish immediately
              </p>
            </div>

            <Button
              onClick={handlePost}
              disabled={isPosting}
              className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Publishing...
                </div>
              ) : scheduledTime ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Schedule Post
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Post Now
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Content Preview */}
        {(content || mediaItems.length > 0) && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-xl">Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                {content && (
                  <p className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed">{content}</p>
                )}
                {mediaItems.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaItems.slice(0, 8).map((item) => (
                      <div key={item.id} className="aspect-square rounded-xl overflow-hidden shadow-md">
                        {item.type === 'image' ? (
                          <img
                            src={item.preview}
                            alt="Media preview"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                            <span className="text-white font-medium">VIDEO</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {mediaItems.length > 8 && (
                      <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                        <span className="text-gray-600 font-medium">+{mediaItems.length - 8} more</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Mobile Preview - Takes 1 column */}
      <div className="xl:col-span-1">
        <div className="sticky top-6">
          <MobilePreview
            content={content}
            mediaItems={mediaItems}
            selectedPlatforms={selectedPlatforms}
          />
        </div>
      </div>
    </div>
  );
};
