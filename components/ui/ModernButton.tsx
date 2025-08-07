import React from 'react';
import { cn } from '../../utils/cn';
import { variants, theme } from './theme';

export interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  base: 'px-4 py-2 text-base rounded-xl',
  lg: 'px-6 py-3 text-lg rounded-xl',
  xl: 'px-8 py-4 text-xl rounded-2xl',
};

export const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  size = 'base',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-medium text-center relative overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${theme.animations.smooth}
  `;

  const variantClasses = variants.button[variant];
  const sizeClass = sizeClasses[size];

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses,
        sizeClass,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        </div>
      )}
      
      <div className={cn('flex items-center gap-2', loading && 'invisible')}>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>
    </button>
  );
};

export default ModernButton;
