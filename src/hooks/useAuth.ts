"use client"

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { AuthUser, AuthState } from '@/lib/auth'
import { Context7Record } from '@/types/context7'

// Context7 Auth Hook Pattern
export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  })

  // Context7 Effect Pattern with Error Handling
  useEffect(() => {
    // Server-side rendering kontrolü
    if (typeof window === 'undefined') {
      setState(prev => ({ ...prev, loading: false }))
      return
    }

    let mounted = true

    const getInitialSession = async () => {
      try {
        if (!supabase) {
          throw new Error('Supabase client is not initialized')
        }
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Session get error:', error)
        }
        if (mounted) {
          if (session) {
            setState({
              user: session.user as AuthUser,
              session: session,
              loading: false,
            })
          } else {
            setState(prev => ({ ...prev, loading: false }))
          }
        }
      } catch (error) {
        console.error('Initial session error:', error)
        if (mounted) {
          setState(prev => ({ ...prev, loading: false }))
        }
      }
    }

    getInitialSession()

    // Context7 Cleanup Pattern
    return () => {
      mounted = false
    }
  }, [])

  // Context7 Auth State Change Pattern
  useEffect(() => {
    // Server-side rendering kontrolü
    if (typeof window === 'undefined') {
      return
    }

    if (!supabase) {
      console.error('Supabase client is not initialized')
      return
    }
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        if (session) {
          setState({
            user: session.user as AuthUser,
            session,
            loading: false,
          })
        } else {
          setState({
            user: null,
            session: null,
            loading: false,
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Context7 Memoized Auth Functions
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log('Signing in with:', email)
      setState(prev => ({ ...prev, loading: true }))

      if (!supabase) {
        console.error('Supabase client is not initialized')
        setState(prev => ({ ...prev, loading: false }))
        return { data: null, error: { message: 'Supabase client is not initialized' } }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('Sign in error:', error)
        setState(prev => ({ ...prev, loading: false }))
        return { data: null, error }
      }
      
      console.log('Sign in successful:', data)
      return { data, error: null }
    } catch (error) {
      console.error('Sign in exception:', error)
      setState(prev => ({ ...prev, loading: false }))
      return { data: null, error: { message: 'Beklenmeyen bir hata oluştu' } }
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string, metadata?: Context7Record) => {
    try {
      setState(prev => ({ ...prev, loading: true }))

      if (!supabase) {
        console.error('Supabase client is not initialized')
        setState(prev => ({ ...prev, loading: false }))
        return { data: null, error: { message: 'Supabase client is not initialized' } }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })
      
      if (error) {
        setState(prev => ({ ...prev, loading: false }))
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Sign up exception:', error)
      setState(prev => ({ ...prev, loading: false }))
      return { data: null, error: { message: 'Beklenmeyen bir hata oluştu' } }
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))

      if (!supabase) {
        console.error('Supabase client is not initialized')
        setState(prev => ({ ...prev, loading: false }))
        return { error: { message: 'Supabase client is not initialized' } }
      }

      const { error } = await supabase.auth.signOut()

      setState(prev => ({ ...prev, loading: false }))
      return { error }
    } catch (error) {
      console.error('Sign out exception:', error)
      setState(prev => ({ ...prev, loading: false }))
      return { error: { message: 'Çıkış yapılırken hata oluştu' } }
    }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    try {
      if (!supabase) {
        console.error('Supabase client is not initialized')
        return { data: null, error: { message: 'Supabase client is not initialized' } }
      }
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { data, error }
    } catch (error) {
      console.error('Reset password exception:', error)
      return { data: null, error: { message: 'Şifre sıfırlama hatası' } }
    }
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    try {
      if (!supabase) {
        console.error('Supabase client is not initialized')
        return { data: null, error: { message: 'Supabase client is not initialized' } }
      }
      const { data, error } = await supabase.auth.updateUser({
        password,
      })
      return { data, error }
    } catch (error) {
      console.error('Update password exception:', error)
      return { data: null, error: { message: 'Şifre güncelleme hatası' } }
    }
  }, [])

  const updateUser = useCallback(async (updates: Context7Record) => {
    try {
      if (!supabase) {
        console.error('Supabase client is not initialized')
        return { data: null, error: { message: 'Supabase client is not initialized' } }
      }
      const { data, error } = await supabase.auth.updateUser(updates)
      return { data, error }
    } catch (error) {
      console.error('Update user exception:', error)
      return { data: null, error: { message: 'Kullanıcı güncelleme hatası' } }
    }
  }, [])

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateUser,
  }
} 