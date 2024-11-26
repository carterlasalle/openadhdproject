import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

const tools = [
  {
    title: 'Task Management',
    description: 'Tools to help organize tasks, set reminders, and track progress.',
    tools: [
      {
        name: 'Todoist',
        description: 'Popular task management app with ADHD-friendly features',
        url: 'https://todoist.com',
      },
      {
        name: 'Microsoft To Do',
        description: 'Free task management app with My Day planning',
        url: 'https://todo.microsoft.com',
      },
      {
        name: 'TickTick',
        description: 'Task manager with built-in Pomodoro timer',
        url: 'https://ticktick.com',
      },
    ],
  },
  {
    title: 'Focus & Productivity',
    description: 'Applications and techniques to improve focus and productivity.',
    tools: [
      {
        name: 'Forest',
        description: 'Stay focused by planting virtual trees',
        url: 'https://www.forestapp.cc',
      },
      {
        name: 'Freedom',
        description: 'Block distracting websites and apps',
        url: 'https://freedom.to',
      },
      {
        name: 'Brain.fm',
        description: 'Music designed for focus and productivity',
        url: 'https://brain.fm',
      },
    ],
  },
  {
    title: 'Time Management',
    description: 'Tools for better time awareness and scheduling.',
    tools: [
      {
        name: 'RescueTime',
        description: 'Automatic time tracking and productivity insights',
        url: 'https://www.rescuetime.com',
      },
      {
        name: 'Clockify',
        description: 'Free time tracking for better time awareness',
        url: 'https://clockify.me',
      },
      {
        name: 'Calendar',
        description: 'Smart scheduling with AI assistance',
        url: 'https://calendar.com',
      },
    ],
  },
  {
    title: 'Note Taking',
    description: 'Tools for capturing and organizing thoughts and information.',
    tools: [
      {
        name: 'Notion',
        description: 'All-in-one workspace for notes and projects',
        url: 'https://www.notion.so',
      },
      {
        name: 'Evernote',
        description: 'Popular note-taking app with web clipper',
        url: 'https://evernote.com',
      },
      {
        name: 'OneNote',
        description: 'Free note-taking app with handwriting support',
        url: 'https://www.onenote.com',
      },
    ],
  },
  {
    title: 'Habit Building',
    description: 'Tools to help develop and maintain positive habits.',
    tools: [
      {
        name: 'Habitica',
        description: 'Gamified habit tracking and task management',
        url: 'https://habitica.com',
      },
      {
        name: 'Streaks',
        description: 'Simple habit tracking with streaks',
        url: 'https://streaksapp.com',
      },
      {
        name: 'Loop Habit Tracker',
        description: 'Open-source habit tracker with detailed statistics',
        url: 'https://loophabits.org',
      },
    ],
  },
  {
    title: 'Medication Tracking',
    description: 'Tools for managing and tracking medication.',
    tools: [
      {
        name: 'Medisafe',
        description: 'Medication reminder and tracking app',
        url: 'https://www.medisafe.com',
      },
      {
        name: 'Round Health',
        description: 'Simple medication reminder with flexible scheduling',
        url: 'https://roundhealth.co',
      },
      {
        name: 'Mango Health',
        description: 'Gamified medication and health tracking',
        url: 'https://www.mangohealth.com',
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <Container>
      <PageHeader
        title="ADHD Tools"
        description="A curated collection of tools to help manage ADHD symptoms and improve daily life."
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((category) => (
          <Card
            key={category.title}
            title={category.title}
            description={category.description}
          >
            <ul className="mt-4 space-y-3">
              {category.tools.map((tool) => (
                <li key={tool.name} className="space-y-1">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-primary hover:underline"
                  >
                    {tool.name}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              View All Tools
            </button>
          </Card>
        ))}
      </div>
    </Container>
  );
} 