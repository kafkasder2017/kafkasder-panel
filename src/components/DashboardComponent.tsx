'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageLoading } from '@/components/ui/loading'
import Link from 'next/link'
import {
  Users, 
  Heart,
  Building2, 
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Package,
  AlertCircle,
  Calendar,
  MessageSquare,
  UserCheck,
  GraduationCap,
  PiggyBank,
  Scale,
  Settings,
  Search,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'

// Module interface
interface Module {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  stats: {
    total: number
    change: string
    trend: 'up' | 'down'
  }
  recentActivity: Array<{
    id: number
    title: string
    time: string
    type: string
  }>
  color: string
  permission?: string
}

// Context7 Pattern: Centralized Dashboard with Module Management
export default function DashboardComponent() {
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Client-side rendering kontrolü
  useEffect(() => {
    setIsClient(true)
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Server-side rendering guard
  if (!isClient) {
    return (
      <div className="p-6">
        <PageLoading message="Yükleniyor..." />
      </div>
    )
  }

  // Mock data for demonstration
  const mockStats = {
    totalMembers: 1250,
    totalDonations: 45600,
    totalOrganizations: 45,
    totalBeneficiaries: 890,
    monthlyDonations: 12500,
    monthlyMembers: 45,
    pendingApplications: 23,
    activeDonations: 156
  }

  // Context7 Pattern: Memoized modules configuration
  const modules: Module[] = useMemo(() => [
    {
      id: 'bagislar',
      title: 'Bağış Yönetimi',
      description: 'Nakit, çek/senet, kredi kartı ve ayni bağışları yönetin',
      icon: Heart,
      href: '/bagislar',
      stats: {
        total: mockStats.totalDonations,
        change: '+8%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni nakit bağış', time: '2 saat önce', type: 'donation' },
        { id: 2, title: 'Kredi kartı bağışı onaylandı', time: '4 saat önce', type: 'approval' }
      ],
      color: 'text-red-600',
      permission: 'DONATIONS'
    },
    {
      id: 'kisiler',
      title: 'Kişiler & Kurumlar',
      description: 'Kişi ve kurum bilgilerini yönetin',
      icon: Users,
      href: '/kisiler',
      stats: {
        total: mockStats.totalMembers,
        change: '+12%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni üye kaydı', time: '1 saat önce', type: 'registration' },
        { id: 2, title: 'Kurum bilgisi güncellendi', time: '3 saat önce', type: 'update' }
      ],
      color: 'text-blue-600',
      permission: 'PEOPLE'
    },
    {
      id: 'organizasyonlar',
      title: 'Organizasyonlar',
      description: 'Organizasyon ve şube yönetimi',
      icon: Building2,
      href: '/organizasyonlar',
      stats: {
        total: mockStats.totalOrganizations,
        change: '+5%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni şube eklendi', time: '1 gün önce', type: 'creation' },
        { id: 2, title: 'Organizasyon güncellendi', time: '2 gün önce', type: 'update' }
      ],
      color: 'text-purple-600',
      permission: 'ORGANIZATIONS'
    },
    {
      id: 'yardimlar',
      title: 'Yardım Yönetimi',
      description: 'Nakdi ve ayni yardım işlemleri',
      icon: Package,
      href: '/yardimlar',
      stats: {
        total: mockStats.totalBeneficiaries,
        change: '+15%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni yardım başvurusu', time: '30 dakika önce', type: 'application' },
        { id: 2, title: 'Yardım onaylandı', time: '2 saat önce', type: 'approval' }
      ],
      color: 'text-orange-600',
      permission: 'AID'
    },
    {
      id: 'uyeler',
      title: 'Üye Yönetimi',
      description: 'Üye kayıtları ve aidat takibi',
      icon: UserCheck,
      href: '/uyeler',
      stats: {
        total: mockStats.totalMembers,
        change: '+10%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Aidat ödemesi alındı', time: '1 saat önce', type: 'payment' },
        { id: 2, title: 'Üye bilgisi güncellendi', time: '4 saat önce', type: 'update' }
      ],
      color: 'text-green-600',
      permission: 'MEMBERS'
    },
    {
      id: 'finans',
      title: 'Finans & Fon',
      description: 'Banka işlemleri ve finansal raporlar',
      icon: DollarSign,
      href: '/finans',
      stats: {
        total: mockStats.monthlyDonations,
        change: '+6%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Banka işlemi tamamlandı', time: '2 saat önce', type: 'transaction' },
        { id: 2, title: 'Finansal rapor oluşturuldu', time: '1 gün önce', type: 'report' }
      ],
      color: 'text-emerald-600',
      permission: 'FINANCE'
    },
    {
      id: 'mesajlasma',
      title: 'Mesajlaşma',
      description: 'E-posta, SMS ve WhatsApp gönderimi',
      icon: MessageSquare,
      href: '/mesajlasma',
      stats: {
        total: 1250,
        change: '+20%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Toplu e-posta gönderildi', time: '1 saat önce', type: 'email' },
        { id: 2, title: 'SMS kampanyası başlatıldı', time: '3 saat önce', type: 'sms' }
      ],
      color: 'text-indigo-600',
      permission: 'MESSAGING'
    },
    {
      id: 'is-yonetimi',
      title: 'İş Yönetimi',
      description: 'Görevler, ekip ve proje yönetimi',
      icon: Calendar,
      href: '/is-yonetimi',
      stats: {
        total: 23,
        change: '+3%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni görev atandı', time: '2 saat önce', type: 'task' },
        { id: 2, title: 'Proje tamamlandı', time: '1 gün önce', type: 'completion' }
      ],
      color: 'text-cyan-600',
      permission: 'WORK'
    },
    {
      id: 'burs-yonetimi',
      title: 'Burs Yönetimi',
      description: 'Burs başvuruları ve öğrenci takibi',
      icon: GraduationCap,
      href: '/burs-yonetimi',
      stats: {
        total: 150,
        change: '+8%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni burs başvurusu', time: '1 saat önce', type: 'application' },
        { id: 2, title: 'Burs ödemesi yapıldı', time: '1 gün önce', type: 'payment' }
      ],
      color: 'text-amber-600',
      permission: 'SCHOLARSHIP'
    },
    {
      id: 'kumbara-yonetimi',
      title: 'Kumbara Yönetimi',
      description: 'Kumbara dağıtımı ve takibi',
      icon: PiggyBank,
      href: '/kumbara-yonetimi',
      stats: {
        total: 250,
        change: '+12%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni kumbara dağıtıldı', time: '3 saat önce', type: 'distribution' },
        { id: 2, title: 'Kumbara toplandı', time: '1 gün önce', type: 'collection' }
      ],
      color: 'text-pink-600',
      permission: 'PIGGY_BANK'
    },
    {
      id: 'hukuk-yonetimi',
      title: 'Hukuk Yönetimi',
      description: 'Dava takibi ve hukuki işlemler',
      icon: Scale,
      href: '/hukuk-yonetimi',
      stats: {
        total: 45,
        change: '+2%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Yeni dava dosyası', time: '2 saat önce', type: 'case' },
        { id: 2, title: 'Tebligat gönderildi', time: '1 gün önce', type: 'notification' }
      ],
      color: 'text-slate-600',
      permission: 'LEGAL'
    },
    {
      id: 'parametreler',
      title: 'Parametreler',
      description: 'Sistem ayarları ve tanımlar',
      icon: Settings,
      href: '/parametreler',
      stats: {
        total: 0,
        change: '0%',
        trend: 'up'
      },
      recentActivity: [
        { id: 1, title: 'Sistem ayarı güncellendi', time: '1 gün önce', type: 'setting' },
        { id: 2, title: 'Yeni parametre eklendi', time: '2 gün önce', type: 'parameter' }
      ],
      color: 'text-gray-600',
      permission: 'PARAMETERS'
    }
  ], [mockStats.totalDonations, mockStats.totalMembers, mockStats.totalOrganizations, mockStats.totalBeneficiaries, mockStats.monthlyDonations])

  // Context7 Pattern: Filtered modules based on search and filter
  const filteredModules = useMemo(() => {
    let filtered = modules

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(module => {
        switch (selectedFilter) {
          case 'active':
            return module.stats.trend === 'up'
          case 'pending':
            return module.stats.total > 0
          default:
            return true
        }
      })
    }

    return filtered
  }, [modules, searchTerm, selectedFilter])

  // Loading State
  if (isLoading) {
    return (
      <div className="p-6">
        <PageLoading message="Dashboard verileri yükleniyor..." />
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Veri Yükleme Hatası</h3>
            <p className="text-gray-600 mb-4">
              {error || 'Dashboard verileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.'}
            </p>
            <Button onClick={() => setError(null)}>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Quick Stats Cards
  const quickStats = [
    {
      title: 'Toplam Üye',
      value: mockStats.totalMembers,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Toplam Bağış',
      value: mockStats.totalDonations,
      change: '+8%',
      trend: 'up',
      icon: Heart,
      color: 'text-green-600'
    },
    {
      title: 'Organizasyonlar',
      value: mockStats.totalOrganizations,
      change: '+5%',
      trend: 'up',
      icon: Building2,
      color: 'text-purple-600'
    },
    {
      title: 'Yardım Alanlar',
      value: mockStats.totalBeneficiaries,
      change: '+15%',
      trend: 'up',
      icon: Package,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KAFKASDER Yönetim Paneli</h1>
          <p className="text-gray-600">Tüm modülleri tek yerden yönetin</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
          >
            Yenile
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Modül ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Modüller</option>
          <option value="active">Aktif</option>
          <option value="pending">Bekleyen İşlemler</option>
        </select>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <module.icon className={`h-6 w-6 ${module.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {module.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge variant={module.stats.trend === 'up' ? 'default' : 'secondary'}>
                    {module.stats.change}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Toplam İşlem</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {module.stats.total.toLocaleString()}
                  </span>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Son Aktiviteler</h4>
                  {module.recentActivity.slice(0, 2).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 truncate">{activity.title}</span>
                      <span className="text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Link href={module.href}>
                    <Button size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Görüntüle
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Modül Bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            Arama kriterlerinize uygun modül bulunamadı.
          </p>
          <Button onClick={() => {
            setSearchTerm('')
            setSelectedFilter('all')
          }}>
            Filtreleri Temizle
          </Button>
        </div>
      )}
    </div>
  )
} 