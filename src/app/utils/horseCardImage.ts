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

/** CMS pole `cardImageFocusX` / `cardImageFocusY` — object-fit: cover, ohnisko v %. */
export function cardImageObjectPositionStyle(item: {
  cardImageFocusX?: unknown;
  cardImageFocusY?: unknown;
}): CSSProperties {
  const x = clampFocusPercent(item.cardImageFocusX, 50);
  const y = clampFocusPercent(item.cardImageFocusY, 50);
  return { objectPosition: `${x}% ${y}%` };
}

/** Alias pro koně (stejná data jako u služeb). */
export const horseCardObjectPositionStyle = cardImageObjectPositionStyle;

export type HorseGalleryFocusRow = { x?: unknown; y?: unknown } | null | undefined;

/** Ohnisko pro i-tou fotku galerie; legacy jen u [0] přes cardImageFocusX/Y. */
export function getHorseImageFocusForIndex(
  horse: {
    cardImageFocusX?: unknown;
    cardImageFocusY?: unknown;
    galleryImageFocus?: HorseGalleryFocusRow[] | null;
  },
  imageIndex: number
): { x: number; y: number } {
  const row = horse.galleryImageFocus?.[imageIndex];
  if (row != null && row.x !== undefined && row.x !== '') {
    return {
      x: clampFocusPercent(row.x, 50),
      y: clampFocusPercent(row.y ?? 50, 50),
    };
  }
  if (imageIndex === 0) {
    return {
      x: clampFocusPercent(horse.cardImageFocusX, 50),
      y: clampFocusPercent(horse.cardImageFocusY, 50),
    };
  }
  return { x: 50, y: 50 };
}

export function horseGalleryImagePositionStyle(
  horse: Parameters<typeof getHorseImageFocusForIndex>[0],
  imageIndex: number
): CSSProperties {
  const { x, y } = getHorseImageFocusForIndex(horse, imageIndex);
  return { objectPosition: `${x}% ${y}%` };
}
