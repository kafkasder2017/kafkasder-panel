'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Briefcase, 
  CheckSquare, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3,
  Settings,
  ChevronDown,
  Clock,
  Target,
  Award
} from 'lucide-react';

const menuItems = [
  {
    title: 'Proje Yönetimi',
    href: '/is-yonetimi',
    icon: Briefcase,
    description: 'Proje ve görev takibi'
  },
  {
    title: 'Görev Yönetimi',
    href: '/is-yonetimi/gorevler',
    icon: CheckSquare,
    description: 'Görev atama ve takibi'
  },
  {
    title: 'Ekip Yönetimi',
    href: '/is-yonetimi/ekip',
    icon: Users,
    description: 'Ekip üyeleri ve roller'
  },
  {
    title: 'Takvim & Planlama',
    href: '/is-yonetimi/takvim',
    icon: Calendar,
    description: 'Proje takvimi ve planlama'
  },
  {
    title: 'Raporlar & Analiz',
    href: '/is-yonetimi/raporlar',
    icon: BarChart3,
    description: 'Performans raporları'
  },
  {
    title: 'Doküman Yönetimi',
    href: '/is-yonetimi/dokumanlar',
    icon: FileText,
    description: 'Proje dokümanları'
  },
  {
    title: 'Ayarlar',
    href: '/is-yonetimi/ayarlar',
    icon: Settings,
    description: 'Sistem ayarları'
  }
];

export default function IsYonetimiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-white shadow-lg transition-all duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">İş Yönetimi</h2>
          <p className="text-sm text-gray-600">Proje ve görev yönetimi sistemi</p>
        </div>
        
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-600"
                    )} />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <h3 className="text-sm font-medium mb-2">Hızlı İstatistikler</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Aktif Projeler:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span>Bekleyen Görevler:</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span>Tamamlanan:</span>
                <span className="font-semibold">%78</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronDown className={cn(
                  "w-5 h-5 transition-transform",
                  isSidebarOpen ? "rotate-180" : "rotate-0"
                )} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">İş Yönetimi</h1>
                <p className="text-gray-600">Proje ve görev yönetimi sistemi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Aktif Projeler</div>
                <div className="text-lg font-semibold text-purple-600">12</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Bu Hafta</div>
                <div className="text-lg font-semibold text-green-600">8 Görev</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Performans</div>
                <div className="text-lg font-semibold text-blue-600">%92</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 