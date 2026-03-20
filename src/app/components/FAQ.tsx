import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-2xl overflow-hidden shadow-md transition-all ${
            openIndex === index 
              ? 'bg-white ring-2 ring-[var(--farm-accent-green)]' 
              : 'bg-white'
          }`}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--farm-green-100)] transition-colors group"
          >
            <span className="font-bold text-lg text-[var(--farm-primary-text)] pr-4">
              {item.question}
            </span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              openIndex === index 
                ? 'bg-[var(--farm-accent-green)] text-white' 
                : 'bg-[var(--farm-green-100)] text-[var(--farm-accent-green)] group-hover:bg-[var(--farm-accent-green)] group-hover:text-white'
            }`}>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-1 text-[var(--farm-secondary-text)] leading-relaxed bg-[var(--farm-green-100)]/30">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}