// Context7: Modern useAuth Hook Tests
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { createMockUser } from '@/test/utils'

// Context7: Mock Supabase client
const mockSupabase = {
  auth: {
    getUser: vi.fn(),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    onAuthStateChange: vi.fn()
  }
}

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabase
}))

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Context7: Test pattern - Initial state
  it('returns initial state', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(true)
    expect(typeof result.current.signIn).toBe('function')
    expect(typeof result.current.signOut).toBe('function')
  })

  // Context7: Test pattern - Authentication success
  it('handles successful authentication', async () => {
    const mockUser = createMockUser()
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.loading).toBe(false)
  })

  // Context7: Test pattern - Authentication failure
  it('handles authentication failure', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Not authenticated' }
    })

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  // Context7: Test pattern - Sign in functionality
  it('handles sign in', async () => {
    const mockUser = createMockUser()
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.signIn('test@example.com', 'password')
    })

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    })
  })

  // Context7: Test pattern - Sign out functionality
  it('handles sign out', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({
      error: null
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.signOut()
    })

    expect(mockSupabase.auth.signOut).toHaveBeenCalled()
  })

  // Context7: Test pattern - Password reset
  it('handles password reset', async () => {
    mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
      error: null
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.resetPassword('test@example.com')
    })

    expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('test@example.com')
  })

  // Context7: Test pattern - Error handling
  it('handles authentication errors', async () => {
    const errorMessage = 'Invalid credentials'
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: { message: errorMessage }
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      const resultObj = await result.current.signIn('test@example.com', 'wrong-password')
      expect(resultObj?.error?.message).toBe(errorMessage)
    })
  })
  it('manages loading states correctly', async () => {
    const mockUser = createMockUser()
    
    // Simulate delayed response
    mockSupabase.auth.getUser.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          data: { user: mockUser },
          error: null
        }), 100)
      )
    )

    const { result } = renderHook(() => useAuth())

    // Initial loading state
    expect(result.current.loading).toBe(true)

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toEqual(mockUser)
  })

  // Context7: Test pattern - Auth state changes
  it('listens to auth state changes', () => {
    const mockUser = createMockUser()
    let authStateCallback: any = null

    mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
      authStateCallback = callback
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })

    renderHook(() => useAuth())

    expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled()

    // Simulate auth state change
    if (authStateCallback) {
      act(() => {
        authStateCallback('SIGNED_IN', { user: mockUser })
      })
    }
  })

  // Context7: Test pattern - User profile access
  it('provides user profile information', async () => {
    const mockUser = createMockUser({
      email: 'admin@kafkasder.org',
      role: 'admin'
    })

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user?.email).toBe('admin@kafkasder.org')
    expect(result.current.user?.role).toBe('admin')
  })

  // Context7: Test pattern - Role-based access
  it('provides role-based access information', async () => {
    const mockUser = createMockUser({ role: 'manager' })
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user?.role).toBe('manager')
  })
}) 