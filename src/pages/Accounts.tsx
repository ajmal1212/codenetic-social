
import { useEffect, useState } from "react";
import { SocialAccountCard } from "@/components/SocialAccountCard";
import { SocialMediaAPI, SocialAccount } from "@/services/socialMediaAPI";
import { toast } from "sonner";

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

  if (loading) {
    return <div>Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Connected Accounts</h1>
        <p className="text-muted-foreground">
          Connect your social media accounts to start posting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default Accounts;
