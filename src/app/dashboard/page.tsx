import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

const savedResources = [
  {
    title: 'Understanding Executive Function',
    category: 'Adult ADHD',
    progress: 60,
  },
  {
    title: 'Time Management Strategies',
    category: 'ADHD Management',
    progress: 40,
  },
  {
    title: 'Medication Guide',
    category: 'Treatment',
    progress: 80,
  },
];

const favoriteTools = [
  {
    name: 'Todoist',
    category: 'Task Management',
    lastUsed: '2 hours ago',
  },
  {
    name: 'Forest',
    category: 'Focus',
    lastUsed: '1 day ago',
  },
  {
    name: 'Notion',
    category: 'Notes',
    lastUsed: '3 hours ago',
  },
];

const progressStats = [
  {
    label: 'Resources Completed',
    value: 12,
    total: 20,
  },
  {
    label: 'Tools Tried',
    value: 8,
    total: 15,
  },
  {
    label: 'Days Streak',
    value: 5,
    total: 5,
  },
];

export default function DashboardPage() {
  return (
    <Container>
      <PageHeader
        title="My Dashboard"
        description="Track your progress and manage your resources."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Progress Overview */}
        <Card title="My Progress" description="Track your learning journey">
          <div className="mt-4 space-y-4">
            {progressStats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{stat.label}</span>
                  <span className="font-medium">
                    {stat.value}/{stat.total}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${(stat.value / stat.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Saved Resources */}
        <Card
          title="Saved Resources"
          description="Continue where you left off"
        >
          <div className="mt-4 space-y-4">
            {savedResources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-lg border bg-card p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{resource.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {resource.category}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${resource.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-right text-xs text-muted-foreground">
                  {resource.progress}% Complete
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Favorite Tools */}
        <Card title="My Tools" description="Quick access to your favorite tools">
          <div className="mt-4 space-y-4">
            {favoriteTools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between rounded-lg border bg-card p-4"
              >
                <div>
                  <h3 className="font-medium">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.category}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  Last used:<br />{tool.lastUsed}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Container>
  );
} 