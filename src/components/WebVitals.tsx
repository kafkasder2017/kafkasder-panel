'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'



// Context7 Pattern: Web Vitals reporting component
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', metric)
    }

    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Send to Rollbar for error tracking
    if (typeof window !== 'undefined' && window.Rollbar) {
      // Only track poor performance as errors
      if (metric.name === 'LCP' && metric.value > 2500) {
        window.Rollbar.warning(`Poor LCP: ${metric.value}ms`, {
          metric: metric.name,
          value: metric.value,
          id: metric.id
        })
      }
      
      if (metric.name === 'FID' && metric.value > 100) {
        window.Rollbar.warning(`Poor FID: ${metric.value}ms`, {
          metric: metric.name,
          value: metric.value,
          id: metric.id
        })
      }
      
      if (metric.name === 'CLS' && metric.value > 0.1) {
        window.Rollbar.warning(`Poor CLS: ${metric.value}`, {
          metric: metric.name,
          value: metric.value,
          id: metric.id
        })
      }
    }
  })

  return null
}

// Context7 Pattern: Performance monitoring component
export function PerformanceMonitor({ componentName }: { componentName: string }) {
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
      
      // Send to Rollbar if available
      if (typeof window !== 'undefined' && window.Rollbar) {
        window.Rollbar.warning(`Slow render in ${componentName}`, {
          componentName,
          renderTime: timeSinceLastRender,
          renderCount: renderCountRef.current
        })
      }
    }
  })

  return null
}

// Context7 Pattern: Navigation performance tracker
export function NavigationTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const startTimeRef = useRef(performance.now())

  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const navigationTime = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Navigation to ${pathname} took ${navigationTime.toFixed(2)}ms`)
      }

      // Track slow navigation
      if (navigationTime > 1000) {
        console.warn(`Slow navigation to ${pathname}: ${navigationTime.toFixed(2)}ms`)
        
        if (typeof window !== 'undefined' && window.Rollbar) {
          window.Rollbar.warning(`Slow navigation detected`, {
            pathname,
            navigationTime,
            searchParams: searchParams.toString()
          })
        }
      }
    }
  }, [pathname, searchParams])

  return null
} 