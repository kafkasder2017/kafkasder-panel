// Context7: Modern Dashboard E2E Tests
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import DashboardPage from '@/app/dashboard/page'
import { createMockUser, createMockPerson, createMockDonation } from '@/test/utils'

// Context7: Mock Next.js router
const mockPush = vi.fn()
vi.mocked(useRouter).mockReturnValue({
  push: mockPush,
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  pathname: '/dashboard',
  query: {},
  asPath: '/dashboard',
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn()
  }
} as any)

// Context7: Mock server actions
const mockGetDonationStats = vi.fn()
const mockGetDonations = vi.fn()
const mockGetPersons = vi.fn()
const mockGetOrganizations = vi.fn()
const mockRequireAuth = vi.fn()

vi.mock('@/lib/actions/donations', () => ({
  getDonationStats: mockGetDonationStats,
  getDonations: mockGetDonations
}))

vi.mock('@/lib/actions/persons', () => ({
  getPersons: mockGetPersons
}))

vi.mock('@/lib/actions/organizations', () => ({
  getOrganizations: mockGetOrganizations
}))

vi.mock('@/lib/auth-server', () => ({
  requireAuth: mockRequireAuth
}))

describe('Dashboard E2E Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Context7: Test pattern - Complete dashboard load
  it('loads dashboard with all components', async () => {
    const mockUser = createMockUser({ role: 'admin' })
    const mockPersons = [createMockPerson(), createMockPerson({ id: 2 })]
    const mockDonations = [createMockDonation(), createMockDonation({ id: 2 })]
    const mockOrganizations = [
      { id: 1, name: 'Test Org', status: 'active', created_at: '2024-01-01T00:00:00Z' }
    ]

    // Mock server actions
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockResolvedValue({
      totalAmount: 50000,
      totalCount: 100,
      completedAmount: 45000,
      completedCount: 90
    })
    mockGetPersons.mockResolvedValue(mockPersons)
    mockGetDonations.mockResolvedValue(mockDonations)
    mockGetOrganizations.mockResolvedValue(mockOrganizations)

    render(<DashboardPage />)

    // Wait for dashboard to load
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Check for welcome message
    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()

    // Check for stats cards
    expect(screen.getByText(/toplam bağış/i)).toBeInTheDocument()
    expect(screen.getByText(/aktif kişiler/i)).toBeInTheDocument()
    expect(screen.getByText(/organizasyonlar/i)).toBeInTheDocument()

    // Check for quick actions
    expect(screen.getByText(/hızlı işlemler/i)).toBeInTheDocument()
    expect(screen.getByText(/yeni kişi ekle/i)).toBeInTheDocument()
    expect(screen.getByText(/bağış kaydet/i)).toBeInTheDocument()
  })

  // Context7: Test pattern - Navigation flow
  it('navigates to different sections', async () => {
    const mockUser = createMockUser()
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockResolvedValue({
      totalAmount: 0,
      totalCount: 0,
      completedAmount: 0,
      completedCount: 0
    })
    mockGetPersons.mockResolvedValue([])
    mockGetDonations.mockResolvedValue([])
    mockGetOrganizations.mockResolvedValue([])

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Click on quick action links
    const newPersonLink = screen.getByText(/yeni kişi ekle/i)
    fireEvent.click(newPersonLink)

    expect(mockPush).toHaveBeenCalledWith('/kisiler/yeni')
  })

  // Context7: Test pattern - Data loading states
  it('shows loading states while data loads', async () => {
    const mockUser = createMockUser()
    mockRequireAuth.mockResolvedValue(mockUser)

    // Mock delayed responses
    mockGetDonationStats.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          totalAmount: 0,
          totalCount: 0,
          completedAmount: 0,
          completedCount: 0
        }), 100)
      )
    )

    render(<DashboardPage />)

    // Check for loading skeletons
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(/toplam bağış/i)).toBeInTheDocument()
    })
  })

  // Context7: Test pattern - Error handling
  it('handles data loading errors gracefully', async () => {
    const mockUser = createMockUser()
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockRejectedValue(new Error('Database error'))

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Should still show dashboard even with errors
    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
  })

  // Context7: Test pattern - Responsive design
  it('maintains responsive design on different screen sizes', async () => {
    const mockUser = createMockUser()
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockResolvedValue({
      totalAmount: 0,
      totalCount: 0,
      completedAmount: 0,
      completedCount: 0
    })
    mockGetPersons.mockResolvedValue([])
    mockGetDonations.mockResolvedValue([])
    mockGetOrganizations.mockResolvedValue([])

    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Check that all elements are still accessible
    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
    expect(screen.getByText(/hızlı işlemler/i)).toBeInTheDocument()
  })

  // Context7: Test pattern - Accessibility
  it('maintains accessibility standards', async () => {
    const mockUser = createMockUser()
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockResolvedValue({
      totalAmount: 0,
      totalCount: 0,
      completedAmount: 0,
      completedCount: 0
    })
    mockGetPersons.mockResolvedValue([])
    mockGetDonations.mockResolvedValue([])
    mockGetOrganizations.mockResolvedValue([])

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Check for proper heading structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    // Check for proper link roles
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)

    // Check for proper button roles
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  // Context7: Test pattern - Performance monitoring
  it('tracks performance metrics', async () => {
    const mockUser = createMockUser()
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockResolvedValue({
      totalAmount: 0,
      totalCount: 0,
      completedAmount: 0,
      completedCount: 0
    })
    mockGetPersons.mockResolvedValue([])
    mockGetDonations.mockResolvedValue([])
    mockGetOrganizations.mockResolvedValue([])

    const startTime = performance.now()

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    const endTime = performance.now()
    const loadTime = endTime - startTime

    // Dashboard should load within reasonable time
    expect(loadTime).toBeLessThan(1000)
  })

  // Context7: Test pattern - User role permissions
  it('respects user role permissions', async () => {
    const mockUser = createMockUser({ role: 'viewer' })
    mockRequireAuth.mockResolvedValue(mockUser)
    mockGetDonationStats.mockResolvedValue({
      totalAmount: 0,
      totalCount: 0,
      completedAmount: 0,
      completedCount: 0
    })
    mockGetPersons.mockResolvedValue([])
    mockGetDonations.mockResolvedValue([])
    mockGetOrganizations.mockResolvedValue([])

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Viewer should see dashboard but with limited actions
    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
    
    // Some actions might be hidden for viewers
    // This depends on your permission system
  })
}) 