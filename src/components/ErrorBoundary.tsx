'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, RefreshCw, Bug, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  onReset?: () => void
  resetKeys?: any[]
  retryCount?: number
  showDetails?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  retryCount: number
  isRecovering: boolean
}

// Context7 Advanced Error Boundary
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRecovering: false
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when resetKeys change
    if (this.props.resetKeys && prevProps.resetKeys !== this.props.resetKeys) {
      this.resetErrorBoundary()
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real app, you would send this to your error tracking service
    // Example: Sentry, LogRocket, etc.
    try {
      // Simulate error reporting
      console.log('Reporting error to monitoring service:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  private resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1,
      isRecovering: true
    })

    // Call custom reset handler
    if (this.props.onReset) {
      this.props.onReset()
    }

    // Reset recovery state after a short delay
    setTimeout(() => {
      this.setState({ isRecovering: false })
    }, 1000)
  }

  private handleRetry = () => {
    this.resetErrorBoundary()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      const maxRetries = this.props.retryCount || 3
      const canRetry = this.state.retryCount < maxRetries

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Bug className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Bir Hata Oluştu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
                </AlertDescription>
              </Alert>

              {this.props.showDetails && this.state.error && (
                <div className="mt-4 rounded-md bg-gray-50 p-3">
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium text-gray-700">
                      Hata Detayları
                    </summary>
                    <div className="mt-2 text-xs text-gray-600">
                      <p className="font-semibold">Hata:</p>
                      <p className="font-mono break-all">{this.state.error.message}</p>
                      {this.state.errorInfo && (
                        <>
                          <p className="font-semibold mt-2">Bileşen Yığını:</p>
                          <pre className="whitespace-pre-wrap text-xs">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </details>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {canRetry && (
                  <Button
                    onClick={this.handleRetry}
                    disabled={this.state.isRecovering}
                    className="w-full"
                  >
                    {this.state.isRecovering ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Kurtarılıyor...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Tekrar Dene ({this.state.retryCount + 1}/{maxRetries})
                      </>
                    )}
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={this.handleGoHome}
                    className="flex-1"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Ana Sayfa
                  </Button>
                  <Button
                    variant="outline"
                    onClick={this.handleReload}
                    className="flex-1"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sayfayı Yenile
                  </Button>
                </div>
              </div>

              {!canRetry && (
                <p className="text-center text-sm text-gray-500">
                  Maksimum deneme sayısına ulaşıldı. Lütfen sayfayı yenileyin.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Context7 Functional Error Boundary Hook
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)
  const [errorInfo, setErrorInfo] = React.useState<ErrorInfo | null>(null)

  const handleError = React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    setError(error)
    setErrorInfo(errorInfo)
    
    // Log error
    console.error('useErrorBoundary caught an error:', error, errorInfo)
    
    // Report to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Report error logic here
    }
  }, [])

  const resetError = React.useCallback(() => {
    setError(null)
    setErrorInfo(null)
  }, [])

  return {
    error,
    errorInfo,
    handleError,
    resetError,
    hasError: error !== null
  }
}

// Context7 Error Boundary with Suspense
export function ErrorBoundaryWithSuspense({ 
  children, 
  fallback,
  errorFallback 
}: {
  children: ReactNode
  fallback?: ReactNode
  errorFallback?: ReactNode
}) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <React.Suspense fallback={fallback || <div>Yükleniyor...</div>}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  )
}

// Context7 Async Error Boundary
export function AsyncErrorBoundary({ 
  children, 
  onError 
}: {
  children: ReactNode
  onError?: (error: Error) => void
}) {
  const handleAsyncError = React.useCallback((error: Error) => {
    console.error('Async error caught:', error)
    if (onError) {
      onError(error)
    }
  }, [onError])

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleAsyncError(new Error(event.reason))
    }

    const handleUncaughtError = (event: ErrorEvent) => {
      handleAsyncError(event.error || new Error(event.message))
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleUncaughtError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleUncaughtError)
    }
  }, [handleAsyncError])

  return <>{children}</>
} 