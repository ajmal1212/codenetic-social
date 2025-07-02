
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "./PlatformIcon";
import { SocialAccount } from "@/services/socialMediaAPI";
import { Users, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

interface SocialAccountCardProps {
  account?: SocialAccount;
  platform: string;
  onConnect: (platform: string) => void;
  onDisconnect: (accountId: string) => void;
}

export const SocialAccountCard = ({
  account,
  platform,
  onConnect,
  onDisconnect,
}: SocialAccountCardProps) => {
  const isConnected = account?.is_connected;
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg border-0 ${
      isConnected 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm' 
        : 'bg-gradient-to-br from-gray-50 to-slate-50 hover:from-blue-50 hover:to-indigo-50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isConnected ? 'bg-white shadow-sm' : 'bg-white/80'
            }`}>
              <PlatformIcon platform={platform} size={20} />
            </div>
            <span className="font-semibold text-gray-900">{platformName}</span>
          </CardTitle>
          
          <Badge 
            variant={isConnected ? "default" : "secondary"}
            className={`flex items-center gap-1 px-2 py-1 ${
              isConnected 
                ? 'bg-green-100 text-green-700 border-green-200' 
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}
          >
            {isConnected ? (
              <>
                <CheckCircle className="w-3 h-3" />
                Connected
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Not Connected
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isConnected ? (
          <div className="space-y-4">
            <div className="p-3 bg-white/60 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Account Details</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">@{account?.username}</span>
                </div>
                
                {account?.followers_count && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{account.followers_count.toLocaleString()} followers</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Active & Synced</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDisconnect(account!.id)}
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                Disconnect
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 border-gray-200 hover:bg-gray-50"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-white/60 rounded-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <PlatformIcon platform={platform} size={24} />
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Connect your {platformName} account to start managing your content and engaging with your audience.
              </p>
              <div className="text-xs text-gray-500">
                • Schedule posts • Track analytics • Manage comments
              </div>
            </div>
            
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-sm"
              onClick={() => onConnect(platform)}
            >
              Connect {platformName}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
