import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserRole, UserProfile } from './auth'

export async function getCurrentUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  // Get user profile with role information
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    // If profile doesn't exist, create a default one
    const { data: newProfile, error: createError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email,
        role: 'observer',
        permissions: [],
        is_active: true,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating user profile:', createError)
      // Return user with default profile instead of null
      return {
        ...user,
        profile: {
          id: user.id,
          full_name: user.user_metadata?.full_name || user.email,
          role: 'observer' as const,
          permissions: [] as string[],
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    }

    return {
      ...user,
      profile: newProfile
    }
  }

  return {
    ...user,
    profile
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  return user
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth()
  
  if (!user.profile || !allowedRoles.includes(user.profile.role)) {
    redirect('/unauthorized')
  }
  
  return user
}

export async function requireAdmin() {
  return await requireRole(['admin'])
}

export async function requireManager() {
  return await requireRole(['admin', 'manager'])
}

export async function requireUser() {
  return await requireRole(['admin', 'manager', 'user'])
}

export async function requireViewer() {
  return await requireRole(['admin', 'manager', 'user', 'viewer'])
} 