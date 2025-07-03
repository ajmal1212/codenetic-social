
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstagramAPI, InstagramAccount } from "@/services/instagramAPI";
import { toast } from "sonner";
import { Instagram, Upload, Send, Image, Video } from "lucide-react";

export const InstagramPostComposer = () => {
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>("");
  const [mediaType, setMediaType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [posting, setPosting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await InstagramAPI.getConnectedAccounts();
      setAccounts(data);
      if (data.length > 0 && !selectedAccount) {
        setSelectedAccount(data[0].ig_user_id);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast.error('Please select an image or video file');
      return;
    }

    // Set media type
    setMediaType(isImage ? 'IMAGE' : 'VIDEO');
    setMediaFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    if (!selectedAccount) {
      toast.error('Please select an Instagram account');
      return;
    }

    if (!mediaFile) {
      toast.error('Please select a media file');
      return;
    }

    if (caption.length > 2200) {
      toast.error('Caption is too long (max 2200 characters)');
      return;
    }

    setPosting(true);

    try {
      // Upload media file
      setUploading(true);
      const mediaUrl = await InstagramAPI.uploadMedia(mediaFile);
      setUploading(false);

      // Post to Instagram
      const result = await InstagramAPI.postToInstagram({
        ig_user_id: selectedAccount,
        media_url: mediaUrl,
        caption: caption,
        media_type: mediaType,
      });

      toast.success('Post published successfully to Instagram!');
      
      // Reset form
      setCaption('');
      setMediaFile(null);
      setMediaPreview('');
      
      // Reset file input
      const fileInput = document.getElementById('media-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      toast.error(error.message || 'Failed to post to Instagram');
    } finally {
      setPosting(false);
      setUploading(false);
    }
  };

  if (accounts.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
            <Instagram className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">No Instagram Accounts Connected</h3>
            <p className="text-muted-foreground">
              Connect an Instagram Business account first to start posting
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Instagram className="h-4 w-4 text-white" />
          </div>
          Post to Instagram
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Account Selection */}
        <div className="space-y-2">
          <Label>Instagram Account</Label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Select Instagram account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.ig_user_id} value={account.ig_user_id}>
                  <div className="flex items-center gap-2">
                    {account.profile_pic && (
                      <img 
                        src={account.profile_pic} 
                        alt={account.username}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    @{account.username}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Media Upload */}
        <div className="space-y-2">
          <Label>Media File</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {mediaPreview ? (
              <div className="space-y-4">
                {mediaType === 'IMAGE' ? (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="max-w-full max-h-64 mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <video 
                    src={mediaPreview} 
                    className="max-w-full max-h-64 mx-auto rounded-lg"
                    controls
                  />
                )}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  {mediaType === 'IMAGE' ? <Image className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  {mediaFile?.name}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Upload an image or video for your Instagram post
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, MP4, MOV (max 100MB)
                  </p>
                </div>
              </div>
            )}
            <Input
              id="media-file"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="mt-4"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-2">
          <Label>Caption</Label>
          <Textarea
            placeholder="Write your Instagram caption... Use hashtags and mentions to increase engagement!"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Add hashtags and mentions for better reach</span>
            <span>{caption.length}/2200</span>
          </div>
        </div>

        {/* Post Button */}
        <Button
          onClick={handlePost}
          disabled={posting || uploading || !mediaFile || !selectedAccount}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="lg"
        >
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Uploading Media...
            </div>
          ) : posting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Publishing to Instagram...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Post to Instagram
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
