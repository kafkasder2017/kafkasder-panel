// Modern theme configuration for Kafkasder Panel
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  
  gradients: {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    secondary: 'bg-gradient-to-r from-slate-500 to-slate-600',
    accent: 'bg-gradient-to-r from-purple-500 to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    error: 'bg-gradient-to-r from-red-500 to-rose-600',
    glass: 'bg-gradient-to-br from-white/80 to-blue-50/50',
    sidebar: 'bg-gradient-to-br from-slate-50 to-blue-50/30',
  },
  
  shadows: {
    sm: 'shadow-sm',
    base: 'shadow-md',
    lg: 'shadow-lg shadow-blue-500/20',
    xl: 'shadow-xl shadow-blue-500/25',
    glow: 'shadow-2xl shadow-blue-500/30',
    inner: 'shadow-inner',
  },
  
  animations: {
    smooth: 'transition-all duration-300 ease-in-out',
    fast: 'transition-all duration-200 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
    bounce: 'transition-transform duration-200 hover:scale-105 active:scale-95',
    glow: 'transition-shadow duration-300 ease-in-out',
  },
  
  spacing: {
    section: 'space-y-6',
    card: 'p-6',
    button: 'px-6 py-3',
    input: 'px-4 py-3',
  },
  
  typography: {
    h1: 'text-4xl font-bold text-gray-900',
    h2: 'text-3xl font-semibold text-gray-800', 
    h3: 'text-2xl font-medium text-gray-800',
    h4: 'text-xl font-medium text-gray-700',
    body: 'text-base text-gray-600',
    small: 'text-sm text-gray-500',
    caption: 'text-xs text-gray-400',
  }
};

// Component style variants
export const variants = {
  button: {
    primary: `${theme.gradients.primary} text-white ${theme.shadows.lg} ${theme.animations.bounce} border-0`,
    secondary: `bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 ${theme.animations.smooth}`,
    outline: `bg-transparent border-2 border-blue-500 text-blue-600 hover:bg-blue-50 ${theme.animations.smooth}`,
    ghost: `bg-transparent text-gray-600 hover:bg-gray-100 ${theme.animations.smooth}`,
    danger: `${theme.gradients.error} text-white ${theme.shadows.lg} ${theme.animations.bounce}`,
    success: `${theme.gradients.success} text-white ${theme.shadows.lg} ${theme.animations.bounce}`,
  },
  
  card: {
    default: `bg-white rounded-2xl ${theme.shadows.base} border border-gray-100 ${theme.animations.smooth} hover:${theme.shadows.lg}`,
    elevated: `${theme.gradients.glass} backdrop-blur-sm rounded-2xl ${theme.shadows.xl} border border-white/20`,
    interactive: `bg-white rounded-2xl ${theme.shadows.base} border border-gray-100 ${theme.animations.smooth} hover:${theme.shadows.xl} hover:scale-105 cursor-pointer`,
    glass: `${theme.gradients.glass} backdrop-blur-lg rounded-2xl border border-white/30 ${theme.shadows.lg}`,
  },
  
  input: {
    default: `bg-white border border-gray-200 rounded-xl ${theme.spacing.input} ${theme.animations.smooth} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`,
    search: `bg-gray-50 border border-gray-200 rounded-full ${theme.spacing.input} ${theme.animations.smooth} focus:bg-white focus:border-blue-500`,
    error: `bg-white border border-red-300 rounded-xl ${theme.spacing.input} focus:border-red-500 focus:ring-2 focus:ring-red-500/20`,
  },
  
  badge: {
    primary: `${theme.gradients.primary} text-white px-3 py-1 rounded-full text-xs font-medium`,
    secondary: `bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium`,
    success: `${theme.gradients.success} text-white px-3 py-1 rounded-full text-xs font-medium`,
    warning: `${theme.gradients.warning} text-white px-3 py-1 rounded-full text-xs font-medium`,
    error: `${theme.gradients.error} text-white px-3 py-1 rounded-full text-xs font-medium`,
  }
};

export const iconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4', 
  base: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  xxl: 'h-12 w-12',
};

export default theme;
