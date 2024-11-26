import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background p-8 text-center">
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
          Welcome to OpenADHD
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
          Free, open-source resources and tools for individuals with ADHD, their families,
          caregivers, and healthcare professionals.
        </p>
        <div className="flex gap-4">
          <Link
            href="/resources"
            className="rounded-lg bg-primary px-6 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse Resources
          </Link>
          <Link
            href="/tools"
            className="rounded-lg bg-secondary px-6 py-3 text-lg font-medium text-secondary-foreground hover:bg-secondary/90"
          >
            Explore Tools
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Curated Resources"
            description="Access a comprehensive library of ADHD information, research, and management strategies."
          >
            <Link
              href="/resources"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Learn More →
            </Link>
          </Card>

          <Card
            title="Practical Tools"
            description="Discover and use tools designed to help with task management, focus, and productivity."
          >
            <Link
              href="/tools"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View Tools →
            </Link>
          </Card>

          <Card
            title="Supportive Community"
            description="Connect with others, share experiences, and learn from the ADHD community."
          >
            <Link
              href="/community"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Join Us →
            </Link>
          </Card>
        </div>
      </Container>

      {/* Mission Section */}
      <Container className="bg-muted/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            To democratize access to ADHD resources and tools while building an inclusive,
            supportive community that empowers individuals with ADHD to thrive.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Learn About Our Mission →
          </Link>
        </div>
      </Container>

      {/* Getting Started Section */}
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Get Started</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Create a free account to save resources, track your progress, and join our
            community.
          </p>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-primary px-6 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign Up Now
          </Link>
        </div>
      </Container>
    </>
  );
}
