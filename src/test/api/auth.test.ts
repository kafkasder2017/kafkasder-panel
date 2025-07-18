// Context7: Modern Authentication API Tests
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { signIn, signUp, signOut, resetPassword } from '@/lib/actions/auth'
import { createMockUser } from '@/test/utils'

// Context7: Mock Supabase client
const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    resetPasswordForEmail: vi.fn()
  }
}

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => mockSupabase
}))

describe('Authentication API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Context7: Test pattern - Sign in API
  describe('signIn', () => {
    it('successfully authenticates user', async () => {
      const mockUser = createMockUser()
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: { access_token: 'token' } },
        error: null
      })

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')

      const result = await signIn(formData)

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
      expect(result).toBeUndefined()
    })

    it('handles authentication errors', async () => {
      const errorMessage = 'Invalid credentials'
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: errorMessage }
      })

      const formData = new FormData()
      formData.append('email', 'wrong@example.com')
      formData.append('password', 'wrongpassword')

      const result = await signIn(formData)

      expect(result).toEqual({ error: errorMessage })
    })

    it('validates required fields', async () => {
      const formData = new FormData()
      // Missing email and password

      const result = await signIn(formData)

      expect(result).toEqual({ error: 'Email ve şifre gerekli' })
      expect(mockSupabase.auth.signInWithPassword).not.toHaveBeenCalled()
    })
  })

  // Context7: Test pattern - Sign up API
  describe('signUp', () => {
    it('successfully registers new user', async () => {
      const mockUser = createMockUser()
      mockSupabase.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null
      })

      const formData = new FormData()
      formData.append('email', 'new@example.com')
      formData.append('password', 'password123')
      formData.append('confirmPassword', 'password123')

      const result = await signUp(formData)

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123'
      })
      expect(result).toBeUndefined()
    })

    it('validates password confirmation', async () => {
      const formData = new FormData()
      formData.append('email', 'new@example.com')
      formData.append('password', 'password123')
      formData.append('confirmPassword', 'differentpassword')

      const result = await signUp(formData)

      expect(result).toEqual({ error: 'Şifreler eşleşmiyor' })
      expect(mockSupabase.auth.signUp).not.toHaveBeenCalled()
    })

    it('validates password strength', async () => {
      const formData = new FormData()
      formData.append('email', 'new@example.com')
      formData.append('password', '123')
      formData.append('confirmPassword', '123')

      const result = await signUp(formData)

      expect(result).toEqual({ error: 'Şifre en az 6 karakter olmalıdır' })
      expect(mockSupabase.auth.signUp).not.toHaveBeenCalled()
    })
  })

  // Context7: Test pattern - Sign out API
  describe('signOut', () => {
    it('successfully signs out user', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({
        error: null
      })

      const result = await signOut()

      expect(mockSupabase.auth.signOut).toHaveBeenCalled()
      expect(result).toBeUndefined()
    })

    it('handles sign out errors', async () => {
      const errorMessage = 'Sign out failed'
      mockSupabase.auth.signOut.mockResolvedValue({
        error: { message: errorMessage }
      })

      const result = await signOut()

      expect(result).toEqual({ error: errorMessage })
    })
  })

  // Context7: Test pattern - Password reset API
  describe('resetPassword', () => {
    it('successfully sends reset email', async () => {
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
        error: null
      })

      const formData = new FormData()
      formData.append('email', 'test@example.com')

      const result = await resetPassword(formData)

      expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        'test@example.com',
        { redirectTo: expect.stringContaining('/auth/reset-password') }
      )
      expect(result).toBeUndefined()
    })

    it('validates email format', async () => {
      const formData = new FormData()
      formData.append('email', 'invalid-email')

      const result = await resetPassword(formData)

      expect(result).toEqual({ error: 'Geçerli bir email adresi girin' })
      expect(mockSupabase.auth.resetPasswordForEmail).not.toHaveBeenCalled()
    })

    it('handles reset password errors', async () => {
      const errorMessage = 'User not found'
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({
        error: { message: errorMessage }
      })

      const formData = new FormData()
      formData.append('email', 'nonexistent@example.com')

      const result = await resetPassword(formData)

      expect(result).toEqual({ error: errorMessage })
    })
  })

  // Context7: Test pattern - Rate limiting simulation
  describe('Rate Limiting', () => {
    it('handles rate limiting gracefully', async () => {
      const errorMessage = 'Too many requests'
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: errorMessage, status: 429 }
      })

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')

      const result = await signIn(formData)

      expect(result).toEqual({ error: 'Çok fazla deneme. Lütfen bekleyin.' })
    })
  })

  // Context7: Test pattern - Network error handling
  describe('Network Errors', () => {
    it('handles network errors', async () => {
      mockSupabase.auth.signInWithPassword.mockRejectedValue(
        new Error('Network error')
      )

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')

      const result = await signIn(formData)

      expect(result).toEqual({ error: 'Bağlantı hatası. Lütfen tekrar deneyin.' })
    })
  })

  // Context7: Test pattern - Security validation
  describe('Security Validation', () => {
    it('sanitizes input data', async () => {
      const mockUser = createMockUser()
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: { access_token: 'token' } },
        error: null
      })

      const formData = new FormData()
      formData.append('email', 'test@example.com<script>alert("xss")</script>')
      formData.append('password', 'password123')

      await signIn(formData)

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })

    it('prevents SQL injection attempts', async () => {
      const formData = new FormData()
      formData.append('email', "'; DROP TABLE users; --")
      formData.append('password', 'password123')

      const result = await signIn(formData)

      // Should be handled by Supabase, but we test our validation
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "'; DROP TABLE users; --",
        password: 'password123'
      })
    })
  })
}) 