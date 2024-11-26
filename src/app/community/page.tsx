'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/container'
import { PageHeader } from '@/components/ui/page-header'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useRouter } from 'next/navigation'

interface Forum {
  id: string
  title: string
  description: string
  slug: string
  is_private: boolean
  _count?: {
    topics: number
    posts: number
  }
  latest_post?: {
    created_at: string
  }
}

export default function CommunityPage() {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [forums, setForums] = useState<Forum[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedForum, setSelectedForum] = useState<string | null>(null)

  useEffect(() => {
    async function loadForums() {
      try {
        // First get forums with topic counts
        const { data: forumsData, error: forumsError } = await supabase
          .from('forums')
          .select(`
            *,
            forum_topics (
              id,
              forum_posts (
                created_at
              )
            )
          `)
          .order('created_at', { ascending: true })

        if (forumsError) throw forumsError

        // Transform the data to include counts and latest post
        const transformedForums = forumsData.map(forum => {
          const topics = forum.forum_topics?.length ?? 0
          const posts = forum.forum_topics?.reduce((acc, topic) => 
            acc + (topic.forum_posts?.length ?? 0), 0) ?? 0
          
          // Find the latest post across all topics
          let latestPost = null
          forum.forum_topics?.forEach(topic => {
            topic.forum_posts?.forEach(post => {
              if (!latestPost || new Date(post.created_at) > new Date(latestPost.created_at)) {
                latestPost = post
              }
            })
          })

          return {
            ...forum,
            _count: {
              topics,
              posts
            },
            latest_post: latestPost
          }
        })

        setForums(transformedForums)
      } catch (error) {
        console.error('Error loading forums:', error)
        setError('Failed to load forums')
      } finally {
        setLoading(false)
      }
    }

    loadForums()
  }, [supabase])

  async function handleNewDiscussion() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/auth/signin?redirectTo=/community')
      return
    }

    // If only one forum exists, go directly to it
    if (forums.length === 1) {
      router.push(`/community/${forums[0].slug}/new`)
      return
    }

    // Show forum selection dialog
    const forum = window.prompt('Select a forum to post in:\n\n' + 
      forums.map((f, i) => `${i + 1}. ${f.title}`).join('\n') +
      '\n\nEnter the number of your choice:')

    if (forum) {
      const index = parseInt(forum) - 1
      if (index >= 0 && index < forums.length) {
        router.push(`/community/${forums[index].slug}/new`)
      }
    }
  }

  async function handleFindSupportGroup() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/auth/signin?redirectTo=/community')
      return
    }

    // TODO: Implement support group finder
    router.push('/community/support-groups')
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-muted-foreground">Loading forums...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-destructive">{error}</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <PageHeader
        title="Community"
        description="Connect with others, share experiences, and learn from the ADHD community."
      >
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleNewDiscussion}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            New Discussion
          </button>
          <button
            onClick={handleFindSupportGroup}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
          >
            Find Support Group
          </button>
        </div>
      </PageHeader>

      <div className="space-y-6">
        {forums.map((forum) => (
          <div
            key={forum.id}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{forum.title}</h2>
                <p className="mt-1 text-muted-foreground">
                  {forum.description}
                </p>
              </div>
              <button
                onClick={() => router.push(`/community/${forum.slug}`)}
                className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
              >
                View Forum
              </button>
            </div>
            <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">
                  {forum._count?.topics ?? 0}
                </span>{' '}
                topics
              </div>
              <div>
                <span className="font-medium text-foreground">
                  {forum._count?.posts ?? 0}
                </span>{' '}
                posts
              </div>
              {forum.latest_post && (
                <div>
                  Last post{' '}
                  <span className="font-medium text-foreground">
                    {new Date(forum.latest_post.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
} 