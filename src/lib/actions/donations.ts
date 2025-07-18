'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { DonationInsert, DonationUpdate } from '@/types/supabase'
import { z } from 'zod'

// Validation schema for donation data
const donationSchema = z.object({
  person_id: z.string().optional(),
  organization_id: z.string().optional(),
  amount: z.number().positive('Bağış miktarı pozitif olmalıdır'),
  currency: z.string().default('TRY'),
  type: z.enum(['cash', 'check', 'credit_card', 'online', 'in_kind']),
  method: z.enum(['cash', 'bank_transfer', 'credit_card', 'check', 'other']),
  description: z.string().optional(),
  receipt_number: z.string().optional(),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']).default('pending'),
  donated_at: z.string().optional(),
  notes: z.string().optional(),
})

export async function createDonation(formData: FormData) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Extract form data
  const donationData: Partial<DonationInsert> = {
    person_id: formData.get('person_id') as string || null,
    organization_id: formData.get('organization_id') as string || null,
    amount: parseFloat(formData.get('amount') as string),
    currency: formData.get('currency') as string || 'TRY',
    type: formData.get('type') as 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind',
    method: formData.get('method') as 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other',
    description: formData.get('description') as string || null,
    receipt_number: formData.get('receipt_number') as string || null,
    status: formData.get('status') as 'pending' | 'completed' | 'failed' | 'cancelled' || 'pending',
    donated_at: formData.get('donated_at') as string || new Date().toISOString(),
    notes: formData.get('notes') as string || null,
    created_by: user.id,
  }

  // Validate data
  const validation = donationSchema.safeParse(donationData)
  if (!validation.success) {
    throw new Error(`Veri doğrulama hatası: ${validation.error.issues[0].message}`)
  }

  const { data, error } = await supabase
    .from('donations')
    .insert([validation.data])
    .select()
    .single()

  if (error) {
    throw new Error(`Bağış oluşturulurken hata oluştu: ${error.message}`)
  }

  revalidatePath('/bagislar')
  return data
}

export async function updateDonation(id: string, formData: FormData) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Extract form data
  const donationData: Partial<DonationUpdate> = {
    person_id: formData.get('person_id') as string || null,
    organization_id: formData.get('organization_id') as string || null,
    amount: parseFloat(formData.get('amount') as string),
    currency: formData.get('currency') as string,
    type: formData.get('type') as 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind',
    method: formData.get('method') as 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other',
    description: formData.get('description') as string || null,
    receipt_number: formData.get('receipt_number') as string || null,
    status: formData.get('status') as 'pending' | 'completed' | 'failed' | 'cancelled',
    donated_at: formData.get('donated_at') as string,
    notes: formData.get('notes') as string || null,
  }

  // Validate data
  const validation = donationSchema.safeParse(donationData)
  if (!validation.success) {
    throw new Error(`Veri doğrulama hatası: ${validation.error.issues[0].message}`)
  }

  const { data, error } = await supabase
    .from('donations')
    .update(validation.data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Bağış güncellenirken hata oluştu: ${error.message}`)
  }

  revalidatePath('/bagislar')
  return data
}

export async function deleteDonation(id: string) {
  const supabase = await createClient()
  
  // Get current user for audit trail
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Kullanıcı kimlik doğrulaması gerekli')
  }

  // Check if donation exists
  const { data: donation, error: fetchError } = await supabase
    .from('donations')
    .select('id, amount, currency')
    .eq('id', id)
    .single()

  if (fetchError || !donation) {
    throw new Error('Bağış bulunamadı')
  }

  const { error } = await supabase
    .from('donations')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Bağış silinirken hata oluştu: ${error.message}`)
  }

  revalidatePath('/bagislar')
  return { success: true, deletedDonation: donation }
}

export async function getDonation(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      persons(first_name, last_name, email),
      organizations(name, email)
    `)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Bağış getirilirken hata oluştu: ${error.message}`)
  }

  return data
}

export async function getDonations(filters?: {
  status?: string
  type?: string
  method?: string
  person_id?: string
  organization_id?: string
  date_from?: string
  date_to?: string
  search?: string
}) {
  const supabase = await createClient()
  
  let query = supabase
    .from('donations')
    .select(`
      *,
      persons(first_name, last_name, email),
      organizations(name, email)
    `)
    .order('donated_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.method) {
    query = query.eq('method', filters.method)
  }

  if (filters?.person_id) {
    query = query.eq('person_id', filters.person_id)
  }

  if (filters?.organization_id) {
    query = query.eq('organization_id', filters.organization_id)
  }

  if (filters?.date_from) {
    query = query.gte('donated_at', filters.date_from)
  }

  if (filters?.date_to) {
    query = query.lte('donated_at', filters.date_to)
  }

  if (filters?.search) {
    query = query.or(`description.ilike.%${filters.search}%,receipt_number.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Bağışlar getirilirken hata oluştu: ${error.message}`)
  }

  return data
}

export async function getDonationStats() {
  const supabase = await createClient()
  
  // Get total donations
  const { data: totalData, error: totalError } = await supabase
    .from('donations')
    .select('amount, currency, status')

  if (totalError) {
    throw new Error(`Bağış istatistikleri getirilirken hata oluştu: ${totalError.message}`)
  }

  // Calculate statistics
  const totalAmount = totalData?.reduce((sum, donation) => sum + donation.amount, 0) || 0
  const completedAmount = totalData?.filter(d => d.status === 'completed').reduce((sum, donation) => sum + donation.amount, 0) || 0
  const pendingAmount = totalData?.filter(d => d.status === 'pending').reduce((sum, donation) => sum + donation.amount, 0) || 0

  return {
    totalAmount,
    completedAmount,
    pendingAmount,
    totalCount: totalData?.length || 0,
    completedCount: totalData?.filter(d => d.status === 'completed').length || 0,
    pendingCount: totalData?.filter(d => d.status === 'pending').length || 0,
  }
} 