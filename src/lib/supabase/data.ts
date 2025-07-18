import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

// Context7: Cached data fetching functions for better performance
export const getPersons = cache(async (filters?: {
  category?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}) => {
  const supabase = createServerComponentClient({ cookies })
  
  let query = supabase
    .from('kisiler')
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
})

export const getPersonById = cache(async (id: string) => {
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('kisiler')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Kişi bulunamadı: ${error.message}`)
  }

  return data
})

export const getCountries = cache(async () => {
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('ulkeler')
    .select('*')
    .order('name')

  if (error) {
    console.error('Ülkeler yüklenirken hata:', error)
    return []
  }

  return data || []
})

export const getCities = cache(async (countryId?: string) => {
  const supabase = createServerComponentClient({ cookies })
  
  let query = supabase
    .from('sehirler')
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
})

export const getDistricts = cache(async (cityId?: string) => {
  const supabase = createServerComponentClient({ cookies })
  
  let query = supabase
    .from('ilceler')
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
})

// Context7: Server actions for data mutations
export async function createPerson(personData: any) {
  'use server'
  
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('kisiler')
    .insert([personData])
    .select()
    .single()

  if (error) {
    throw new Error(`Kişi oluşturulurken hata oluştu: ${error.message}`)
  }

  return data
}

export async function updatePerson(id: string, personData: any) {
  'use server'
  
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('kisiler')
    .update(personData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Kişi güncellenirken hata oluştu: ${error.message}`)
  }

  return data
}

export async function deletePerson(id: string) {
  'use server'
  
  const supabase = createServerComponentClient({ cookies })
  
  const { error } = await supabase
    .from('kisiler')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Kişi silinirken hata oluştu: ${error.message}`)
  }

  return { success: true }
} 