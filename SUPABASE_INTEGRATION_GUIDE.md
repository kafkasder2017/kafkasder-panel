# KAFKASDER Supabase Entegrasyon Rehberi

## 🚀 Context7 & Supabase Tam Entegrasyon

Bu rehber, KAFKASDER projesi için Context7 dokümantasyonundan yararlanarak geliştirilen kapsamlı Supabase entegrasyonunu açıklar.

## 📋 Entegre Edilen Sayfalar

### ✅ Tamamlanan Entegrasyonlar

1. **Dashboard** (`/dashboard`)
   - Gerçek zamanlı istatistikler
   - API hook'ları ile veri çekme
   - Context7 performans optimizasyonları

2. **Kişiler** (`/kisiler`)
   - CRUD işlemleri
   - Arama ve filtreleme
   - Sayfalama
   - Modal form'lar

3. **Bağışlar** (`/bagislar`)
   - Bağış yönetimi
   - Tür ve durum filtreleme
   - İstatistikler
   - Yeni bağış ekleme

4. **Organizasyonlar** (`/organizasyonlar`)
   - Kurum yönetimi
   - Durum takibi
   - İletişim bilgileri

5. **Üyeler** (`/uyeler`)
   - Üye yönetimi
   - Kategori filtreleme
   - TC kimlik doğrulama

6. **Yardımlar** (`/yardimlar`)
   - Yardım başvuru yönetimi
   - Durum takibi
   - Aciliyet seviyeleri

## 🗄️ Veritabanı Şeması

### Ana Tablolar

```sql
-- Kişiler tablosu
CREATE TABLE persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  identity_number VARCHAR(11),
  birth_date DATE,
  address TEXT,
  country_id UUID REFERENCES countries(id),
  city_id UUID REFERENCES cities(id),
  district_id UUID REFERENCES districts(id),
  neighborhood_id UUID REFERENCES neighborhoods(id),
  category VARCHAR(50) DEFAULT 'member',
  status VARCHAR(50) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bağışlar tablosu
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES persons(id),
  organization_id UUID REFERENCES organizations(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TRY',
  type VARCHAR(50) NOT NULL,
  method VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  description TEXT,
  receipt_number VARCHAR(100),
  donated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizasyonlar tablosu
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  tax_number VARCHAR(20),
  email VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  address TEXT,
  country_id UUID REFERENCES countries(id),
  city_id UUID REFERENCES cities(id),
  district_id UUID REFERENCES districts(id),
  status VARCHAR(50) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 API Client Yapısı

### Context7 API Client

```typescript
// src/lib/services/api-client.ts
export class ApiClient {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  // Generic CRUD operations
  async get<T>(table: string, options?: QueryOptions): Promise<ApiResponse<T[]>> {
    let query = this.supabase.from(table).select('*')
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending
      })
    }
    
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    
    const { data, error } = await query
    
    return {
      success: !error,
      data: data || [],
      error: error?.message || null
    }
  }

  // Pagination support
  async getPaginated<T>(
    table: string, 
    page: number, 
    pageSize: number, 
    options?: QueryOptions
  ): Promise<PaginatedResponse<T>> {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    
    let query = this.supabase
      .from(table)
      .select('*', { count: 'exact' })
      .range(from, to)
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    const { data, error, count } = await query
    
    return {
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        hasNext: page < Math.ceil((count || 0) / pageSize),
        hasPrev: page > 1
      },
      error: error?.message || null
    }
  }
}
```

## 🎣 React Hook'ları

### Context7 Service Hooks

```typescript
// src/hooks/useServices.ts
export function usePersons(options?: PersonQueryOptions) {
  const [data, setData] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getPaginated<Person>('persons', 1, 10, options)
        
        if (response.success) {
          setData(response.data)
          setPagination(response.pagination)
        } else {
          setError(response.error)
        }
      } catch (err) {
        setError('Veri yüklenirken hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [options])

  return { data, loading, error, pagination }
}

export function useDonations(options?: DonationQueryOptions) {
  // Similar implementation for donations
}

export function useOrganizations(options?: OrganizationQueryOptions) {
  // Similar implementation for organizations
}
```

## 🎨 UI Component'leri

### Context7 Optimized Components

```typescript
// Context7 Data Table Component
export function DataTable<T>({ 
  data, 
  columns, 
  loading, 
  error,
  pagination,
  onPageChange 
}: DataTableProps<T>) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              {columns.map(column => (
                <TableCell key={column.key}>
                  {column.render ? column.render(item) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {pagination && (
        <Pagination 
          {...pagination} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  )
}
```

## 🔐 Güvenlik & RLS

### Row Level Security Policies

```sql
-- Kişiler için RLS
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON persons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all data" ON persons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Bağışlar için RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view donations" ON donations
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage donations" ON donations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
```

## 📊 Performans Optimizasyonları

### Context7 Performance Patterns

```typescript
// Memoized data filtering
const filteredData = useMemo(() => {
  return data.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === '' || item.status === selectedFilter
    return matchesSearch && matchesFilter
  })
}, [data, searchQuery, selectedFilter])

// Optimized pagination
const handlePageChange = useCallback((page: number) => {
  setCurrentPage(page)
  fetchData(page)
}, [fetchData])

// Debounced search
const debouncedSearch = useDebouncedCallback((query: string) => {
  setSearchQuery(query)
}, 300)
```

## 🚀 Deployment

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Build & Deploy

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start
```

## 🧪 Testing

### API Testing

```typescript
// __tests__/api-client.test.ts
describe('ApiClient', () => {
  it('should fetch persons successfully', async () => {
    const client = new ApiClient()
    const response = await client.get<Person>('persons')
    
    expect(response.success).toBe(true)
    expect(Array.isArray(response.data)).toBe(true)
  })

  it('should handle pagination correctly', async () => {
    const client = new ApiClient()
    const response = await client.getPaginated<Person>('persons', 1, 10)
    
    expect(response.pagination).toBeDefined()
    expect(response.pagination.page).toBe(1)
    expect(response.pagination.pageSize).toBe(10)
  })
})
```

## 📈 Monitoring & Analytics

### Context7 Performance Monitoring

```typescript
// Performance monitoring hook
export function usePerformanceMonitor(operationName: string) {
  const startTime = useRef(performance.now())
  
  useEffect(() => {
    const duration = performance.now() - startTime.current
    console.log(`${operationName} took ${duration.toFixed(2)}ms`)
    
    // Send to analytics if duration > threshold
    if (duration > 1000) {
      analytics.track('slow_operation', {
        operation: operationName,
        duration
      })
    }
  })
}
```

## 🔄 Real-time Updates

### Supabase Realtime Integration

```typescript
// Real-time subscription hook
export function useRealtimeSubscription<T>(
  table: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE',
  callback: (payload: T) => void
) {
  useEffect(() => {
    const subscription = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', {
        event,
        schema: 'public',
        table
      }, callback)
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [table, event, callback])
}
```

## 📚 Context7 Best Practices

### 1. Error Handling

```typescript
// Comprehensive error handling
const handleApiCall = async () => {
  try {
    setLoading(true)
    const response = await apiCall()
    
    if (!response.success) {
      toast.error(response.error || 'Bir hata oluştu')
      return
    }
    
    setData(response.data)
    toast.success('İşlem başarılı')
  } catch (error) {
    console.error('API Error:', error)
    toast.error('Bağlantı hatası oluştu')
  } finally {
    setLoading(false)
  }
}
```

### 2. Loading States

```typescript
// Optimized loading states
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Yükleniyor...</span>
  </div>
)
```

### 3. Form Validation

```typescript
// Context7 form validation
const validateForm = (values: FormData) => {
  const errors: Record<string, string> = {}
  
  if (!values.first_name) {
    errors.first_name = 'Ad alanı zorunludur'
  }
  
  if (!values.email) {
    errors.email = 'Email alanı zorunludur'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Geçerli bir email adresi girin'
  }
  
  return errors
}
```

## 🎯 Sonuç

Bu entegrasyon rehberi, KAFKASDER projesi için Context7 dokümantasyonundan yararlanarak geliştirilen kapsamlı Supabase entegrasyonunu açıklar. Tüm sayfalar gerçek veritabanına bağlanmış ve Context7 performans optimizasyonları uygulanmıştır.

### ✅ Tamamlanan Özellikler

- [x] Dashboard entegrasyonu
- [x] Kişiler yönetimi
- [x] Bağış yönetimi
- [x] Organizasyon yönetimi
- [x] Üye yönetimi
- [x] Yardım başvuru yönetimi
- [x] Context7 performans optimizasyonları
- [x] Real-time updates
- [x] Error handling
- [x] Loading states
- [x] Form validation
- [x] Pagination
- [x] Search & filtering

### 🚀 Gelecek Geliştirmeler

- [ ] Grafik ve chart entegrasyonu
- [ ] Advanced reporting
- [ ] Email notifications
- [ ] File upload functionality
- [ ] Advanced search filters
- [ ] Bulk operations
- [ ] Export functionality
- [ ] Mobile optimization

Bu entegrasyon, modern React uygulamaları için industry standard yaklaşımları kullanır ve Context7 dokümantasyonundan alınan best practice'leri uygular. 