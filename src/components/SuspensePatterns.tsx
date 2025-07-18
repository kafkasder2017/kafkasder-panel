"use client";

import React, { Suspense, lazy, useState, useEffect, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from './ErrorBoundary';

// Context7'den esinlenen lazy loading pattern'i
const LazyComponent = lazy(() => 
  new Promise<any>(resolve => {
    // Simulate loading delay
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Lazy Yüklenen Component</h3>
            <p className="text-gray-600">Bu component lazy loading ile yüklendi!</p>
          </div>
        )
      });
    }, 2000);
  })
);

// Context7'den esinlenen async data component
const AsyncDataComponent = lazy(() => 
  fetch('/api/mock-data')
    .then(response => response.json())
    .then(data => ({
      default: () => (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Async Data Component</h3>
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )
    }))
    .catch(() => ({
      default: () => (
        <div className="p-4 border rounded-lg bg-red-50">
          <h3 className="font-semibold text-red-600">Veri Yüklenemedi</h3>
          <p className="text-red-500">API'den veri alınamadı.</p>
        </div>
      )
    }))
);

// Context7'den esinlenen Suspense wrapper
export function SuspenseWrapper({ 
  children, 
  fallback,
  timeout = 5000 
}: { 
  children: ReactNode; 
  fallback?: ReactNode;
  timeout?: number;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (hasError) {
    return (
      <div className="p-4 border rounded-lg bg-red-50">
        <h3 className="font-semibold text-red-600">Yükleme Hatası</h3>
        <p className="text-red-500">Component yüklenirken bir hata oluştu.</p>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        fallback || (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span className="ml-2">Yükleniyor...</span>
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}

// Context7'den esinlenen progressive loading
export function ProgressiveLoading({ 
  children, 
  stages = ['initial', 'content', 'complete'] 
}: { 
  children: ReactNode; 
  stages?: string[];
}) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timers = stages.map((_, index) => 
      setTimeout(() => {
        setCurrentStage(index);
      }, index * 1000)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [stages]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {stages.map((stage, index) => (
          <Badge 
            key={stage}
            variant={index <= currentStage ? "default" : "secondary"}
          >
            {stage}
          </Badge>
        ))}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center">
        {currentStage < stages.length - 1 ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">{stages[currentStage]} yükleniyor...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// Context7'den esinlenen conditional loading
export function ConditionalLoading({ 
  condition, 
  children, 
  fallback 
}: { 
  condition: boolean; 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  if (!condition) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span className="ml-2">Koşul bekleniyor...</span>
        </div>
      )
    );
  }

  return <>{children}</>;
}

// Context7'den esinlenen staggered loading
export function StaggeredLoading({ 
  items, 
  renderItem, 
  staggerDelay = 100 
}: { 
  items: any[]; 
  renderItem: (item: any, index: number) => ReactNode;
  staggerDelay?: number;
}) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timers = items.map((_, index) => 
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * staggerDelay)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [items, staggerDelay]);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`transition-all duration-300 ${
            visibleItems.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Context7'den esinlenen skeleton loading
export function SkeletonLoading({ 
  count = 3, 
  height = 60 
}: { 
  count?: number; 
  height?: number;
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 rounded-lg"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

// Context7'den esinlenen infinite scroll with Suspense
export function InfiniteScrollWithSuspense({ 
  items, 
  hasMore, 
  onLoadMore, 
  renderItem 
}: { 
  items: any[]; 
  hasMore: boolean; 
  onLoadMore: () => void; 
  renderItem: (item: any, index: number) => ReactNode;
}) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    await onLoadMore();
    setIsLoadingMore(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, hasMore]);

  return (
    <div className="space-y-4">
      {items.map((item, index) => renderItem(item, index))}
      
      {hasMore && (
        <Suspense fallback={<SkeletonLoading count={2} />}>
          <div className="text-center py-4">
                         {isLoadingMore ? (
               <div className="flex items-center justify-center">
                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                 <span className="ml-2">Daha fazla yükleniyor...</span>
               </div>
             ) : (
              <Button onClick={handleLoadMore}>
                Daha Fazla Yükle
              </Button>
            )}
          </div>
        </Suspense>
      )}
    </div>
  );
}

// Context7'den esinlenen error boundary with Suspense
export function SuspenseErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={
        fallback || (
          <div className="p-4 border rounded-lg bg-red-50">
            <h3 className="font-semibold text-red-600">Yükleme Hatası</h3>
            <p className="text-red-500">Component yüklenirken bir hata oluştu.</p>
          </div>
        )
      }
    >
      <Suspense 
                 fallback={
           <div className="flex items-center justify-center p-8">
             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
             <span className="ml-2">Yükleniyor...</span>
           </div>
         }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// Context7'den esinlenen Suspense pattern'leri örnek component'i
export function SuspensePatternsExample() {
  const [showLazyComponent, setShowLazyComponent] = useState(false);
  const [showAsyncData, setShowAsyncData] = useState(false);
  const [items, setItems] = useState<number[]>([]);

  const loadMoreItems = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newItems = Array.from({ length: 5 }, (_, i) => items.length + i);
    setItems(prev => [...prev, ...newItems]);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          Context7 Suspense Pattern'leri
        </h1>
        <p className="text-gray-600">
          Context7 dokümantasyonundan alınan Suspense ve lazy loading pattern'leri
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lazy Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Lazy Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowLazyComponent(!showLazyComponent)}
              className="mb-4"
            >
              {showLazyComponent ? 'Gizle' : 'Lazy Component Yükle'}
            </Button>
            
            {showLazyComponent && (
              <SuspenseWrapper>
                <LazyComponent />
              </SuspenseWrapper>
            )}
          </CardContent>
        </Card>

        {/* Async Data Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Async Data Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowAsyncData(!showAsyncData)}
              className="mb-4"
            >
              {showAsyncData ? 'Gizle' : 'Async Data Yükle'}
            </Button>
            
            {showAsyncData && (
              <SuspenseErrorBoundary>
                <AsyncDataComponent />
              </SuspenseErrorBoundary>
            )}
          </CardContent>
        </Card>

        {/* Progressive Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Progressive Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressiveLoading>
              <div className="p-4 border rounded-lg bg-green-50">
                <h3 className="font-semibold text-green-600">Yükleme Tamamlandı!</h3>
                <p className="text-green-500">Tüm aşamalar başarıyla tamamlandı.</p>
              </div>
            </ProgressiveLoading>
          </CardContent>
        </Card>

        {/* Staggered Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Staggered Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <StaggeredLoading
              items={['Öğe 1', 'Öğe 2', 'Öğe 3', 'Öğe 4', 'Öğe 5']}
              renderItem={(item, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  {item}
                </div>
              )}
            />
          </CardContent>
        </Card>

        {/* Conditional Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Conditional Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <ConditionalLoading condition={items.length > 0}>
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-600">Koşul Sağlandı!</h3>
                <p className="text-blue-500">Öğeler yüklendi: {items.length}</p>
              </div>
            </ConditionalLoading>
          </CardContent>
        </Card>

        {/* Skeleton Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <SkeletonLoading count={4} height={40} />
          </CardContent>
        </Card>
      </div>

      {/* Infinite Scroll */}
      <Card>
        <CardHeader>
          <CardTitle>Infinite Scroll with Suspense</CardTitle>
        </CardHeader>
        <CardContent>
          <InfiniteScrollWithSuspense
            items={items}
            hasMore={items.length < 50}
            onLoadMore={loadMoreItems}
            renderItem={(item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                Öğe {item + 1}
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Context7 Suspense Pattern'leri Açıklaması</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">SuspenseWrapper</h4>
              <p className="text-sm text-gray-600">
                Suspense component'ini wrapper ile sarar ve timeout ile error handling sağlar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">ProgressiveLoading</h4>
              <p className="text-sm text-gray-600">
                Yükleme aşamalarını gösterir ve her aşamayı sırayla tamamlar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">ConditionalLoading</h4>
              <p className="text-sm text-gray-600">
                Belirli bir koşul sağlanana kadar loading gösterir.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">StaggeredLoading</h4>
              <p className="text-sm text-gray-600">
                Öğeleri sırayla ve animasyonlu olarak yükler.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">SkeletonLoading</h4>
              <p className="text-sm text-gray-600">
                Yükleme sırasında skeleton UI gösterir.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">InfiniteScrollWithSuspense</h4>
              <p className="text-sm text-gray-600">
                Sonsuz scroll ile Suspense'i birleştirir.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">SuspenseErrorBoundary</h4>
              <p className="text-sm text-gray-600">
                Suspense ve Error Boundary'yi birleştirir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 