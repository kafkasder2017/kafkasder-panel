'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'

// Temel loading spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const LoaderIcon = LucideIcons.Loader2 || LucideIcons.Loader
  return (
    <LoaderIcon className={`animate-spin ${spinnerSizes[size]} ${className}`} />
  )
}

// Sayfa yükleme göstergesi
interface PageLoadingProps {
  message?: string
  className?: string
}

export function PageLoading({ message = 'Yükleniyor...', className = '' }: PageLoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      <LoadingSpinner size="xl" className="text-blue-600 mb-4" />
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  )
}

// Tablo yükleme göstergesi
interface TableLoadingProps {
  rows?: number
  columns?: number
  className?: string
}

export function TableLoading({ rows = 5, columns = 4, className = '' }: TableLoadingProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="h-6 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Card yükleme göstergesi
interface CardLoadingProps {
  count?: number
  className?: string
}

export function CardLoading({ count = 3, className = '' }: CardLoadingProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="flex justify-between">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Button loading state
interface LoadingButtonProps {
  children: React.ReactNode
  isLoading: boolean
  loadingText?: string
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export function LoadingButton({
  children,
  isLoading,
  loadingText = 'Yükleniyor...',
  disabled = false,
  className = '',
  onClick
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {isLoading ? loadingText : children}
    </button>
  )
}

// Section loading overlay
interface SectionLoadingProps {
  isLoading: boolean
  children: React.ReactNode
  message?: string
  overlay?: boolean
  className?: string
}

export function SectionLoading({
  isLoading,
  children,
  message = 'Yükleniyor...',
  overlay = true,
  className = ''
}: SectionLoadingProps) {
  if (!isLoading) {
    return <>{children}</>
  }

  if (overlay) {
    return (
      <div className={`relative ${className}`}>
        {children}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-blue-600 mb-2" />
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-blue-600 mb-2" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

// Form field loading
interface FieldLoadingProps {
  width?: string
  height?: string
  className?: string
}

export function FieldLoading({ 
  width = 'w-full', 
  height = 'h-10', 
  className = '' 
}: FieldLoadingProps) {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`} />
  )
}

// Progress bar loading
interface ProgressLoadingProps {
  progress?: number
  message?: string
  className?: string
}

export function ProgressLoading({ 
  progress = 0, 
  message = 'İşleniyor...', 
  className = '' 
}: ProgressLoadingProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{message}</span>
        <span className="text-gray-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 