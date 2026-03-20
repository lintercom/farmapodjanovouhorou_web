import { Link } from 'react-router';
import { Button } from '../components/Button';
import { Home } from 'lucide-react';
import { FloatingCard } from '../components/FloatingCard';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--farm-page-bg)] px-4 py-16">
      <FloatingCard hover={false} className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold text-[var(--farm-accent-green)] mb-6">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--farm-primary-text)] mb-4">
          Stránka nebyla nalezena
        </h2>
        <p className="text-lg text-[var(--farm-secondary-text)] mb-8 max-w-md mx-auto leading-relaxed">
          Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <Link to="/">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Zpět na hlavní stránku
          </Button>
        </Link>
      </FloatingCard>
    </div>
  );
}