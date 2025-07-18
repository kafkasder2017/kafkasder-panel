'use client'

import { useState, useCallback, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

interface HeaderProps {
  onSidebarToggle?: () => void
  isSidebarOpen?: boolean
}

export default function Header({ onSidebarToggle, isSidebarOpen = true }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { user, signOut } = useAuth()

  // Context7 Pattern: Stable callback for sign out
  const handleSignOut = useCallback(async () => {
    await signOut()
    setIsUserMenuOpen(false)
  }, [signOut])

  // Context7 Pattern: Stable callback for user menu toggle
  const handleUserMenuToggle = useCallback(() => {
    setIsUserMenuOpen(prev => !prev)
  }, [])

  // Context7 Pattern: Stable callback for notifications toggle
  const handleNotificationsToggle = useCallback(() => {
    setIsNotificationsOpen(prev => !prev)
  }, [])

  // Context7 Pattern: Memoized notifications data
  const notifications = useMemo(() => [
    {
      id: 1,
      type: 'donation',
      title: 'Yeni bağış alındı',
      description: 'Ahmet Yılmaz tarafından 500 TL bağış yapıldı',
      time: '2 saat önce',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'aid',
      title: 'Yardım talebi onaylandı',
      description: 'Fatma Demir\'in yardım talebi onaylandı',
      time: '4 saat önce',
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Toplantı hatırlatması',
      description: 'Yarın saat 14:00\'da yönetim kurulu toplantısı',
      time: '1 gün önce',
      color: 'bg-yellow-500'
    }
  ], [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onSidebarToggle}
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        {/* Breadcrumb */}
        <div className="hidden md:block flex-1">
          <Breadcrumb />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Ara..."
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationsToggle}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <Card className="absolute right-0 top-12 w-80 shadow-lg border border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`h-2 w-2 rounded-full ${notification.color} mt-2 flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="w-full">
                      Tüm bildirimleri gör
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* User menu - Simplified and cleaner */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserMenuToggle}
              className="relative"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* User dropdown - Cleaner design */}
            {isUserMenuOpen && (
              <Card className="absolute right-0 top-12 w-48 shadow-lg border border-gray-200">
                <CardContent className="p-2">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Ayarlar
                    </Button>
                    
                    <div className="border-t border-gray-200 pt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Çıkış Yap
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 