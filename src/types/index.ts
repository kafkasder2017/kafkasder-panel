// Auth Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  created_at: string
  last_sign_in_at?: string
}

export type UserRole = 'admin' | 'editor' | 'operator' | 'viewer'

// Person/Contact Types
export interface Person {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  mobile_phone?: string
  international_phone?: string
  nationality: string
  identity_number: string
  birth_date?: string
  country: string
  city: string
  district: string
  neighborhood: string
  address: string
  category: PersonCategory
  file_number?: string
  sponsorship_type?: string
  status: PersonStatus
  created_at: string
  updated_at: string
}

export type PersonCategory = 'donor' | 'beneficiary' | 'member' | 'volunteer'
export type PersonStatus = 'draft' | 'active' | 'inactive' | 'blocked'

// Donation Types
export interface Donation {
  id: string
  person_id: string
  amount: number
  currency: string
  type: DonationType
  method: DonationMethod
  description?: string
  receipt_number?: string
  status: DonationStatus
  donated_at: string
  created_at: string
  updated_at: string
}

export type DonationType = 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind'
export type DonationMethod = 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other'
export type DonationStatus = 'pending' | 'completed' | 'failed' | 'cancelled'

// Organization Types
export interface Organization {
  id: string
  name: string
  type: string
  tax_number?: string
  phone?: string
  email?: string
  address?: string
  contact_person?: string
  created_at: string
  updated_at: string
}

// General Types
export interface TableFilter {
  column: string
  value: string
  operator: 'eq' | 'neq' | 'like' | 'ilike' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'notin'
}

export interface TableSort {
  column: string
  direction: 'asc' | 'desc'
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface FormState {
  isSubmitting: boolean
  errors: Record<string, string>
  success: boolean
} 