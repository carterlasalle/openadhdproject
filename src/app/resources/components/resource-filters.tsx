'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'

const tags = [
  'ADHD Basics',
  'Treatment',
  'Symptoms',
  'Strategies',
  'Research',
  'Education',
  'Workplace',
  'Relationships',
  'Executive Function',
  'Medication',
  'Therapy',
  'Support',
]

export function ResourceFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTags = searchParams.get('tags')?.split(',') || []

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams)
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    if (newTags.length > 0) {
      params.set('tags', newTags.join(','))
    } else {
      params.delete('tags')
    }

    router.push(`/resources?${params.toString()}`)
  }

  return (
    <Card className="p-6">
      <h2 className="font-semibold">Filters</h2>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
        <div className="mt-2 space-y-2">
          {tags.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="h-4 w-4 rounded border-gray-300"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </Card>
  )
} 