"use client"

import { useState, useEffect, useCallback, useMemo, useRef, useTransition } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import { usePathname, useSearchParams } from 'next/navigation'

// Extend Window interface for global services
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    Rollbar?: {
      error: (error: Error, errorInfo?: any) => void
      warning: (message: string, data?: any) => void
    }
  }
}

// Context7 Pattern: Performance monitoring and optimization hooks
export function usePerformanceOptimizations() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const performanceData = useRef<{
    pageLoads: number
    navigationTime: number
    errors: Array<{ type: string; message: string; timestamp: number }>
  }>({
    pageLoads: 0,
    navigationTime: 0,
    errors: []
  })

  // Context7 Pattern: Web Vitals reporting
  useReportWebVitals((metric) => {
    // Send to analytics service (e.g., Rollbar, Google Analytics)
    console.log('Web Vitals:', metric)
    
    // You can send this to your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }
  })

  // Context7 Pattern: Navigation performance tracking
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const navigationTime = endTime - startTime
      
      performanceData.current.navigationTime = navigationTime
      performanceData.current.pageLoads += 1
      
      // Log navigation performance
      console.log(`Navigation to ${pathname} took ${navigationTime.toFixed(2)}ms`)
    }
  }, [pathname, searchParams])

  // Context7 Pattern: Error boundary integration
  const logError = useCallback((error: Error, errorInfo?: any) => {
    const errorData = {
      type: error.name,
      message: error.message,
      timestamp: Date.now(),
      stack: error.stack,
      errorInfo
    }
    
    performanceData.current.errors.push(errorData)
    
    // Send to error tracking service
    console.error('Performance Error:', errorData)
    
    // You can integrate with Rollbar here
    if (typeof window !== 'undefined' && window.Rollbar) {
      window.Rollbar.error(error, errorInfo)
    }
  }, [])

  // Context7 Pattern: Memory usage monitoring
  const getMemoryUsage = useCallback(() => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      }
    }
    return null
  }, [])

  // Context7 Pattern: Performance metrics
  const getPerformanceMetrics = useCallback(() => {
    return {
      ...performanceData.current,
      memory: getMemoryUsage(),
      timestamp: Date.now()
    }
  }, [getMemoryUsage])

  return {
    logError,
    getMemoryUsage,
    getPerformanceMetrics,
    performanceData: performanceData.current
  }
}

// Context7 Pattern: Preload pattern for data fetching
export function usePreloadPattern<T>(
  preloadFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const dataRef = useRef<T | null>(null)
  const loadingRef = useRef(false)
  const errorRef = useRef<Error | null>(null)

  const preload = useCallback(async () => {
    if (loadingRef.current || dataRef.current) return dataRef.current
    
    loadingRef.current = true
    errorRef.current = null
    
    try {
      const result = await preloadFn()
      dataRef.current = result
      return result
    } catch (error) {
      errorRef.current = error as Error
      throw error
    } finally {
      loadingRef.current = false
    }
  }, [preloadFn])

  const getData = useCallback(() => dataRef.current, [])
  const isLoading = useCallback(() => loadingRef.current, [])
  const getError = useCallback(() => errorRef.current, [])

  return {
    preload,
    getData,
    isLoading,
    getError
  }
}

// Context7 Pattern: Debounced search hook
export function useDebouncedSearch<T>(
  searchFn: (query: string) => Promise<T[]>,
  delay: number = 300
) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const searchResults = await searchFn(searchQuery)
        setResults(searchResults)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, delay),
    [searchFn, delay]
  )

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery)
    debouncedSearch(newQuery)
  }, [debouncedSearch])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    query,
    results,
    isLoading,
    handleSearch
  }
}

// Context7 Pattern: Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Context7 Pattern: Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
    }, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options, hasIntersected])

  return {
    elementRef,
    isIntersecting,
    hasIntersected
  }
}

// Context7 Pattern: Virtual scrolling hook
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleItemCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length)

  const visibleItems = items.slice(startIndex, endIndex)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop)
  }, [])

  return {
    containerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    startIndex,
    endIndex
  }
}

/**
 * Optimized virtual scrolling hook
 */


/**
 * Performance monitoring hook
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCountRef = useRef(0)
  const lastRenderTimeRef = useRef(performance.now())

  useEffect(() => {
    renderCountRef.current += 1
    const now = performance.now()
    const timeSinceLastRender = now - lastRenderTimeRef.current
    lastRenderTimeRef.current = now

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] Render #${renderCountRef.current} (${timeSinceLastRender.toFixed(2)}ms)`)
    }

    // Performance warning for slow renders
    if (timeSinceLastRender > 16) { // 60fps threshold
      console.warn(`[${componentName}] Slow render detected: ${timeSinceLastRender.toFixed(2)}ms`)
    }
  })

  const getRenderStats = useCallback(() => ({
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current
  }), [])

  return { getRenderStats }
}

/**
 * Optimistic updates hook
 */
export function useOptimisticUpdate<T>(
  initialData: T,
  updateFunction: (data: T) => Promise<T>
) {
  const [data, setData] = useState<T>(initialData)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const optimisticUpdate = useCallback(async (updater: (current: T) => T) => {
    const optimisticData = updater(data)
    
    // Apply optimistic update immediately
    setData(optimisticData)
    setIsUpdating(true)
    setError(null)

    try {
      startTransition(async () => {
        const result = await updateFunction(optimisticData)
        setData(result)
        setIsUpdating(false)
      })
    } catch (err) {
      // Revert on error
      setData(initialData)
      setError(err instanceof Error ? err.message : 'Update failed')
      setIsUpdating(false)
    }
  }, [data, updateFunction, initialData])

  return {
    data,
    isUpdating: isUpdating || isPending,
    error,
    optimisticUpdate
  }
}

/**
 * Lazy loading hook with intersection observer
 */
export function useLazyLoad<T>(
  items: T[],
  itemsPerPage: number = 10,
  threshold: number = 0.1
) {
  const [visibleItems, setVisibleItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      const currentLength = visibleItems.length
      const newItems = items.slice(currentLength, currentLength + itemsPerPage)
      
      setVisibleItems(prev => [...prev, ...newItems])
      setHasMore(currentLength + itemsPerPage < items.length)
      setIsLoading(false)
    }, 300)
  }, [items, visibleItems.length, itemsPerPage, isLoading, hasMore])

  // Initialize visible items
  useEffect(() => {
    setVisibleItems(items.slice(0, itemsPerPage))
    setHasMore(items.length > itemsPerPage)
  }, [items, itemsPerPage])

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasMore && !isLoading) {
            loadMore()
          }
        })
      },
      { threshold }
    )

    observerRef.current = observer

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMore, hasMore, isLoading, threshold])

  return {
    visibleItems,
    hasMore,
    isLoading,
    loadMoreRef,
    loadMore
  }
}



/**
 * Memoized data processing hook
 */
export function useMemoizedData<T, R>(
  data: T[],
  processor: (items: T[]) => R,
  dependencies: any[] = []
) {
  return useMemo(() => {
    return processor(data)
  }, [data, ...dependencies])
}

/**
 * Stable callback hook for event handlers
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[] = []
): T {
  return useCallback(callback, dependencies)
}

/**
 * Batch state updates hook
 */
export function useBatchUpdates<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState)
  const batchRef = useRef<Partial<T>>({})
  const timeoutRef = useRef<NodeJS.Timeout>()

  const batchUpdate = useCallback((updates: Partial<T>) => {
    Object.assign(batchRef.current, updates)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, ...batchRef.current }))
      batchRef.current = {}
    }, 0)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [state, batchUpdate] as const
} 