interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-muted-foreground">{description}</p>
      {children}
    </div>
  );
} 