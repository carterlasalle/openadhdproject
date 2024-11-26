'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSupabase } from '@/components/providers/supabase-provider'

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
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { supabase } = useSupabase()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user) {
          setError('Please sign in to view your profile')
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

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-lg text-muted-foreground">Loading profile...</p>
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
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <p className="mt-1 text-lg">{profile.display_name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <p className="mt-1 text-muted-foreground">{profile.bio || 'No bio added yet'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Theme</label>
                <p className="mt-1 capitalize">{profile.preferences.theme}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Accessibility</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <span className="text-muted-foreground">Reduced Motion:</span>
                    <span className="ml-2">{profile.preferences.accessibility.reducedMotion ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground">High Contrast:</span>
                    <span className="ml-2">{profile.preferences.accessibility.highContrast ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="mt-1">{profile.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Account Created</label>
                <p className="mt-1 text-muted-foreground">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
} 