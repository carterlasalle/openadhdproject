'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Database } from '@/lib/types/database.types'

type ResourceType = Database['public']['Tables']['resources']['Row']['type']

const resourceTypes: { label: string; value: ResourceType }[] = [
  { label: 'All', value: 'article' },
  { label: 'Articles', value: 'article' },
  { label: 'Research', value: 'research' },
  { label: 'Worksheets', value: 'worksheet' },
  { label: 'Videos', value: 'video' },
  { label: 'Guides', value: 'guide' },
]

export function ResourceTypeSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get('type') as ResourceType | null

  const handleTypeChange = (type: ResourceType) => {
    const params = new URLSearchParams(searchParams)
    if (type) {
      params.set('type', type)
    } else {
      params.delete('type')
    }
    router.push(`/resources?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      {resourceTypes.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleTypeChange(value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            currentType === value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
} 