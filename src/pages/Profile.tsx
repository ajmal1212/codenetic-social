
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Settings, 
  Shield, 
  Bell,
  Moon,
  Sun,
  Globe,
  Edit,
  Save,
  X
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Social media enthusiast and content creator. Passionate about building engaging communities and sharing stories that matter.",
    website: "https://johndoe.com",
    timezone: "PST (UTC-8)"
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    darkMode: false,
    autoPost: false
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 -mx-6 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Profile Settings</h1>
              <p className="text-slate-600 mt-1">Manage your account and preferences</p>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg ring-1 ring-slate-200">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-semibold">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 shadow-md"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <p className="text-slate-600 flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      Pro Plan
                    </Badge>
                    <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                      Verified
                    </Badge>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {profile.website}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3 bg-slate-100">
            <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:bg-white">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-slate-700 font-medium">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-700 font-medium">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notifications Card */}
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-slate-900">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Email Notifications</p>
                      <p className="text-sm text-slate-600">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, emailNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Push Notifications</p>
                      <p className="text-sm text-slate-600">Get notified on your device</p>
                    </div>
                    <Switch
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, pushNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Weekly Digest</p>
                      <p className="text-sm text-slate-600">Summary of your activity</p>
                    </div>
                    <Switch
                      checked={preferences.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, weeklyDigest: checked})
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance & Behavior Card */}
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-slate-900">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      {preferences.darkMode ? <Moon className="h-5 w-5 text-purple-600" /> : <Sun className="h-5 w-5 text-purple-600" />}
                    </div>
                    Appearance & Behavior
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {preferences.darkMode ? <Moon className="h-4 w-4 text-slate-600" /> : <Sun className="h-4 w-4 text-slate-600" />}
                      <div>
                        <p className="font-medium text-slate-900">Dark Mode</p>
                        <p className="text-sm text-slate-600">Toggle dark theme</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, darkMode: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Auto-Post</p>
                      <p className="text-sm text-slate-600">Automatically publish scheduled posts</p>
                    </div>
                    <Switch
                      checked={preferences.autoPost}
                      onCheckedChange={(checked) => 
                        setPreferences({...preferences, autoPost: checked})
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-slate-700 font-medium">Timezone</Label>
                    <Input
                      id="timezone"
                      value={profile.timezone}
                      onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <h4 className="font-semibold text-slate-900">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-slate-700 font-medium">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-slate-700 font-medium">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
                    <Button variant="outline" className="border-slate-200">Enable 2FA</Button>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-8">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Danger Zone
                    </h4>
                    <p className="text-sm text-red-700 mb-4">
                      These actions are irreversible. Please proceed with caution.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="destructive" size="sm">Delete Account</Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
