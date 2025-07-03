
import { supabase } from "@/integrations/supabase/client";

export interface InstagramAccount {
  id: string;
  ig_user_id: string;
  page_id: string;
  username: string;
  profile_pic?: string;
  connected_at: string;
}

export interface InstagramPostData {
  ig_user_id: string;
  media_url: string;
  caption?: string;
  media_type?: 'IMAGE' | 'VIDEO';
}

export class InstagramAPI {
  private static readonly META_APP_ID = "1081471646659939"; // Replace with your Meta App ID
  private static readonly REDIRECT_URI = `${window.location.origin}/auth/instagram/callback`;

  static getOAuthURL(): string {
    const params = new URLSearchParams({
      client_id: this.META_APP_ID,
      redirect_uri: this.REDIRECT_URI,
      scope: 'pages_show_list,instagram_basic,instagram_content_publish,pages_read_engagement',
      response_type: 'code',
      state: 'instagram_oauth_' + Date.now(),
    });

    return `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
  }

  static async handleOAuthCallback(code: string, state: string) {
    const { data, error } = await supabase.functions.invoke('instagram-oauth', {
      body: { code, state }
    });

    if (error) throw error;
    return data;
  }

  static async getConnectedAccounts(): Promise<InstagramAccount[]> {
    const { data, error } = await supabase
      .from('instagram_accounts')
      .select('*')
      .order('connected_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async disconnectAccount(accountId: string) {
    const { error } = await supabase
      .from('instagram_accounts')
      .delete()
      .eq('id', accountId);

    if (error) throw error;
  }

  static async postToInstagram(postData: InstagramPostData) {
    const { data, error } = await supabase.functions.invoke('instagram-post', {
      body: postData
    });

    if (error) throw error;
    return data;
  }

  static async uploadMedia(file: File): Promise<string> {
    // Upload to Supabase Storage
    const fileName = `instagram/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }
}
