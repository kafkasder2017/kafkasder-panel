'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { hasPermission, modulePermissions } from '@/lib/auth'
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
}

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission?: string
  description?: string
  subItems?: SubMenuItem[]
}

// Context7 Pattern: Organized menu items with clear hierarchy and submenus
const menuItems: MenuItem[] = [
  {
    title: 'Ana Sayfa',
    href: '/',
    icon: LayoutDashboard,
    permission: modulePermissions.DASHBOARD,
    description: 'Genel bakış ve istatistikler'
  },
  {
    title: 'Bağış Yönetimi',
    href: '/bagislar',
    icon: Heart,
    permission: modulePermissions.DONATIONS,
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
    permission: modulePermissions.PEOPLE,
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
    permission: modulePermissions.ORGANIZATIONS,
    description: 'Organizasyon yönetimi'
  },
  {
    title: 'Yardım Yönetimi',
    href: '/yardimlar',
    icon: Package,
    permission: modulePermissions.AID,
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
        description: 'Eşya ve gıda yardımları'
      },
      {
        title: 'Onay Süreci',
        href: '/yardimlar/onay-sureci',
        icon: Package,
        description: 'Yardım onay süreçleri'
      }
    ]
  },
  {
    title: 'Üye Yönetimi',
    href: '/uyeler',
    icon: UserCheck,
    permission: modulePermissions.MEMBERS,
    description: 'Üye işlemleri',
    subItems: [
      {
        title: 'Üye Listesi',
        href: '/uyeler',
        icon: UserCheck,
        description: 'Tüm üyelerin listesi'
      },
      {
        title: 'Aidat Yönetimi',
        href: '/uyeler/aidat',
        icon: DollarSign,
        description: 'Üye aidat işlemleri'
      },
      {
        title: 'Üye Tanımları',
        href: '/uyeler/tanimlar',
        icon: UserCheck,
        description: 'Üye kategorileri ve tanımları'
      },
      {
        title: 'Üye Raporları',
        href: '/uyeler/raporlar',
        icon: BarChart3,
        description: 'Üye istatistikleri'
      }
    ]
  },
  {
    title: 'Finans & Fon',
    href: '/finans',
    icon: DollarSign,
    permission: modulePermissions.FINANCE,
    description: 'Finansal işlemler',
    subItems: [
      {
        title: 'Genel Bakış',
        href: '/finans',
        icon: DollarSign,
        description: 'Finansal genel bakış'
      },
      {
        title: 'Banka İşlemleri',
        href: '/finans/banka-islemleri',
        icon: DollarSign,
        description: 'Banka hesap işlemleri'
      },
      {
        title: 'Döviz Kurları',
        href: '/finans/doviz-kurlari',
        icon: DollarSign,
        description: 'Güncel döviz kurları'
      },
      {
        title: 'Kasa Raporları',
        href: '/finans/kasa-raporlari',
        icon: BarChart3,
        description: 'Kasa ve nakit raporları'
      },
      {
        title: 'Dosya Yükleme',
        href: '/finans/dosya-yukleme',
        icon: Package,
        description: 'Finansal belge yükleme'
      }
    ]
  },
  {
    title: 'Mesajlaşma',
    href: '/mesajlasma',
    icon: MessageSquare,
    permission: modulePermissions.MESSAGING,
    description: 'İletişim araçları',
    subItems: [
      {
        title: 'Genel Bakış',
        href: '/mesajlasma',
        icon: MessageSquare,
        description: 'Mesajlaşma genel bakış'
      },
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
        title: 'Gruplar',
        href: '/mesajlasma/gruplar',
        icon: Users,
        description: 'Mesaj grupları'
      },
      {
        title: 'Şablonlar',
        href: '/mesajlasma/sablonlar',
        icon: MessageSquare,
        description: 'Mesaj şablonları'
      },
      {
        title: 'Raporlar',
        href: '/mesajlasma/raporlar',
        icon: BarChart3,
        description: 'Mesajlaşma raporları'
      }
    ]
  },
  {
    title: 'İş Yönetimi',
    href: '/is-yonetimi',
    icon: Calendar,
    permission: modulePermissions.WORK,
    description: 'Proje ve görev yönetimi',
    subItems: [
      {
        title: 'Genel Bakış',
        href: '/is-yonetimi',
        icon: Calendar,
        description: 'İş yönetimi genel bakış'
      },
      {
        title: 'Görevler',
        href: '/is-yonetimi/gorevler',
        icon: Calendar,
        description: 'Görev yönetimi'
      },
      {
        title: 'Ekip',
        href: '/is-yonetimi/ekip',
        icon: Users,
        description: 'Ekip yönetimi'
      },
      {
        title: 'Dokümanlar',
        href: '/is-yonetimi/dokumanlar',
        icon: Package,
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
        description: 'İş yönetimi raporları'
      },
      {
        title: 'Ayarlar',
        href: '/is-yonetimi/ayarlar',
        icon: Settings,
        description: 'İş yönetimi ayarları'
      }
    ]
  },
  {
    title: 'Burs Yönetimi',
    href: '/burs-yonetimi',
    icon: GraduationCap,
    permission: modulePermissions.SCHOLARSHIP,
    description: 'Burs süreçleri',
    subItems: [
      {
        title: 'Genel Bakış',
        href: '/burs-yonetimi',
        icon: GraduationCap,
        description: 'Burs yönetimi genel bakış'
      },
      {
        title: 'Yetimler',
        href: '/burs-yonetimi/yetimler',
        icon: Users,
        description: 'Yetim öğrenci kayıtları'
      },
      {
        title: 'Okullar',
        href: '/burs-yonetimi/okullar',
        icon: Building2,
        description: 'Okul kayıtları'
      },
      {
        title: 'Kampanyalar',
        href: '/burs-yonetimi/kampanyalar',
        icon: GraduationCap,
        description: 'Burs kampanyaları'
      },
      {
        title: 'Raporlar',
        href: '/burs-yonetimi/raporlar',
        icon: BarChart3,
        description: 'Burs raporları'
      },
      {
        title: 'Ayarlar',
        href: '/burs-yonetimi/ayarlar',
        icon: Settings,
        description: 'Burs yönetimi ayarları'
      }
    ]
  },
  {
    title: 'Kumbara Yönetimi',
    href: '/kumbara-yonetimi',
    icon: PiggyBank,
    permission: modulePermissions.PIGGY_BANK,
    description: 'Kumbara takibi',
    subItems: [
      {
        title: 'Genel Bakış',
        href: '/kumbara-yonetimi',
        icon: PiggyBank,
        description: 'Kumbara yönetimi genel bakış'
      },
      {
        title: 'Kumbara Listesi',
        href: '/kumbara-yonetimi/liste',
        icon: PiggyBank,
        description: 'Tüm kumbaraların listesi'
      },
      {
        title: 'Dağıtım',
        href: '/kumbara-yonetimi/dagilim',
        icon: Package,
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
        description: 'Kumbara raporları'
      },
      {
        title: 'Ayarlar',
        href: '/kumbara-yonetimi/ayarlar',
        icon: Settings,
        description: 'Kumbara yönetimi ayarları'
      }
    ]
  },
  {
    title: 'Hukuk Yönetimi',
    href: '/hukuk-yonetimi',
    icon: Scale,
    permission: modulePermissions.LEGAL,
    description: 'Hukuki işlemler',
    subItems: [
      {
        title: 'Genel Bakış',
        href: '/hukuk-yonetimi',
        icon: Scale,
        description: 'Hukuk yönetimi genel bakış'
      },
      {
        title: 'Davalar',
        href: '/hukuk-yonetimi/davalar',
        icon: Scale,
        description: 'Dava takibi'
      },
      {
        title: 'Avukatlar',
        href: '/hukuk-yonetimi/avukatlar',
        icon: Users,
        description: 'Avukat kayıtları'
      },
      {
        title: 'Belgeler',
        href: '/hukuk-yonetimi/belgeler',
        icon: Package,
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
        description: 'Hukuk raporları'
      },
      {
        title: 'Ayarlar',
        href: '/hukuk-yonetimi/ayarlar',
        icon: Settings,
        description: 'Hukuk yönetimi ayarları'
      }
    ]
  },
  {
    title: 'Parametreler',
    href: '/parametreler',
    icon: Settings,
    permission: modulePermissions.PARAMETERS,
    description: 'Sistem ayarları'
  },
]

interface SidebarProps {
  isCollapsed?: boolean
}

export default function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Context7 Pattern: Memoized active check with better logic
  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }, [pathname])

  // Context7 Pattern: Memoized filtered menu items
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      if (item.permission && !hasPermission(user, item.permission)) {
        return false
      }
      return true
    })
  }, [user])

  // Context7 Pattern: Toggle submenu expansion
  const toggleExpanded = useCallback((itemTitle: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle)
      } else {
        newSet.add(itemTitle)
      }
      return newSet
    })
  }, [])

  // Context7 Pattern: Check if any subitem is active
  const hasActiveSubItem = useCallback((subItems: SubMenuItem[]) => {
    return subItems.some(subItem => isActive(subItem.href))
  }, [isActive])

  const renderSubMenuItem = (subItem: SubMenuItem, parentTitle: string) => {
    const isSubItemActive = isActive(subItem.href)
    const SubIcon = subItem.icon

    return (
      <Link
        key={subItem.href}
        href={subItem.href}
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ml-8',
          'hover:bg-gray-50 hover:shadow-sm',
          isSubItemActive
            ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <div className={cn(
          'flex items-center justify-center w-6 h-6 rounded-md transition-colors',
          isSubItemActive
            ? 'bg-blue-100 text-blue-600'
            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-600'
        )}>
          <SubIcon className="h-3 w-3" />
        </div>
        
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="truncate font-medium">{subItem.title}</span>
            </div>
            {subItem.description && (
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {subItem.description}
              </p>
            )}
          </div>
        )}
      </Link>
    )
  }

  const renderMenuItem = (item: MenuItem) => {
    const isItemActive = isActive(item.href)
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedItems.has(item.title)
    const hasActiveSub = hasSubItems && hasActiveSubItem(item.subItems!)

    return (
      <div key={item.href} className="space-y-1">
        <div className="flex items-center">
          <Link
            href={hasSubItems ? '#' : item.href}
            onClick={hasSubItems ? (e) => {
              e.preventDefault()
              toggleExpanded(item.title)
            } : undefined}
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 flex-1',
              'hover:bg-gray-50 hover:shadow-sm',
              (isItemActive || hasActiveSub)
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            )}
          >
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
              (isItemActive || hasActiveSub)
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700'
            )}>
              <item.icon className="h-4 w-4" />
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="truncate font-medium">{item.title}</span>
                  {hasSubItems && (
                    isExpanded ? (
                      <ChevronDown className="h-3 w-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-gray-500" />
                    )
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </Link>
        </div>

        {/* Submenu Items */}
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
            {item.subItems!.map(subItem => renderSubMenuItem(subItem, item.title))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo/Brand Section */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">KAFKASDER</h1>
              <p className="text-xs text-gray-500">Yönetim Paneli</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredMenuItems.map(renderMenuItem)}
        </nav>
      </div>
      
      {/* User Info - Simplified and moved to bottom */}
      {!isCollapsed && user && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.email || 'Kullanıcı'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.role || 'Üye'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 