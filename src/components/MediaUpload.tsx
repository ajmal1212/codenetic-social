
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Image, Video, Plus } from "lucide-react";
import { toast } from "sonner";

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  file: File;
  preview: string;
}

interface MediaUploadProps {
  mediaItems: MediaItem[];
  onMediaChange: (items: MediaItem[]) => void;
  maxItems?: number;
}

export const MediaUpload = ({ mediaItems, onMediaChange, maxItems = 10 }: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newItems: MediaItem[] = [];
    
    Array.from(files).forEach((file) => {
      if (mediaItems.length + newItems.length >= maxItems) {
        toast.error(`Maximum ${maxItems} files allowed`);
        return;
      }

      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        toast.error(`${file.name} is not a valid image or video file`);
        return;
      }

      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error(`${file.name} is too large. Maximum size is 100MB`);
        return;
      }

      const preview = URL.createObjectURL(file);
      newItems.push({
        id: `${Date.now()}-${Math.random()}`,
        type: isImage ? 'image' : 'video',
        url: preview,
        file,
        preview
      });
    });

    onMediaChange([...mediaItems, ...newItems]);
  };

  const removeMedia = (id: string) => {
    const updatedItems = mediaItems.filter(item => {
      if (item.id === id) {
        URL.revokeObjectURL(item.preview);
        return false;
      }
      return true;
    });
    onMediaChange(updatedItems);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="w-4 h-4" />
          <span className="text-sm font-medium">Media ({mediaItems.length}/{maxItems})</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={openFileDialog}
          disabled={mediaItems.length >= maxItems}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {mediaItems.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Image className="w-6 h-6 text-blue-600" />
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Add Images & Videos</h3>
                <p className="text-gray-500 mt-1">
                  Upload up to {maxItems} files to create engaging posts
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={openFileDialog}
                className="mt-4"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="relative group">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    {item.type === 'image' ? (
                      <img
                        src={item.preview}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant={item.type === 'image' ? 'default' : 'secondary'} className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeMedia(item.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {mediaItems.length > 1 && (
        <div className="text-center">
          <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700">
            Will be posted as a carousel on supported platforms
          </Badge>
        </div>
      )}
    </div>
  );
};
