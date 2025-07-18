"use client";

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PiggyBank, 
  List, 
  Truck, 
  BarChart3, 
  Activity,
  Settings 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface KumbaraYonetimiLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    title: 'Ana Sayfa',
    href: '/kumbara-yonetimi',
    icon: PiggyBank,
    description: 'Kumbara yönetimi genel bakış'
  },
  {
    title: 'Kumbara Listesi',
    href: '/kumbara-yonetimi/liste',
    icon: List,
    description: 'Tüm kumbaraları görüntüle ve yönet'
  },
  {
    title: 'Kumbara Dağıtımı',
    href: '/kumbara-yonetimi/dagilim',
    icon: Truck,
    description: 'Yeni kumbara dağıtım işlemleri'
  },
  {
    title: 'Kumbara Raporları',
    href: '/kumbara-yonetimi/raporlar',
    icon: BarChart3,
    description: 'Detaylı kumbara raporları ve analizler'
  },
  {
    title: 'Kumbara Hareketleri',
    href: '/kumbara-yonetimi/hareketler',
    icon: Activity,
    description: 'Kumbara toplama ve boşaltma işlemleri'
  },
  {
    title: 'Ayarlar',
    href: '/kumbara-yonetimi/ayarlar',
    icon: Settings,
    description: 'Kumbara yönetimi ayarları'
  }
];

export default function KumbaraYonetimiLayout({ children }: KumbaraYonetimiLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kumbara Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Kumbara dağıtımı, takibi ve raporlama işlemleri
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <PiggyBank className="w-4 h-4 mr-2" />
          Kumbara Modülü
        </Badge>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        isActive ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        isActive ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
} 