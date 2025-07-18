/**
 * Modern Performance Monitoring Hooks
 * 
 * Context7'nin modern performance monitoring patternlerini kullanarak
 * Web Vitals, navigation performance ve memory usage monitoring
 */

import { useState, useEffect, useCallback } from 'react';

// ============================================================================
// WEB VITALS MONITORING
// ============================================================================

export interface WebVitalsMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  CLS?: number; // Cumulative Layout Shift
  FID?: number; // First Input Delay
  TTFB?: number; // Time to First Byte
  INP?: number; // Interaction to Next Paint
}

export const useWebVitals = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reportMetric = (metric: any) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name]: metric.value
      }));

      // Send to analytics service
      if (process.env.NODE_ENV === 'production') {
        // Rollbar veya başka bir analytics servisi
        console.log('Web Vital:', metric.name, metric.value);
      }
    };

    // Web Vitals monitoring implementation
    const initWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        webVitals.onCLS(reportMetric);
        webVitals.onFCP(reportMetric);
        webVitals.onLCP(reportMetric);
        webVitals.onTTFB(reportMetric);
        if (webVitals.onINP) webVitals.onINP(reportMetric);
      } catch (error) {
        console.warn('Web Vitals not available:', error);
      }
    };

    initWebVitals();
  }, []);

  return metrics;
};

// ============================================================================
// NAVIGATION PERFORMANCE MONITORING
// ============================================================================

export interface NavigationMetrics {
  startTime?: number;
  endTime?: number;
  duration?: number;
  domContentLoaded?: number;
  loadComplete?: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
}

export const useNavigationPerformance = () => {
  const [metrics, setNavigationMetrics] = useState<NavigationMetrics>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      if (navigation) {
        const firstPaint = paint.find(entry => entry.name === 'first-paint');
        const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint');

        setNavigationMetrics({
          startTime: navigation.startTime,
          endTime: navigation.loadEventEnd,
          duration: navigation.loadEventEnd - navigation.startTime,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
          loadComplete: navigation.loadEventEnd - navigation.startTime,
          firstPaint: firstPaint?.startTime,
          firstContentfulPaint: firstContentfulPaint?.startTime
        });
      }
    };

    // Update metrics when page loads
    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
      return () => window.removeEventListener('load', updateMetrics);
    }
  }, []);

  return metrics;
};

// ============================================================================
// MEMORY USAGE MONITORING
// ============================================================================

export interface MemoryInfo {
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
  jsHeapSizeLimit?: number;
  percentageUsed?: number;
}

export const useMemoryUsage = () => {
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo>({});

  const updateMemoryInfo = useCallback(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return;

    const memory = (performance as any).memory;
    const percentageUsed = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

    setMemoryInfo({
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      percentageUsed: Math.round(percentageUsed * 100) / 100
    });
  }, []);

  useEffect(() => {
    updateMemoryInfo();

    // Update memory info periodically
    const interval = setInterval(updateMemoryInfo, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [updateMemoryInfo]);

  return memoryInfo;
};

// ============================================================================
// NETWORK PERFORMANCE MONITORING
// ============================================================================

export interface NetworkMetrics {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export const useNetworkPerformance = () => {
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics>({});

  useEffect(() => {
    if (typeof window === 'undefined' || !('connection' in navigator)) return;

    const connection = (navigator as any).connection;

    const updateNetworkInfo = () => {
      setNetworkMetrics({
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData
      });
    };

    updateNetworkInfo();

    // Listen for network changes
    connection?.addEventListener('change', updateNetworkInfo);

    return () => {
      connection?.removeEventListener('change', updateNetworkInfo);
    };
  }, []);

  return networkMetrics;
};

// ============================================================================
// COMPREHENSIVE PERFORMANCE MONITORING
// ============================================================================

export interface PerformanceMetrics {
  webVitals: WebVitalsMetrics;
  navigation: NavigationMetrics;
  memory: MemoryInfo;
  network: NetworkMetrics;
}

export const usePerformanceMonitoring = () => {
  const webVitals = useWebVitals();
  const navigation = useNavigationPerformance();
  const memory = useMemoryUsage();
  const network = useNetworkPerformance();

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Start monitoring when component mounts
    setIsMonitoring(true);
  }, []);

  const getPerformanceReport = useCallback(() => {
    return {
      webVitals,
      navigation,
      memory,
      network,
      timestamp: new Date().toISOString()
    };
  }, [webVitals, navigation, memory, network]);

  const sendPerformanceReport = useCallback(async () => {
    if (process.env.NODE_ENV !== 'production') return;

    const report = getPerformanceReport();
    
    try {
      // Send to your analytics service
      await fetch('/api/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
    } catch (error) {
      console.warn('Failed to send performance report:', error);
    }
  }, [getPerformanceReport]);

  return {
    webVitals,
    navigation,
    memory,
    network,
    isMonitoring,
    getPerformanceReport,
    sendPerformanceReport
  };
};

// ============================================================================
// PERFORMANCE ALERTS
// ============================================================================

export const usePerformanceAlerts = (thresholds: {
  lcp?: number;
  fid?: number;
  cls?: number;
  memory?: number;
}) => {
  const { webVitals, memory } = usePerformanceMonitoring();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const newAlerts: string[] = [];

    // Check LCP threshold
    if (thresholds.lcp && webVitals.LCP && webVitals.LCP > thresholds.lcp) {
      newAlerts.push(`LCP (${webVitals.LCP}ms) exceeds threshold (${thresholds.lcp}ms)`);
    }

    // Check FID threshold
    if (thresholds.fid && webVitals.FID && webVitals.FID > thresholds.fid) {
      newAlerts.push(`FID (${webVitals.FID}ms) exceeds threshold (${thresholds.fid}ms)`);
    }

    // Check CLS threshold
    if (thresholds.cls && webVitals.CLS && webVitals.CLS > thresholds.cls) {
      newAlerts.push(`CLS (${webVitals.CLS}) exceeds threshold (${thresholds.cls})`);
    }

    // Check memory threshold
    if (thresholds.memory && memory.percentageUsed && memory.percentageUsed > thresholds.memory) {
      newAlerts.push(`Memory usage (${memory.percentageUsed}%) exceeds threshold (${thresholds.memory}%)`);
    }

    setAlerts(newAlerts);
  }, [webVitals, memory, thresholds]);

  return alerts;
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

export const performanceUtils = {
  // Format bytes to human readable format
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format milliseconds to human readable format
  formatDuration: (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  },

  // Get performance grade based on metrics
  getPerformanceGrade: (metrics: WebVitalsMetrics): string => {
    let score = 0;
    let total = 0;

    if (metrics.LCP) {
      total++;
      if (metrics.LCP < 2500) score++;
      else if (metrics.LCP < 4000) score += 0.5;
    }

    if (metrics.FID) {
      total++;
      if (metrics.FID < 100) score++;
      else if (metrics.FID < 300) score += 0.5;
    }

    if (metrics.CLS) {
      total++;
      if (metrics.CLS < 0.1) score++;
      else if (metrics.CLS < 0.25) score += 0.5;
    }

    if (total === 0) return 'N/A';

    const percentage = (score / total) * 100;

    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }
};

export default usePerformanceMonitoring; 