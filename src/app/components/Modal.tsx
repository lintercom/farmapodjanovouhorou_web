import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function Modal({ isOpen, onClose, children, title, onPrevious, onNext }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
            aria-label="Zavřít modální okno"
          />

          {/* Modal */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex h-[min(94dvh,100svh)] max-h-[100dvh] w-full min-w-0 max-w-[min(100%,72rem)] flex-col overflow-hidden pointer-events-auto sm:h-[min(88dvh,90svh)]"
            >
              {/* Header */}
              <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 py-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-8 sm:py-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--farm-primary-text)] pr-2 line-clamp-1">
                  {title}
                </h2>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {/* Navigation Arrows */}
                  {(onPrevious || onNext) && (
                    <div className="flex items-center gap-0.5 sm:gap-1 mr-1 sm:mr-2">
                      {onPrevious && (
                        <button
                          onClick={onPrevious}
                          className="p-2 sm:p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
                          title="Předchozí"
                          aria-label="Předchozí kůň"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 text-[var(--farm-secondary-text)]" />
                        </button>
                      )}
                      {onNext && (
                        <button
                          onClick={onNext}
                          className="p-2 sm:p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
                          title="Další"
                          aria-label="Další kůň"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 text-[var(--farm-secondary-text)]" />
                        </button>
                      )}
                    </div>
                  )}
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-2 sm:p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
                    aria-label="Zavřít"
                  >
                    <X className="w-6 h-6 sm:w-6 sm:h-6 text-[var(--farm-secondary-text)]" />
                  </button>
                </div>
              </div>

              {/* Content — min-h-0 umožní vnořenému obsahu (flex + overflow) správně scrollovat */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-3 sm:p-6 sm:pb-8 sm:pt-6 md:p-8">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}