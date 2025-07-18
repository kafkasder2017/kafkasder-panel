'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Context7 Pattern: Modern Zod validation schemas
const signInSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
})

const signUpSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"]
})

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  // Validate input
  const validation = signInSchema.safeParse(rawData)
  if (!validation.success) {
    redirect('/auth/login?error=' + encodeURIComponent(validation.error.issues[0].message))
  }

  const { error } = await supabase.auth.signInWithPassword(validation.data)

  if (error) {
    redirect('/auth/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  }

  // Validate input
  const validation = signUpSchema.safeParse(rawData)
  if (!validation.success) {
    redirect('/auth/register?error=' + encodeURIComponent(validation.error.issues[0].message))
  }

  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  if (error) {
    redirect('/auth/register?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/auth/verify-email')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  if (!email || !z.string().email().safeParse(email).success) {
    redirect('/auth/forgot-password?error=' + encodeURIComponent('Geçerli bir e-posta adresi giriniz'))
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })

  if (error) {
    redirect('/auth/forgot-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/auth/forgot-password?success=true')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    redirect('/auth/reset-password?error=' + encodeURIComponent('Şifreler eşleşmiyor'))
  }

  if (password.length < 6) {
    redirect('/auth/reset-password?error=' + encodeURIComponent('Şifre en az 6 karakter olmalıdır'))
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    redirect('/auth/reset-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/auth/login?success=true')
} 