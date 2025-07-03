
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Bell, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { signOut } = useAuth();
  const [notificationCount, setNotificationCount] = useState(3);

  const handleNotificationClick = () => {
    // Reset notification count when clicked
    setNotificationCount(0);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm border-b border-border/60 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search posts, analytics..." 
                  className="pl-10 w-80 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="hidden sm:flex"
              >
                <a 
                  href="https://docs.lovable.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Docs
                </a>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative"
                    onClick={handleNotificationClick}
                  >
                    <Bell className="h-4 w-4" />
                    {notificationCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {notificationCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2">
                    <h4 className="font-semibold text-sm mb-2">Notifications</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm font-medium">Post Published Successfully</p>
                        <p className="text-xs text-muted-foreground">Your Instagram post went live 2 hours ago</p>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-sm font-medium">Scheduled Post Ready</p>
                        <p className="text-xs text-muted-foreground">LinkedIn post will be published in 30 minutes</p>
                      </div>
                      <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                        <p className="text-sm font-medium">Analytics Update</p>
                        <p className="text-xs text-muted-foreground">Weekly engagement report is now available</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center">
                    View All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
