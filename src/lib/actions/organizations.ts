'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { OrganizationInsert, OrganizationUpdate } from '@/types/supabase'
import { z } from 'zod'

// Validation schema for organization data
const organizationSchema = z.object({
  name: z.string().min(1, 'Organizasyon adı zorunludur'),
  type: z.string().optional(),
  tax_number: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Geçerli bir e-posta adresi giriniz').optional().or(z.literal('')),
  website: z.string().url('Geçerli bir web sitesi adresi giriniz').optional().or(z.literal('')),
  address: z.string().optional(),
  status: z.string().default('active'),
  notes: z.string().optional(),
})

export async function createOrganization(formData: FormData) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Extract form data
  const organizationData: Partial<OrganizationInsert> = {
    name: formData.get('name') as string,
    type: formData.get('type') as string || null,
    tax_number: formData.get('tax_number') as string || null,
    phone: formData.get('phone') as string || null,
    email: formData.get('email') as string || null,
    website: formData.get('website') as string || null,
    address: formData.get('address') as string || null,
    status: formData.get('status') as string || 'active',
    notes: formData.get('notes') as string || null,
    created_by: user.id,
  }

  // Validate data
  const validation = organizationSchema.safeParse(organizationData)
  if (!validation.success) {
    throw new Error(`Veri doğrulama hatası: ${validation.error.issues[0].message}`)
  }

  const { data, error } = await supabase
    .from('organizations')
    .insert([validation.data])
    .select()
    .single()

  if (error) {
    throw new Error(`Organizasyon oluşturulurken hata oluştu: ${error.message}`)
  }

  revalidatePath('/organizasyonlar')
  return data
}

export async function updateOrganization(id: string, formData: FormData) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Extract form data
  const organizationData: Partial<OrganizationUpdate> = {
    name: formData.get('name') as string,
    type: formData.get('type') as string || null,
    tax_number: formData.get('tax_number') as string || null,
    phone: formData.get('phone') as string || null,
    email: formData.get('email') as string || null,
    website: formData.get('website') as string || null,
    address: formData.get('address') as string || null,
    status: formData.get('status') as string,
    notes: formData.get('notes') as string || null,
  }

  // Validate data
  const validation = organizationSchema.safeParse(organizationData)
  if (!validation.success) {
    throw new Error(`Veri doğrulama hatası: ${validation.error.issues[0].message}`)
  }

  const { data, error } = await supabase
    .from('organizations')
    .update(validation.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Organizasyon güncellenirken hata oluştu: ${error.message}`)
  }

  revalidatePath('/organizasyonlar')
  return data
}

export async function deleteOrganization(id: string) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Check if organization exists
  const { data: organization, error: fetchError } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('id', id)
    .single()

  if (fetchError || !organization) {
    throw new Error('Organizasyon bulunamadı')
  }

  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Organizasyon silinirken hata oluştu: ${error.message}`)
  }

  revalidatePath('/organizasyonlar')
  return { success: true, deletedOrganization: organization }
}

export async function getOrganization(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Organizasyon getirilirken hata oluştu: ${error.message}`)
  }

  return data
}

export async function getOrganizations(filters?: {
  status?: string
  search?: string
}) {
  const supabase = await createClient()
  
  let query = supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,tax_number.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Organizasyonlar getirilirken hata oluştu: ${error.message}`)
  }

  return data
} 