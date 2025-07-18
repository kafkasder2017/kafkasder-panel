"use client";

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  FileText, 
  Bell, 
  Users, 
  Calendar,
  BarChart3,
  Settings 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HukukYonetimiLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    title: 'Ana Sayfa',
    href: '/hukuk-yonetimi',
    icon: Scale,
    description: 'Hukuk yönetimi genel bakış'
  },
  {
    title: 'Dava ve Dosyalar',
    href: '/hukuk-yonetimi/davalar',
    icon: FileText,
    description: 'Dava takibi ve dosya yönetimi'
  },
  {
    title: 'Tebligatlar',
    href: '/hukuk-yonetimi/tebligatlar',
    icon: Bell,
    description: 'Tebligat takibi ve yönetimi'
  },
  {
    title: 'Hukuki Belgeler',
    href: '/hukuk-yonetimi/belgeler',
    icon: FileText,
    description: 'Hukuki belge arşivi ve yönetimi'
  },
  {
    title: 'Avukatlar & Bürolar',
    href: '/hukuk-yonetimi/avukatlar',
    icon: Users,
    description: 'Avukat ve hukuk bürosu yönetimi'
  },
  {
    title: 'Hukuk Takvimi',
    href: '/hukuk-yonetimi/takvim',
    icon: Calendar,
    description: 'Duruşma ve hukuki etkinlik takvimi'
  },
  {
    title: 'Dava Raporları',
    href: '/hukuk-yonetimi/raporlar',
    icon: BarChart3,
    description: 'Detaylı hukuk raporları ve analizler'
  },
  {
    title: 'Ayarlar',
    href: '/hukuk-yonetimi/ayarlar',
    icon: Settings,
    description: 'Hukuk yönetimi ayarları'
  }
];

export default function HukukYonetimiLayout({ children }: HukukYonetimiLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hukuk Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Dava takibi, tebligatlar ve hukuki süreç yönetimi
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Scale className="w-4 h-4 mr-2" />
          Hukuk Modülü
        </Badge>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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