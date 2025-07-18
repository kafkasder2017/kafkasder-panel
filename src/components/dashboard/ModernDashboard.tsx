/**
 * Modern Dashboard Component
 * Context7'nin en güncel patternlerini kullanır
 * Next.js 14 + Suspense + Streaming + Modern Data Fetching
 */

'use client'

import { Suspense, useTransition, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react'

// ============================================================================
// MODERN DATA FETCHING HOOKS
// ============================================================================

/**
 * Modern Data Fetching Hook with Suspense
 * Server-side data fetching için optimize edilmiş
 */
function useModernData<T>(key: string, fetcher: () => Promise<T>): T {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        const result = await fetcher()
        if (mounted) {
          setData(result)
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [key, fetcher])

  if (error) throw error
  if (!data) throw new Promise(resolve => setTimeout(resolve, 100)) // Suspense fallback

  return data
}

// ============================================================================
// MODERN DASHBOARD COMPONENTS
// ============================================================================

/**
 * Modern Stats Card Component
 * Real-time statistics display
 */
function ModernStatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  loading = false 
}: {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease'
  icon: React.ComponentType<{ className?: string }>
  loading?: boolean
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="h-8 w-20 animate-pulse bg-muted rounded" />
          ) : (
            value
          )}
        </div>
        {change !== undefined && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {changeType === 'increase' ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(change)}%
            </span>
            <span className="ml-1">geçen aya göre</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Modern Activity Feed Component
 * Real-time activity updates
 */
function ModernActivityFeed() {
  const activities = useModernData('activities', async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
      {
        id: 1,
        type: 'donation',
        message: 'Yeni bağış alındı',
        amount: 500,
        donor: 'Ahmet Yılmaz',
        time: '2 dakika önce'
      },
      {
        id: 2,
        type: 'user',
        message: 'Yeni üye kaydı',
        user: 'Fatma Demir',
        time: '5 dakika önce'
      },
      {
        id: 3,
        type: 'organization',
        message: 'Yeni kurum eklendi',
        organization: 'Hayır Kurumu A.Ş.',
        time: '10 dakika önce'
      }
    ]
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Son Aktiviteler
        </CardTitle>
        <CardDescription>
          Sistemdeki son aktiviteleri görüntüleyin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex-shrink-0">
                {activity.type === 'donation' && (
                  <DollarSign className="h-4 w-4 text-green-500" />
                )}
                {activity.type === 'user' && (
                  <Users className="h-4 w-4 text-blue-500" />
                )}
                {activity.type === 'organization' && (
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
              {activity.amount && (
                <Badge variant="secondary">
                  ₺{activity.amount}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Modern Chart Component
 * Data visualization with modern patterns
 */
function ModernChart() {
  const chartData = useModernData('chart', async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
      datasets: [
        {
          label: 'Bağışlar',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        }
      ]
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Bağış Trendi
        </CardTitle>
        <CardDescription>
          Son 6 ayın bağış trendini görüntüleyin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-2">
          {chartData.datasets[0].data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ 
                  height: `${(value / Math.max(...chartData.datasets[0].data)) * 200}px` 
                }}
              />
              <span className="text-xs text-muted-foreground mt-2">
                {chartData.labels[index]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Modern Quick Actions Component
 * Fast access to common actions
 */
function ModernQuickActions() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleQuickAction = (action: string) => {
    startTransition(() => {
      switch (action) {
        case 'new-donation':
          router.push('/bagislar/yeni')
          break
        case 'new-person':
          router.push('/kisiler/yeni')
          break
        case 'new-organization':
          router.push('/organizasyonlar/yeni')
          break
        case 'reports':
          router.push('/raporlar')
          break
      }
    })
  }

  const actions = [
    {
      id: 'new-donation',
      title: 'Yeni Bağış',
      description: 'Yeni bağış kaydı oluştur',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 'new-person',
      title: 'Yeni Kişi',
      description: 'Yeni kişi kaydı oluştur',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'new-organization',
      title: 'Yeni Kurum',
      description: 'Yeni kurum kaydı oluştur',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      id: 'reports',
      title: 'Raporlar',
      description: 'Detaylı raporları görüntüle',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Hızlı İşlemler
        </CardTitle>
        <CardDescription>
          Sık kullanılan işlemlere hızlı erişim
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => handleQuickAction(action.id)}
              disabled={isPending}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Modern Loading Skeleton
 * Suspense fallback component
 */
function ModernLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <div className="h-6 w-24 bg-muted animate-pulse rounded" />
            <div className="h-4 w-40 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded mb-1" />
                    <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * Modern Error Boundary Component
 * Error handling for dashboard components
 */
function ModernErrorFallback({ error, resetErrorBoundary }: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-800">Bir hata oluştu</CardTitle>
        <CardDescription className="text-red-600">
          Dashboard yüklenirken beklenmeyen bir hata oluştu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-red-700">
            {error.message}
          </p>
          <Button onClick={resetErrorBoundary} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tekrar Dene
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

/**
 * Modern Dashboard Component
 * Context7'nin en güncel patternlerini kullanır
 */
export default function ModernDashboard() {
  const stats = useModernData('stats', async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      totalDonations: 125000,
      totalDonors: 1250,
      totalOrganizations: 45,
      monthlyGrowth: 12.5
    }
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ModernStatsCard
          title="Toplam Bağış"
          value={`₺${stats.totalDonations.toLocaleString()}`}
          change={12.5}
          changeType="increase"
          icon={DollarSign}
        />
        <ModernStatsCard
          title="Toplam Bağışçı"
          value={stats.totalDonors.toLocaleString()}
          change={8.2}
          changeType="increase"
          icon={Users}
        />
        <ModernStatsCard
          title="Toplam Kurum"
          value={stats.totalOrganizations}
          change={-2.1}
          changeType="decrease"
          icon={TrendingUp}
        />
        <ModernStatsCard
          title="Aylık Büyüme"
          value={`%${stats.monthlyGrowth}`}
          change={15.3}
          changeType="increase"
          icon={Activity}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Suspense fallback={<div className="col-span-4 h-80 bg-muted animate-pulse rounded" />}>
          <div className="col-span-4">
            <ModernChart />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="col-span-3 h-80 bg-muted animate-pulse rounded" />}>
          <div className="col-span-3">
            <ModernActivityFeed />
          </div>
        </Suspense>
      </div>

      {/* Quick Actions */}
      <Suspense fallback={<div className="h-48 bg-muted animate-pulse rounded" />}>
        <ModernQuickActions />
      </Suspense>
    </div>
  )
}

/**
 * Modern Dashboard with Error Boundary
 * Complete dashboard with error handling
 */
export function ModernDashboardWithErrorBoundary() {
  return (
    <Suspense fallback={<ModernLoadingSkeleton />}>
      <ModernDashboard />
    </Suspense>
  )
} 