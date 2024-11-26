import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

const resources = [
  {
    title: 'Understanding ADHD',
    description: 'Learn about ADHD symptoms, diagnosis, and treatment options.',
    sections: [
      'What is ADHD?',
      'Types of ADHD',
      'Common Symptoms',
      'Diagnosis Process',
      'Treatment Options',
    ],
  },
  {
    title: 'ADHD in Children',
    description: 'Resources for parents and educators supporting children with ADHD.',
    sections: [
      'Early Signs and Symptoms',
      'School Accommodations',
      'Parenting Strategies',
      'Behavioral Therapy',
      'Educational Support',
    ],
  },
  {
    title: 'Adult ADHD',
    description: 'Information and strategies for adults living with ADHD.',
    sections: [
      'Late Diagnosis',
      'Workplace Strategies',
      'Relationship Management',
      'Executive Function',
      'Life Skills',
    ],
  },
  {
    title: 'ADHD Management',
    description: 'Practical strategies for managing ADHD symptoms.',
    sections: [
      'Time Management',
      'Organization Skills',
      'Focus Techniques',
      'Stress Management',
      'Habit Building',
    ],
  },
  {
    title: 'ADHD Research',
    description: 'Latest scientific research and studies about ADHD.',
    sections: [
      'Recent Studies',
      'Brain Science',
      'Treatment Research',
      'Genetic Factors',
      'Environmental Impacts',
    ],
  },
  {
    title: 'ADHD Support',
    description: 'Support resources and community connections.',
    sections: [
      'Support Groups',
      'Therapy Options',
      'Coaching Services',
      'Crisis Resources',
      'Community Forums',
    ],
  },
];

export default function ResourcesPage() {
  return (
    <Container>
      <PageHeader
        title="ADHD Resources"
        description="Comprehensive resources for understanding and managing ADHD."
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card
            key={resource.title}
            title={resource.title}
            description={resource.description}
          >
            <ul className="mt-4 space-y-2">
              {resource.sections.map((section) => (
                <li
                  key={section}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {section}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Read More
            </button>
          </Card>
        ))}
      </div>
    </Container>
  );
} 