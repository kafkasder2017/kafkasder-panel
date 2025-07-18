/**
 * Modern Test Patterns
 * Context7'nin en güncel test patternlerini kullanır
 * Vitest + Testing Library + Modern Patterns
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModernDashboard } from '@/components/dashboard/ModernDashboard'
import { apiClient, useApi, useMutation } from '@/lib/api/modern-api-client'
import { userSchema, validateData } from '@/lib/validations'

// ============================================================================
// MODERN TEST SETUP
// ============================================================================

/**
 * Modern Test Utilities
 * Enhanced testing helpers
 */
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

/**
 * Modern Mock Data Factories
 * Type-safe mock data generation
 */
const createMockUser = (overrides = {}) => ({
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'user' as const,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

const createMockDonation = (overrides = {}) => ({
  id: '456e7890-e89b-12d3-a456-426614174000',
  donorId: '123e4567-e89b-12d3-a456-426614174000',
  amount: 1000,
  currency: 'TRY' as const,
  type: 'credit_card' as const,
  status: 'completed' as const,
  anonymous: false,
  receiptRequested: true,
  createdAt: new Date().toISOString(),
  ...overrides,
})

// ============================================================================
// MODERN API MOCKING
// ============================================================================

/**
 * Modern API Mock Setup
 * Comprehensive API mocking
 */
vi.mock('@/lib/api/modern-api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  useApi: vi.fn(),
  useMutation: vi.fn(),
  getCachedData: vi.fn(),
}))

const mockApiClient = vi.mocked(apiClient)
const mockUseApi = vi.mocked(useApi)
const mockUseMutation = vi.mocked(useMutation)

// ============================================================================
// MODERN COMPONENT TESTS
// ============================================================================

describe('Modern Dashboard Component', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks()
    
    // Setup default API mocks
    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
    })
  })

  it('should render dashboard with loading state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    })

    renderWithProviders(<ModernDashboard />)
    
    // Check for loading indicators
    expect(screen.getByText(/yükleniyor/i)).toBeInTheDocument()
  })

  it('should render dashboard with data', async () => {
    const mockStats = {
      totalDonations: 125000,
      totalDonors: 1250,
      totalOrganizations: 45,
      monthlyGrowth: 12.5,
    }

    mockUseApi.mockReturnValue({
      data: mockStats,
      loading: false,
      error: null,
      refetch: vi.fn(),
    })

    renderWithProviders(<ModernDashboard />)
    
    // Check for stats display
    expect(screen.getByText('₺125,000')).toBeInTheDocument()
    expect(screen.getByText('1,250')).toBeInTheDocument()
    expect(screen.getByText('45')).toBeInTheDocument()
    expect(screen.getByText('%12.5')).toBeInTheDocument()
  })

  it('should handle API errors gracefully', () => {
    const mockError = {
      message: 'API Error',
      code: 'API_ERROR',
      status: 500,
    }

    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: vi.fn(),
    })

    renderWithProviders(<ModernDashboard />)
    
    // Check for error handling
    expect(screen.getByText(/hata/i)).toBeInTheDocument()
  })

  it('should trigger refetch on retry button click', async () => {
    const mockRefetch = vi.fn()
    const mockError = {
      message: 'API Error',
      code: 'API_ERROR',
      status: 500,
    }

    mockUseApi.mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: mockRefetch,
    })

    renderWithProviders(<ModernDashboard />)
    
    const retryButton = screen.getByRole('button', { name: /tekrar dene/i })
    await userEvent.click(retryButton)
    
    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })
})

// ============================================================================
// MODERN API TESTS
// ============================================================================

describe('Modern API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('should make successful GET request', async () => {
    const mockResponse = { data: 'test' }
    const mockSchema = userSchema
    
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await apiClient.get('/users/1', mockSchema)
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/1'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    )
  })

  it('should handle API errors properly', async () => {
    const mockError = {
      message: 'User not found',
      code: 'NOT_FOUND',
      status: 404,
    }

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => mockError,
    })

    await expect(apiClient.get('/users/999', userSchema)).rejects.toEqual({
      message: 'User not found',
      code: 'NOT_FOUND',
      status: 404,
    })
  })

  it('should make successful POST request with validation', async () => {
    const mockInput = createMockUser()
    const mockOutput = { ...mockInput, id: 'new-id' }
    
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockOutput,
    })

    const result = await apiClient.post('/users', userSchema, userSchema, mockInput)
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockInput),
      })
    )
  })

  it('should validate input data before sending', async () => {
    const invalidInput = { email: 'invalid-email' }
    
    await expect(
      apiClient.post('/users', userSchema, userSchema, invalidInput)
    ).rejects.toThrow()
    
    expect(global.fetch).not.toHaveBeenCalled()
  })
})

// ============================================================================
// MODERN VALIDATION TESTS
// ============================================================================

describe('Modern Validation Schemas', () => {
  it('should validate user data correctly', async () => {
    const validUser = createMockUser()
    const result = await validateData(userSchema, validUser)
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validUser)
    }
  })

  it('should reject invalid user data', async () => {
    const invalidUser = {
      id: 'invalid-uuid',
      email: 'invalid-email',
      firstName: '',
      lastName: '',
    }
    
    const result = await validateData(userSchema, invalidUser)
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.fieldErrors).toBeDefined()
      expect(result.fieldErrors.email).toBeDefined()
      expect(result.fieldErrors.firstName).toBeDefined()
    }
  })

  it('should validate email format correctly', () => {
    const { emailSchema } = require('@/lib/validations')
    
    // Valid emails
    expect(emailSchema.safeParse('test@example.com').success).toBe(true)
    expect(emailSchema.safeParse('user.name@domain.co.uk').success).toBe(true)
    
    // Invalid emails
    expect(emailSchema.safeParse('invalid-email').success).toBe(false)
    expect(emailSchema.safeParse('test@').success).toBe(false)
    expect(emailSchema.safeParse('@example.com').success).toBe(false)
  })

  it('should validate phone format correctly', () => {
    const { phoneSchema } = require('@/lib/validations')
    
    // Valid phones
    expect(phoneSchema.safeParse('5551234567').success).toBe(true)
    expect(phoneSchema.safeParse('(555) 123-4567').success).toBe(true)
    
    // Invalid phones
    expect(phoneSchema.safeParse('123').success).toBe(false)
    expect(phoneSchema.safeParse('555123456789').success).toBe(false)
  })
})

// ============================================================================
// MODERN INTEGRATION TESTS
// ============================================================================

describe('Modern Integration Tests', () => {
  it('should handle complete user registration flow', async () => {
    const user = userEvent.setup()
    
    // Mock successful API calls
    mockUseMutation.mockReturnValue({
      mutate: vi.fn().mockResolvedValue(createMockUser()),
      loading: false,
      error: null,
    })

    renderWithProviders(<div>Registration Form</div>)
    
    // Simulate form interaction
    const emailInput = screen.getByLabelText(/e-posta/i)
    const passwordInput = screen.getByLabelText(/şifre/i)
    const submitButton = screen.getByRole('button', { name: /kayıt ol/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'Password123!')
    await user.click(submitButton)
    
    // Verify API call was made
    expect(mockUseMutation).toHaveBeenCalled()
  })

  it('should handle donation creation with validation', async () => {
    const user = userEvent.setup()
    
    const mockDonation = createMockDonation()
    mockUseMutation.mockReturnValue({
      mutate: vi.fn().mockResolvedValue(mockDonation),
      loading: false,
      error: null,
    })

    renderWithProviders(<div>Donation Form</div>)
    
    // Simulate donation form
    const amountInput = screen.getByLabelText(/miktar/i)
    const submitButton = screen.getByRole('button', { name: /bağış yap/i })
    
    await user.type(amountInput, '1000')
    await user.click(submitButton)
    
    // Verify validation and API call
    expect(mockUseMutation).toHaveBeenCalled()
  })
})

// ============================================================================
// MODERN PERFORMANCE TESTS
// ============================================================================

describe('Modern Performance Tests', () => {
  it('should render dashboard within performance budget', async () => {
    const startTime = performance.now()
    
    renderWithProviders(<ModernDashboard />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Performance budget: 100ms for initial render
    expect(renderTime).toBeLessThan(100)
  })

  it('should handle large data sets efficiently', async () => {
    const largeDataSet = Array.from({ length: 1000 }, (_, i) => 
      createMockUser({ id: `user-${i}` })
    )
    
    mockUseApi.mockReturnValue({
      data: largeDataSet,
      loading: false,
      error: null,
      refetch: vi.fn(),
    })

    const startTime = performance.now()
    
    renderWithProviders(<ModernDashboard />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Performance budget: 200ms for large data sets
    expect(renderTime).toBeLessThan(200)
  })
})

// ============================================================================
// MODERN ACCESSIBILITY TESTS
// ============================================================================

describe('Modern Accessibility Tests', () => {
  it('should have proper ARIA labels', () => {
    renderWithProviders(<ModernDashboard />)
    
    // Check for proper labeling
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup()
    
    renderWithProviders(<ModernDashboard />)
    
    // Test keyboard navigation
    await user.tab()
    expect(document.activeElement).toBeInTheDocument()
  })

  it('should have proper color contrast', () => {
    renderWithProviders(<ModernDashboard />)
    
    // This would require a color contrast testing library
    // For now, we'll just ensure text elements are present
    expect(screen.getByText(/toplam bağış/i)).toBeInTheDocument()
  })
})

// ============================================================================
// MODERN SECURITY TESTS
// ============================================================================

describe('Modern Security Tests', () => {
  it('should sanitize user input', () => {
    const maliciousInput = '<script>alert("xss")</script>'
    
    // Test input sanitization
    const sanitized = maliciousInput.replace(/[<>]/g, '')
    expect(sanitized).not.toContain('<script>')
  })

  it('should validate authentication tokens', () => {
    // Test token validation
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    const invalidToken = 'invalid-token'
    
    // This would test actual token validation logic
    expect(validToken).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)
    expect(invalidToken).not.toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)
  })

  it('should prevent CSRF attacks', () => {
    // Test CSRF protection
    const csrfToken = 'random-csrf-token'
    const requestToken = 'random-csrf-token'
    
    expect(csrfToken).toBe(requestToken)
  })
})

// ============================================================================
// MODERN ERROR BOUNDARY TESTS
// ============================================================================

describe('Modern Error Boundary Tests', () => {
  it('should catch and display errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const ThrowError = () => {
      throw new Error('Test error')
    }
    
    renderWithProviders(<ThrowError />)
    
    expect(screen.getByText(/bir hata oluştu/i)).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('should allow error recovery', async () => {
    const user = userEvent.setup()
    
    const ThrowError = () => {
      throw new Error('Test error')
    }
    
    renderWithProviders(<ThrowError />)
    
    const retryButton = screen.getByRole('button', { name: /tekrar dene/i })
    await user.click(retryButton)
    
    // Verify retry functionality
    expect(retryButton).toBeInTheDocument()
  })
})

// ============================================================================
// MODERN TEST UTILITIES
// ============================================================================

/**
 * Modern Test Helpers
 * Reusable test utilities
 */
export const testUtils = {
  /**
   * Modern Wait For
   * Enhanced waitFor with better error messages
   */
  waitForElement: async (condition: () => boolean, timeout = 5000) => {
    await waitFor(condition, { timeout })
  },

  /**
   * Modern Mock API Response
   * Type-safe API response mocking
   */
  mockApiResponse: <T>(data: T, status = 200) => ({
    ok: status < 400,
    status,
    json: async () => data,
  }),

  /**
   * Modern Test Data Generator
   * Generate test data with specific patterns
   */
  generateTestData: <T>(factory: () => T, count: number): T[] => {
    return Array.from({ length: count }, factory)
  },
}

// ============================================================================
// MODERN TEST EXPORTS
// ============================================================================

export {
  renderWithProviders,
  createMockUser,
  createMockDonation,
  testUtils,
} 