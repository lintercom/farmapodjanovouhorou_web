import { useState } from 'react';
import { Button } from '../../components/Button';
import { FloatingCard } from '../../components/FloatingCard';
import { Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function SeedData() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setIsSeeding(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/seed`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to seed data');
      }

      const data = await response.json();
      setStatus('success');
      setMessage(`Úspěšně nahráno ${data.results.length} stránek do databáze.`);
    } catch (error: any) {
      console.error('Seed error:', error);
      setStatus('error');
      setMessage(error.message || 'Chyba při nahrávání dat');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <FloatingCard hover={false} adminCompact className="max-w-2xl mx-auto text-center">
      <div className="py-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--farm-primary-light)] flex items-center justify-center">
          <Upload className="w-8 h-8 text-[var(--farm-primary)]" />
        </div>
        
        <h2 className="text-2xl font-bold text-[var(--farm-primary-text)] mb-4">
          Nahrát výchozí obsah
        </h2>
        
        <p className="text-[var(--farm-secondary-text)] mb-8">
          Nahrajte aktuální obsah webu do databáze. Toto je nutné provést pouze jednou.
          Po nahrání budete moci upravovat obsah všech stránek přes CMS.
        </p>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-semibold text-green-800">Úspěch!</p>
              <p className="text-sm text-green-700 mt-1">{message}</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-semibold text-red-800">Chyba</p>
              <p className="text-sm text-red-700 mt-1">{message}</p>
            </div>
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleSeed}
          disabled={isSeeding || status === 'success'}
          className="gap-2"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Nahrávání...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Nahráno
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Nahrát data do databáze
            </>
          )}
        </Button>
      </div>
    </FloatingCard>
  );
}
