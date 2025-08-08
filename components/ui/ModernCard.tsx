import React from 'react';
import { cn } from '../../utils/cn';
import { variants, theme } from './theme';

export interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'glass';
  padding?: 'none' | 'sm' | 'base' | 'lg' | 'xl';
  children: React.ReactNode;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  base: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export const ModernCard: React.FC<ModernCardProps> = ({
  variant = 'default',
  padding = 'base',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'overflow-hidden';
  const variantClasses = variants.card[variant];
  const paddingClass = paddingClasses[padding];

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses,
        paddingClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
export interface ModernCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const ModernCardHeader: React.FC<ModernCardHeaderProps> = ({
  title,
  subtitle,
  icon,
  actions,
  children,
  className,
  ...props
}) => {
  if (children) {
    return (
      <div className={cn('border-b border-gray-100 pb-4 mb-6', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-between border-b border-gray-100 pb-4 mb-6', className)} {...props}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <div>
          {title && <h3 className={theme.typography.h4}>{title}</h3>}
          {subtitle && <p className={theme.typography.small}>{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

// Card Content Component  
export interface ModernCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModernCardContent: React.FC<ModernCardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
export interface ModernCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModernCardFooter: React.FC<ModernCardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('border-t border-gray-100 pt-4 mt-6', className)} {...props}>
      {children}
    </div>
  );
};

export default ModernCard;
