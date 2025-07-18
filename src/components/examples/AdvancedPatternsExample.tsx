'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { 
  usePersistentState, 
  useAdvancedForm, 
  useCachedData, 
  useModal,
  useKeyboardShortcut,
  useScrollPosition,
  useIntersectionObserver,
  usePerformanceMonitor,
  useErrorBoundaryWithRetry
} from '@/hooks/useAdvancedPatterns'
import { useApi } from '@/hooks/useApi'

// Example: Advanced Form with Validation
function AdvancedFormExample() {
  const validationRules = {
    name: (value: string) => !value ? 'İsim gerekli' : null,
    email: (value: string) => !value ? 'E-posta gerekli' : !value.includes('@') ? 'Geçerli e-posta girin' : null,
    phone: (value: string) => !value ? 'Telefon gerekli' : value.length < 10 ? 'Geçerli telefon girin' : null
  }

  const form = useAdvancedForm({
    name: '',
    email: '',
    phone: ''
  }, validationRules)

  const handleSubmit = async (values: typeof form.values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', values)
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gelişmiş Form Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(handleSubmit) }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">İsim</label>
              <Input
                value={form.values.name}
                onChange={(e) => form.setFieldValue('name', e.target.value)}
                onBlur={() => form.setFieldTouched('name')}
                className={form.errors.name && form.touched.name ? 'border-red-500' : ''}
              />
              {form.errors.name && form.touched.name && (
                <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <Input
                type="email"
                value={form.values.email}
                onChange={(e) => form.setFieldValue('email', e.target.value)}
                onBlur={() => form.setFieldTouched('email')}
                className={form.errors.email && form.touched.email ? 'border-red-500' : ''}
              />
              {form.errors.email && form.touched.email && (
                <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefon</label>
              <Input
                value={form.values.phone}
                onChange={(e) => form.setFieldValue('phone', e.target.value)}
                onBlur={() => form.setFieldTouched('phone')}
                className={form.errors.phone && form.touched.phone ? 'border-red-500' : ''}
              />
              {form.errors.phone && form.touched.phone && (
                <p className="text-red-500 text-sm mt-1">{form.errors.phone}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={form.isSubmitting || !form.isValid}
              className="w-full"
            >
              {form.isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Example: Persistent State
function PersistentStateExample() {
  const [theme, setTheme] = usePersistentState('app-theme', 'light')
  const [sidebarCollapsed, setSidebarCollapsed] = usePersistentState('sidebar-collapsed', false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kalıcı Durum Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tema</label>
            <div className="flex space-x-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
              >
                Açık
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
              >
                Koyu
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kenar Çubuğu</label>
            <Button
              variant="outline"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? 'Genişlet' : 'Daralt'}
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            Bu ayarlar tarayıcıda saklanır ve sayfa yenilendiğinde korunur.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Example: Cached Data
function CachedDataExample() {
  const { data, loading, error, fetchData } = useCachedData(
    'user-profile',
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        role: 'admin'
      }
    },
    {
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: true
    }
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Önbellekli Veri Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Yükleniyor...</p>}
        {error && <Alert variant="error">{error}</Alert>}
        {data && (
          <div className="space-y-2">
            <p><strong>İsim:</strong> {data.name}</p>
            <p><strong>E-posta:</strong> {data.email}</p>
            <p><strong>Rol:</strong> {data.role}</p>
            <Button onClick={() => fetchData(true)} variant="outline">
              Yenile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Example: Modal Management
function ModalExample() {
  const modal = useModal()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modal Yönetimi Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => modal.open()}>
            Modal Aç
          </Button>
          <Button onClick={() => modal.open({ id: 1, name: 'Test Data' })}>
            Veri ile Modal Aç
          </Button>

          {modal.isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Modal İçeriği</h3>
                {modal.data && (
                  <p className="mb-4">Veri: {JSON.stringify(modal.data)}</p>
                )}
                <div className="flex space-x-2">
                  <Button onClick={modal.close}>
                    Kapat
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Example: Keyboard Shortcuts
function KeyboardShortcutsExample() {
  const [lastShortcut, setLastShortcut] = useState<string>('')

  useKeyboardShortcut(['ctrl', 's'], (event) => {
    event.preventDefault()
    setLastShortcut('Ctrl+S - Kaydet')
    console.log('Kaydet kısayolu tetiklendi')
  })

  useKeyboardShortcut(['ctrl', 'k'], (event) => {
    event.preventDefault()
    setLastShortcut('Ctrl+K - Arama')
    console.log('Arama kısayolu tetiklendi')
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Klavye Kısayolları Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>• <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+S</kbd> - Kaydet</p>
            <p>• <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+K</kbd> - Arama</p>
          </div>
          
          {lastShortcut && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">Son tetiklenen: {lastShortcut}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Example: Scroll Position Tracking
function ScrollPositionExample() {
  const { scrollPosition, scrollDirection, isScrollingDown, isScrollingUp } = useScrollPosition()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kaydırma Pozisyonu Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Y Pozisyonu:</span>
            <Badge variant="secondary">{Math.round(scrollPosition)}px</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Yön:</span>
            <Badge variant={scrollDirection === 'down' ? 'default' : 'outline'}>
              {scrollDirection === 'down' ? 'Aşağı' : scrollDirection === 'up' ? 'Yukarı' : 'Hareket yok'}
            </Badge>
          </div>

          <div className="flex space-x-2">
            {isScrollingDown && <Badge variant="default">Aşağı kaydırılıyor</Badge>}
            {isScrollingUp && <Badge variant="secondary">Yukarı kaydırılıyor</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Example: Intersection Observer
function IntersectionObserverExample() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kesişim Gözlemcisi Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-20 bg-gray-100 flex items-center justify-center">
            <p className="text-sm text-gray-600">Yukarıdaki alan</p>
          </div>
          
          <div
            ref={elementRef as any}
            className={`h-32 border-2 border-dashed flex items-center justify-center transition-colors ${
              isIntersecting ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="text-center">
              <p className="font-medium">
                {isIntersecting ? 'Görünür!' : 'Görünmez'}
              </p>
              <p className="text-sm text-gray-600">
                Bu alan ekranda görünür olduğunda renk değişir
              </p>
            </div>
          </div>
          
          <div className="h-20 bg-gray-100 flex items-center justify-center">
            <p className="text-sm text-gray-600">Aşağıdaki alan</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Example: Performance Monitoring
function PerformanceMonitoringExample() {
  const performance = usePerformanceMonitor('API Call')

  const handleSlowOperation = async () => {
    await performance.measure(async () => {
      // Simulate slow operation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Yavaş işlem tamamlandı')
    })
  }

  const handleFastOperation = async () => {
    await performance.measure(async () => {
      // Simulate fast operation
      await new Promise(resolve => setTimeout(resolve, 100))
      console.log('Hızlı işlem tamamlandı')
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performans İzleme Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={handleSlowOperation} variant="outline">
              Yavaş İşlem
            </Button>
            <Button onClick={handleFastOperation} variant="outline">
              Hızlı İşlem
            </Button>
          </div>
          
          {performance.duration > 0 && (
            <Alert>
              Son işlem süresi: <strong>{performance.duration.toFixed(2)}ms</strong>
            </Alert>
          )}
          
          <p className="text-sm text-gray-600">
            Performans verileri konsola yazdırılır.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Example: Error Boundary with Retry
function ErrorBoundaryExample() {
  const { error, retryCount, handleError, retry, reset, canRetry } = useErrorBoundaryWithRetry()
  const [shouldError, setShouldError] = useState(false)

  const simulateError = () => {
    setShouldError(true)
    handleError(new Error('Simüle edilmiş hata'))
  }

  const simulateSuccess = () => {
    setShouldError(false)
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hata Sınırı Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error ? (
            <div className="space-y-2">
              <Alert variant="error">
                <p className="font-medium">Hata oluştu!</p>
                <p className="text-sm">{error.message}</p>
                <p className="text-sm">Deneme sayısı: {retryCount}/3</p>
              </Alert>
              <div className="flex space-x-2">
                {canRetry && (
                  <Button onClick={retry} variant="outline">
                    Tekrar Dene
                  </Button>
                )}
                <Button onClick={simulateSuccess} variant="outline">
                  Başarılı İşlem
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Button onClick={simulateError} variant="destructive">
                Hata Tetikle
              </Button>
              <p className="text-sm text-gray-600">
                Hata simüle etmek için butona tıklayın.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Example: API Integration
function ApiIntegrationExample() {
  const { data: persons, loading, error, create } = useApi('persons', {
    orderBy: { column: 'created_at', ascending: false }
  })

  const handleCreatePerson = async () => {
    try {
      await create({
        name: 'Test Kişi',
        email: 'test@example.com',
        phone: '5551234567'
      })
    } catch (err) {
      console.error('Kişi oluşturma hatası:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Entegrasyonu Örneği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleCreatePerson} disabled={loading}>
            {loading ? 'Oluşturuluyor...' : 'Test Kişisi Oluştur'}
          </Button>
          
          {error && (
            <Alert variant="error">
              API Hatası: {error}
            </Alert>
          )}
          
          {persons && persons.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Kişiler:</h4>
              {persons.slice(0, 3).map((person: any) => (
                <div key={person.id} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-600">{person.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Main Component
export default function AdvancedPatternsExample() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Gelişmiş React Pattern'leri</h1>
        <p className="text-gray-600">
          Context7 ve React best practice'lerini gösteren örnekler
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdvancedFormExample />
        <PersistentStateExample />
        <CachedDataExample />
        <ModalExample />
        <KeyboardShortcutsExample />
        <ScrollPositionExample />
        <IntersectionObserverExample />
        <PerformanceMonitoringExample />
        <ErrorBoundaryExample />
        <ApiIntegrationExample />
      </div>
    </div>
  )
} 