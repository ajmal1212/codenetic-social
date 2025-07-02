
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlatformIcon } from "./PlatformIcon";
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
  const [isPosting, setIsPosting] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePost = async () => {
    if (!content.trim()) {
      toast.error("Please enter content for your post");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    setIsPosting(true);

    try {
      await SocialMediaAPI.createPost({
        content,
        platforms: selectedPlatforms,
        scheduled_time: scheduledTime || undefined,
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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform}
                  className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
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
            />
          </div>

          <Button
            onClick={handlePost}
            disabled={isPosting}
            className="w-full"
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

      {content && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
