
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "./PlatformIcon";
import { MediaItem } from "./MediaUpload";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";

interface MobilePreviewProps {
  content: string;
  mediaItems: MediaItem[];
  selectedPlatforms: string[];
}

const PlatformPreview = ({ platform, content, mediaItems }: { platform: string; content: string; mediaItems: MediaItem[] }) => {
  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const renderMedia = () => {
    if (mediaItems.length === 0) return null;

    if (mediaItems.length === 1) {
      const item = mediaItems[0];
      return (
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {item.type === 'image' ? (
            <img src={item.preview} alt="Post media" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">VIDEO</div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img src={mediaItems[0].preview} alt="Post media" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-black/70 text-white text-xs">1/{mediaItems.length}</Badge>
        </div>
        <div className="flex justify-center mt-2 space-x-1">
          {mediaItems.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Platform-specific styling
  const getPlatformStyles = () => {
    switch (platform) {
      case 'instagram':
        return {
          bg: 'bg-white',
          accent: 'text-black',
          username: '@yourhandle'
        };
      case 'facebook':
        return {
          bg: 'bg-white',
          accent: 'text-blue-600',
          username: 'Your Page'
        };
      case 'twitter':
        return {
          bg: 'bg-white',
          accent: 'text-black',
          username: '@yourhandle'
        };
      case 'linkedin':
        return {
          bg: 'bg-white',
          accent: 'text-blue-700',
          username: 'Your Name'
        };
      default:
        return {
          bg: 'bg-white',
          accent: 'text-gray-900',
          username: 'Your Profile'
        };
    }
  };

  const styles = getPlatformStyles();

  return (
    <div className={`${styles.bg} rounded-lg shadow-sm border border-gray-200 overflow-hidden`}>
      {/* Header */}
      <div className="p-3 flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <PlatformIcon platform={platform} size={16} />
        </div>
        <div className="flex-1">
          <div className={`font-semibold text-sm ${styles.accent}`}>{styles.username}</div>
          <div className="text-xs text-gray-500">2 min • 🌍</div>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </div>

      {/* Content */}
      {content && (
        <div className="px-3 pb-3">
          <div className="text-sm text-gray-800">
            {formatContent(content)}
          </div>
        </div>
      )}

      {/* Media */}
      {mediaItems.length > 0 && (
        <div className="px-3 pb-3">
          {renderMedia()}
        </div>
      )}

      {/* Actions */}
      <div className="px-3 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">24</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">3</span>
            </div>
            <Share className="w-4 h-4 text-gray-500" />
          </div>
          <Bookmark className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export const MobilePreview = ({ content, mediaItems, selectedPlatforms }: MobilePreviewProps) => {
  if (selectedPlatforms.length === 0) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📱 Mobile Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              📱
            </div>
            <p>Select platforms to see preview</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          📱 Mobile Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedPlatforms.map((platform) => (
          <div key={platform} className="space-y-3">
            <div className="flex items-center gap-2">
              <PlatformIcon platform={platform} size={20} />
              <span className="font-medium capitalize text-sm">{platform}</span>
            </div>
            <div className="max-w-xs mx-auto">
              <PlatformPreview
                platform={platform}
                content={content}
                mediaItems={mediaItems}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
