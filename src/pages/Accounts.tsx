
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/PlatformIcon";
import { Plus, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Accounts = () => {
  const connectedAccounts = [
    {
      id: 1,
      platform: "facebook",
      name: "Codenetic Official",
      username: "@codenetic",
      followers: 12400,
      status: "connected",
      lastSync: "2 hours ago"
    },
    {
      id: 2,
      platform: "instagram",
      name: "Codenetic",
      username: "@codenetic_official",
      followers: 8900,
      status: "connected",
      lastSync: "1 hour ago"
    },
    {
      id: 3,
      platform: "twitter",
      name: "Codenetic",
      username: "@codenetic_dev",
      followers: 5600,
      status: "connected",
      lastSync: "30 minutes ago"
    },
    {
      id: 4,
      platform: "linkedin",
      name: "Codenetic Solutions",
      username: "codenetic-solutions",
      followers: 3200,
      status: "connected",
      lastSync: "1 hour ago"
    }
  ];

  const availablePlatforms = [
    { id: "youtube", name: "YouTube", description: "Share videos and shorts" },
    { id: "tiktok", name: "TikTok", description: "Create viral short videos" },
    { id: "pinterest", name: "Pinterest", description: "Pin visual content" },
  ];

  const handleConnectAccount = (platformId: string) => {
    toast.success(`${platformId} account connection initiated!`);
    // In a real app, this would trigger OAuth flow
  };

  const handleDisconnectAccount = (accountId: number, platformName: string) => {
    toast.success(`${platformName} account disconnected successfully`);
    // In a real app, this would remove the account
  };

  const handleSyncAccount = (accountId: number, platformName: string) => {
    toast.success(`${platformName} account synced successfully`);
    // In a real app, this would refresh account data
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Connected Accounts</h1>
          <p className="text-muted-foreground">Manage your social media platform connections</p>
        </div>
      </div>

      {/* Connected Accounts */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Active Connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <PlatformIcon platform={account.platform} size={24} />
                <div>
                  <div className="font-medium text-foreground">{account.name}</div>
                  <div className="text-sm text-muted-foreground">{account.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {account.followers.toLocaleString()} followers • Last sync: {account.lastSync}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-secondary text-white">
                  {account.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSyncAccount(account.id, account.platform)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Sync
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnectAccount(account.id, account.platform)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Platforms */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Connect New Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availablePlatforms.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <PlatformIcon platform={platform.id} size={24} />
                <div>
                  <div className="font-medium text-foreground">{platform.name}</div>
                  <div className="text-sm text-muted-foreground">{platform.description}</div>
                </div>
              </div>
              <Button
                onClick={() => handleConnectAccount(platform.id)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">OAuth Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Codenetic Social uses secure OAuth 2.0 authentication to connect your social media accounts. 
                Your credentials are never stored on our servers, and you can revoke access at any time.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Secure Authentication</Badge>
                <Badge variant="outline">No Password Storage</Badge>
                <Badge variant="outline">Revocable Access</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounts;
