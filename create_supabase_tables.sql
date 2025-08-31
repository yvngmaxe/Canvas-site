-- profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nickname text NOT NULL,
  age integer,
  avatar_url text,
  city text
);

-- Enable Row Level Security (RLS) for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for profiles: users can view their own profile and public info of others
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- comments table
CREATE TABLE comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS) for comments table
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy for comments: everyone can view comments
CREATE POLICY "Comments are viewable by everyone." ON comments
  FOR SELECT USING (true);

-- Policy for comments: authenticated users can insert comments
CREATE POLICY "Authenticated users can insert comments." ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for comments: users can update their own comments
CREATE POLICY "Users can update their own comments." ON comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for comments: users can delete their own comments
CREATE POLICY "Users can delete their own comments." ON comments
  FOR DELETE USING (auth.uid() = user_id);
