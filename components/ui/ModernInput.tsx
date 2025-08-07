import React from 'react';
import { cn } from '../../utils/cn';
import { variants, theme } from './theme';
import { Search, Eye, EyeOff } from 'lucide-react';

export interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'error';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
  error?: string;
  helper?: string;
}

export const ModernInput: React.FC<ModernInputProps> = ({
  variant = 'default',
  icon,
  iconPosition = 'left',
  label,
  error,
  helper,
  className,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseClasses = `
    w-full transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-0
    placeholder:text-gray-400
  `;

  const variantClasses = variants.input[error ? 'error' : variant];

  const inputClasses = cn(
    baseClasses,
    variantClasses,
    icon && iconPosition === 'left' && 'pl-12',
    icon && iconPosition === 'right' && 'pr-12',
    type === 'password' && 'pr-12',
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          className={inputClasses}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
        
        {icon && iconPosition === 'right' && type !== 'password' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-gray-500">
          {helper}
        </p>
      )}
    </div>
  );
};

// Search Input Component
export const ModernSearchInput: React.FC<Omit<ModernInputProps, 'variant' | 'icon'>> = (props) => {
  return (
    <ModernInput
      variant="search"
      icon={<Search className="h-5 w-5" />}
      iconPosition="left"
      placeholder="Ara..."
      {...props}
    />
  );
};

export default ModernInput;
