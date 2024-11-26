import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

const forums = [
  {
    title: 'General Discussion',
    description: 'Connect with others and share your ADHD experiences.',
    topics: 12,
    posts: 48,
    lastPost: '5 minutes ago',
  },
  {
    title: 'Success Stories',
    description: 'Share and celebrate your achievements and milestones.',
    topics: 8,
    posts: 32,
    lastPost: '1 hour ago',
  },
  {
    title: 'Tips & Strategies',
    description: 'Exchange practical tips and strategies for managing ADHD.',
    topics: 15,
    posts: 67,
    lastPost: '30 minutes ago',
  },
  {
    title: 'Tool Reviews',
    description: 'Discuss and review ADHD management tools and apps.',
    topics: 10,
    posts: 45,
    lastPost: '2 hours ago',
  },
  {
    title: 'Support Groups',
    description: 'Find and join support groups for specific ADHD challenges.',
    topics: 6,
    posts: 28,
    lastPost: '3 hours ago',
  },
  {
    title: 'Ask the Experts',
    description: 'Get answers from ADHD professionals and experts.',
    topics: 4,
    posts: 16,
    lastPost: '1 day ago',
  },
];

export default function CommunityPage() {
  return (
    <Container>
      <PageHeader
        title="Community"
        description="Connect with others, share experiences, and learn from the ADHD community."
      >
        <div className="mt-4 flex gap-4">
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            New Discussion
          </button>
          <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90">
            Find Support Group
          </button>
        </div>
      </PageHeader>

      <div className="space-y-6">
        {forums.map((forum) => (
          <div
            key={forum.title}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{forum.title}</h2>
                <p className="mt-1 text-muted-foreground">
                  {forum.description}
                </p>
              </div>
              <button className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20">
                View Forum
              </button>
            </div>
            <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">
                  {forum.topics}
                </span>{' '}
                topics
              </div>
              <div>
                <span className="font-medium text-foreground">
                  {forum.posts}
                </span>{' '}
                posts
              </div>
              <div>
                Last post{' '}
                <span className="font-medium text-foreground">
                  {forum.lastPost}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
} 