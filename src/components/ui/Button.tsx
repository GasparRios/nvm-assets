import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group';
    
    const variants = {
      primary:
        'bg-[#0C8346] hover:bg-[#329F5C] text-white shadow-lg shadow-[#0C8346]/20 hover:shadow-[#329F5C]/40 border border-transparent',
      ghost:
        'bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg shadow-black/20',
      outline:
        'bg-transparent border border-[#CCAB76] text-[#CCAB76] hover:bg-[#CCAB76]/10',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, cn };
