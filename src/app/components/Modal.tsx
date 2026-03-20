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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex-shrink-0 border-b border-gray-100 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
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

              {/* Content */}
              <div className="flex-1 overflow-hidden p-4 sm:p-8">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}