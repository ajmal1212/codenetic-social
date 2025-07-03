
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramConnect } from "@/components/InstagramConnect";
import { InstagramPostComposer } from "@/components/InstagramPostComposer";
import { Instagram as InstagramIcon, Settings, Send } from "lucide-react";

const Instagram = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
          <InstagramIcon className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Instagram Business</h1>
          <p className="text-muted-foreground">
            Connect and manage your Instagram Business accounts
          </p>
        </div>
      </div>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Manage Accounts
          </TabsTrigger>
          <TabsTrigger value="post" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Create Post
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="mt-6">
          <InstagramConnect />
        </TabsContent>
        
        <TabsContent value="post" className="mt-6">
          <InstagramPostComposer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Instagram;
