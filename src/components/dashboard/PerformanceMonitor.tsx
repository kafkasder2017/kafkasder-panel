'use client';

import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

export default function PerformanceMonitor() {
  const { webVitals, memory } = usePerformanceMonitoring();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs font-mono">
      <div>LCP: {webVitals.LCP?.toFixed(0)}ms</div>
      <div>FID: {webVitals.FID?.toFixed(0)}ms</div>
      <div>CLS: {webVitals.CLS?.toFixed(3)}</div>
      <div>Memory: {memory.percentageUsed?.toFixed(1)}%</div>
    </div>
  );
} 