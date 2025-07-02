
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { PlatformIcon } from "@/components/PlatformIcon";
import { Plus, Filter, Calendar as CalendarIcon, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay } from "date-fns";

const ContentCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock scheduled posts data
  const scheduledPosts = [
    {
      id: 1,
      content: "Check out our latest product update! 🚀",
      platforms: ["facebook", "twitter", "linkedin"],
      scheduledDate: new Date(2025, 6, 2, 14, 0), // July 2, 2025, 2:00 PM
      status: "scheduled"
    },
    {
      id: 2,
      content: "Behind the scenes at our team meeting",
      platforms: ["instagram", "facebook"],
      scheduledDate: new Date(2025, 6, 2, 16, 30), // July 2, 2025, 4:30 PM
      status: "scheduled"
    },
    {
      id: 3,
      content: "Weekly newsletter is out now! Check your inbox 📧",
      platforms: ["twitter", "linkedin"],
      scheduledDate: new Date(2025, 6, 3, 10, 0), // July 3, 2025, 10:00 AM
      status: "scheduled"
    },
    {
      id: 4,
      content: "Happy Friday everyone! What are your weekend plans?",
      platforms: ["facebook", "instagram", "twitter"],
      scheduledDate: new Date(2025, 6, 4, 17, 0), // July 4, 2025, 5:00 PM
      status: "scheduled"
    }
  ];

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => isSameDay(post.scheduledDate, date));
  };

  const selectedDatePosts = selectedDate ? getPostsForDate(selectedDate) : [];

  const getDatesWithPosts = () => {
    return scheduledPosts.map(post => post.scheduledDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Content Calendar
                </h1>
                <p className="text-gray-600 text-lg">Plan and manage your scheduled posts</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="border-gray-200 hover:border-gray-300 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter Posts
            </Button>
            <Button 
              onClick={() => navigate("/compose")} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Scheduled</p>
                  <p className="text-2xl font-bold text-blue-900">{scheduledPosts.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">This Week</p>
                  <p className="text-2xl font-bold text-green-900">3</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Platforms</p>
                  <p className="text-2xl font-bold text-purple-900">5</p>
                </div>
                <CalendarIcon className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0 w-full"
                modifiers={{
                  hasPost: getDatesWithPosts(),
                }}
                modifiersStyles={{
                  hasPost: {
                    backgroundColor: 'hsl(239 84% 67%)',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Selected Date Posts */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedDatePosts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4 text-lg">No posts scheduled for this date</p>
                    <Button 
                      onClick={() => navigate("/compose")} 
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule a Post
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDatePosts.map((post) => (
                      <div key={post.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium mb-3 leading-relaxed">{post.content}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {format(post.scheduledDate, "h:mm a")}
                            </div>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="ml-4 bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-600">Platforms:</span>
                          <div className="flex gap-2">
                            {post.platforms.map((platform) => (
                              <div key={platform} className="p-1 bg-white rounded-lg shadow-sm">
                                <PlatformIcon platform={platform} size={20} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Posts Summary */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Upcoming This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {scheduledPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                          {post.platforms.slice(0, 2).map((platform) => (
                            <div key={platform} className="p-1 bg-white rounded shadow-sm">
                              <PlatformIcon platform={platform} size={16} />
                            </div>
                          ))}
                          {post.platforms.length > 2 && (
                            <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-xs font-medium text-gray-600">
                              +{post.platforms.length - 2}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700 truncate max-w-48">{post.content}</span>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {format(post.scheduledDate, "MMM d, h:mm a")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
