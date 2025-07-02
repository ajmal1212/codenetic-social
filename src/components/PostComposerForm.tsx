
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form - Takes 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <MediaUpload
              mediaItems={mediaItems}
              onMediaChange={setMediaItems}
              maxItems={10}
            />

            <div>
              <Label>Select Platforms</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {PLATFORMS.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePlatformToggle(platform)}
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => handlePlatformToggle(platform)}
                    />
                    <PlatformIcon platform={platform} />
                    <span className="text-sm capitalize">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="schedule">Schedule for later (optional)</Label>
              <Input
                id="schedule"
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              onClick={handlePost}
              disabled={isPosting}
              className="w-full"
              size="lg"
            >
              {isPosting
                ? "Publishing..."
                : scheduledTime
                ? "Schedule Post"
                : "Post Now"
              }
            </Button>
          </CardContent>
        </Card>

        {/* Content Preview */}
        {(content || mediaItems.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                {content && (
                  <p className="whitespace-pre-wrap text-gray-800">{content}</p>
                )}
                {mediaItems.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mediaItems.slice(0, 6).map((item) => (
                      <div key={item.id} className="aspect-square rounded-lg overflow-hidden">
                        {item.type === 'image' ? (
                          <img
                            src={item.preview}
                            alt="Media preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-600">VIDEO</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {mediaItems.length > 6 && (
                      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-gray-600">+{mediaItems.length - 6} more</span>
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
      <div className="lg:col-span-1">
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
