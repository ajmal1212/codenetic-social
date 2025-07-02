
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { PlatformIcon } from "@/components/PlatformIcon";
import { Plus, Filter } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
          <p className="text-muted-foreground">Plan and manage your scheduled posts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => navigate("/compose")} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
              modifiers={{
                hasPost: getDatesWithPosts(),
              }}
              modifiersStyles={{
                hasPost: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'white',
                  borderRadius: '50%'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Date Posts */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDatePosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No posts scheduled for this date</p>
                  <Button onClick={() => navigate("/compose")} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule a Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDatePosts.map((post) => (
                    <div key={post.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="text-sm text-foreground font-medium mb-2">{post.content}</p>
                          <div className="text-xs text-muted-foreground">
                            {format(post.scheduledDate, "h:mm a")}
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-3">
                          {post.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Platforms:</span>
                        {post.platforms.map((platform) => (
                          <PlatformIcon key={platform} platform={platform} size={16} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Posts Summary */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-2 border border-border rounded">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {post.platforms.slice(0, 2).map((platform) => (
                          <PlatformIcon key={platform} platform={platform} size={14} />
                        ))}
                        {post.platforms.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{post.platforms.length - 2}
                          </span>
                        )}
                      </div>
                      <span className="text-sm truncate max-w-48">{post.content}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
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
  );
};

export default ContentCalendar;
