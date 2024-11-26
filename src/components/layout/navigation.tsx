import Link from 'next/link';

const mainNav = [
  { name: 'Resources', href: '/resources' },
  { name: 'Tools', href: '/tools' },
  { name: 'Community', href: '/community' },
  { name: 'Downloads', href: '/resources/downloads' },
];

const userNav = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Support Us', href: '/support-us' },
];

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            OpenADHD
          </Link>
          <div className="hidden ml-8 sm:block">
            <div className="flex items-center space-x-4">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {userNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hidden sm:block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/auth/signin"
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
} 