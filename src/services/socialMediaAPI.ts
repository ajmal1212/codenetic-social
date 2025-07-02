
import { supabase } from "@/integrations/supabase/client";

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  display_name?: string;
  profile_picture_url?: string;
  is_connected: boolean;
  followers_count?: number;
}

export interface PostData {
  content: string;
  media_urls?: string[];
  platforms: string[];
  scheduled_time?: string;
}

export class SocialMediaAPI {
  static async connectAccount(platform: string) {
    // This would typically redirect to OAuth flow
    // For now, we'll create a mock connection
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const mockAccount = {
      user_id: user.id,
      platform,
      account_id: `mock_${platform}_${Date.now()}`,
      username: `user_${platform}`,
      display_name: `User on ${platform}`,
      access_token: "mock_token",
      is_connected: true,
      followers_count: Math.floor(Math.random() * 10000),
    };

    const { data, error } = await supabase
      .from("social_accounts")
      .insert(mockAccount)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getSocialAccounts(): Promise<SocialAccount[]> {
    const { data, error } = await supabase
      .from("social_accounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async disconnectAccount(accountId: string) {
    const { error } = await supabase
      .from("social_accounts")
      .update({ is_connected: false })
      .eq("id", accountId);

    if (error) throw error;
  }

  static async createPost(postData: PostData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const post = {
      user_id: user.id,
      content: postData.content,
      media_urls: postData.media_urls,
      platforms: postData.platforms,
      scheduled_time: postData.scheduled_time,
      status: postData.scheduled_time ? "scheduled" : "posted",
      post_results: this.mockPostResults(postData.platforms),
    };

    const { data, error } = await supabase
      .from("posts")
      .insert(post)
      .select()
      .single();

    if (error) throw error;

    // Create mock analytics for each platform
    for (const platform of postData.platforms) {
      await this.createMockAnalytics(data.id, platform);
    }

    return data;
  }

  private static mockPostResults(platforms: string[]) {
    const results: Record<string, any> = {};
    platforms.forEach(platform => {
      results[platform] = {
        success: Math.random() > 0.1, // 90% success rate
        post_id: `${platform}_${Date.now()}`,
        error: Math.random() > 0.9 ? "Network error" : null,
      };
    });
    return results;
  }

  private static async createMockAnalytics(postId: string, platform: string) {
    const analytics = {
      post_id: postId,
      platform,
      platform_post_id: `${platform}_${Date.now()}`,
      likes_count: Math.floor(Math.random() * 1000),
      comments_count: Math.floor(Math.random() * 100),
      shares_count: Math.floor(Math.random() * 50),
      views_count: Math.floor(Math.random() * 5000),
      clicks_count: Math.floor(Math.random() * 200),
      engagement_rate: parseFloat((Math.random() * 10).toFixed(2)),
    };

    await supabase.from("post_analytics").insert(analytics);
  }

  static async getPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getAnalytics() {
    const { data, error } = await supabase
      .from("post_analytics")
      .select(`
        *,
        posts!inner(content, platforms, created_at)
      `)
      .order("fetched_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }
}
