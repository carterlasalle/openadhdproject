import { Container } from '@/components/ui/container';
import Link from 'next/link';

const taskManagementTools = [
  {
    name: 'Todoist',
    description: 'Popular task management app with ADHD-friendly features',
    url: 'https://todoist.com'
  },
  {
    name: 'Microsoft To Do',
    description: 'Free task management app with My Day planning',
    url: 'https://todo.microsoft.com'
  },
  {
    name: 'TickTick',
    description: 'Task manager with built-in Pomodoro timer',
    url: 'https://ticktick.com'
  }
];

const focusTools = [
  {
    name: 'Forest',
    description: 'Stay focused by planting virtual trees',
    url: 'https://www.forestapp.cc'
  },
  {
    name: 'Freedom',
    description: 'Block distracting websites and apps',
    url: 'https://freedom.to'
  },
  {
    name: 'Brain.fm',
    description: 'Music designed for focus and productivity',
    url: 'https://brain.fm'
  }
];

const timeManagementTools = [
  {
    name: 'RescueTime',
    description: 'Automatic time tracking and productivity insights',
    url: 'https://www.rescuetime.com'
  },
  {
    name: 'Clockify',
    description: 'Free time tracking for better time awareness',
    url: 'https://clockify.me'
  },
  {
    name: 'Calendar.ai',
    description: 'Smart scheduling with AI assistance',
    url: 'https://calendar.ai'
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-16">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight">ADHD Tools</h1>
          <p className="mb-12 text-xl text-muted-foreground">
            A curated collection of tools to help manage ADHD symptoms and improve daily life.
          </p>

          <div className="grid gap-8">
            {/* Task Management */}
            <section className="rounded-xl border bg-card p-8">
              <h2 className="mb-6 text-2xl font-semibold">Task Management</h2>
              <div className="grid gap-6">
                {taskManagementTools.map((tool) => (
                  <div key={tool.name}>
                    <h3 className="mb-2 text-lg font-medium">
                      <Link 
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        {tool.name}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Focus Tools */}
            <section className="rounded-xl border bg-card p-8">
              <h2 className="mb-6 text-2xl font-semibold">Focus & Productivity</h2>
              <div className="grid gap-6">
                {focusTools.map((tool) => (
                  <div key={tool.name}>
                    <h3 className="mb-2 text-lg font-medium">
                      <Link 
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        {tool.name}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Time Management */}
            <section className="rounded-xl border bg-card p-8">
              <h2 className="mb-6 text-2xl font-semibold">Time Management</h2>
              <div className="grid gap-6">
                {timeManagementTools.map((tool) => (
                  <div key={tool.name}>
                    <h3 className="mb-2 text-lg font-medium">
                      <Link 
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        {tool.name}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
} 