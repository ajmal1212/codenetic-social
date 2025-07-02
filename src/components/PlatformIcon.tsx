
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

interface PlatformIconProps {
  platform: string;
  size?: number;
  className?: string;
}

export const PlatformIcon = ({ platform, size = 16, className = "" }: PlatformIconProps) => {
  const iconProps = {
    size,
    className: `${className}`,
  };

  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook {...iconProps} className={`${iconProps.className} text-blue-600`} />;
    case 'instagram':
      return <Instagram {...iconProps} className={`${iconProps.className} text-pink-500`} />;
    case 'twitter':
      return <Twitter {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    case 'linkedin':
      return <Linkedin {...iconProps} className={`${iconProps.className} text-blue-700`} />;
    case 'youtube':
      return <Youtube {...iconProps} className={`${iconProps.className} text-red-600`} />;
    case 'tiktok':
      return <div className={`w-4 h-4 bg-black rounded-sm ${className}`} />;
    case 'pinterest':
      return <div className={`w-4 h-4 bg-red-500 rounded-full ${className}`} />;
    default:
      return <div className={`w-4 h-4 bg-gray-400 rounded-sm ${className}`} />;
  }
};
