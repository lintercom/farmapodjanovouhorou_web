const LOADING_LOGO_URL =
  'https://zpbsjgmbvfxhmknryuos.supabase.co/storage/v1/object/sign/make-399cd496-images/1774015064301-qbjuknx5gyb.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NTMyOWQ2Mi04NjdlLTQ1NmQtOGZlYy00ODhhMTU0ZjEzNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYWtlLTM5OWNkNDk2LWltYWdlcy8xNzc0MDE1MDY0MzAxLXFianVrbng1Z3liLndlYnAiLCJpYXQiOjE3NzQwMTUwNjUsImV4cCI6MjA4OTM3NTA2NX0.X9t4s3TqcDweMcyXkbPJXBCCCOsegjnlczxBt3f70mg';

export function SiteLoadingScreen() {
  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] overflow-hidden">
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,199,82,0.22),transparent_45%),radial-gradient(circle_at_bottom,rgba(179,154,122,0.16),transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--farm-earth-100)]/60 to-transparent" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center">
            <img
              src={LOADING_LOGO_URL}
              alt="Farma pod Janovou horou"
              className="h-22 w-auto animate-pulse object-contain md:h-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
