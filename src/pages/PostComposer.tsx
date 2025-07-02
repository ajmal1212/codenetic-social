
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/PlatformIcon";
import { Calendar as CalendarIcon, Upload, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const PostComposer = () => {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const platforms = [
    { id: "facebook", name: "Facebook", maxChars: 63206 },
    { id: "instagram", name: "Instagram", maxChars: 2200 },
    { id: "twitter", name: "Twitter", maxChars: 280 },
    { id: "linkedin", name: "LinkedIn", maxChars: 3000 },
    { id: "youtube", name: "YouTube", maxChars: 5000 },
    { id: "tiktok", name: "TikTok", maxChars: 300 },
    { id: "pinterest", name: "Pinterest", maxChars: 500 },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setMediaFiles(prev => [...prev, ...files]);
  };

  const handlePostNow = () => {
    if (!content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    // Simulate posting
    toast.success(`Post published to ${selectedPlatforms.length} platform(s)!`);
    
    // Reset form
    setContent("");
    setSelectedPlatforms([]);
    setScheduledDate(undefined);
    setScheduledTime("");
    setMediaFiles([]);
  };

  const handleSchedulePost = () => {
    if (!content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    if (!scheduledDate || !scheduledTime) {
      toast.error("Please set a date and time for scheduling");
      return;
    }

    toast.success("Post scheduled successfully!");
    
    // Reset form
    setContent("");
    setSelectedPlatforms([]);
    setScheduledDate(undefined);
    setScheduledTime("");
    setMediaFiles([]);
  };

  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return null;
    const limits = selectedPlatforms.map(platformId => 
      platforms.find(p => p.id === platformId)?.maxChars || 0
    );
    return Math.min(...limits);
  };

  const characterLimit = getCharacterLimit();
  const isOverLimit = characterLimit && content.length > characterLimit;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Post</h1>
        <p className="text-muted-foreground">Compose and schedule your content across multiple platforms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Composer */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                {characterLimit && (
                  <div className={`text-sm mt-2 ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {content.length} / {characterLimit} characters
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="media-upload" className="text-sm font-medium">Media</Label>
                <div className="mt-2">
                  <input
                    id="media-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('media-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                </div>
                {mediaFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mediaFiles.map((file, index) => (
                      <Badge key={index} variant="secondary">
                        {file.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Platform Selection */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                    />
                    <label
                      htmlFor={platform.id}
                      className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      <PlatformIcon platform={platform.id} size={16} />
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Schedule (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduledDate}
                        onSelect={setScheduledDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="scheduled-time">Time</Label>
                  <Input
                    id="scheduled-time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlatforms.length === 0 ? (
                <p className="text-muted-foreground text-sm">Select platforms to see preview</p>
              ) : (
                <div className="space-y-4">
                  {selectedPlatforms.map((platformId) => (
                    <div key={platformId} className="border border-border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <PlatformIcon platform={platformId} size={16} />
                        <span className="text-sm font-medium capitalize">{platformId}</span>
                      </div>
                      <div className="text-sm text-foreground bg-accent p-2 rounded">
                        {content || "Your content will appear here..."}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePostNow}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isOverLimit}
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Now
            </Button>
            <Button
              onClick={handleSchedulePost}
              variant="outline"
              className="w-full"
              disabled={isOverLimit}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
