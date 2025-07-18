import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

// Advanced state management with persistence
export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  storage: 'localStorage' | 'sessionStorage' = 'localStorage'
) {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window[storage].getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading ${storage} key "${key}":`, error)
      return defaultValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      setState(valueToStore)
      window[storage].setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting ${storage} key "${key}":`, error)
    }
  }, [key, state, storage])

  return [state, setValue] as const
}

// Advanced form handling with validation
export function useAdvancedForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Record<keyof T, (value: any) => string | null>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((field: keyof T, value: any) => {
    if (!validationRules?.[field]) return null
    return validationRules[field](value)
  }, [validationRules])

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    
    Object.keys(values).forEach((key) => {
      const field = key as keyof T
      const error = validateField(field, values[field])
      if (error) {
        newErrors[field] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values, validateField])

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Validate field when touched
    const error = validateField(field, values[field])
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }, [validateField, values])

  const handleSubmit = useCallback(async (onSubmit: (values: T) => Promise<void>) => {
    setIsSubmitting(true)
    
    try {
      if (validateForm()) {
        await onSubmit(values)
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validateForm])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    reset,
    isValid,
    validateForm
  }
}

// Advanced data fetching with caching
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    cacheTime?: number // milliseconds
    staleTime?: number // milliseconds
    refetchOnWindowFocus?: boolean
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastFetchTime = useRef<number>(0)
  const cacheTime = options?.cacheTime ?? 5 * 60 * 1000 // 5 minutes
  const staleTime = options?.staleTime ?? 60 * 1000 // 1 minute

  const fetchData = useCallback(async (force = false) => {
    const now = Date.now()
    const isStale = now - lastFetchTime.current > staleTime
    const hasCache = data !== null

    if (!force && hasCache && !isStale) {
      return data
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      setData(result)
      lastFetchTime.current = now
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetcher, data, staleTime])

  // Refetch on window focus
  useEffect(() => {
    if (!options?.refetchOnWindowFocus) return

    const handleFocus = () => {
      const now = Date.now()
      if (now - lastFetchTime.current > staleTime) {
        fetchData()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchData, staleTime, options?.refetchOnWindowFocus])

  // Clear cache after cacheTime
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(null)
    }, cacheTime)

    return () => clearTimeout(timer)
  }, [cacheTime])

  return {
    data,
    loading,
    error,
    fetchData,
    refetch: () => fetchData(true)
  }
}

// Advanced modal management
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<any>(null)

  const open = useCallback((modalData?: any) => {
    setIsOpen(true)
    if (modalData) {
      setData(modalData)
    }
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setData(null)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return {
    isOpen,
    data,
    open,
    close,
    toggle
  }
}

// Advanced keyboard shortcuts
export function useKeyboardShortcut(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  options?: {
    preventDefault?: boolean
    target?: EventTarget
  }
) {
  const preventDefault = options?.preventDefault ?? true
  const target = options?.target ?? window

  useEffect(() => {
    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      const pressedKeys = [
        keyboardEvent.key.toLowerCase(),
        keyboardEvent.ctrlKey && 'ctrl',
        keyboardEvent.shiftKey && 'shift',
        keyboardEvent.altKey && 'alt',
        keyboardEvent.metaKey && 'meta'
      ].filter(Boolean)

      const isMatch = keys.every(key => 
        pressedKeys.includes(key.toLowerCase())
      )

      if (isMatch) {
        if (preventDefault) {
          keyboardEvent.preventDefault()
        }
        callback(keyboardEvent)
      }
    }

    target.addEventListener('keydown', handleKeyDown)
    return () => target.removeEventListener('keydown', handleKeyDown)
  }, [keys, callback, preventDefault, target])
}

// Advanced scroll position tracking
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollPosition = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY
      const direction = currentPosition > lastScrollPosition.current ? 'down' : 'up'
      
      setScrollPosition(currentPosition)
      setScrollDirection(direction)
      lastScrollPosition.current = currentPosition
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    scrollPosition,
    scrollDirection,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up'
  }
}

// Advanced intersection observer
export function useIntersectionObserver(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<Element | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      setEntry(entry)
    }, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return {
    elementRef,
    isIntersecting,
    entry
  }
}

// Advanced performance monitoring
export function usePerformanceMonitor(operationName: string) {
  const startTime = useRef<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const start = useCallback(() => {
    startTime.current = performance.now()
  }, [])

  const end = useCallback(() => {
    const endTime = performance.now()
    const operationDuration = endTime - startTime.current
    setDuration(operationDuration)
    
    // Log performance data
    console.log(`${operationName} took ${operationDuration.toFixed(2)}ms`)
    
    return operationDuration
  }, [operationName])

  const measure = useCallback(async <T>(operation: () => Promise<T>): Promise<T> => {
    start()
    try {
      const result = await operation()
      end()
      return result
    } catch (error) {
      end()
      throw error
    }
  }, [start, end])

  return {
    duration,
    start,
    end,
    measure
  }
}

// Advanced error boundary with retry
export function useErrorBoundaryWithRetry() {
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  const handleError = useCallback((error: Error) => {
    setError(error)
    console.error('Error caught:', error)
  }, [])

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1)
      setError(null)
    }
  }, [retryCount])

  const reset = useCallback(() => {
    setError(null)
    setRetryCount(0)
  }, [])

  return {
    error,
    retryCount,
    maxRetries,
    handleError,
    retry,
    reset,
    canRetry: retryCount < maxRetries
  }
} 