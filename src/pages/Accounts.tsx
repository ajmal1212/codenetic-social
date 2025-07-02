
import { useEffect, useState } from "react";
import { SocialAccountCard } from "@/components/SocialAccountCard";
import { SocialMediaAPI, SocialAccount } from "@/services/socialMediaAPI";
import { toast } from "sonner";
import { Plus, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PLATFORMS = [
  "facebook",
  "instagram", 
  "twitter",
  "linkedin",
  "youtube",
  "tiktok",
  "pinterest"
];

const Accounts = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await SocialMediaAPI.getSocialAccounts();
      setAccounts(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    try {
      await SocialMediaAPI.connectAccount(platform);
      toast.success(`${platform} connected successfully!`);
      loadAccounts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      await SocialMediaAPI.disconnectAccount(accountId);
      toast.success("Account disconnected");
      loadAccounts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const connectedCount = accounts.filter(acc => acc.is_connected).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          Loading accounts...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Connected Accounts
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect your social media accounts to start creating and scheduling content across all platforms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {connectedCount} of {PLATFORMS.length} connected
          </Badge>
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Connect New Platform
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{connectedCount}</div>
            <p className="text-sm text-green-600">Connected Accounts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                Ready
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {PLATFORMS.length - connectedCount}
            </div>
            <p className="text-sm text-blue-600">Available Platforms</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                Growing
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {Math.round((connectedCount / PLATFORMS.length) * 100)}%
            </div>
            <p className="text-sm text-purple-600">Coverage Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          Your Social Media Accounts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PLATFORMS.map((platform) => {
            const account = accounts.find(
              (acc) => acc.platform === platform && acc.is_connected
            );
            
            return (
              <SocialAccountCard
                key={platform}
                account={account}
                platform={platform}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-slate-50 to-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
          <CardDescription>
            Having trouble connecting your accounts? Check out our setup guides for each platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Setup Guide</Button>
            <Button variant="outline" size="sm">Video Tutorial</Button>
            <Button variant="outline" size="sm">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounts;
