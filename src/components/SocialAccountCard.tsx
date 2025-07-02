
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "./PlatformIcon";
import { SocialAccount } from "@/services/socialMediaAPI";

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <PlatformIcon platform={platform} />
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </CardTitle>
        <Badge variant={isConnected ? "default" : "secondary"}>
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">@{account?.username}</p>
            {account?.followers_count && (
              <p className="text-sm">
                {account.followers_count.toLocaleString()} followers
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDisconnect(account!.id)}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={() => onConnect(platform)}
          >
            Connect {platform}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
