const FIGMA_ASSET_PREFIX = "figma:asset/";

function isUsableImageUrl(value?: string): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith(FIGMA_ASSET_PREFIX)) return false;
  return true;
}

export function resolveCmsImageUrl(
  primary?: string,
  fallback?: string,
  placeholder: string = "/hero-placeholder.svg",
): string {
  if (isUsableImageUrl(primary)) return primary.trim();
  if (isUsableImageUrl(fallback)) return fallback.trim();
  return placeholder;
}

