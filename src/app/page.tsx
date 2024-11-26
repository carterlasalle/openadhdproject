import Link from 'next/link';
import { Container } from '@/components/ui/container';

const features = [
  {
    id: 'learn',
    title: 'Learn More',
    description: 'Access a comprehensive library of ADHD information, research, and management strategies.',
    link: '/resources',
    linkText: 'Browse Resources'
  },
  {
    id: 'tools',
    title: 'View Tools',
    description: 'Discover and use tools designed to help with task management, focus, and productivity.',
    link: '/tools',
    linkText: 'Explore Tools'
  },
  {
    id: 'join',
    title: 'Join Us',
    description: 'Connect with others, share experiences, and learn from the ADHD community.',
    link: '/community',
    linkText: 'Join Community'
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background px-4 py-16 text-center">
        <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Welcome to OpenADHD
        </h1>
        <p className="mb-12 max-w-2xl text-xl text-muted-foreground">
          Free, open-source resources and tools for individuals with ADHD, their families,
          caregivers, and healthcare professionals.
        </p>
        <div className="flex gap-6">
          <Link
            href="/resources"
            className="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse Resources
          </Link>
          <Link
            href="/tools"
            className="rounded-lg bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            Explore Tools
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="rounded-xl border bg-card p-8 shadow transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-4 text-2xl font-semibold">{feature.title}</h3>
                <p className="mb-6 text-muted-foreground">
                  {feature.description}
                </p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  {feature.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/50 py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Our Mission</h2>
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              To democratize access to ADHD resources and tools while building an inclusive,
              supportive community that empowers individuals with ADHD to thrive.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-lg font-medium text-primary hover:underline"
            >
              Learn About Our Mission →
            </Link>
          </div>
        </Container>
      </section>

      {/* Getting Started Section */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Get Started</h2>
            <p className="mb-10 text-xl text-muted-foreground leading-relaxed">
              Create a free account to save resources, track your progress, and join our
              community.
            </p>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign Up Now
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
