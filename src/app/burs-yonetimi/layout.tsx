'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3,
  Settings,
  ChevronDown,
  Clock,
  Target,
  Award,
  School,
  BookOpen,
  Heart,
  Star,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const menuItems = [
  {
    title: 'Burs Yönetimi',
    href: '/burs-yonetimi',
    icon: GraduationCap,
    description: 'Burs başvuruları ve takibi'
  },
  {
    title: 'Yetimler & Öğrenciler',
    href: '/burs-yonetimi/yetimler',
    icon: Users,
    description: 'Yetim ve öğrenci kayıtları'
  },
  {
    title: 'Burs Kampanyaları',
    href: '/burs-yonetimi/kampanyalar',
    icon: Target,
    description: 'Burs kampanyası yönetimi'
  },
  {
    title: 'Okullar',
    href: '/burs-yonetimi/okullar',
    icon: School,
    description: 'Okul ve eğitim kurumları'
  },
  {
    title: 'Burs Raporları',
    href: '/burs-yonetimi/raporlar',
    icon: BarChart3,
    description: 'Burs istatistikleri ve raporlar'
  },
  {
    title: 'Ayarlar',
    href: '/burs-yonetimi/ayarlar',
    icon: Settings,
    description: 'Burs modülü ayarları'
  }
];

export default function BursYonetimiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">Burs Yönetimi</span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                isCollapsed && "rotate-90"
              )} />
            </button>
          </div>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                    )} />
                    {!isCollapsed && (
                      <div className="flex-1">
                        <div>{item.title}</div>
                        <div className="text-xs text-gray-500 font-normal">
                          {item.description}
                        </div>
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Aktif Burslar</span>
                <span className="font-semibold text-green-600">156</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Bekleyen Başvuru</span>
                <span className="font-semibold text-orange-600">23</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Bu Ay Ödenen</span>
                <span className="font-semibold text-blue-600">₺45,200</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 