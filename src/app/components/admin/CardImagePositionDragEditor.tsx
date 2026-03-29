import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { cardImageObjectPositionStyle } from '../../utils/horseCardImage';

function clampFocusPercent(n: number) {
  return Math.min(100, Math.max(0, n));
}

export type CardImagePositionDraft = {
  cardImageFocusX?: unknown;
  cardImageFocusY?: unknown;
};

type PreviewAspect = '4/3' | '5/6';

const viewportClass: Record<PreviewAspect, string> = {
  '5/6': 'aspect-[5/6] w-[200px]',
  '4/3': 'aspect-[4/3] w-[min(100%,280px)]',
};

const shellClass: Record<PreviewAspect, string> = {
  '5/6': 'h-[272px] max-w-[300px]',
  '4/3': 'min-h-[220px] max-w-[340px] py-4',
};

/**
 * Náhled karty: tahem myši object-position; za rámečkem ztmavený okraj.
 * `5/6` — koně; `4/3` — služby (karusel + stránka služeb).
 */
export function CardImagePositionDragEditor({
  imageSrc,
  draft,
  setDraft,
  previewAspect,
  ariaLabel = 'Posunout výřez náhledu karty tahem myši',
}: {
  imageSrc: string;
  draft: CardImagePositionDraft;
  setDraft: (fn: (prev: any) => any) => void;
  previewAspect: PreviewAspect;
  ariaLabel?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ px: 0, py: 0, fx: 50, fy: 50 });

  const fx = Number(draft.cardImageFocusX ?? 50);
  const fy = Number(draft.cardImageFocusY ?? 50);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setDragging(true);
    startRef.current = {
      px: e.clientX,
      py: e.clientY,
      fx,
      fy,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const dx = e.clientX - startRef.current.px;
    const dy = e.clientY - startRef.current.py;
    const k = 0.85;
    const nx = clampFocusPercent(startRef.current.fx + (dx / Math.max(rect.width, 1)) * 100 * k);
    const ny = clampFocusPercent(startRef.current.fy + (dy / Math.max(rect.height, 1)) * 100 * k);
    setDraft((prev: any) => (prev ? { ...prev, cardImageFocusX: nx, cardImageFocusY: ny } : prev));
  };

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    draggingRef.current = false;
    setDragging(false);
  };

  return (
    <div
      className={`relative mx-auto flex w-full select-none items-center justify-center overflow-hidden rounded-xl bg-[var(--farm-section-alt-bg)] ${shellClass[previewAspect]}`}
    >
      <div
        ref={viewportRef}
        role="application"
        aria-label={ariaLabel}
        className={`relative z-[1] touch-none overflow-hidden rounded-lg ring-2 ring-white/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.52)] active:cursor-grabbing ${viewportClass[previewAspect]}`}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onLostPointerCapture={() => {
          draggingRef.current = false;
          setDragging(false);
        }}
      >
        <img
          src={imageSrc}
          alt=""
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
          style={cardImageObjectPositionStyle(draft)}
        />
      </div>
    </div>
  );
}
