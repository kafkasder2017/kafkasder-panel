import { createClient } from './server'

// Context7: Cached data fetching functions for better performance
export const getPersons = async (filters?: {
  category?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}) => {
  const supabase = await createClient()
  
  let query = supabase
    .from('persons')
    .select('*', { count: 'exact' })

  // Apply filters
  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }
  
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  
  if (filters?.search) {
    query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  // Apply pagination
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Kişiler yüklenirken hata oluştu: ${error.message}`)
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

export const getPersonById = async (id: string) => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Kişi bulunamadı: ${error.message}`)
  }

  return data
}

export const getCountries = async () => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('name')

  if (error) {
    console.error('Ülkeler yüklenirken hata:', error)
    return []
  }

  return data || []
}

export const getCities = async (countryId?: string) => {
  const supabase = await createClient()
  
  let query = supabase
    .from('cities')
    .select('*')
    .order('name')

  if (countryId) {
    query = query.eq('country_id', countryId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Şehirler yüklenirken hata:', error)
    return []
  }

  return data || []
}

export const getDistricts = async (cityId?: string) => {
  const supabase = await createClient()
  
  let query = supabase
    .from('districts')
    .select('*')
    .order('name')

  if (cityId) {
    query = query.eq('city_id', cityId)
  }

  const { data, error } = await query

  if (error) {
    console.error('İlçeler yüklenirken hata:', error)
    return []
  }

  return data || []
} 