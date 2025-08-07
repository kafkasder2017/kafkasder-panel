import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  gradient?: boolean;
  glow?: boolean;
}

const variants = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 border-0',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg',
  outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-500 hover:border-blue-600 hover:text-blue-700',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-0',
  danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 border-0',
  success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 border-0',
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/30 border-0',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  base: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

const iconSizes = {
  sm: 'h-4 w-4',
  base: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
};

export const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  size = 'base',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  gradient = true,
  glow = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group',
        
        // Hover effects
        'hover:scale-105 active:scale-95 transform',
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Full width
        fullWidth && 'w-full',
        
        // Glow effect
        glow && 'animate-glow',
        
        // Disabled state
        isDisabled && 'hover:scale-100 active:scale-100 shadow-none',
        
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* Shimmer effect for primary variant */}
      {variant === 'primary' && !isDisabled && (
        <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
      )}
      
      {/* Loading spinner */}
      {loading && (
        <Loader2 className={clsx('animate-spin mr-2', iconSizes[size])} />
      )}
      
      {/* Left icon */}
      {icon && iconPosition === 'left' && !loading && (
        <span className={clsx('mr-2', iconSizes[size])}>
          {icon}
        </span>
      )}
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Right icon */}
      {icon && iconPosition === 'right' && !loading && (
        <span className={clsx('ml-2', iconSizes[size])}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default ModernButton;
