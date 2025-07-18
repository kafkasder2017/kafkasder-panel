# KAFKASDER API Entegrasyonu Özeti

## 🚀 Context7 React & Supabase Entegrasyonu

Bu dokümantasyon, KAFKASDER projesi için Context7'den alınan React ve Supabase dokümantasyonu kullanılarak geliştirilen kapsamlı API entegrasyon sistemini açıklar.

## 📁 Proje Yapısı

```
src/
├── lib/
│   ├── services/
│   │   ├── api-client.ts          # Temel API client sınıfı
│   │   ├── person-service.ts      # Kişiler & Kurumlar servisi
│   │   ├── donation-service.ts    # Bağış yönetimi servisi
│   │   ├── aid-service.ts         # Yardım yönetimi servisi
│   │   ├── member-service.ts      # Üye yönetimi servisi
│   │   └── messaging-service.ts   # Mesajlaşma servisi
│   └── supabase/
│       ├── client.ts              # Browser client
│       └── server.ts              # Server client
├── hooks/
│   ├── useApi.ts                  # Genel API hook'ları
│   └── useServices.ts             # Modül bazlı hook'lar
└── app/
    └── kisiler/
        └── page.tsx               # API entegrasyonu örneği
```

## 🔧 Temel API Client (api-client.ts)

### Özellikler:
- **Generic CRUD Operations**: Tüm tablolar için genel CRUD işlemleri
- **Pagination Support**: Sayfalama desteği
- **Filtering & Search**: Gelişmiş filtreleme ve arama
- **File Upload**: Dosya yükleme desteği
- **Error Handling**: Kapsamlı hata yönetimi
- **Type Safety**: TypeScript tip güvenliği

### Kullanım Örneği:
```typescript
// Temel CRUD işlemleri
const response = await apiClient.get<Person>('persons', {
  filters: { category: 'donor' },
  orderBy: { column: 'created_at', ascending: false },
  limit: 10
})

// Sayfalama
const paginatedResponse = await apiClient.getPaginated<Person>('persons', 1, 10, {
  filters: { status: 'active' }
})

// Dosya yükleme
const uploadResponse = await apiClient.uploadFile('avatars', 'user-1.jpg', file)
```

## 🎣 React Hook'ları (useApi.ts)

### Context7 React Dokümantasyonundan Esinlenen Hook'lar:

#### 1. useApi - Genel CRUD Hook'u
```typescript
const { data, loading, error, create, update, remove } = useApi<Person>('persons', {
  filters: { category: 'donor' },
  autoFetch: true
})
```

#### 2. usePaginatedApi - Sayfalama Hook'u
```typescript
const { data, pagination, loading, goToPage, nextPage, prevPage } = usePaginatedApi<Person>('persons', 1, 10)
```

#### 3. useApiItem - Tekil Kayıt Hook'u
```typescript
const { data, loading, error, update } = useApiItem<Person>('persons', personId)
```

#### 4. useSearch - Arama Hook'u (Debounced)
```typescript
const { query, setQuery, results, loading } = useSearch<Person>(PersonService.searchPersons, 300)
```

#### 5. useRealtimeSubscription - Gerçek Zamanlı Hook
```typescript
const { data } = useRealtimeSubscription<Person>('persons', 'INSERT', (payload) => {
  console.log('Yeni kişi eklendi:', payload)
})
```

#### 6. useOptimisticUpdate - Optimistik Güncelleme
```typescript
const { optimisticUpdate } = useOptimisticUpdate(persons, setPersons)
```

## 🏗️ Modül Bazlı Servisler

### 1. PersonService (Kişiler & Kurumlar)
```typescript
// Kişi işlemleri
const persons = await PersonService.getPersons({
  category: 'donor',
  status: 'active',
  search: 'ahmet'
})

// İstatistikler
const stats = await PersonService.getPersonStats()

// Toplu işlemler
const result = await PersonService.bulkUpdate(ids, updates)
```

### 2. DonationService (Bağış Yönetimi)
```typescript
// Bağış işlemleri
const donations = await DonationService.getDonations({
  donation_type: 'cash',
  payment_status: 'completed'
})

// Ödeme işleme
const payment = await DonationService.processPayment(donationId, {
  transaction_id: 'txn_123',
  payment_status: 'completed'
})
```

### 3. AidService (Yardım Yönetimi)
```typescript
// Başvuru işlemleri
const applications = await AidService.getApplications({
  status: 'pending',
  urgency_level: 'high'
})

// Başvuru inceleme
const review = await AidService.reviewApplication(appId, {
  status: 'approved',
  reviewer_id: 'user_123'
})
```

### 4. MemberService (Üye Yönetimi)
```typescript
// Üye işlemleri
const members = await MemberService.getMembers({
  membership_status: 'active',
  committee_member: true
})

// Üyelik yenileme
const renewal = await MemberService.renewMembership(memberId, {
  expiry_date: '2024-12-31',
  membership_fee: 100
})
```

### 5. MessageService (Mesajlaşma)
```typescript
// Mesaj işlemleri
const messages = await MessageService.getMessages({
  type: 'email',
  status: 'sent'
})

// Mesaj gönderme
const send = await MessageService.sendMessage(messageId)
```

## 🎯 Modül Bazlı Hook'lar (useServices.ts)

### Context7 React Patterns Kullanılarak:

```typescript
// Kişiler için özel hook'lar
const { data: persons, loading, error } = usePersons({
  category: 'donor',
  page: 1,
  limit: 10
})

const { stats, loading: statsLoading } = usePersonStats()

const { createPerson, updatePerson, deletePerson } = usePersonOperations()

// Bağışlar için özel hook'lar
const { data: donations, pagination } = useDonations({
  donation_type: 'cash',
  payment_status: 'completed'
})

const { stats: donationStats } = useDonationStats({
  date_from: '2024-01-01',
  date_to: '2024-12-31'
})
```

## 📊 Gerçek Zamanlı Veri (Supabase Realtime)

### Context7 Supabase Dokümantasyonundan:

```typescript
// Gerçek zamanlı abonelik
const { data } = useRealtimeSubscription<Donation>('donations', 'INSERT', (payload) => {
  // Yeni bağış geldiğinde UI'ı güncelle
  toast.success('Yeni bağış alındı!')
})

// Gerçek zamanlı mesaj durumu
const { data: messageStatus } = useRealtimeSubscription<Message>('messages', 'UPDATE', (payload) => {
  // Mesaj durumu değiştiğinde güncelle
  if (payload.new.status === 'sent') {
    toast.success('Mesaj gönderildi!')
  }
})
```

## 🔐 Kimlik Doğrulama & Yetkilendirme

### Context7 React Auth Patterns:

```typescript
// Kullanıcı durumu
const { user, loading } = useAuth()

// Yetki kontrolü
const hasPermission = (permission: string) => {
  return user?.app_metadata?.permissions?.includes(permission) || false
}

// Rol bazlı erişim
const isAdmin = user?.app_metadata?.role === 'admin'
```

## 📱 Optimistik UI Güncellemeleri

### Context7 React Optimistic Patterns:

```typescript
// Optimistik güncelleme
const { optimisticUpdate } = useOptimisticUpdate(persons, setPersons)

const handleUpdatePerson = async (id: string, updates: PersonUpdate) => {
  const rollback = optimisticUpdate(id, updates)
  
  try {
    await updatePerson(id, updates)
  } catch (error) {
    rollback() // Hata durumunda geri al
  }
}
```

## 🎨 Form Entegrasyonu

### Context7 React Form Patterns:

```typescript
// Form state yönetimi
const [formData, setFormData] = useState<PersonCreate>({
  first_name: '',
  last_name: '',
  email: '',
  // ...
})

// Form gönderimi
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const response = await createPerson(formData)
  if (response.success) {
    toast.success('Kişi başarıyla eklendi!')
    // Form temizleme ve yönlendirme
  }
}
```

## 📈 İstatistik & Raporlama

### Gerçek Zamanlı İstatistikler:

```typescript
// Dashboard istatistikleri
const { stats: personStats } = usePersonStats()
const { stats: donationStats } = useDonationStats()
const { stats: memberStats } = useMemberStats()

// Grafik verileri
const chartData = {
  labels: ['Ocak', 'Şubat', 'Mart'],
  datasets: [{
    label: 'Bağışlar',
    data: donationStats?.by_month || []
  }]
}
```

## 🔄 Veri Senkronizasyonu

### Context7 React Sync Patterns:

```typescript
// Otomatik veri yenileme
useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 30000) // 30 saniyede bir yenile

  return () => clearInterval(interval)
}, [fetchData])

// Manuel yenileme
const handleRefresh = () => {
  fetchData()
}
```

## 🛡️ Hata Yönetimi

### Kapsamlı Hata Yakalama:

```typescript
// API hata yönetimi
const { data, error, loading } = usePersons()

if (error) {
  return (
    <div className="error-container">
      <p>Hata: {error}</p>
      <Button onClick={fetchData}>Tekrar Dene</Button>
    </div>
  )
}

// Network hata yönetimi
const handleApiCall = async () => {
  try {
    const response = await apiCall()
    if (!response.success) {
      toast.error(response.error)
    }
  } catch (error) {
    toast.error('Bağlantı hatası oluştu')
  }
}
```

## 🚀 Performans Optimizasyonları

### Context7 React Performance Patterns:

```typescript
// Memoization
const memoizedData = useMemo(() => {
  return data?.filter(item => item.status === 'active')
}, [data])

// Callback optimization
const handleUpdate = useCallback(async (id: string, updates: any) => {
  await updateItem(id, updates)
}, [updateItem])

// Lazy loading
const LazyComponent = lazy(() => import('./HeavyComponent'))
```

## 📱 Responsive Design

### Mobile-First API Entegrasyonu:

```typescript
// Responsive tablo
const isMobile = useMediaQuery('(max-width: 768px)')

const renderData = () => {
  if (isMobile) {
    return data?.map(item => (
      <Card key={item.id} className="mb-4">
        <CardContent>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
          <div className="flex space-x-2 mt-2">
            <Button size="sm">Düzenle</Button>
            <Button size="sm" variant="destructive">Sil</Button>
          </div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <Table>
      {/* Desktop tablo */}
    </Table>
  )
}
```

## 🔧 Geliştirme Araçları

### Debug & Monitoring:

```typescript
// API çağrı logları
const debugApiCall = async (endpoint: string, params: any) => {
  console.log(`API Call: ${endpoint}`, params)
  const start = performance.now()
  
  const result = await apiCall(endpoint, params)
  
  console.log(`API Response: ${endpoint}`, {
    duration: performance.now() - start,
    success: result.success,
    data: result.data
  })
  
  return result
}

// Performance monitoring
const usePerformanceMonitor = (operation: string) => {
  const startTime = useRef(performance.now())
  
  useEffect(() => {
    const duration = performance.now() - startTime.current
    console.log(`${operation} took ${duration}ms`)
  })
}
```

## 📋 Sonuç

Bu API entegrasyonu sistemi, Context7'den alınan React ve Supabase dokümantasyonu kullanılarak geliştirilmiştir ve şu özellikleri sağlar:

✅ **Type Safety**: Tam TypeScript desteği
✅ **Real-time Updates**: Gerçek zamanlı veri güncellemeleri
✅ **Optimistic UI**: Hızlı kullanıcı deneyimi
✅ **Error Handling**: Kapsamlı hata yönetimi
✅ **Performance**: Optimize edilmiş performans
✅ **Scalability**: Ölçeklenebilir mimari
✅ **Maintainability**: Kolay bakım ve geliştirme
✅ **Security**: Güvenli API entegrasyonu

Bu sistem, KAFKASDER projesinin tüm modüllerinde tutarlı ve güvenilir API entegrasyonu sağlar. 