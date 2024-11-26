import { createServerSupabaseClient } from '../supabase/client'
import { Database } from '../types/database.types'

type Resource = Database['public']['Tables']['resources']['Row']
type ResourceInsert = Database['public']['Tables']['resources']['Insert']
type ResourceUpdate = Database['public']['Tables']['resources']['Update']

export class ResourceService {
  private supabase = createServerSupabaseClient()

  async getResources(type?: Resource['type'], limit = 10, offset = 0) {
    const query = this.supabase
      .from('resources')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (type) {
      query.eq('type', type)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  async getResourceById(id: string) {
    const { data, error } = await this.supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async createResource(resource: ResourceInsert) {
    const { data, error } = await this.supabase
      .from('resources')
      .insert(resource)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateResource(id: string, updates: ResourceUpdate) {
    const { data, error } = await this.supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteResource(id: string) {
    const { error } = await this.supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async searchResources(query: string, limit = 10) {
    const { data, error } = await this.supabase
      .from('resources')
      .select('*')
      .eq('status', 'published')
      .textSearch('title', query)
      .limit(limit)

    if (error) throw error
    return data
  }

  async incrementResourceViews(id: string) {
    const { error } = await this.supabase.rpc('increment_resource_views', { resource_id: id })
    if (error) throw error
  }

  async incrementResourceDownloads(id: string) {
    const { error } = await this.supabase.rpc('increment_resource_downloads', { resource_id: id })
    if (error) throw error
  }
} 