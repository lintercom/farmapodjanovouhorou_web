import type { CSSProperties } from 'react';

function clampFocusPercent(v: unknown, fallback: number): number {
  const n =
    typeof v === 'number' && Number.isFinite(v)
      ? v
      : typeof v === 'string' && v.trim() !== ''
        ? Number(v)
        : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(100, Math.max(0, n));
}

/** Pro náhled koně v kartě (object-fit: cover) — ohnisko v %. */
export function horseCardObjectPositionStyle(horse: {
  cardImageFocusX?: unknown;
  cardImageFocusY?: unknown;
}): CSSProperties {
  const x = clampFocusPercent(horse.cardImageFocusX, 50);
  const y = clampFocusPercent(horse.cardImageFocusY, 50);
  return { objectPosition: `${x}% ${y}%` };
}
