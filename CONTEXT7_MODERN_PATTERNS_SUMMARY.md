# Context7 Modern Patterns - En Güncel Dokümantasyon

## 📋 Genel Bakış

Bu dokümantasyon, Context7'nin en güncel patternlerini kullanarak KAFKASDER Admin projesinde uygulanan modern geliştirme yaklaşımlarını detaylandırır.

## 🚀 Next.js 14 Modern Patterns

### Partial Prerendering (PPR)
```typescript
// Experimental PPR feature
export const experimental_ppr = true

// Streaming with Suspense for PPR
export function StreamingComponent() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DynamicContent />
    </Suspense>
  )
}
```

### Edge Runtime
```typescript
// Middleware ve API routes için optimize edilmiş runtime
export const runtime = 'edge' // 'nodejs' | 'edge'
```

### Modern Data Fetching
```typescript
// Server-side data fetching with caching
export const getItem = cache(async (id: string) => {
  const response = await fetch(`/api/items/${id}`, {
    cache: 'force-cache', // Static data
    // cache: 'no-store', // Dynamic data
    // next: { revalidate: 10 }, // Revalidated data
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch item')
  }
  
  return response.json()
})
```

## 🔧 Zod v3 Modern Validation Patterns

### Modern Email Validation
```typescript
export const emailSchema = z.string().email({
  message: 'Geçerli bir e-posta adresi giriniz'
})
```

### Modern Phone Validation with Transform
```typescript
export const phoneSchema = z.string()
  .transform((val, ctx) => {
    const cleaned = val.replace(/\D/g, '')
    
    if (cleaned.length !== 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Telefon numarası 10 haneli olmalıdır',
      })
      return z.NEVER
    }
    
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  })
```

### Modern Conditional Validation
```typescript
export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  acceptTerms: z.boolean(),
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  }
)
.refine(
  (data) => data.acceptTerms,
  {
    message: 'Kullanım şartlarını kabul etmelisiniz',
    path: ['acceptTerms'],
  }
)
```

### Modern Async Validation
```typescript
export const uniqueEmailSchema = z.string().email().refine(
  async (email) => {
    const existingUser = await db.users.findUnique({ where: { email } })
    return !existingUser
  },
  { message: 'Bu e-posta adresi zaten kullanılıyor' }
)
```

## ⚛️ Modern React Patterns

### Modern Component Composition
```typescript
export function ModernLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ErrorBoundary>
              <Suspense fallback={<GlobalLoading />}>
                {children}
              </Suspense>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Modern Form Handling with Server Actions
```typescript
export function ModernForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await action(formData)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(error.format())
        }
      }
    })
  }
  
  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Gönderiliyor...' : 'Gönder'}
      </button>
    </form>
  )
}
```

### Modern Error Boundary
```typescript
export class ModernErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Bir hata oluştu</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Tekrar Dene
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

## 📊 Modern Performance Patterns

### Web Vitals Monitoring
```typescript
export function usePerformanceMonitoring() {
  useEffect(() => {
    const reportWebVitals = (metric: any) => {
      console.log('Web Vital:', metric)
    }
    
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals)
        getFID(reportWebVitals)
        getFCP(reportWebVitals)
        getLCP(reportWebVitals)
        getTTFB(reportWebVitals)
      })
    }
  }, [])
}
```

### Modern Caching Strategy
```typescript
export const getCachedData = cache(async (key: string) => {
  const data = await fetch(`/api/data/${key}`)
  return data.json()
})
```

### Modern Optimistic Updates
```typescript
export function useOptimisticUpdate<T>(
  currentData: T,
  updateFn: (data: T) => T
) {
  const [optimisticData, setOptimisticData] = useState(currentData)
  
  const updateOptimistically = useCallback((updater: (data: T) => T) => {
    setOptimisticData(updater)
  }, [])
  
  useEffect(() => {
    setOptimisticData(currentData)
  }, [currentData])
  
  return [optimisticData, updateOptimistically] as const
}
```

## 🔒 Modern Security Patterns

### Server-side Authentication
```typescript
export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    redirect('/auth/login')
  }
  
  return session
}
```

### CSRF Protection
```typescript
export function generateCSRFToken() {
  return crypto.randomUUID()
}

export function validateCSRFToken(token: string, storedToken: string) {
  return token === storedToken
}
```

### Input Sanitization
```typescript
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
}
```

## 🧪 Modern Testing Patterns

### Modern Test Utilities
```typescript
export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

### Modern Mock Data
```typescript
export const mockUser = userSchema.parse({
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  name: 'Test User',
  age: 25,
  role: 'user',
  createdAt: new Date().toISOString(),
})
```

## ⚙️ Modern Configuration Patterns

### Environment Validation
```typescript
export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
})

export const env = envSchema.parse(process.env)
```

### Feature Flags
```typescript
export const features = {
  newDashboard: process.env.NODE_ENV === 'development' || process.env.ENABLE_NEW_DASHBOARD === 'true',
  advancedAnalytics: process.env.ENABLE_ADVANCED_ANALYTICS === 'true',
  experimentalFeatures: process.env.ENABLE_EXPERIMENTAL === 'true',
} as const
```

## 🛠️ Modern Utility Functions

### Debouncing
```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}
```

### Throttling
```typescript
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now())
  
  return useCallback((...args: Parameters<T>) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args)
      lastRun.current = Date.now()
    }
  }, [callback, delay]) as T
}
```

### Local Storage Hook
```typescript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }
  
  return [storedValue, setValue] as const
}
```

## 📁 Dosya Yapısı

```
src/
├── lib/
│   ├── context7-modern-patterns.ts    # Ana modern patterns
│   ├── validations.ts                 # Zod validation schemas
│   └── api/
│       └── modern-api-client.ts       # Modern API client
├── components/
│   ├── dashboard/
│   │   └── ModernDashboard.tsx        # Modern dashboard component
│   └── context7/
│       └── ModernComponents.tsx       # Modern UI components
├── hooks/
│   └── usePerformanceMonitoring.ts    # Performance monitoring
└── test/
    └── modern-test-patterns.test.ts   # Modern test patterns
```

## 🎯 Kullanım Örnekleri

### Dashboard Component
```typescript
// Modern dashboard with Suspense and error handling
export default function ModernDashboard() {
  const stats = useModernData('stats', async () => {
    const response = await fetch('/api/stats')
    return response.json()
  })

  return (
    <div className="space-y-6">
      <Suspense fallback={<ModernLoadingSkeleton />}>
        <ModernStatsCards stats={stats} />
      </Suspense>
      
      <Suspense fallback={<div>Loading chart...</div>}>
        <ModernChart />
      </Suspense>
    </div>
  )
}
```

### Form Validation
```typescript
// Modern form with validation
export function ModernForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  
  const handleSubmit = async (formData: FormData) => {
    const result = await validateData(userSchema, {
      email: formData.get('email'),
      password: formData.get('password'),
    })
    
    if (!result.success) {
      setErrors(result.fieldErrors)
      return
    }
    
    // Submit form
  }
  
  return (
    <form action={handleSubmit}>
      <input name="email" type="email" />
      {errors.email && <span>{errors.email[0]}</span>}
      <button type="submit">Gönder</button>
    </form>
  )
}
```

## 🚀 Performans Optimizasyonları

1. **Partial Prerendering (PPR)**: Statik ve dinamik içeriği birleştirir
2. **Edge Runtime**: Middleware ve API routes için optimize edilmiş runtime
3. **React Cache**: Server-side data fetching için caching
4. **Suspense**: Streaming ve loading states
5. **Web Vitals**: Performance monitoring
6. **Optimistic Updates**: UI responsiveness
7. **Debouncing/Throttling**: Performance optimization

## 🔒 Güvenlik Önlemleri

1. **Server-side Authentication**: Session validation
2. **CSRF Protection**: Token-based protection
3. **Input Sanitization**: XSS prevention
4. **Environment Validation**: Runtime checks
5. **Type Safety**: Zod validation

## 🧪 Test Stratejisi

1. **Unit Tests**: Component testing
2. **Integration Tests**: API testing
3. **E2E Tests**: User flow testing
4. **Performance Tests**: Web Vitals testing
5. **Accessibility Tests**: ARIA compliance
6. **Security Tests**: Vulnerability testing

## 📈 Monitoring ve Analytics

1. **Web Vitals**: Core Web Vitals tracking
2. **Error Tracking**: Rollbar integration
3. **Performance Monitoring**: Custom metrics
4. **User Analytics**: Navigation tracking

## 🔄 Gelecek Planları

1. **Zod v4 Migration**: Latest validation features
2. **Advanced PPR**: More granular control
3. **Edge Functions**: Serverless functions
4. **Real-time Features**: WebSocket integration
5. **Advanced Analytics**: Custom dashboards

## 📚 Kaynaklar

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev/)
- [React Documentation](https://react.dev/)
- [Context7 Patterns](https://context7.com/)

---

Bu dokümantasyon, KAFKASDER Admin projesinde uygulanan modern geliştirme patternlerini kapsar ve sürekli güncellenmektedir. 