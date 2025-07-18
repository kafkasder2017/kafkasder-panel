import { useState, useEffect, useCallback } from 'react'
import { supabaseApiClient } from '@/lib/services/api-client'
import { Database } from '@/types/supabase'
import { Context7Record } from '@/types/context7'

type Tables = Database['public']['Tables']

// Context7 Person Service Hooks
export function usePersons(filters: Record<string, any> = {}) {
  const [data, setData] = useState<Tables['persons']['Row'][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<Tables['persons']['Row'][]>('persons', filters)
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch persons')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function usePerson(id?: string) {
  const [data, setData] = useState<Tables['persons']['Row'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<Tables['persons']['Row']>('persons', { id })
      setData(Array.isArray(response) ? response[0] : response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch person')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function usePersonStats(status?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Record<string, any> = {}
      if (status) filters.status = status
      const response = await supabaseApiClient.get('persons/stats', filters)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch person stats')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function usePersonOperations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.post<Tables['persons']['Row']>('persons', data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create person')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.put<Tables['persons']['Row']>('persons', id, data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update person')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await supabaseApiClient.delete('persons', id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete person')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { create, update, remove, loading, error }
}

// Context7 Organization Service Hooks
export function useOrganizations(filters: Record<string, any> = {}) {
  const [data, setData] = useState<Tables['organizations']['Row'][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<Tables['organizations']['Row'][]>('organizations', filters)
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organizations')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useOrganization(id?: string) {
  const [data, setData] = useState<Tables['organizations']['Row'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<Tables['organizations']['Row']>('organizations', { id })
      setData(Array.isArray(response) ? response[0] : response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organization')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useOrganizationStats(status?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Record<string, any> = {}
      if (status) filters.status = status
      const response = await supabaseApiClient.get('organizations/stats', filters)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organization stats')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useOrganizationOperations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.post<Tables['organizations']['Row']>('organizations', data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create organization')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.put<Tables['organizations']['Row']>('organizations', id, data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update organization')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await supabaseApiClient.delete('organizations', id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete organization')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { create, update, remove, loading, error }
}

// Context7 Donation Service Hooks
export function useDonations(filters: Record<string, any> = {}) {
  const [data, setData] = useState<Tables['donations']['Row'][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<Tables['donations']['Row'][]>('donations', filters)
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch donations')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useDonation(id?: string) {
  const [data, setData] = useState<Tables['donations']['Row'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<Tables['donations']['Row']>('donations', { id })
      setData(Array.isArray(response) ? response[0] : response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch donation')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useDonationStats(date_from?: string, date_to?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Record<string, any> = {}
      if (date_from) filters.date_from = date_from
      if (date_to) filters.date_to = date_to
      const response = await supabaseApiClient.get('donations/stats', filters)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch donation stats')
    } finally {
      setLoading(false)
    }
  }, [date_from, date_to])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useDonationOperations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.post<Tables['donations']['Row']>('donations', data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create donation')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async (id: string, data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.put<Tables['donations']['Row']>('donations', id, data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update donation')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await supabaseApiClient.delete('donations', id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete donation')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { create, update, remove, loading, error }
}

// Context7 Location Service Hooks
export function useCountries() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get<any[]>('countries', {})
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch countries')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useCities(country_id?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Record<string, any> = {}
      if (country_id) filters.country_id = country_id
      const response = await supabaseApiClient.get<any[]>('cities', filters)
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities')
    } finally {
      setLoading(false)
    }
  }, [country_id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useDistricts(city_id?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Record<string, any> = {}
      if (city_id) filters.city_id = city_id
      const response = await supabaseApiClient.get<any[]>('districts', filters)
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch districts')
    } finally {
      setLoading(false)
    }
  }, [city_id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useNeighborhoods(district_id?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Record<string, any> = {}
      if (district_id) filters.district_id = district_id
      const response = await supabaseApiClient.get<any[]>('neighborhoods', filters)
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch neighborhoods')
    } finally {
      setLoading(false)
    }
  }, [district_id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Context7 Dashboard Stats Hook
export function useDashboardStats() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await supabaseApiClient.get('dashboard/stats', {})
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Context7 Search Hook
export function useSearch() {
  const [data, setData] = useState<Context7Record[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setData([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await supabaseApiClient.get<Context7Record[]>('/search', {
        q: query
      })
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, search }
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