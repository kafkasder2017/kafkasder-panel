import { useState, useEffect, useCallback } from 'react'
import { useApi } from '@/hooks/useApi'
import { apiClient } from '@/lib/services/api-client'
import { Database } from '@/types/supabase'
import { Context7Record } from '@/types/context7'

// Context7 Service Hook Types
type Tables = Database['public']['Tables']

// Context7 Person Service Hooks
export function usePersons(options: {
  category?: 'donor' | 'beneficiary' | 'member' | 'volunteer'
  status?: 'draft' | 'active' | 'inactive' | 'blocked'
  page?: number
  limit?: number
  search?: string
} = {}) {
  const { category, status, search } = options

  const filters: Context7Record = {}
  if (category) filters.category = category
  if (status) filters.status = status
  if (search) filters.search = search

  return useApi<Tables['persons']['Row']>('persons', {
    filters,
    orderBy: { column: 'created_at', ascending: false }
  })
}

export function usePerson(id: string | null) {
  const filters: Context7Record = {}
  if (id) filters.id = id

  return useApi<Tables['persons']['Row']>('persons', {
    filters,
    autoFetch: !!id
  })
}

export function usePersonStats(options: {
  category?: 'donor' | 'beneficiary' | 'member' | 'volunteer'
  status?: 'draft' | 'active' | 'inactive' | 'blocked'
} = {}) {
  const { category, status } = options
  const filters: Context7Record = {}
  if (category) filters.category = category
  if (status) filters.status = status

  return useApi('persons/stats', {
    filters
  })
}

export function usePersonOperations() {
  const { create, update, remove } = useApi('persons', { autoFetch: false })

  return {
    createPerson: create,
    updatePerson: update,
    deletePerson: remove
  }
}

// Context7 Organization Service Hooks
export function useOrganizations(options: {
  status?: string
  page?: number
  limit?: number
  search?: string
} = {}) {
  const { status, search } = options

  const filters: Context7Record = {}
  if (status) filters.status = status
  if (search) filters.search = search

  return useApi<Tables['organizations']['Row']>('organizations', {
    filters,
    orderBy: { column: 'created_at', ascending: false }
  })
}

export function useOrganization(id: string | null) {
  const filters: Context7Record = {}
  if (id) filters.id = id

  return useApi<Tables['organizations']['Row']>('organizations', {
    filters,
    autoFetch: !!id
  })
}

export function useOrganizationStats(options: {
  status?: string
} = {}) {
  const { status } = options
  const filters: Context7Record = {}
  if (status) filters.status = status

  return useApi('organizations/stats', {
    filters
  })
}

export function useOrganizationOperations() {
  const { create, update, remove } = useApi('organizations', { autoFetch: false })

  return {
    createOrganization: create,
    updateOrganization: update,
    deleteOrganization: remove
  }
}

// Context7 Donation Service Hooks
export function useDonations(options: {
  type?: 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind'
  status?: 'pending' | 'completed' | 'failed' | 'cancelled'
  person_id?: string
  organization_id?: string
  page?: number
  limit?: number
  date_from?: string
  date_to?: string
} = {}) {
  const { 
    type, 
    status, 
    person_id, 
    organization_id,
    date_from,
    date_to
  } = options

  const filters: Context7Record = {}
  if (type) filters.type = type
  if (status) filters.status = status
  if (person_id) filters.person_id = person_id
  if (organization_id) filters.organization_id = organization_id
  if (date_from) filters.date_from = date_from
  if (date_to) filters.date_to = date_to

  return useApi<Tables['donations']['Row']>('donations', {
    filters,
    orderBy: { column: 'donated_at', ascending: false }
  })
}

export function useDonation(id: string | null) {
  const filters: Context7Record = {}
  if (id) filters.id = id

  return useApi<Tables['donations']['Row']>('donations', {
    filters,
    autoFetch: !!id
  })
}

export function useDonationStats(options: {
  type?: 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind'
  status?: 'pending' | 'completed' | 'failed' | 'cancelled'
  date_from?: string
  date_to?: string
  groupBy?: string
} = {}) {
  const { type, status, date_from, date_to } = options
  const filters: Context7Record = {}
  if (type) filters.type = type
  if (status) filters.status = status
  if (date_from) filters.date_from = date_from
  if (date_to) filters.date_to = date_to

  return useApi('donations/stats', {
    filters
  })
}

export function useDonationOperations() {
  const { create, update, remove } = useApi('donations', { autoFetch: false })

  return {
    createDonation: create,
    updateDonation: update,
    deleteDonation: remove
  }
}

// Context7 Bank Account Service Hooks
export function useBankAccounts(options: {
  person_id?: string
  organization_id?: string
  is_active?: boolean
  page?: number
  limit?: number
} = {}) {
  const { person_id, organization_id, is_active } = options

  const filters: Context7Record = {}
  if (person_id) filters.person_id = person_id
  if (organization_id) filters.organization_id = organization_id
  if (is_active !== undefined) filters.is_active = is_active

  return useApi<Tables['bank_accounts']['Row']>('bank_accounts', {
    filters,
    orderBy: { column: 'created_at', ascending: false }
  })
}

export function useBankAccount(id: string | null) {
  const filters: Context7Record = {}
  if (id) filters.id = id

  return useApi<Tables['bank_accounts']['Row']>('bank_accounts', {
    filters,
    autoFetch: !!id
  })
}

export function useBankAccountOperations() {
  const { create, update, remove } = useApi('bank_accounts', { autoFetch: false })

  return {
    createBankAccount: create,
    updateBankAccount: update,
    deleteBankAccount: remove
  }
}

// Context7 Document Service Hooks
export function useDocuments(options: {
  person_id?: string
  organization_id?: string
  document_type?: string
  is_verified?: boolean
  page?: number
  limit?: number
} = {}) {
  const { 
    person_id, 
    organization_id, 
    document_type, 
    is_verified
  } = options

  const filters: Context7Record = {}
  if (person_id) filters.person_id = person_id
  if (organization_id) filters.organization_id = organization_id
  if (document_type) filters.document_type = document_type
  if (is_verified !== undefined) filters.is_verified = is_verified

  return useApi<Tables['documents']['Row']>('documents', {
    filters,
    orderBy: { column: 'created_at', ascending: false }
  })
}

export function useDocument(id: string | null) {
  const filters: Context7Record = {}
  if (id) filters.id = id

  return useApi<Tables['documents']['Row']>('documents', {
    filters,
    autoFetch: !!id
  })
}

export function useDocumentOperations() {
  const { create, update, remove } = useApi('documents', { autoFetch: false })

  return {
    createDocument: create,
    updateDocument: update,
    deleteDocument: remove
  }
}

// Context7 Location Service Hooks
export function useCountries() {
  return useApi('countries', {
    orderBy: { column: 'name', ascending: true }
  })
}

export function useCities(country_id?: string) {
  const filters: Context7Record = {}
  if (country_id) filters.country_id = country_id

  return useApi('cities', {
    filters,
    orderBy: { column: 'name', ascending: true }
  })
}

export function useDistricts(city_id?: string) {
  const filters: Context7Record = {}
  if (city_id) filters.city_id = city_id

  return useApi('districts', {
    filters,
    orderBy: { column: 'name', ascending: true }
  })
}

export function useNeighborhoods(district_id?: string) {
  const filters: Context7Record = {}
  if (district_id) filters.district_id = district_id

  return useApi('neighborhoods', {
    filters,
    orderBy: { column: 'name', ascending: true }
  })
}

// Context7 Profile Service Hooks
export function useProfiles(options: {
  role?: 'admin' | 'editor' | 'operator' | 'viewer'
  is_active?: boolean
  page?: number
  limit?: number
} = {}) {
  const { role, is_active } = options

  const filters: Context7Record = {}
  if (role) filters.role = role
  if (is_active !== undefined) filters.is_active = is_active

  return useApi<Tables['profiles']['Row']>('profiles', {
    filters,
    orderBy: { column: 'created_at', ascending: false }
  })
}

export function useProfile(id: string | null) {
  const filters: Context7Record = {}
  if (id) filters.id = id

  return useApi<Tables['profiles']['Row']>('profiles', {
    filters,
    autoFetch: !!id
  })
}

export function useProfileOperations() {
  const { create, update, remove } = useApi('profiles', { autoFetch: false })

  return {
    createProfile: create,
    updateProfile: update,
    deleteProfile: remove
  }
}

// Context7 Dashboard Stats Hook
export function useDashboardStats() {
  return useApi('dashboard/stats')
}

// Context7 Global Search Hook
export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performSearch = useCallback(async () => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get('/search', {
        filters: { q: query }
      })
      setResults(response || [])
    } catch (err: any) {
      setError(err.message || 'Arama sırasında hata oluştu')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    const timeoutId = setTimeout(performSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [performSearch])

  return {
    results,
    loading,
    error,
    refetch: performSearch
  }
}

// Context7 Type Exports
export type Person = Tables['persons']['Row']
export type PersonInsert = Tables['persons']['Insert']
export type PersonUpdate = Tables['persons']['Update']

export type Organization = Tables['organizations']['Row']
export type OrganizationInsert = Tables['organizations']['Insert']
export type OrganizationUpdate = Tables['organizations']['Update']

export type Donation = Tables['donations']['Row']
export type DonationInsert = Tables['donations']['Insert']
export type DonationUpdate = Tables['donations']['Update']

export type BankAccount = Tables['bank_accounts']['Row']
export type BankAccountInsert = Tables['bank_accounts']['Insert']
export type BankAccountUpdate = Tables['bank_accounts']['Update']

export type Document = Tables['documents']['Row']
export type DocumentInsert = Tables['documents']['Insert']
export type DocumentUpdate = Tables['documents']['Update']

export type Profile = Tables['profiles']['Row']
export type ProfileInsert = Tables['profiles']['Insert']
export type ProfileUpdate = Tables['profiles']['Update'] 