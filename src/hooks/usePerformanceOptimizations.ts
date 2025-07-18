'use client'

import { useState, useEffect, useCallback, useMemo, useRef, useTransition } from 'react'

// Context7 Performance Optimization Hooks

/**
 * Debounced search hook with proper cleanup
 */
export function useDebouncedSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  delay: number = 300
) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const abortControllerRef = useRef<AbortController>()

  const debouncedSearch = useCallback(async (searchQuery: string) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (!searchQuery.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      const searchResults = await searchFunction(searchQuery)
      if (!abortControllerRef.current.signal.aborted) {
        setResults(searchResults)
      }
    } catch (err) {
      if (!abortControllerRef.current.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Search failed')
      }
    } finally {
      if (!abortControllerRef.current.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [searchFunction])

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      debouncedSearch(searchQuery)
    }, delay)
  }, [debouncedSearch, delay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    query,
    results,
    isLoading,
    error,
    handleSearch,
    clearResults: useCallback(() => {
      setResults([])
      setQuery('')
      setError(null)
    }, [])
  }
}

/**
 * Optimized virtual scrolling hook
 */
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    )
    const visibleStart = Math.max(0, start - overscan)
    
    return {
      start: visibleStart,
      end,
      offsetY: visibleStart * itemHeight
    }
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end)
  }, [items, visibleRange.start, visibleRange.end])

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop)
  }, [])

  const scrollToItem = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight
    }
  }, [itemHeight])

  return {
    visibleItems,
    visibleRange,
    containerRef,
    handleScroll,
    scrollToItem,
    totalHeight: items.length * itemHeight
  }
}

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
 * Intersection observer hook for animations
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      setEntry(entry)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { elementRef, isIntersecting, entry }
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