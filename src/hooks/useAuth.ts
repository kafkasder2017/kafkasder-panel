"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Context7Record } from '@/types/context7'

// Context7 Auth Hook Pattern
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const lastUserId = useRef<string | null>(null)
  const isProcessing = useRef(false)

  // Context7 Pattern: Memoized auth functions
  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }, [supabase.auth])

  const signUp = useCallback(async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  }, [supabase.auth])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }, [supabase.auth])

  const resetPassword = useCallback(async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  }, [supabase.auth])

  const updatePassword = useCallback(async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  }, [supabase.auth])

  const updateUser = useCallback(async (updates: any) => {
    const { data, error } = await supabase.auth.updateUser(updates)
    return { data, error }
  }, [supabase.auth])

  // Context7 Pattern: Effect for auth state changes with debouncing
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Prevent duplicate processing for the same user
        if (session?.user?.id === lastUserId.current && isProcessing.current) {
          return
        }

        // Add small delay to prevent rapid successive calls
        await new Promise(resolve => setTimeout(resolve, 100))

        isProcessing.current = true
        lastUserId.current = session?.user?.id || null

        if (session?.user) {
          try {
            // Get user profile with role information
            const { data: profile, error: profileError } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              // Only log if it's not a "not found" error (PGRST116)
              if (profileError.code !== 'PGRST116') {
                console.error('Error fetching user profile:', profileError)
              }
              
              // Create a default profile if user doesn't have one
              const defaultProfile = {
                id: session.user.id,
                full_name: session.user.user_metadata?.full_name || session.user.email,
                role: 'observer' as const,
                permissions: [] as string[],
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }

              setUser({
                ...session.user,
                profile: defaultProfile
              })
            } else {
              setUser({
                ...session.user,
                profile: profile
              })
            }
          } catch (error) {
            console.error('Unexpected error in auth state change:', error)
            // Set user with basic info even if profile fetch fails
            setUser({
              ...session.user,
              profile: {
                id: session.user.id,
                full_name: session.user.user_metadata?.full_name || session.user.email,
                role: 'observer' as const,
                permissions: [] as string[],
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            })
          }
        } else {
          setUser(null)
        }
        
        setLoading(false)
        isProcessing.current = false
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateUser,
  }
} 