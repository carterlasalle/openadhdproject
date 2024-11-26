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
}

export default function NewTopicPage({ params }: { params: { slug: string } }) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [forum, setForum] = useState<Forum | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    async function loadForum() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/auth/signin?redirectTo=/community/' + params.slug + '/new')
          return
        }

        const { data: forum, error: forumError } = await supabase
          .from('forums')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (forumError) throw forumError
        setForum(forum)
      } catch (error) {
        console.error('Error loading forum:', error)
        setError('Failed to load forum')
      } finally {
        setLoading(false)
      }
    }

    loadForum()
  }, [supabase, params.slug, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!forum) return

    setSaving(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Not authenticated')

      const { data: topic, error: topicError } = await supabase
        .from('forum_topics')
        .insert({
          forum_id: forum.id,
          title,
          content,
          author_id: session.user.id
        })
        .select()
        .single()

      if (topicError) throw topicError

      router.push(`/community/${params.slug}/${topic.id}`)
    } catch (error) {
      console.error('Error creating topic:', error)
      setError('Failed to create topic')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-muted-foreground">Loading...</p>
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
        title="New Topic"
        description={`Create a new topic in ${forum.title}`}
      />

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
              minLength={3}
              maxLength={255}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
              minLength={10}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Topic'}
            </button>
          </div>
        </form>
      </div>
    </Container>
  )
} 