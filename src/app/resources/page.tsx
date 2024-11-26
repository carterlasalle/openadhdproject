import { Suspense } from 'react'
import { Container } from '@/components/ui/container'
import { PageHeader } from '@/components/ui/page-header'
import { ResourceService } from '@/lib/services/resources'
import { ResourceCard } from './components/resource-card'
import { ResourceFilters } from './components/resource-filters'
import { ResourceTypeSelector } from './components/resource-type-selector'

async function ResourcesList() {
  const resourceService = new ResourceService()
  const resources = await resourceService.getResources()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <Container>
      <PageHeader
        title="Resources"
        description="Explore our curated collection of ADHD resources, from research papers to practical worksheets."
      >
        <div className="mt-4 flex gap-4">
          <ResourceTypeSelector />
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Submit Resource
          </button>
        </div>
      </PageHeader>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ResourceFilters />
        </aside>
        <main className="lg:col-span-3">
          <Suspense fallback={<div>Loading resources...</div>}>
            <ResourcesList />
          </Suspense>
        </main>
      </div>
    </Container>
  )
} 