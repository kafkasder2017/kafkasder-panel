'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, BarChart3, CreditCard, Receipt, Calendar, Repeat, Package, PiggyBank, Truck, MessageSquare } from 'lucide-react'

// Context7 Donation Management Overview Component
export default function DonationsPage() {
  const router = useRouter()

  // Auto-redirect to the first submenu item
  useEffect(() => {
    router.push('/bagislar/tum-bagislar')
  }, [router])

  const quickActions = [
    {
      title: 'Tüm Bağışlar',
      description: 'Tüm bağışların listesi ve detayları',
      icon: Heart,
      href: '/bagislar/tum-bagislar',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Bağış Raporları',
      description: 'Bağış istatistikleri ve raporları',
      icon: BarChart3,
      href: '/bagislar/raporlar',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Nakit Bağışlar',
      description: 'Nakit para bağışları',
      icon: CreditCard,
      href: '/bagislar/nakit-bagislar',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Çek/Senet Bağışlar',
      description: 'Çek ve senet bağışları',
      icon: Receipt,
      href: '/bagislar/cek-senet-bagislar',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Kredi Kartı Bağışları',
      description: 'Kredi kartı ile yapılan bağışlar',
      icon: CreditCard,
      href: '/bagislar/kredi-karti-bagislar',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Online Bağışlar',
      description: 'Online platformlardan gelen bağışlar',
      icon: Calendar,
      href: '/bagislar/online-bagislar',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      title: 'Tekrarlı İşlemler',
      description: 'Düzenli tekrarlı bağışlar',
      icon: Repeat,
      href: '/bagislar/tekrarli-islemler',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Ayni Bağışlar',
      description: 'Eşya, gıda, giysi bağışları',
      icon: Package,
      href: '/bagislar/ayni-bagislar',
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Kumbaralar',
      description: 'Kumbara dağıtımı ve takibi',
      icon: PiggyBank,
      href: '/bagislar/kumbaralar',
      color: 'bg-teal-50 text-teal-600'
    },
    {
      title: 'Teslimat & Gönderimler',
      description: 'Bağış teslimatları ve gönderimler',
      icon: Truck,
      href: '/bagislar/teslimat-gonderimler',
      color: 'bg-gray-50 text-gray-600'
    },
    {
      title: 'SMS/e-Posta Aboneliği',
      description: 'Bağışçı iletişim abonelikleri',
      icon: MessageSquare,
      href: '/bagislar/abonelik',
      color: 'bg-cyan-50 text-cyan-600'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Context7 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bağış Yönetimi</h1>
          <p className="text-gray-600 mt-2">KAFKASDER bağış kayıtları ve takibi</p>
        </div>
      </div>

      {/* Context7 Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Card key={action.href} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => router.push(action.href)}
                >
                  Görüntüle
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Context7 Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Toplam Bağış</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Tamamlanan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <div className="text-sm text-gray-600">Bekleyen</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-600">Başarısız</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 