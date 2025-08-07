import React from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff, Search, AlertCircle, CheckCircle } from 'lucide-react';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'error' | 'success';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  isLoading?: boolean;
}

const variants = {
  default: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20',
  search: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-gray-50 focus:bg-white',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50',
  success: 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50',
};

export const ModernInput: React.FC<ModernInputProps> = ({
  variant = 'default',
  leftIcon,
  rightIcon,
  label,
  error,
  success,
  hint,
  showPasswordToggle = false,
  isLoading = false,
  className,
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  const hasLeftElement = leftIcon || variant === 'search';
  const hasRightElement = rightIcon || showPasswordToggle || isLoading || error || success;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative group">
        {/* Left Icon */}
        {hasLeftElement && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            {variant === 'search' ? (
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            ) : (
              leftIcon && <span className="text-gray-400 group-focus-within:text-blue-500 transition-colors">{leftIcon}</span>
            )}
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={inputType}
          className={clsx(
            // Base styles
            'block w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2',
            
            // Variant styles
            variants[variant],
            
            // Padding adjustments for icons
            hasLeftElement && 'pl-10',
            hasRightElement && 'pr-10',
            
            // Focus state
            'group-focus-within:shadow-lg group-focus-within:shadow-blue-500/10',
            
            // Hover state
            'hover:border-gray-300 hover:shadow-md',
            
            // Loading state
            isLoading && 'cursor-wait',
            
            // Error state
            error && 'border-red-300 focus:border-red-500',
            
            // Success state
            success && 'border-green-300 focus:border-green-500',
            
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Right Elements */}
        {hasRightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
            {/* Loading Spinner */}
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            )}
            
            {/* Error Icon */}
            {error && !isLoading && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            
            {/* Success Icon */}
            {success && !isLoading && !error && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            
            {/* Password Toggle */}
            {showPasswordToggle && !isLoading && !error && !success && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
            
            {/* Right Icon */}
            {rightIcon && !showPasswordToggle && !isLoading && !error && !success && (
              <span className="text-gray-400">{rightIcon}</span>
            )}
          </div>
        )}
        
        {/* Focus Ring Enhancement */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500/20 ring-offset-1 pointer-events-none"></div>
        )}
      </div>
      
      {/* Helper Text */}
      {(error || success || hint) && (
        <div className="mt-2 space-y-1">
          {error && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </p>
          )}
          
          {success && !error && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              {success}
            </p>
          )}
          
          {hint && !error && !success && (
            <p className="text-sm text-gray-500">{hint}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernInput;
