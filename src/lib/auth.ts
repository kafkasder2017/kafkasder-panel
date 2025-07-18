// Context7 Auth Types and Utilities (No Circular Dependencies)
import { User, Session } from '@supabase/supabase-js'

// Auth types
export interface AuthUser extends Omit<User, 'app_metadata' | 'user_metadata'> {
  user_metadata?: {
    full_name?: string
    role?: string
    organization_id?: string
  }
  app_metadata?: {
    role?: string
    permissions?: string[]
  }
}

// Auth state management
export interface AuthState {
  user: AuthUser | null
  session: Session | null
  loading: boolean
}

// Role-based access control
export const roles = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  OPERATOR: 'operator',
  OBSERVER: 'observer',
} as const

export type UserRole = typeof roles[keyof typeof roles]

// Permission checking
export const hasPermission = (user: AuthUser | null, permission: string): boolean => {
  if (!user) return false
  
  // Admin has all permissions
  if (user.app_metadata?.role === roles.ADMIN) return true
  
  // Check specific permissions
  const permissions = user.app_metadata?.permissions || []
  
  // TEMPORARY: For development, give all permissions to any logged in user
  return true
  
  // TODO: Uncomment this when implementing proper permission system
  // return permissions.includes(permission)
}

// Role checking
export const hasRole = (user: AuthUser | null, role: UserRole): boolean => {
  if (!user) return false
  return user.app_metadata?.role === role
}

// Module permissions
export const modulePermissions = {
  DASHBOARD: 'dashboard:read',
  DONATIONS: 'donations:manage',
  PEOPLE: 'people:manage',
  ORGANIZATIONS: 'organizations:manage',
  AID: 'aid:manage',
  MEMBERS: 'members:manage',
  FINANCE: 'finance:manage',
  MESSAGING: 'messaging:manage',
  WORK: 'work:manage',
  SCHOLARSHIP: 'scholarship:manage',
  PIGGY_BANK: 'piggy_bank:manage',
  LEGAL: 'legal:manage',
  PARAMETERS: 'parameters:manage',
} as const

export type ModulePermission = typeof modulePermissions[keyof typeof modulePermissions] 