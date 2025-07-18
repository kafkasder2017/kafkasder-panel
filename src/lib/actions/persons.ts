'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { PersonInsert, PersonUpdate } from '@/types/supabase'
import { z } from 'zod'

// Validation schema for person data
const personSchema = z.object({
  first_name: z.string().min(1, 'Ad alanı zorunludur'),
  last_name: z.string().min(1, 'Soyad alanı zorunludur'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz').optional().or(z.literal('')),
  phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  category: z.enum(['donor', 'beneficiary', 'member', 'volunteer']),
  status: z.enum(['draft', 'active', 'inactive', 'blocked']).default('draft'),
  // Add other fields as needed
})

export async function createPerson(formData: FormData) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Extract form data
  const personData: Partial<PersonInsert> = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string || null,
    phone: formData.get('phone') as string || null,
    mobile_phone: formData.get('mobile_phone') as string || null,
    category: formData.get('category') as 'donor' | 'beneficiary' | 'member' | 'volunteer',
    status: formData.get('status') as 'draft' | 'active' | 'inactive' | 'blocked' || 'draft',
    created_by: user.id,
    // Add other fields as needed
  }

  // Validate data
  const validation = personSchema.safeParse(personData)
  if (!validation.success) {
    throw new Error(`Veri doğrulama hatası: ${validation.error.issues[0].message}`)
  }

  const { data, error } = await supabase
    .from('persons')
    .insert([validation.data])
    .select()
    .single()

  if (error) {
    throw new Error(`Kişi oluşturulurken hata oluştu: ${error.message}`)
  }

  revalidatePath('/kisiler')
  return data
}

export async function updatePerson(id: string, formData: FormData) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Extract form data
  const personData: Partial<PersonUpdate> = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string || null,
    phone: formData.get('phone') as string || null,
    mobile_phone: formData.get('mobile_phone') as string || null,
    category: formData.get('category') as 'donor' | 'beneficiary' | 'member' | 'volunteer',
    status: formData.get('status') as 'draft' | 'active' | 'inactive' | 'blocked',
    // Add other fields as needed
  }

  // Validate data
  const validation = personSchema.safeParse(personData)
  if (!validation.success) {
    throw new Error(`Veri doğrulama hatası: ${validation.error.issues[0].message}`)
  }

  const { data, error } = await supabase
    .from('persons')
    .update(validation.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Kişi güncellenirken hata oluştu: ${error.message}`)
  }

  revalidatePath('/kisiler')
  return data
}

export async function deletePerson(id: string) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Check if person exists and user has permission to delete
  const { data: person, error: fetchError } = await supabase
    .from('persons')
    .select('id, first_name, last_name')
    .eq('id', id)
    .single()

  if (fetchError || !person) {
    throw new Error('Kişi bulunamadı')
  }

  const { error } = await supabase
    .from('persons')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Kişi silinirken hata oluştu: ${error.message}`)
  }

  revalidatePath('/kisiler')
  return { success: true, deletedPerson: person }
}

export async function getPerson(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Kişi getirilirken hata oluştu: ${error.message}`)
  }

  return data
}

export async function getPersons(filters?: {
  category?: string
  status?: string
  search?: string
}) {
  const supabase = await createClient()
  
  let query = supabase
    .from('persons')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Kişiler getirilirken hata oluştu: ${error.message}`)
  }

  return data
} 