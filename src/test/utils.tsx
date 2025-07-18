// Context7: Modern Test Utilities
import React, { ReactElement } from 'react'
import { render, RenderOptions, screen, fireEvent } from '@testing-library/react'
import { AuthProvider } from '@/components/providers/AuthProvider'

// Context7: Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper = options?.wrapper || AllTheProviders
  
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  })
}

// Context7: Mock data factories
export const createMockPerson = (overrides = {}) => ({
  id: 1,
  first_name: 'Ahmet',
  last_name: 'Yılmaz',
  email: 'ahmet@example.com',
  phone: '0532 123 45 67',
  category: 'donor' as const,
  status: 'active' as const,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

export const createMockOrganization = (overrides = {}) => ({
  id: 1,
  name: 'Test Organizasyonu',
  type: 'foundation',
  status: 'active' as const,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

export const createMockDonation = (overrides = {}) => ({
  id: 1,
  amount: 1000,
  type: 'cash' as const,
  status: 'completed' as const,
  donor_id: 1,
  donated_at: '2024-01-01T00:00:00Z',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides
})

export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  role: 'admin' as const,
  created_at: '2024-01-01T00:00:00Z',
  ...overrides
})

// Context7: Test helpers
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0))
}

export const mockApiResponse = (data: any, error: any = null) => {
  return Promise.resolve({ data, error })
}

export const mockApiError = (message: string) => {
  return Promise.resolve({ 
    data: null, 
    error: { message } 
  })
}

// Context7: Re-export everything
export * from '@testing-library/react'
export { customRender as render } 