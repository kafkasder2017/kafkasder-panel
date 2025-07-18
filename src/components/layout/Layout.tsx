'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Sidebar from './sidebar'
import Header from './header'
import { PageLoading } from '@/components/ui/loading'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Context7 Pattern: Memoized public routes
  const publicRoutes = useMemo(() => [
    '/auth/login', 
    '/auth/register', 
    '/auth/forgot-password', 
    '/auth/reset-password'
  ], [])

  // Context7 Pattern: Memoized route check
  const isPublicRoute = useMemo(() => 
    publicRoutes.includes(pathname), 
    [pathname, publicRoutes]
  )

  // Context7 Pattern: Stable callback for navigation
  const handleAuthRedirect = useCallback(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        router.push('/auth/login')
      } else if (user && isPublicRoute) {
        router.push('/')
      }
    }
  }, [user, loading, isPublicRoute, router])

  useEffect(() => {
    handleAuthRedirect()
  }, [handleAuthRedirect])

  // Context7 Pattern: Stable callback for mobile sidebar toggle
  const handleMobileSidebarToggle = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev)
  }, [])

  // Loading durumu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <PageLoading />
      </div>
    )
  }

  // Public route ise sadece children'ı render et
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Kullanıcı yoksa loading göster
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <PageLoading />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-16'}
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          shadow-sm
        `}
      >
        <Sidebar isCollapsed={!isSidebarOpen} />
      </aside>

      {/* Main content */}
      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}
        `}
      >
        {/* Header */}
        <Header
          onSidebarToggle={handleMobileSidebarToggle}
          isSidebarOpen={isMobileSidebarOpen}
        />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 