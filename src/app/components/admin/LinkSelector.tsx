interface LinkSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function LinkSelector({ value, onChange, label, className = '' }: LinkSelectorProps) {
  const availableLinks = [
    { value: '', label: '-- Vyberte odkaz --' },
    { value: '/', label: 'Domů (/)' },
    { value: '/sluzby', label: 'Služby (/sluzby)' },
    { value: '/akce', label: 'Akce (/akce)' },
    { value: '/nasi-kone', label: 'Naši koně (/nasi-kone)' },
    { value: '/o-nas', label: 'O nás (/o-nas)' },
    { value: '/kontakt', label: 'Kontakt (/kontakt)' },
    { value: '/ochrana-osobnich-udaju', label: 'Ochrana osobních údajů' },
    { value: '/cookies', label: 'Cookies' },
    { value: '/obchodni-podminky', label: 'Obchodní podmínky' },
    { value: '/reklamacni-rad', label: 'Reklamační řád' },
    { value: '#tabory', label: 'Kotva: Tábory (#tabory)' },
    { value: '#krouzky', label: 'Kotva: Kroužky (#krouzky)' },
    { value: '#vyjizdy', label: 'Kotva: Vyjížďky (#vyjizdy)' },
    { value: '#hipoterapie', label: 'Kotva: Hipoterapie (#hipoterapie)' },
    { value: '#akce', label: 'Kotva: Akce (#akce)' },
    { value: '#kontakt', label: 'Kotva: Kontakt (#kontakt)' },
  ];

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)] cursor-pointer"
      >
        {availableLinks.map((link) => (
          <option key={link.value} value={link.value}>
            {link.label}
          </option>
        ))}
      </select>
    </div>
  );
}
