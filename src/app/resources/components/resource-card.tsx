'use client'

import { Card } from '@/components/ui/card'
import { Database } from '@/lib/types/database.types'
import Link from 'next/link'

type Resource = Database['public']['Tables']['resources']['Row']

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {resource.type}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(resource.created_at).toLocaleDateString()}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold">{resource.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {resource.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {resource.views}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {resource.downloads}
          </span>
        </div>
        <Link
          href={`/resources/${resource.id}`}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          View Resource
        </Link>
      </div>
    </Card>
  )
} 