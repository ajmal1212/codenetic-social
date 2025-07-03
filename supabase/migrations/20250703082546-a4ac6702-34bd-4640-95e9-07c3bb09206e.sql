
-- Create Instagram accounts table
CREATE TABLE public.instagram_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ig_user_id TEXT NOT NULL,
  page_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  username TEXT NOT NULL,
  profile_pic TEXT,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, ig_user_id)
);

-- Enable RLS
ALTER TABLE public.instagram_accounts ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Users can manage their own Instagram accounts" 
ON public.instagram_accounts
FOR ALL 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_instagram_accounts_updated_at 
BEFORE UPDATE ON public.instagram_accounts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
