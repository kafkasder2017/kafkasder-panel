"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Package, 
  Building2, 
  Clock,
  CheckCircle
} from 'lucide-react';

interface YardimlarLayoutProps {
  children: ReactNode;
}

const yardimMenuItems = [
  {
    title: 'Yardım Alanlar',
    href: '/yardimlar/alanlar',
    icon: Users,
    description: 'Yardım alan kişilerin listesi ve detayları'
  },
  {
    title: 'Yardım Başvuruları',
    href: '/yardimlar/basvurular',
    icon: FileText,
    description: 'Gelen yardım başvuruları ve durumları'
  },
  {
    title: 'Nakdi Yardım İşlemleri',
    href: '/yardimlar/nakdi-yardim',
    icon: CreditCard,
    description: 'Para yardımları ve ödemeler'
  },
  {
    title: 'Ayni Yardım İşlemleri',
    href: '/yardimlar/ayni-yardim',
    icon: Package,
    description: 'Eşya, gıda, giysi yardımları'
  },
  {
    title: 'Banka Ödeme Emirleri',
    href: '/yardimlar/banka-odemeler',
    icon: Building2,
    description: 'Banka üzerinden yapılan ödemeler'
  },
  {
    title: 'Hizmet Takip İşlemleri',
    href: '/yardimlar/hizmet-takip',
    icon: Clock,
    description: 'Hizmet yardımlarının takibi'
  },
  {
    title: 'Onay Süreci',
    href: '/yardimlar/onay-sureci',
    icon: CheckCircle,
    description: 'Çok adımlı onay süreçleri'
  }
];

export default function YardimlarLayout({ children }: YardimlarLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Yardım Yönetimi</h2>
          <p className="text-sm text-gray-600">Yardım süreçlerini yönetin</p>
        </div>
        
        <nav className="space-y-2">
          {yardimMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 