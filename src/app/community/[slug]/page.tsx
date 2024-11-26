'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/container'
import { PageHeader } from '@/components/ui/page-header'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useRouter } from 'next/navigation'

interface ForumTopic {
  id: string
  title: string
  content: string
  author: {
    id: string
    display_name: string | null
  }
  created_at: string
  _count?: {
    posts: number
  }
  latest_post?: {
    created_at: string
    author: {
      display_name: string | null
    }
  }
}

interface Forum {
  id: string
  title: string
  description: string
  slug: string
  is_private: boolean
}

export default function ForumPage({ params }: { params: { slug: string } }) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [forum, setForum] = useState<Forum | null>(null)
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadForum() {
      try {
        // Get forum details
        const { data: forumData, error: forumError } = await supabase
          .from('forums')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (forumError) throw forumError
        setForum(forumData)

        // Get forum topics with author and post counts
        const { data: topicsData, error: topicsError } = await supabase
          .from('forum_topics')
          .select(`
            *,
            author:author_id (
              id,
              user_profiles (
                display_name
              )
            ),
            forum_posts (
              created_at,
              author:author_id (
                user_profiles (
                  display_name
                )
              )
            )
          `)
          .eq('forum_id', forumData.id)
          .order('is_pinned', { ascending: false })
          .order('created_at', { ascending: false })

        if (topicsError) throw topicsError

        // Transform topics data
        const transformedTopics = topicsData.map(topic => ({
          ...topic,
          author: {
            id: topic.author.id,
            display_name: topic.author.user_profiles?.[0]?.display_name
          },
          _count: {
            posts: topic.forum_posts?.length ?? 0
          },
          latest_post: topic.forum_posts?.length ? {
            created_at: topic.forum_posts[topic.forum_posts.length - 1].created_at,
            author: {
              display_name: topic.forum_posts[topic.forum_posts.length - 1].author.user_profiles?.[0]?.display_name
            }
          } : undefined
        }))

        setTopics(transformedTopics)
      } catch (error) {
        console.error('Error loading forum:', error)
        setError('Failed to load forum')
      } finally {
        setLoading(false)
      }
    }

    loadForum()
  }, [supabase, params.slug])

  async function handleNewTopic() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/auth/signin?redirectTo=/community/' + params.slug)
      return
    }

    router.push(`/community/${params.slug}/new`)
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-muted-foreground">Loading forum...</p>
        </div>
      </Container>
    )
  }

  if (error || !forum) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-destructive">{error || 'Forum not found'}</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <PageHeader
        title={forum.title}
        description={forum.description}
      >
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleNewTopic}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New Topic
          </button>
        </div>
      </PageHeader>

      <div className="space-y-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {topic.is_pinned && (
                    <span className="mr-2 rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Pinned
                    </span>
                  )}
                  {topic.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  by {topic.author.display_name || 'Anonymous'} •{' '}
                  {new Date(topic.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => router.push(`/community/${params.slug}/${topic.id}`)}
                className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
              >
                View Topic
              </button>
            </div>
            <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">
                  {topic._count?.posts ?? 0}
                </span>{' '}
                replies
              </div>
              {topic.latest_post && (
                <div>
                  Last reply by{' '}
                  <span className="font-medium text-foreground">
                    {topic.latest_post.author.display_name || 'Anonymous'}
                  </span>{' '}
                  on{' '}
                  <span className="font-medium text-foreground">
                    {new Date(topic.latest_post.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {topics.length === 0 && (
          <div className="rounded-lg border bg-card p-6 text-center">
            <p className="text-muted-foreground">No topics yet. Be the first to start a discussion!</p>
          </div>
        )}
      </div>
    </Container>
  )
} 