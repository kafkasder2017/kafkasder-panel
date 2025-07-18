'use client'

import { Suspense, ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

// Context7 Suspense Loading Components
interface LoadingFallbackProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingFallback({ 
  message = 'Yükleniyor...', 
  size = 'md' 
}: LoadingFallbackProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-3">
        <Loader2 className={`${sizeClasses[size]} animate-spin mx-auto text-blue-600`} />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export function CardLoadingFallback({ 
  message = 'İçerik yükleniyor...' 
}: { message?: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <LoadingFallback message={message} />
      </CardContent>
    </Card>
  )
}

export function TableLoadingFallback() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Context7 Suspense Wrapper Pattern
interface SuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  fallbackType?: 'default' | 'card' | 'table'
  fallbackMessage?: string
}

export function SuspenseWrapper({ 
  children, 
  fallback,
  fallbackType = 'default',
  fallbackMessage
}: SuspenseWrapperProps) {
  const getFallback = () => {
    if (fallback) return fallback
    
    switch (fallbackType) {
      case 'card':
        return <CardLoadingFallback message={fallbackMessage} />
      case 'table':
        return <TableLoadingFallback />
      default:
        return <LoadingFallback message={fallbackMessage} />
    }
  }

  return (
    <Suspense fallback={getFallback()}>
      {children}
    </Suspense>
  )
}

// Context7 Nested Suspense Pattern
interface NestedSuspenseProps {
  children: ReactNode
  fallbacks: {
    outer?: ReactNode
    inner?: ReactNode
  }
}

export function NestedSuspense({ children, fallbacks }: NestedSuspenseProps) {
  return (
    <Suspense fallback={fallbacks.outer || <LoadingFallback />}>
      <Suspense fallback={fallbacks.inner || <LoadingFallback size="sm" />}>
        {children}
      </Suspense>
    </Suspense>
  )
} 