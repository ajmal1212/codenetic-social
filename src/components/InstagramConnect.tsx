
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InstagramAPI, InstagramAccount } from "@/services/instagramAPI";
import { toast } from "sonner";
import { Instagram, ExternalLink, Trash2, Plus } from "lucide-react";

export const InstagramConnect = () => {
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    loadAccounts();
    
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state?.startsWith('instagram_oauth_')) {
      handleOAuthCallback(code, state);
    }
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await InstagramAPI.getConnectedAccounts();
      setAccounts(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = async (code: string, state: string) => {
    setConnecting(true);
    try {
      const result = await InstagramAPI.handleOAuthCallback(code, state);
      toast.success(result.message);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Reload accounts
      await loadAccounts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setConnecting(false);
    }
  };

  const handleConnect = () => {
    setConnecting(true);
    window.location.href = InstagramAPI.getOAuthURL();
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      await InstagramAPI.disconnectAccount(accountId);
      toast.success("Instagram account disconnected");
      loadAccounts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Instagram Business Accounts</h2>
          <p className="text-muted-foreground">
            Connect your Instagram Business accounts to start posting and managing content
          </p>
        </div>
        <Button 
          onClick={handleConnect} 
          disabled={connecting}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {connecting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Connecting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Connect Instagram
            </div>
          )}
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
              <Instagram className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">No Instagram Accounts Connected</h3>
              <p className="text-muted-foreground mb-4">
                Connect your Instagram Business account to start posting and managing your content
              </p>
              <Button 
                onClick={handleConnect} 
                disabled={connecting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Connect Your First Account
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {account.profile_pic ? (
                        <img 
                          src={account.profile_pic} 
                          alt={account.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <Instagram className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">@{account.username}</div>
                      <div className="text-sm text-muted-foreground">Instagram Business</div>
                    </div>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Connected on {new Date(account.connected_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://instagram.com/${account.username}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(account.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
