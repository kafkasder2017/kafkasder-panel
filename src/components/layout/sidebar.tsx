'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { hasPermission, UserRole } from '@/lib/auth'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Heart,
  Users,
  UserCheck,
  DollarSign,
  MessageSquare,
  Calendar,
  GraduationCap,
  PiggyBank,
  Scale,
  Settings,
  Building2,
  Package,
  ChevronDown,
  ChevronRight,
  FileText,
  CreditCard,
  Receipt,
  Repeat,
  Truck,
  BarChart3,
} from 'lucide-react'

interface SubMenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  requiredRole?: UserRole
}

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  requiredRole?: UserRole
  description?: string
  subItems?: SubMenuItem[]
}

// Context7 Pattern: Organized menu items with clear hierarchy and submenus
const menuItems: MenuItem[] = [
  {
    title: 'Ana Sayfa',
    href: '/',
    icon: LayoutDashboard,
    requiredRole: 'viewer',
    description: 'Genel bakış ve istatistikler'
  },
  {
    title: 'Bağış Yönetimi',
    href: '/bagislar',
    icon: Heart,
    requiredRole: 'user',
    description: 'Bağış süreçlerini yönetin',
    subItems: [
      {
        title: 'Tüm Bağışlar',
        href: '/bagislar/tum-bagislar',
        icon: Heart,
        description: 'Tüm bağışların listesi'
      },
      {
        title: 'Bağış Raporları',
        href: '/bagislar/raporlar',
        icon: BarChart3,
        description: 'Bağış istatistikleri'
      },
      {
        title: 'Nakit Bağışlar',
        href: '/bagislar/nakit-bagislar',
        icon: CreditCard,
        description: 'Nakit para bağışları'
      },
      {
        title: 'Çek/Senet Bağışlar',
        href: '/bagislar/cek-senet-bagislar',
        icon: Receipt,
        description: 'Çek ve senet bağışları'
      },
      {
        title: 'Kredi Kartı Bağışları',
        href: '/bagislar/kredi-karti-bagislar',
        icon: CreditCard,
        description: 'Kredi kartı bağışları'
      },
      {
        title: 'Online Bağışlar',
        href: '/bagislar/online-bagislar',
        icon: Calendar,
        description: 'Online platform bağışları'
      },
      {
        title: 'Tekrarlı İşlemler',
        href: '/bagislar/tekrarli-islemler',
        icon: Repeat,
        description: 'Düzenli tekrarlı bağışlar'
      },
      {
        title: 'Ayni Bağışlar',
        href: '/bagislar/ayni-bagislar',
        icon: Package,
        description: 'Eşya, gıda, giysi bağışları'
      },
      {
        title: 'Kumbaralar',
        href: '/bagislar/kumbaralar',
        icon: PiggyBank,
        description: 'Kumbara dağıtımı ve takibi'
      },
      {
        title: 'Toplu Provizyon',
        href: '/bagislar/toplu-provizyon',
        icon: CreditCard,
        description: 'Toplu kredi kartı işlemleri'
      },
      {
        title: 'Teslimat & Gönderimler',
        href: '/bagislar/teslimat-gonderimler',
        icon: Truck,
        description: 'Bağış teslimatları'
      },
      {
        title: 'SMS/e-Posta Aboneliği',
        href: '/bagislar/abonelik',
        icon: MessageSquare,
        description: 'Bağışçı iletişim abonelikleri'
      }
    ]
  },
  {
    title: 'Kişiler & Kurumlar',
    href: '/kisiler',
    icon: Users,
    requiredRole: 'user',
    description: 'Kişi ve kurum kayıtları',
    subItems: [
      {
        title: 'Kişi Listesi',
        href: '/kisiler',
        icon: Users,
        description: 'Tüm kişilerin listesi ve yönetimi'
      },
      {
        title: 'Kurumlar',
        href: '/kisiler/kurumlar',
        icon: Building2,
        description: 'Kurum ve organizasyon kayıtları'
      },
      {
        title: 'Yeni Kişi',
        href: '/kisiler/yeni',
        icon: Users,
        description: 'Yeni kişi ekleme formu'
      }
    ]
  },
  {
    title: 'Organizasyonlar',
    href: '/organizasyonlar',
    icon: Building2,
    requiredRole: 'user',
    description: 'Organizasyon yönetimi'
  },
  {
    title: 'Yardım Yönetimi',
    href: '/yardimlar',
    icon: Package,
    requiredRole: 'user',
    description: 'Yardım süreçleri',
    subItems: [
      {
        title: 'Yardım Alanları',
        href: '/yardimlar/alanlar',
        icon: Package,
        description: 'Yardım alanları ve kategorileri'
      },
      {
        title: 'Başvurular',
        href: '/yardimlar/basvurular',
        icon: Package,
        description: 'Yardım başvuruları'
      },
      {
        title: 'Nakdi Yardım',
        href: '/yardimlar/nakdi-yardim',
        icon: DollarSign,
        description: 'Para yardımları'
      },
      {
        title: 'Ayni Yardım',
        href: '/yardimlar/ayni-yardim',
        icon: Package,
        description: 'Eşya, gıda, giysi yardımları'
      },
      {
        title: 'Onay Süreci',
        href: '/yardimlar/onay-sureci',
        icon: UserCheck,
        description: 'Yardım onay süreçleri'
      }
    ]
  },
  {
    title: 'Üye Yönetimi',
    href: '/uyeler',
    icon: UserCheck,
    requiredRole: 'manager',
    description: 'Üye işlemleri',
    subItems: [
      {
        title: 'Üye Listesi',
        href: '/uyeler',
        icon: Users,
        description: 'Tüm üyelerin listesi'
      },
      {
        title: 'Aidat Yönetimi',
        href: '/uyeler/aidat',
        icon: DollarSign,
        description: 'Üye aidat işlemleri'
      },
      {
        title: 'Üye Raporları',
        href: '/uyeler/raporlar',
        icon: BarChart3,
        description: 'Üye istatistikleri'
      },
      {
        title: 'Tanımlar',
        href: '/uyeler/tanimlar',
        icon: Settings,
        description: 'Üye kategorileri ve tanımları'
      }
    ]
  },
  {
    title: 'Finans Yönetimi',
    href: '/finans',
    icon: DollarSign,
    requiredRole: 'manager',
    description: 'Finansal işlemler',
    subItems: [
      {
        title: 'Banka İşlemleri',
        href: '/finans/banka-islemleri',
        icon: CreditCard,
        description: 'Banka hesapları ve işlemler'
      },
      {
        title: 'Kasa Raporları',
        href: '/finans/kasa-raporlari',
        icon: BarChart3,
        description: 'Kasa durumu ve raporları'
      },
      {
        title: 'Döviz Kurları',
        href: '/finans/doviz-kurlari',
        icon: DollarSign,
        description: 'Güncel döviz kurları'
      },
      {
        title: 'Dosya Yükleme',
        href: '/finans/dosya-yukleme',
        icon: FileText,
        description: 'Finansal belge yükleme'
      }
    ]
  },
  {
    title: 'Mesajlaşma',
    href: '/mesajlasma',
    icon: MessageSquare,
    requiredRole: 'user',
    description: 'İletişim araçları',
    subItems: [
      {
        title: 'E-posta',
        href: '/mesajlasma/email',
        icon: MessageSquare,
        description: 'E-posta gönderimi'
      },
      {
        title: 'WhatsApp',
        href: '/mesajlasma/whatsapp',
        icon: MessageSquare,
        description: 'WhatsApp mesajları'
      },
      {
        title: 'Şablonlar',
        href: '/mesajlasma/sablonlar',
        icon: FileText,
        description: 'Mesaj şablonları'
      },
      {
        title: 'Gruplar',
        href: '/mesajlasma/gruplar',
        icon: Users,
        description: 'İletişim grupları'
      },
      {
        title: 'Raporlar',
        href: '/mesajlasma/raporlar',
        icon: BarChart3,
        description: 'İletişim raporları'
      }
    ]
  },
  {
    title: 'İş Yönetimi',
    href: '/is-yonetimi',
    icon: Calendar,
    requiredRole: 'user',
    description: 'Proje ve görev yönetimi',
    subItems: [
      {
        title: 'Görevler',
        href: '/is-yonetimi/gorevler',
        icon: Calendar,
        description: 'Görev listesi ve takibi'
      },
      {
        title: 'Ekip',
        href: '/is-yonetimi/ekip',
        icon: Users,
        description: 'Ekip üyeleri'
      },
      {
        title: 'Dokümanlar',
        href: '/is-yonetimi/dokumanlar',
        icon: FileText,
        description: 'Proje dokümanları'
      },
      {
        title: 'Takvim',
        href: '/is-yonetimi/takvim',
        icon: Calendar,
        description: 'Proje takvimi'
      },
      {
        title: 'Raporlar',
        href: '/is-yonetimi/raporlar',
        icon: BarChart3,
        description: 'Proje raporları'
      },
      {
        title: 'Ayarlar',
        href: '/is-yonetimi/ayarlar',
        icon: Settings,
        description: 'Proje ayarları'
      }
    ]
  },
  {
    title: 'Burs Yönetimi',
    href: '/burs-yonetimi',
    icon: GraduationCap,
    requiredRole: 'manager',
    description: 'Burs ve eğitim desteği',
    subItems: [
      {
        title: 'Kampanyalar',
        href: '/burs-yonetimi/kampanyalar',
        icon: Heart,
        description: 'Burs kampanyaları'
      },
      {
        title: 'Okullar',
        href: '/burs-yonetimi/okullar',
        icon: Building2,
        description: 'Eğitim kurumları'
      },
      {
        title: 'Yetimler',
        href: '/burs-yonetimi/yetimler',
        icon: Users,
        description: 'Yetim öğrenciler'
      },
      {
        title: 'Raporlar',
        href: '/burs-yonetimi/raporlar',
        icon: BarChart3,
        description: 'Burs istatistikleri'
      },
      {
        title: 'Ayarlar',
        href: '/burs-yonetimi/ayarlar',
        icon: Settings,
        description: 'Burs ayarları'
      }
    ]
  },
  {
    title: 'Kumbara Yönetimi',
    href: '/kumbara-yonetimi',
    icon: PiggyBank,
    requiredRole: 'user',
    description: 'Kumbara dağıtımı ve takibi',
    subItems: [
      {
        title: 'Kumbara Listesi',
        href: '/kumbara-yonetimi/liste',
        icon: PiggyBank,
        description: 'Tüm kumbaraların listesi'
      },
      {
        title: 'Dağıtım',
        href: '/kumbara-yonetimi/dagilim',
        icon: Truck,
        description: 'Kumbara dağıtım işlemleri'
      },
      {
        title: 'Hareketler',
        href: '/kumbara-yonetimi/hareketler',
        icon: BarChart3,
        description: 'Kumbara hareketleri'
      },
      {
        title: 'Raporlar',
        href: '/kumbara-yonetimi/raporlar',
        icon: BarChart3,
        description: 'Kumbara istatistikleri'
      },
      {
        title: 'Ayarlar',
        href: '/kumbara-yonetimi/ayarlar',
        icon: Settings,
        description: 'Kumbara ayarları'
      }
    ]
  },
  {
    title: 'Hukuk Yönetimi',
    href: '/hukuk-yonetimi',
    icon: Scale,
    requiredRole: 'manager',
    description: 'Hukuki işlemler',
    subItems: [
      {
        title: 'Avukatlar',
        href: '/hukuk-yonetimi/avukatlar',
        icon: Users,
        description: 'Avukat listesi'
      },
      {
        title: 'Davalar',
        href: '/hukuk-yonetimi/davalar',
        icon: Scale,
        description: 'Dava takibi'
      },
      {
        title: 'Belgeler',
        href: '/hukuk-yonetimi/belgeler',
        icon: FileText,
        description: 'Hukuki belgeler'
      },
      {
        title: 'Tebligatlar',
        href: '/hukuk-yonetimi/tebligatlar',
        icon: MessageSquare,
        description: 'Tebligat takibi'
      },
      {
        title: 'Takvim',
        href: '/hukuk-yonetimi/takvim',
        icon: Calendar,
        description: 'Hukuki takvim'
      },
      {
        title: 'Raporlar',
        href: '/hukuk-yonetimi/raporlar',
        icon: BarChart3,
        description: 'Hukuki raporlar'
      },
      {
        title: 'Ayarlar',
        href: '/hukuk-yonetimi/ayarlar',
        icon: Settings,
        description: 'Hukuk ayarları'
      }
    ]
  }
]

interface SidebarProps {
  isCollapsed?: boolean
}

export default function Sidebar({ isCollapsed = false }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const pathname = usePathname()
  const { user } = useAuth()

  const userRole = user?.profile?.role || 'viewer'

  const toggleExpanded = useCallback((title: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(title)) {
        newSet.delete(title)
      } else {
        newSet.add(title)
      }
      return newSet
    })
  }, [])

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      if (!item.requiredRole) return true
      return hasPermission(userRole, item.requiredRole)
    })
  }, [userRole])

  const renderSubMenuItem = (subItem: SubMenuItem, parentTitle: string) => {
    const isActive = pathname === subItem.href
    const hasAccess = !subItem.requiredRole || hasPermission(userRole, subItem.requiredRole)

    if (!hasAccess) return null

    return (
      <Link
        key={`${parentTitle}-${subItem.href}`}
        href={subItem.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
        title={subItem.description}
      >
        <subItem.icon className="h-4 w-4" />
        <span className="truncate">{subItem.title}</span>
      </Link>
    )
  }

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedItems.has(item.title)

    if (hasSubItems) {
      const visibleSubItems = item.subItems!.filter(subItem => 
        !subItem.requiredRole || hasPermission(userRole, subItem.requiredRole)
      )

      if (visibleSubItems.length === 0) return null

      return (
        <div key={item.href} className="space-y-1">
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            title={item.description}
          >
            <item.icon className="h-4 w-4" />
            <span className="truncate">{item.title}</span>
            {isExpanded ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-1">
              {visibleSubItems.map(subItem => renderSubMenuItem(subItem, item.title))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
        title={item.description}
      >
        <item.icon className="h-4 w-4" />
        <span className="truncate">{item.title}</span>
      </Link>
    )
  }

  return (
    <div className={cn(
      'flex h-full w-full flex-col gap-2',
      isCollapsed ? 'px-2' : 'px-4'
    )}>
      <div className="flex-1 space-y-2">
        {filteredMenuItems.map(renderMenuItem)}
      </div>
    </div>
  )
} 