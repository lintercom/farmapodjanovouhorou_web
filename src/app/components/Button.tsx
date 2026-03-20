import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[var(--farm-primary)] text-white hover:bg-[var(--farm-primary-hover)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[var(--farm-secondary)] text-white hover:bg-[var(--farm-accent)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-[var(--farm-primary)] text-[var(--farm-primary)] hover:bg-[var(--farm-primary)] hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}