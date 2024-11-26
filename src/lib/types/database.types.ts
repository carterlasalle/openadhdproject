export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          content: string
          type: 'article' | 'research' | 'worksheet' | 'video' | 'guide'
          tags: string[]
          author_id: string
          status: 'draft' | 'published' | 'archived'
          metadata: Json
          citations: string[]
          downloads: number
          views: number
        }
        Insert: Omit<Tables['resources']['Row'], 'id' | 'created_at' | 'updated_at' | 'downloads' | 'views'>
        Update: Partial<Omit<Tables['resources']['Row'], 'id' | 'created_at' | 'updated_at'>>
      }
      resource_categories: {
        Row: {
          id: string
          name: string
          description: string
          slug: string
          parent_id: string | null
          created_at: string
        }
        Insert: Omit<Tables['resource_categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Omit<Tables['resource_categories']['Row'], 'id' | 'created_at'>>
      }
      tools: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          category: string[]
          url: string
          is_free: boolean
          features: string[]
          setup_guide: string
          integration_guide: string | null
          author_id: string
          status: 'active' | 'inactive' | 'deprecated'
          rating_sum: number
          rating_count: number
        }
        Insert: Omit<Tables['tools']['Row'], 'id' | 'created_at' | 'updated_at' | 'rating_sum' | 'rating_count'>
        Update: Partial<Omit<Tables['tools']['Row'], 'id' | 'created_at' | 'updated_at'>>
      }
      tool_reviews: {
        Row: {
          id: string
          created_at: string
          tool_id: string
          user_id: string
          rating: number
          review: string
          helpful_count: number
        }
        Insert: Omit<Tables['tool_reviews']['Row'], 'id' | 'created_at' | 'helpful_count'>
        Update: Partial<Omit<Tables['tool_reviews']['Row'], 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 