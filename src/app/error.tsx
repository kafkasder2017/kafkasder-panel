'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Context7 Local Error Boundary Pattern
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  // Context7 Error Logging Pattern
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Route Error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      pathname: window.location.pathname,
    })
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Sayfa Yüklenemedi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Bu sayfa yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
            </AlertDescription>
          </Alert>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-1">Hata Detayı:</p>
            <p className="font-mono text-xs break-all">
              {error.message || 'Bilinmeyen hata'}
            </p>
            {error.digest && (
              <p className="text-xs mt-1">
                Hata Kodu: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              onClick={reset}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
            
            <Button 
              onClick={() => router.back()}
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Sorun devam ederse lütfen sistem yöneticisi ile iletişime geçin.
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 