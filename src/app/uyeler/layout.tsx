'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Users,
  DollarSign,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Üye Listesi',
    href: '/uyeler',
    icon: Users,
    description: 'Tüm üyelerin listesi ve yönetimi',
  },
  {
    title: 'Aidat Takibi',
    href: '/uyeler/aidat',
    icon: DollarSign,
    description: 'Üye aidat ödemeleri ve takibi',
  },
  {
    title: 'Raporlar',
    href: '/uyeler/raporlar',
    icon: BarChart3,
    description: 'Üye istatistikleri ve raporları',
  },
  {
    title: 'Tanımlar',
    href: '/uyeler/tanimlar',
    icon: Settings,
    description: 'Üyelik tipleri ve parametreler',
  },
]

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-background border-r transition-all duration-300`}>
        <div className="p-4">
          <h2 className={`font-semibold ${isSidebarOpen ? 'text-lg' : 'text-sm'}`}>
            {isSidebarOpen ? 'Üye Yönetimi' : 'Üye'}
          </h2>
        </div>
        
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Card className={`cursor-pointer transition-all hover:shadow-md ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {isSidebarOpen && (
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.title}
                          </p>
                          <p className={`text-xs truncate ${
                            isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      )}
                      {isActive && isSidebarOpen && (
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 