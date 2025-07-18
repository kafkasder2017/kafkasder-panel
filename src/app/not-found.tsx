import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, Home, ArrowLeft } from 'lucide-react'

// Context7 Not Found Pattern
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Sayfa Bulunamadı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Search className="h-4 w-4" />
            <AlertDescription>
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </AlertDescription>
          </Alert>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-1">Öneriler:</p>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>URL adresini kontrol edin</li>
              <li>Ana sayfaya dönün</li>
              <li>Arama yapmayı deneyin</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/" className="w-full">
              <Button 
                className="w-full"
                variant="default"
              >
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
            </Link>
            
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Yardıma ihtiyacınız varsa lütfen sistem yöneticisi ile iletişime geçin.
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 