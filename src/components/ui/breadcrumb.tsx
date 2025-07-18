'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbProps {
  className?: string
}

// Module name mapping
const moduleNames: Record<string, string> = {
  'bagislar': 'Bağış Yönetimi',
  'kisiler': 'Kişiler & Kurumlar',
  'organizasyonlar': 'Organizasyonlar',
  'yardimlar': 'Yardım Yönetimi',
  'uyeler': 'Üye Yönetimi',
  'finans': 'Finans & Fon',
  'mesajlasma': 'Mesajlaşma',
  'is-yonetimi': 'İş Yönetimi',
  'burs-yonetimi': 'Burs Yönetimi',
  'kumbara-yonetimi': 'Kumbara Yönetimi',
  'hukuk-yonetimi': 'Hukuk Yönetimi',
  'parametreler': 'Parametreler',
  'auth': 'Kimlik Doğrulama',
  'login': 'Giriş',
  'register': 'Kayıt',
  'dashboard': 'Dashboard'
}

// Sub-module name mapping
const subModuleNames: Record<string, string> = {
  'nakit-bagislar': 'Nakit Bağışlar',
  'cek-senet-bagislar': 'Çek/Senet Bağışlar',
  'kredi-karti-bagislar': 'Kredi Kartı Bağışları',
  'online-bagislar': 'Online Bağışlar',
  'tekrarli-islemler': 'Tekrarlı İşlemler',
  'ayni-bagislar': 'Ayni Bağışlar',
  'kumbaralar': 'Kumbaralar',
  'toplu-provizyon': 'Toplu Provizyon',
  'teslimat-gonderimler': 'Teslimat & Gönderimler',
  'sms-email-abonelik': 'SMS/e-Posta Aboneliği',
  'raporlar': 'Raporlar',
  'yeni': 'Yeni',
  'kurumlar': 'Kurumlar',
  'alanlar': 'Yardım Alanlar',
  'basvurular': 'Başvurular',
  'nakdi-yardim': 'Nakdi Yardım',
  'ayni-yardim': 'Ayni Yardım',
  'onay-sureci': 'Onay Süreci',
  'aidat': 'Aidat',
  'tanimlar': 'Tanımlar',
  'banka-islemleri': 'Banka İşlemleri',
  'kasa-raporlari': 'Kasa Raporları',
  'doviz-kurlari': 'Döviz Kurları',
  'dosya-yukleme': 'Dosya Yükleme',
  'email': 'E-Posta',
  'whatsapp': 'WhatsApp',
  'gruplar': 'Gruplar',
  'sablonlar': 'Şablonlar',
  'gorevler': 'Görevler',
  'ekip': 'Ekip',
  'dokumanlar': 'Dokümanlar',
  'takvim': 'Takvim',
  'ayarlar': 'Ayarlar',
  'yetimler': 'Yetimler',
  'kampanyalar': 'Kampanyalar',
  'okullar': 'Okullar',
  'liste': 'Liste',
  'dagilim': 'Dağıtım',
  'hareketler': 'Hareketler',
  'davalar': 'Davalar',
  'tebligatlar': 'Tebligatlar',
  'belgeler': 'Belgeler',
  'avukatlar': 'Avukatlar',
  'debug': 'Debug'
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname()
  
  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = [
      {
        name: 'Ana Sayfa',
        href: '/',
        icon: Home
      }
    ]

    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Get display name for the segment
      let displayName = moduleNames[segment] || subModuleNames[segment] || segment
      
      // Convert kebab-case to readable text if no mapping exists
      if (!moduleNames[segment] && !subModuleNames[segment]) {
        displayName = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      breadcrumbs.push({
        name: displayName,
        href: currentPath,
        icon: undefined as any
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null
  }

  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        
        return (
          <div key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
            
            {isLast ? (
              <span className="font-medium text-foreground">
                {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4 inline mr-1" />}
                {breadcrumb.name}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="hover:text-foreground transition-colors flex items-center"
              >
                {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4 mr-1" />}
                {breadcrumb.name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
} 