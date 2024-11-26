-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Create resources table
create table public.resources (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text not null,
    content text not null,
    type text not null check (type in ('article', 'research', 'worksheet', 'video', 'guide')),
    tags text[] not null default '{}',
    author_id uuid references auth.users not null,
    status text not null check (status in ('draft', 'published', 'archived')) default 'draft',
    metadata jsonb not null default '{}',
    citations text[] not null default '{}',
    downloads integer not null default 0,
    views integer not null default 0
);

-- Create resource_categories table
create table public.resource_categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    slug text not null unique,
    parent_id uuid references public.resource_categories(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tools table
create table public.tools (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    description text not null,
    category text[] not null default '{}',
    url text not null,
    is_free boolean not null default true,
    features text[] not null default '{}',
    setup_guide text,
    integration_guide text,
    author_id uuid references auth.users not null,
    status text not null check (status in ('active', 'inactive', 'deprecated')) default 'active',
    rating_sum integer not null default 0,
    rating_count integer not null default 0
);

-- Create tool_reviews table
create table public.tool_reviews (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    tool_id uuid references public.tools not null,
    user_id uuid references auth.users not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    review text not null,
    helpful_count integer not null default 0,
    unique(tool_id, user_id)
);

-- Create functions for incrementing views and downloads
create or replace function public.increment_resource_views(resource_id uuid)
returns void as $$
begin
    update public.resources
    set views = views + 1
    where id = resource_id;
end;
$$ language plpgsql security definer;

create or replace function public.increment_resource_downloads(resource_id uuid)
returns void as $$
begin
    update public.resources
    set downloads = downloads + 1
    where id = resource_id;
end;
$$ language plpgsql security definer;

-- Create indexes for better performance
create index resources_type_idx on public.resources(type);
create index resources_status_idx on public.resources(status);
create index resources_author_id_idx on public.resources(author_id);
create index resource_categories_slug_idx on public.resource_categories(slug);
create index tools_status_idx on public.tools(status);
create index tool_reviews_tool_id_idx on public.tool_reviews(tool_id);

-- Enable Row Level Security (RLS)
alter table public.resources enable row level security;
alter table public.resource_categories enable row level security;
alter table public.tools enable row level security;
alter table public.tool_reviews enable row level security;

-- Create RLS policies
create policy "Public resources are viewable by everyone"
    on public.resources for select
    using (status = 'published');

create policy "Users can create resources"
    on public.resources for insert
    with check (auth.uid() = author_id);

create policy "Users can update their own resources"
    on public.resources for update
    using (auth.uid() = author_id);

create policy "Resource categories are viewable by everyone"
    on public.resource_categories for select
    to authenticated, anon
    using (true);

create policy "Tools are viewable by everyone"
    on public.tools for select
    using (status = 'active');

create policy "Users can create tools"
    on public.tools for insert
    with check (auth.uid() = author_id);

create policy "Users can update their own tools"
    on public.tools for update
    using (auth.uid() = author_id);

create policy "Tool reviews are viewable by everyone"
    on public.tool_reviews for select
    to authenticated, anon
    using (true);

create policy "Authenticated users can create reviews"
    on public.tool_reviews for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
    on public.tool_reviews for update
    using (auth.uid() = user_id); 