# KAFKASDER Gelişmiş React Desenleri Rehberi

Bu rehber, KAFKASDER uygulamasında kullanılabilecek gelişmiş React desenlerini ve hook'ları açıklar.

## 📋 İçindekiler

1. [Gelişmiş Hook'lar](#gelişmiş-hooklar)
2. [Form Yönetimi](#form-yönetimi)
3. [Veri Önbellekleme](#veri-önbellekleme)
4. [Modal Yönetimi](#modal-yönetimi)
5. [Klavye Kısayolları](#klavye-kısayolları)
6. [Performans İzleme](#performans-izleme)
7. [Hata Yönetimi](#hata-yönetimi)
8. [Gerçek Zamanlı Veri](#gerçek-zamanlı-veri)
9. [Optimistik Güncellemeler](#optimistik-güncellemeler)
10. [Pratik Örnekler](#pratik-örnekler)

## 🎣 Gelişmiş Hook'lar

### usePersistentState

Tarayıcıda kalıcı durum yönetimi için kullanılır.

```typescript
import { usePersistentState } from '@/hooks/useAdvancedPatterns'

function UserSettings() {
  const [theme, setTheme] = usePersistentState('app-theme', 'light')
  const [sidebarCollapsed, setSidebarCollapsed] = usePersistentState('sidebar-collapsed', false)

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Tema Değiştir
      </button>
      <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        Kenar Çubuğu {sidebarCollapsed ? 'Genişlet' : 'Daralt'}
      </button>
    </div>
  )
}
```

### useAdvancedForm

Gelişmiş form yönetimi ve validasyon için kullanılır.

```typescript
import { useAdvancedForm } from '@/hooks/useAdvancedPatterns'

function PersonForm() {
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
    await PersonService.createPerson(values)
    form.reset()
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(handleSubmit) }}>
      <input
        value={form.values.name}
        onChange={(e) => form.setFieldValue('name', e.target.value)}
        onBlur={() => form.setFieldTouched('name')}
        className={form.errors.name && form.touched.name ? 'error' : ''}
      />
      {form.errors.name && form.touched.name && (
        <span className="error">{form.errors.name}</span>
      )}
      
      <button type="submit" disabled={form.isSubmitting || !form.isValid}>
        {form.isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
      </button>
    </form>
  )
}
```

### useCachedData

Veri önbellekleme ve otomatik yenileme için kullanılır.

```typescript
import { useCachedData } from '@/hooks/useAdvancedPatterns'

function DonationStats() {
  const { data, loading, error, fetchData } = useCachedData(
    'donation-stats',
    async () => {
      return await DonationService.getStats()
    },
    {
      cacheTime: 5 * 60 * 1000, // 5 dakika
      staleTime: 60 * 1000, // 1 dakika
      refetchOnWindowFocus: true
    }
  )

  if (loading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <div>
      <h3>Bağış İstatistikleri</h3>
      <p>Toplam Bağış: {data?.totalAmount} ₺</p>
      <p>Bağışçı Sayısı: {data?.donorCount}</p>
      <button onClick={() => fetchData(true)}>Yenile</button>
    </div>
  )
}
```

## 🎨 Modal Yönetimi

### useModal

Modal durumu yönetimi için kullanılır.

```typescript
import { useModal } from '@/hooks/useAdvancedPatterns'

function PersonList() {
  const modal = useModal()

  const handleEditPerson = (person: Person) => {
    modal.open(person)
  }

  return (
    <div>
      <button onClick={() => modal.open()}>Yeni Kişi Ekle</button>
      
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Kişi {modal.data ? 'Düzenle' : 'Ekle'}</h3>
            {modal.data && <p>Düzenlenen: {modal.data.name}</p>}
            <button onClick={modal.close}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

## ⌨️ Klavye Kısayolları

### useKeyboardShortcut

Klavye kısayolları için kullanılır.

```typescript
import { useKeyboardShortcut } from '@/hooks/useAdvancedPatterns'

function DocumentEditor() {
  const [saved, setSaved] = useState(false)

  useKeyboardShortcut(['ctrl', 's'], (event) => {
    event.preventDefault()
    handleSave()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  })

  useKeyboardShortcut(['ctrl', 'n'], (event) => {
    event.preventDefault()
    handleNewDocument()
  })

  useKeyboardShortcut(['escape'], () => {
    handleCancel()
  })

  return (
    <div>
      {saved && <div className="saved-indicator">Kaydedildi!</div>}
      <textarea />
    </div>
  )
}
```

## 📊 Performans İzleme

### usePerformanceMonitor

Performans ölçümü için kullanılır.

```typescript
import { usePerformanceMonitor } from '@/hooks/useAdvancedPatterns'

function DataTable() {
  const performance = usePerformanceMonitor('Data Fetch')

  const handleRefresh = async () => {
    await performance.measure(async () => {
      await fetchData()
    })
  }

  return (
    <div>
      <button onClick={handleRefresh}>Veri Yenile</button>
      {performance.duration > 0 && (
        <p>Son işlem süresi: {performance.duration.toFixed(2)}ms</p>
      )}
    </div>
  )
}
```

## 🛡️ Hata Yönetimi

### useErrorBoundaryWithRetry

Hata sınırı ve yeniden deneme için kullanılır.

```typescript
import { useErrorBoundaryWithRetry } from '@/hooks/useAdvancedPatterns'

function ApiComponent() {
  const { error, retryCount, handleError, retry, reset, canRetry } = useErrorBoundaryWithRetry()

  const handleApiCall = async () => {
    try {
      await apiCall()
    } catch (err) {
      handleError(err as Error)
    }
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Hata: {error.message}</p>
        <p>Deneme: {retryCount}/3</p>
        {canRetry && <button onClick={retry}>Tekrar Dene</button>}
        <button onClick={reset}>Sıfırla</button>
      </div>
    )
  }

  return <button onClick={handleApiCall}>API Çağrısı</button>
}
```

## 🔄 Gerçek Zamanlı Veri

### useRealtimeSubscription

Supabase gerçek zamanlı abonelikleri için kullanılır.

```typescript
import { useRealtimeSubscription } from '@/hooks/useApi'

function DonationFeed() {
  const { data, error } = useRealtimeSubscription<Donation>(
    'donations',
    'INSERT',
    (payload) => {
      // Yeni bağış geldiğinde bildirim göster
      toast.success('Yeni bağış alındı!')
    }
  )

  if (error) {
    return <div>Gerçek zamanlı bağlantı hatası: {error}</div>
  }

  return (
    <div>
      <h3>Gerçek Zamanlı Bağışlar</h3>
      {data.map(donation => (
        <div key={donation.id}>
          {donation.donor_name} - {donation.amount} ₺
        </div>
      ))}
    </div>
  )
}
```

## ⚡ Optimistik Güncellemeler

### useOptimisticUpdate

Hızlı kullanıcı deneyimi için optimistik güncellemeler.

```typescript
import { useOptimisticUpdate } from '@/hooks/useApi'

function PersonList() {
  const { data: persons, setData: setPersons } = useApi<Person>('persons')
  const { optimisticUpdate, optimisticCreate, optimisticDelete } = useOptimisticUpdate(persons, setPersons)

  const handleUpdatePerson = async (id: string, updates: Partial<Person>) => {
    const rollback = optimisticUpdate(id, updates)
    
    try {
      await PersonService.updatePerson(id, updates)
    } catch (error) {
      rollback() // Hata durumunda geri al
      toast.error('Güncelleme başarısız')
    }
  }

  const handleCreatePerson = async (newPerson: Person) => {
    const rollback = optimisticCreate(newPerson)
    
    try {
      await PersonService.createPerson(newPerson)
    } catch (error) {
      rollback()
      toast.error('Oluşturma başarısız')
    }
  }

  const handleDeletePerson = async (id: string) => {
    const rollback = optimisticDelete(id)
    
    try {
      await PersonService.deletePerson(id)
    } catch (error) {
      rollback()
      toast.error('Silme başarısız')
    }
  }

  return (
    <div>
      {persons.map(person => (
        <div key={person.id}>
          <span>{person.name}</span>
          <button onClick={() => handleUpdatePerson(person.id, { status: 'active' })}>
            Aktif Yap
          </button>
          <button onClick={() => handleDeletePerson(person.id)}>
            Sil
          </button>
        </div>
      ))}
    </div>
  )
}
```

## 🔍 Debounced Arama

### useDebouncedSearch

Performanslı arama için debounced hook.

```typescript
import { useDebouncedSearch } from '@/hooks/useApi'

function PersonSearch() {
  const { query, setQuery, results, loading, clearSearch } = useDebouncedSearch(
    PersonService.searchPersons,
    300 // 300ms gecikme
  )

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Kişi ara..."
      />
      
      {loading && <div>Aranıyor...</div>}
      
      <div>
        {results.map(person => (
          <div key={person.id}>{person.name}</div>
        ))}
      </div>
      
      <button onClick={clearSearch}>Temizle</button>
    </div>
  )
}
```

## 📱 Pratik Örnekler

### KAFKASDER Bağış Yönetimi Örneği

```typescript
function DonationManagement() {
  // Kalıcı filtreler
  const [filters, setFilters] = usePersistentState('donation-filters', {
    status: 'all',
    dateRange: 'month'
  })

  // Gelişmiş form
  const form = useAdvancedForm({
    amount: '',
    donor_name: '',
    payment_method: 'cash'
  }, {
    amount: (value) => !value ? 'Miktar gerekli' : parseFloat(value) <= 0 ? 'Geçerli miktar girin' : null,
    donor_name: (value) => !value ? 'Bağışçı adı gerekli' : null
  })

  // Modal yönetimi
  const modal = useModal()

  // Performans izleme
  const performance = usePerformanceMonitor('Donation Processing')

  // Klavye kısayolları
  useKeyboardShortcut(['ctrl', 'n'], () => modal.open())
  useKeyboardShortcut(['escape'], () => modal.close())

  const handleSubmit = async (values: typeof form.values) => {
    await performance.measure(async () => {
      await DonationService.createDonation(values)
      modal.close()
      form.reset()
    })
  }

  return (
    <div>
      <div className="filters">
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="all">Tümü</option>
          <option value="pending">Bekleyen</option>
          <option value="completed">Tamamlanan</option>
        </select>
      </div>

      <button onClick={() => modal.open()}>Yeni Bağış</button>

      {modal.isOpen && (
        <div className="modal">
          <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(handleSubmit) }}>
            <input
              value={form.values.amount}
              onChange={(e) => form.setFieldValue('amount', e.target.value)}
              placeholder="Miktar"
            />
            {form.errors.amount && <span>{form.errors.amount}</span>}
            
            <button type="submit" disabled={form.isSubmitting}>
              {form.isSubmitting ? 'İşleniyor...' : 'Kaydet'}
            </button>
          </form>
        </div>
      )}

      {performance.duration > 0 && (
        <p>İşlem süresi: {performance.duration.toFixed(2)}ms</p>
      )}
    </div>
  )
}
```

## 🚀 En İyi Uygulamalar

### 1. Hook Kombinasyonu

Birden fazla hook'u birleştirerek güçlü bileşenler oluşturun:

```typescript
function AdvancedComponent() {
  // Kalıcı durum
  const [settings, setSettings] = usePersistentState('component-settings', defaultSettings)
  
  // Önbellekli veri
  const { data, loading } = useCachedData('component-data', fetchData)
  
  // Modal yönetimi
  const modal = useModal()
  
  // Performans izleme
  const performance = usePerformanceMonitor('Component Operations')
  
  // Klavye kısayolları
  useKeyboardShortcut(['ctrl', 'r'], () => performance.measure(refreshData))
  
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
```

### 2. Error Handling

Tüm async işlemlerde hata yönetimi yapın:

```typescript
const handleOperation = async () => {
  const { error, retry } = useErrorBoundaryWithRetry()
  
  try {
    await performance.measure(async () => {
      await apiCall()
    })
  } catch (err) {
    error.handleError(err as Error)
  }
}
```

### 3. Performance Optimization

Performans kritik işlemlerde ölçüm yapın:

```typescript
const handleHeavyOperation = async () => {
  const performance = usePerformanceMonitor('Heavy Operation')
  
  await performance.measure(async () => {
    // Ağır işlem
    await processLargeData()
  })
  
  if (performance.duration > 1000) {
    console.warn('İşlem 1 saniyeden uzun sürdü')
  }
}
```

## 📚 Örnek Sayfa

Gelişmiş desenleri görmek için `/advanced-patterns` sayfasını ziyaret edin.

Bu sayfa tüm hook'ların pratik örneklerini içerir ve nasıl kullanılacağını gösterir.

## 🔧 Geliştirme İpuçları

1. **Hook'ları Modüler Kullanın**: Her hook'u tek bir sorumluluk için kullanın
2. **TypeScript Kullanın**: Tüm hook'larda tip güvenliği sağlayın
3. **Error Boundary'leri Kullanın**: Uygulama seviyesinde hata yakalama yapın
4. **Performance Monitoring**: Kritik işlemlerde performans ölçümü yapın
5. **Keyboard Shortcuts**: Kullanıcı deneyimini artırmak için kısayollar ekleyin
6. **Optimistic Updates**: Hızlı UI güncellemeleri için optimistik güncellemeler kullanın
7. **Caching**: Veri önbellekleme ile API çağrılarını optimize edin

Bu desenler KAFKASDER uygulamasında daha iyi performans, kullanıcı deneyimi ve kod kalitesi sağlar. 