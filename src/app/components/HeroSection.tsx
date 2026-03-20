interface HeroSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function HeroSection({ title, subtitle, className = '' }: HeroSectionProps) {
  return (
    <section className={`bg-[var(--farm-section-alt-bg)] py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--farm-primary-text)] mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)] max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
