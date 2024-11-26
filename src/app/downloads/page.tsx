import { Container } from '@/components/ui/container'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'

const categories = [
  'All',
  'Planning',
  'Organization',
  'Health',
  'Education',
  'Productivity',
]

const resources = [
  {
    title: 'ADHD Task Planning Template',
    description: 'A comprehensive template for breaking down tasks and managing time.',
    type: 'PDF',
    size: '245 KB',
    downloads: 1234,
    category: 'Planning',
  },
  {
    title: 'Daily Routine Checklist',
    description: 'Customizable checklist for establishing and maintaining daily routines.',
    type: 'PDF',
    size: '182 KB',
    downloads: 987,
    category: 'Organization',
  },
  {
    title: 'Medication Tracking Sheet',
    description: 'Track medication timing, dosage, and effects.',
    type: 'PDF & Excel',
    size: '156 KB',
    downloads: 756,
    category: 'Health',
  },
  {
    title: 'Study Skills Workbook',
    description: 'Comprehensive guide for developing effective study habits with ADHD.',
    type: 'PDF',
    size: '2.1 MB',
    downloads: 2345,
    category: 'Education',
  },
  {
    title: 'Focus Timer Templates',
    description: 'Customizable Pomodoro timer sheets for different tasks and durations.',
    type: 'PDF',
    size: '134 KB',
    downloads: 543,
    category: 'Productivity',
  },
  {
    title: 'ADHD Symptom Journal',
    description: 'Track and monitor ADHD symptoms, triggers, and management strategies.',
    type: 'PDF & Word',
    size: '198 KB',
    downloads: 876,
    category: 'Health',
  },
]

export default function DownloadsPage() {
  return (
    <Container>
      <PageHeader
        title="Downloadable Resources"
        description="Free templates, worksheets, and guides to help manage ADHD."
      >
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full bg-secondary/50 px-4 py-1 text-sm font-medium hover:bg-secondary/70"
            >
              {category}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {resource.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {resource.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {resource.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Size: {resource.size}
              </span>
              <span className="text-muted-foreground">
                {resource.downloads.toLocaleString()} downloads
              </span>
            </div>
            <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Download
            </button>
          </div>
        ))}
      </div>
    </Container>
  )
} 