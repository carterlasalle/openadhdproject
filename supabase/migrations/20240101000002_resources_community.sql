-- Resources
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    type TEXT NOT NULL,
    category TEXT[] NOT NULL,
    url TEXT,
    thumbnail_url TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Resource bookmarks
CREATE TABLE IF NOT EXISTS public.resource_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, resource_id)
);

-- Resource ratings
CREATE TABLE IF NOT EXISTS public.resource_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, resource_id)
);

-- Resource progress
CREATE TABLE IF NOT EXISTS public.resource_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, resource_id)
);

-- Community Forums
CREATE TABLE IF NOT EXISTS public.forums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Forum Topics
CREATE TABLE IF NOT EXISTS public.forum_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    forum_id UUID NOT NULL REFERENCES public.forums(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Forum Posts (Comments)
CREATE TABLE IF NOT EXISTS public.forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES public.forum_topics(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view published resources" ON public.resources;
DROP POLICY IF EXISTS "Authenticated users can create resources" ON public.resources;
DROP POLICY IF EXISTS "Users can update their own resources" ON public.resources;
DROP POLICY IF EXISTS "Users can view their own bookmarks" ON public.resource_bookmarks;
DROP POLICY IF EXISTS "Users can create their own bookmarks" ON public.resource_bookmarks;
DROP POLICY IF EXISTS "Users can delete their own bookmarks" ON public.resource_bookmarks;
DROP POLICY IF EXISTS "Anyone can view ratings" ON public.resource_ratings;
DROP POLICY IF EXISTS "Authenticated users can create ratings" ON public.resource_ratings;
DROP POLICY IF EXISTS "Users can update their own ratings" ON public.resource_ratings;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.resource_progress;
DROP POLICY IF EXISTS "Users can create their own progress" ON public.resource_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.resource_progress;
DROP POLICY IF EXISTS "Anyone can view public forums" ON public.forums;
DROP POLICY IF EXISTS "Anyone can view topics in public forums" ON public.forum_topics;
DROP POLICY IF EXISTS "Authenticated users can create topics" ON public.forum_topics;
DROP POLICY IF EXISTS "Authors can update their own topics" ON public.forum_topics;
DROP POLICY IF EXISTS "Anyone can view posts in public forums" ON public.forum_posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.forum_posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON public.forum_posts;

-- Resource Policies
CREATE POLICY "Anyone can view published resources"
    ON public.resources FOR SELECT
    USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create resources"
    ON public.resources FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Users can update their own resources"
    ON public.resources FOR UPDATE
    USING (auth.uid() = author_id);

-- Resource Bookmarks Policies
CREATE POLICY "Users can view their own bookmarks"
    ON public.resource_bookmarks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
    ON public.resource_bookmarks FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
    ON public.resource_bookmarks FOR DELETE
    USING (auth.uid() = user_id);

-- Resource Ratings Policies
CREATE POLICY "Anyone can view ratings"
    ON public.resource_ratings FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create ratings"
    ON public.resource_ratings FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
    ON public.resource_ratings FOR UPDATE
    USING (auth.uid() = user_id);

-- Resource Progress Policies
CREATE POLICY "Users can view their own progress"
    ON public.resource_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
    ON public.resource_progress FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
    ON public.resource_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- Forum Policies
CREATE POLICY "Anyone can view public forums"
    ON public.forums FOR SELECT
    USING (NOT is_private OR auth.uid() IS NOT NULL);

-- Forum Topics Policies
CREATE POLICY "Anyone can view topics in public forums"
    ON public.forum_topics FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.forums
            WHERE id = forum_id
            AND (NOT is_private OR auth.uid() IS NOT NULL)
        )
    );

CREATE POLICY "Authenticated users can create topics"
    ON public.forum_topics FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authors can update their own topics"
    ON public.forum_topics FOR UPDATE
    USING (auth.uid() = author_id);

-- Forum Posts Policies
CREATE POLICY "Anyone can view posts in public forums"
    ON public.forum_posts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.forum_topics t
            JOIN public.forums f ON f.id = t.forum_id
            WHERE t.id = topic_id
            AND (NOT f.is_private OR auth.uid() IS NOT NULL)
        )
    );

CREATE POLICY "Authenticated users can create posts"
    ON public.forum_posts FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authors can update their own posts"
    ON public.forum_posts FOR UPDATE
    USING (auth.uid() = author_id);

-- Create updated_at triggers
DROP TRIGGER IF EXISTS on_resource_updated ON public.resources;
DROP TRIGGER IF EXISTS on_resource_rating_updated ON public.resource_ratings;
DROP TRIGGER IF EXISTS on_resource_progress_updated ON public.resource_progress;
DROP TRIGGER IF EXISTS on_forum_updated ON public.forums;
DROP TRIGGER IF EXISTS on_forum_topic_updated ON public.forum_topics;
DROP TRIGGER IF EXISTS on_forum_post_updated ON public.forum_posts;

CREATE TRIGGER on_resource_updated
    BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_resource_rating_updated
    BEFORE UPDATE ON public.resource_ratings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_resource_progress_updated
    BEFORE UPDATE ON public.resource_progress
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_forum_updated
    BEFORE UPDATE ON public.forums
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_forum_topic_updated
    BEFORE UPDATE ON public.forum_topics
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_forum_post_updated
    BEFORE UPDATE ON public.forum_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default forums if they don't exist
INSERT INTO public.forums (title, description, slug, is_private)
SELECT 'General Discussion', 'Connect with others and share your ADHD experiences.', 'general-discussion', false
WHERE NOT EXISTS (SELECT 1 FROM public.forums WHERE slug = 'general-discussion');

INSERT INTO public.forums (title, description, slug, is_private)
SELECT 'Success Stories', 'Share and celebrate your achievements and milestones.', 'success-stories', false
WHERE NOT EXISTS (SELECT 1 FROM public.forums WHERE slug = 'success-stories');

INSERT INTO public.forums (title, description, slug, is_private)
SELECT 'Tips & Strategies', 'Exchange practical tips and strategies for managing ADHD.', 'tips-and-strategies', false
WHERE NOT EXISTS (SELECT 1 FROM public.forums WHERE slug = 'tips-and-strategies');

INSERT INTO public.forums (title, description, slug, is_private)
SELECT 'Tool Reviews', 'Discuss and review ADHD management tools and apps.', 'tool-reviews', false
WHERE NOT EXISTS (SELECT 1 FROM public.forums WHERE slug = 'tool-reviews');

INSERT INTO public.forums (title, description, slug, is_private)
SELECT 'Support Groups', 'Find and join support groups for specific ADHD challenges.', 'support-groups', false
WHERE NOT EXISTS (SELECT 1 FROM public.forums WHERE slug = 'support-groups');

INSERT INTO public.forums (title, description, slug, is_private)
SELECT 'Ask the Experts', 'Get answers from ADHD professionals and experts.', 'ask-the-experts', false
WHERE NOT EXISTS (SELECT 1 FROM public.forums WHERE slug = 'ask-the-experts');
  