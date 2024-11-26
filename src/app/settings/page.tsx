'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  user_id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  preferences: {
    notifications: boolean
    theme: 'light' | 'dark' | 'system'
    accessibility: {
      reducedMotion: boolean
      highContrast: boolean
    }
  }
}

export default function SettingsPage() {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user) {
          setError('Please sign in to view your settings')
          return
        }

        // Try to get existing profile
        const { data: profile, error: fetchError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (fetchError) {
          // If profile doesn't exist, create one
          if (fetchError.code === 'PGRST116') {
            const defaultProfile = {
              user_id: session.user.id,
              display_name: session.user.email?.split('@')[0] || null,
              bio: null,
              avatar_url: null,
              preferences: {
                notifications: true,
                theme: 'system',
                accessibility: {
                  reducedMotion: false,
                  highContrast: false
                }
              }
            }

            const { data: newProfile, error: createError } = await supabase
              .from('user_profiles')
              .insert([defaultProfile])
              .select()
              .single()

            if (createError) throw createError
            setProfile(newProfile)
          } else {
            throw fetchError
          }
        } else {
          setProfile(profile)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          display_name: profile.display_name,
          bio: profile.bio,
          preferences: profile.preferences
        })
        .eq('user_id', profile.user_id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error saving profile:', error)
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-muted-foreground">Loading settings...</p>
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

  if (!profile) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-muted-foreground">Profile not found</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={profile.display_name || ''}
                  onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium">
                  Theme
                </label>
                <select
                  id="theme"
                  value={profile.preferences.theme}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      theme: e.target.value as 'light' | 'dark' | 'system'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4">
                  Accessibility
                </label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reducedMotion"
                      checked={profile.preferences.accessibility.reducedMotion}
                      onChange={(e) => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          accessibility: {
                            ...profile.preferences.accessibility,
                            reducedMotion: e.target.checked
                          }
                        }
                      })}
                      className="h-4 w-4 rounded border-input"
                    />
                    <label htmlFor="reducedMotion" className="ml-2 text-sm">
                      Reduce Motion
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="highContrast"
                      checked={profile.preferences.accessibility.highContrast}
                      onChange={(e) => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          accessibility: {
                            ...profile.preferences.accessibility,
                            highContrast: e.target.checked
                          }
                        }
                      })}
                      className="h-4 w-4 rounded border-input"
                    />
                    <label htmlFor="highContrast" className="ml-2 text-sm">
                      High Contrast
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={profile.preferences.notifications}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      notifications: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-input"
                />
                <label htmlFor="notifications" className="ml-2 text-sm">
                  Email Notifications
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Container>
  )
} 