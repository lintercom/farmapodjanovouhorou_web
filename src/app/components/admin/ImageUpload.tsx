import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader } from 'lucide-react';
import { Button } from '../Button';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Neplatný typ souboru. Povoleny jsou pouze JPEG, PNG, GIF a WebP.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      setError('Soubor je příliš velký. Maximální velikost je 5MB.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload to server
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/upload-image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload selhal');
      }

      // Update preview and value
      setPreviewUrl(data.url);
      onChange(data.url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Nepodařilo se nahrát obrázek');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onChange('');
    setError(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        {/* Preview or Upload Area */}
        {previewUrl ? (
          <div className="relative group">
            <div className="relative rounded-xl overflow-hidden border-2 border-[var(--farm-border)] bg-gray-50">
              <img
                src={previewUrl}
                alt="Náhled"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white text-[var(--farm-primary-text)] hover:bg-gray-100"
                  onClick={handleClick}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Změnit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-red-500 text-white hover:bg-red-600 border-red-500"
                  onClick={handleRemove}
                  disabled={isUploading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Odstranit
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={isUploading}
            className="w-full h-48 rounded-xl border-2 border-dashed border-[var(--farm-border)] hover:border-[var(--farm-accent-green)] bg-gray-50 hover:bg-gray-100 transition-all flex flex-col items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader className="w-8 h-8 text-[var(--farm-accent-green)] animate-spin" />
                <span className="text-sm text-[var(--farm-secondary-text)]">
                  Nahrávání...
                </span>
              </>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-[var(--farm-secondary-text)]" />
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--farm-primary-text)]">
                    Klikněte pro nahrání obrázku
                  </p>
                  <p className="text-xs text-[var(--farm-secondary-text)] mt-1">
                    JPEG, PNG, GIF, WebP (max 5MB)
                  </p>
                </div>
              </>
            )}
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Current URL display (for reference) */}
        {previewUrl && (
          <div className="text-xs text-[var(--farm-secondary-text)] break-all">
            URL: {previewUrl}
          </div>
        )}
      </div>
    </div>
  );
}
