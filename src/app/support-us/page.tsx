import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';

const supportOptions = [
  {
    title: 'One-time Donation',
    description: 'Support our mission with a one-time contribution.',
    options: ['$5', '$10', '$25', '$50', '$100', 'Custom'],
    benefits: [
      'Help keep resources free',
      'Support development of new features',
      'Enable content translations',
    ],
  },
  {
    title: 'Monthly Supporter',
    description: 'Become a monthly supporter and help us grow.',
    options: ['$5/mo', '$10/mo', '$25/mo', '$50/mo', 'Custom'],
    benefits: [
      'Early access to new features',
      'Supporter badge on community',
      'Monthly supporter newsletter',
      'Vote on feature priorities',
    ],
  },
  {
    title: 'Organization Sponsor',
    description: 'Partner with us to make a bigger impact.',
    options: ['Contact Us'],
    benefits: [
      'Custom partnership options',
      'Organization recognition',
      'Impact reporting',
      'Direct support channel',
    ],
  },
];

const otherWays = [
  {
    title: 'GitHub Sponsors',
    description: 'Support our open-source development directly through GitHub.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    ),
    link: 'https://github.com/sponsors/carterlasalle',
  },
  {
    title: 'Open Collective',
    description: 'Support our community through Open Collective.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zm0 2.182c-4.207 0-7.636 3.429-7.636 7.636S7.793 19.636 12 19.636s7.636-3.429 7.636-7.636S16.207 4.364 12 4.364z"
        />
      </svg>
    ),
    link: 'https://opencollective.com/openadhd',
  },
  {
    title: 'Contribute Code',
    description: 'Help improve OpenADHD by contributing to our codebase.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
        />
      </svg>
    ),
    link: 'https://github.com/carterlasalle/openadhd',
  },
];

export default function SupportUsPage() {
  return (
    <Container>
      <PageHeader
        title="Support OpenADHD"
        description="Help us keep OpenADHD free and accessible for everyone."
      />

      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {supportOptions.map((option) => (
          <div
            key={option.title}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{option.title}</h2>
            <p className="mt-2 text-muted-foreground">{option.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {option.options.map((amount) => (
                <button
                  key={amount}
                  className="rounded-full bg-secondary/50 px-4 py-1 text-sm font-medium hover:bg-secondary/70"
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">Benefits:</h3>
              <ul className="space-y-2">
                {option.benefits.map((benefit) => (
                  <li
                    key={benefit}
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Support Now
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold">Other Ways to Support</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherWays.map((way) => (
            <a
              key={way.title}
              href={way.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50"
            >
              <div className="text-primary">{way.icon}</div>
              <div>
                <h3 className="font-medium">{way.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {way.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
} 