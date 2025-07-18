# Context7 React Pattern'leri Rehberi

## 🚀 Context7'den Alınan Gelişmiş React Optimizasyonları

Bu rehber, Context7 dokümantasyonundan alınan React performans optimizasyon pattern'lerini ve best practice'leri açıklar.

## 📚 Context7 React Dokümantasyonu Kaynakları

- **useMemo & useCallback**: Karmaşık hesaplamaları ve function reference'larını optimize eder
- **useLayoutEffect vs useEffect**: DOM manipülasyonları için doğru hook seçimi
- **useTransition & useDeferredValue**: Non-blocking UI güncellemeleri
- **React.memo**: Component re-render optimizasyonu
- **Custom Hook Patterns**: Yeniden kullanılabilir logic extraction

## 🎯 Temel Performans Optimizasyonları

### 1. useMemo - Hesaplama Optimizasyonu

```typescript
// Context7'den esinlenen pattern
const visibleTodos = useMemo(() => {
  console.time('filter array');
  const result = filterTodos(todos, tab);
  console.timeEnd('filter array');
  return result;
}, [todos, tab]);
```

**Kullanım Alanları:**
- Karmaşık hesaplamalar
- Büyük array filtreleme
- Object oluşturma
- Expensive computations

### 2. useCallback - Function Reference Stabilizasyonu

```typescript
// Context7'den esinlenen pattern
const handleSubmit = useCallback((orderDetails) => {
  post('/product/' + productId + '/buy', {
    referrer,
    orderDetails,
  });
}, [productId, referrer]);
```

**Kullanım Alanları:**
- Child component'lere function prop geçirme
- useEffect dependency'leri
- Event handler'lar

### 3. React.memo - Component Memoization

```typescript
// Context7'den esinlenen pattern
const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // Component logic
});

const List = memo(function List({ items }) {
  // List rendering
});
```

**Kullanım Alanları:**
- Expensive render'ları olan component'ler
- Sık güncellenen parent'lara sahip component'ler
- Pure component'ler

## 🔧 Gelişmiş Hook Pattern'leri

### 1. useMemoizedValue - Gelişmiş Memoization

```typescript
// Context7'den esinlenen custom hook
export function useMemoizedValue<T>(
  calculateValue: () => T,
  dependencies: any[],
  options?: {
    debug?: boolean;
    name?: string;
  }
): T {
  const { debug = false, name = 'useMemoizedValue' } = options || {};
  
  const memoizedValue = useMemo(() => {
    if (debug) {
      console.time(`${name} calculation`);
    }
    
    const result = calculateValue();
    
    if (debug) {
      console.timeEnd(`${name} calculation`);
    }
    
    return result;
  }, dependencies);

  return memoizedValue;
}
```

### 2. useStableCallback - Stabil Function Reference

```typescript
// Context7'den esinlenen pattern
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[] = []
): T {
  return useCallback(callback, dependencies);
}
```

### 3. useLazyRef - Lazy Initialization

```typescript
// Context7'den esinlenen pattern
export function useLazyRef<T>(initializer: () => T): React.MutableRefObject<T> {
  const ref = useRef<T | null>(null);
  
  if (ref.current === null) {
    ref.current = initializer();
  }
  
  return ref as React.MutableRefObject<T>;
}
```

## ⚡ Concurrent Features

### 1. useTransition - Non-blocking Updates

```typescript
// Context7'den esinlenen pattern
function TodoList() {
  const [isPending, startTransition] = useTransition();
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    startTransition(() => {
      setTodos(prev => [...prev, { id: Date.now(), text }]);
    });
  };

  return (
    <div>
      {isPending && <Spinner />}
      <TodoList items={todos} />
    </div>
  );
}
```

### 2. useDeferredValue - Deferred Updates

```typescript
// Context7'den esinlenen pattern
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SlowList query={deferredQuery} />
    </div>
  );
}
```

## 🎨 Optimized Component Patterns

### 1. Memoized List Items

```typescript
// Context7'den esinlenen pattern
const MemoizedListItem = memo(function MemoizedListItem({ 
  item, 
  onUpdate, 
  onDelete 
}) {
  const renderCount = useRenderCounter(`ListItem-${item.id}`);
  
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg mb-2">
      <div>
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-600">Değer: {item.value}</p>
        <Badge variant="secondary">Render: {renderCount}</Badge>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onUpdate(item.id, item.value + 1)}>
          Artır
        </Button>
        <Button variant="destructive" onClick={() => onDelete(item.id)}>
          Sil
        </Button>
      </div>
    </div>
  );
});
```

### 2. Optimized List with Pagination

```typescript
// Context7'den esinlenen pattern
const OptimizedList = memo(function OptimizedList({ items }) {
  const {
    items: paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext,
    hasPrev
  } = useOptimizedList(items, {
    pageSize: 5,
    sort: (a, b) => a.name.localeCompare(b.name)
  });

  return (
    <div>
      <div className="space-y-2">
        {paginatedItems.map(item => (
          <div key={item.id} className="p-2 border rounded">
            {item.name} - {item.value}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={prevPage} disabled={!hasPrev}>
          Önceki
        </Button>
        <span>Sayfa {currentPage + 1} / {totalPages}</span>
        <Button onClick={nextPage} disabled={!hasNext}>
          Sonraki
        </Button>
      </div>
    </div>
  );
});
```

## 📊 Performance Monitoring

### 1. usePerformanceMonitor - Render Tracking

```typescript
// Context7'den esinlenen pattern
export function usePerformanceMonitor(
  operationName: string,
  options?: {
    enabled?: boolean;
    threshold?: number;
  }
) {
  const { enabled = true, threshold = 16 } = options || {};
  const startTime = useRef<number>(0);
  const renderCount = useRef<number>(0);
  
  useEffect(() => {
    if (!enabled) return;
    
    renderCount.current += 1;
    const duration = performance.now() - startTime.current;
    
    if (duration > threshold) {
      console.warn(
        `${operationName} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`
      );
    }
    
    if (renderCount.current % 100 === 0) {
      console.log(`${operationName} rendered ${renderCount.current} times`);
    }
  });
  
  return {
    renderCount: renderCount.current,
    reset: () => {
      renderCount.current = 0;
    }
  };
}
```

### 2. useRenderCounter - Component Render Tracking

```typescript
// Context7'den esinlenen pattern
export function useRenderCounter(componentName: string) {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(`${componentName} rendered ${renderCount.current} times`);
  });
  
  return renderCount.current;
}
```

## 🎯 Form Optimization

### 1. useOptimizedForm - Form State Management

```typescript
// Context7'den esinlenen pattern
export function useOptimizedForm<T extends Record<string, any>>(
  initialValues: T,
  options?: {
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit?: (values: T) => void | Promise<void>;
    debug?: boolean;
  }
) {
  const { validate, onSubmit, debug = false } = options || {};
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (validate && touched[field]) {
      const fieldErrors = validate({ ...values, [field]: value });
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }, [values, validate, touched]);
  
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        if (debug) {
          console.log('Form submitted successfully:', values);
        }
      } catch (error) {
        if (debug) {
          console.error('Form submission failed:', error);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit, debug]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}
```

## 🔄 State Management Patterns

### 1. useOptimizedState - Smart State Updates

```typescript
// Context7'den esinlenen pattern
export function useOptimizedState<T>(
  initialState: T | (() => T),
  options?: {
    equalityFn?: (prev: T, next: T) => boolean;
    debug?: boolean;
  }
) {
  const { equalityFn = Object.is, debug = false } = options || {};
  const [state, setState] = useState(initialState);
  
  const optimizedSetState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prevState => {
      const nextState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(prevState)
        : newState;
      
      if (equalityFn(prevState, nextState)) {
        if (debug) {
          console.log('State update skipped - values are equal');
        }
        return prevState;
      }
      
      if (debug) {
        console.log('State updated:', { prev: prevState, next: nextState });
      }
      
      return nextState;
    });
  }, [equalityFn, debug]);
  
  return [state, optimizedSetState] as const;
}
```

### 2. useBatchUpdates - Batch State Updates

```typescript
// Context7'den esinlenen pattern
export function useBatchUpdates() {
  const [isPending, startTransition] = useTransition();
  
  const batchUpdate = useCallback((updates: (() => void)[]) => {
    startTransition(() => {
      updates.forEach(update => update());
    });
  }, [startTransition]);
  
  return { batchUpdate, isPending };
}
```

## 🎨 Context Optimization

### 1. Optimized Context Usage

```typescript
// Context7'den esinlenen pattern
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);

  return (
    <AuthContext value={contextValue}>
      <Page />
    </AuthContext>
  );
}
```

### 2. useOptimizedContext - Context Performance

```typescript
// Context7'den esinlenen pattern
export function useOptimizedContext<T>(
  context: React.Context<T>,
  options?: {
    debug?: boolean;
    name?: string;
  }
): T {
  const { debug = false, name = 'useOptimizedContext' } = options || {};
  const contextValue = React.useContext(context);
  
  useEffect(() => {
    if (debug) {
      console.log(`${name} context value changed:`, contextValue);
    }
  }, [contextValue, debug, name]);
  
  return contextValue;
}
```

## 🚀 Best Practices

### 1. Dependency Array Management

```typescript
// ✅ Doğru: Primitive değerler
const visibleTodos = useMemo(() => {
  return filterTodos(todos, tab);
}, [todos, tab]);

// ✅ Doğru: Object'i memo içinde oluştur
const visibleItems = useMemo(() => {
  const searchOptions = { matchMode: 'whole-word', text };
  return searchItems(allItems, searchOptions);
}, [allItems, text]);

// ❌ Yanlış: Object dependency
const searchOptions = { matchMode: 'whole-word', text };
const visibleItems = useMemo(() => {
  return searchItems(allItems, searchOptions);
}, [allItems, searchOptions]); // searchOptions her render'da yeni object
```

### 2. Callback Optimization

```typescript
// ✅ Doğru: Updater function kullan
const handleAddTodo = useCallback((text) => {
  const newTodo = { id: nextId++, text };
  setTodos(todos => [...todos, newTodo]);
}, []); // todos dependency'si gerekmez

// ✅ Doğru: Stable callback
const handleSubmit = useCallback((orderDetails) => {
  post('/product/' + productId + '/buy', {
    referrer,
    orderDetails,
  });
}, [productId, referrer]);
```

### 3. Effect Optimization

```typescript
// ✅ Doğru: Race condition prevention
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

## 📈 Performance Metrics

### 1. Render Performance

```typescript
// Context7'den esinlenen performance tracking
const renderMetrics = {
  totalRenders: 0,
  averageRenderTime: 0,
  slowRenders: 0,
  
  trackRender(startTime: number) {
    const duration = performance.now() - startTime;
    this.totalRenders++;
    this.averageRenderTime = (this.averageRenderTime + duration) / 2;
    
    if (duration > 16) { // 60fps threshold
      this.slowRenders++;
      console.warn(`Slow render detected: ${duration.toFixed(2)}ms`);
    }
  }
};
```

### 2. Memory Usage

```typescript
// Context7'den esinlenen memory tracking
const memoryMetrics = {
  trackMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
      });
    }
  }
};
```

## 🎯 KAFKASDER Uygulamasında Kullanım

### 1. Bağış Listesi Optimizasyonu

```typescript
// Context7 pattern'leri ile optimize edilmiş bağış listesi
function DonationList({ donations, filters }) {
  const visibleDonations = useMemoizedValue(() => {
    return filterDonations(donations, filters);
  }, [donations, filters], { name: 'Donation Filtering' });

  const handleUpdateDonation = useStableCallback((id, updates) => {
    updateDonation(id, updates);
  }, []);

  return (
    <div>
      {visibleDonations.map(donation => (
        <MemoizedDonationItem
          key={donation.id}
          donation={donation}
          onUpdate={handleUpdateDonation}
        />
      ))}
    </div>
  );
}
```

### 2. Form Optimizasyonu

```typescript
// Context7 pattern'leri ile optimize edilmiş form
function DonationForm() {
  const form = useOptimizedForm({
    amount: '',
    donor_name: '',
    payment_method: 'cash',
    notes: ''
  }, {
    validate: validateDonationForm,
    onSubmit: handleDonationSubmit,
    debug: true
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        value={form.values.amount}
        onChange={(e) => form.setValue('amount', e.target.value)}
        onBlur={() => form.setFieldTouched('amount')}
      />
      {form.errors.amount && (
        <p className="text-red-500">{form.errors.amount}</p>
      )}
      <Button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Gönderiliyor...' : 'Bağış Yap'}
      </Button>
    </form>
  );
}
```

## 📚 Sonuç

Context7 React dokümantasyonundan alınan bu pattern'ler, KAFKASDER uygulamasında:

✅ **Performans Optimizasyonu**: Gereksiz re-render'ları önler
✅ **Kullanıcı Deneyimi**: Daha hızlı ve responsive UI
✅ **Kod Kalitesi**: Daha temiz ve maintainable kod
✅ **Ölçeklenebilirlik**: Büyük veri setleri ile çalışabilir
✅ **Debugging**: Performans sorunlarını kolayca tespit eder

Bu pattern'ler, modern React uygulamalarında performans optimizasyonu için industry standard yaklaşımlardır ve Context7 dokümantasyonundan alınmıştır. 