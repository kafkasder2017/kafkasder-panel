import { redirect } from 'next/navigation'

export type UserRole = 'admin' | 'manager' | 'user' | 'viewer'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  first_name?: string
  last_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Client-side auth utilities (no server imports)
export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    'admin': 4,
    'manager': 3,
    'user': 2,
    'viewer': 1
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function canManageUsers(userRole: UserRole): boolean {
  return hasPermission(userRole, 'manager')
}

export function canViewReports(userRole: UserRole): boolean {
  return hasPermission(userRole, 'user')
}

export function canEditData(userRole: UserRole): boolean {
  return hasPermission(userRole, 'user')
}

export function canViewData(userRole: UserRole): boolean {
  return hasPermission(userRole, 'viewer')
}

// Helper function to get user display name
export function getUserDisplayName(user: any): string {
  if (user.profile?.first_name && user.profile?.last_name) {
    return `${user.profile.first_name} ${user.profile.last_name}`
  }
  
  if (user.profile?.first_name) {
    return user.profile.first_name
  }
  
  return user.email || 'Unknown User'
}

// Helper function to get user initials
export function getUserInitials(user: any): string {
  if (user.profile?.first_name && user.profile?.last_name) {
    return `${user.profile.first_name[0]}${user.profile.last_name[0]}`.toUpperCase()
  }
  
  if (user.profile?.first_name) {
    return user.profile.first_name[0].toUpperCase()
  }
  
  return user.email?.[0].toUpperCase() || 'U'
} 