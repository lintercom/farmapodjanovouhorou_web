import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** Menší vnitřní padding pod `lg` — pro editory v administraci (veřejný web beze změny). */
  adminCompact?: boolean;
  onClick?: () => void;
}

export function FloatingCard({ 
  children, 
  className = '', 
  hover = true,
  adminCompact = false,
  ...props 
}: FloatingCardProps) {
  const baseStyles = adminCompact
    ? 'bg-white rounded-2xl p-4 transition-all duration-300 lg:p-8'
    : 'bg-white rounded-2xl p-8 transition-all duration-300';
  const shadowStyles = 'shadow-[var(--farm-shadow-md)]';
  const hoverStyles = hover ? 'hover:shadow-[var(--farm-shadow-xl)] hover:-translate-y-1' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`${baseStyles} ${shadowStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}