import { z } from 'zod'

// ============================================================================
// MODERN ZOD V4 VALIDATION SCHEMAS
// ============================================================================

/**
 * Modern Zod v4 validation schemas with Turkish localization
 * Context7'nin en güncel patternlerini kullanır
 */

// ============================================================================
// BASE SCHEMAS
// ============================================================================

/**
 * Modern Email Validation with Zod v4
 * Yeni email patternleri ve regex seçenekleri
 */
export const emailSchema = z.string().email({
  message: 'Geçerli bir e-posta adresi giriniz'
})

/**
 * Modern Phone Validation with Transform
 * Telefon numarasını formatlar ve doğrular
 */
export const phoneSchema = z.string()
  .transform((val, ctx) => {
    // Remove all non-digit characters
    const cleaned = val.replace(/\D/g, '')
    
    if (cleaned.length !== 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Telefon numarası 10 haneli olmalıdır',
      })
      return z.NEVER
    }
    
    // Format as (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  })

/**
 * Modern Password Validation
 * Güçlü şifre gereksinimleri
 */
export const passwordSchema = z.string()
  .min(8, { message: 'Şifre en az 8 karakter olmalıdır' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'
  })

/**
 * Modern Date Validation
 * ISO datetime format validation
 */
export const dateSchema = z.string().datetime({
  message: 'Geçerli bir tarih formatı giriniz (YYYY-MM-DDTHH:mm:ss.sssZ)'
})

// ============================================================================
// USER SCHEMAS
// ============================================================================

/**
 * Modern User Registration Schema
 * Conditional validation ve field dependencies
 */
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: z.string().min(2, { message: 'Ad en az 2 karakter olmalıdır' }),
  lastName: z.string().min(2, { message: 'Soyad en az 2 karakter olmalıdır' }),
  phone: phoneSchema.optional(),
  acceptTerms: z.boolean(),
  marketingEmails: z.boolean().optional(),
  birthDate: dateSchema.optional(),
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  }
)
.refine(
  (data) => data.acceptTerms,
  {
    message: 'Kullanım şartlarını kabul etmelisiniz',
    path: ['acceptTerms'],
  }
)

/**
 * Modern User Profile Schema
 * Comprehensive user profile validation
 */
export const userProfileSchema = z.object({
  id: z.string().uuid({ message: 'Geçerli bir UUID giriniz' }),
  email: emailSchema,
  firstName: z.string().min(2, { message: 'Ad en az 2 karakter olmalıdır' }),
  lastName: z.string().min(2, { message: 'Soyad en az 2 karakter olmalıdır' }),
  phone: phoneSchema.optional(),
  birthDate: dateSchema.optional(),
  address: z.object({
    street: z.string().min(5, { message: 'Sokak adresi en az 5 karakter olmalıdır' }),
    city: z.string().min(2, { message: 'Şehir en az 2 karakter olmalıdır' }),
    postalCode: z.string().regex(/^\d{5}$/, { message: 'Posta kodu 5 haneli olmalıdır' }),
    country: z.string().min(2, { message: 'Ülke en az 2 karakter olmalıdır' }),
  }).optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']).default('auto'),
    language: z.enum(['tr', 'en']).default('tr'),
    notifications: z.boolean().default(true),
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
  }).optional(),
  role: z.enum(['user', 'admin', 'moderator']).default('user'),
  isActive: z.boolean().default(true),
  createdAt: dateSchema,
  updatedAt: dateSchema.optional(),
})

// ============================================================================
// DONATION SCHEMAS
// ============================================================================

/**
 * Base Donation Schema
 * Temel bağış validation şeması
 */
export const BaseDonationSchema = z.object({
  type: z.enum(['cash', 'credit_card', 'bank_transfer', 'check']),
  amount: z.number().positive(),
  currency: z.enum(['TRY', 'USD', 'EUR']).optional(),
  description: z.string().max(500, { message: 'Açıklama en fazla 500 karakter olabilir' }).optional(),
  anonymous: z.boolean().optional(),
  receiptRequested: z.boolean().optional(),
  personId: z.string().uuid({ message: 'Geçerli bir kişi seçiniz' }).optional(),
  date: z.union([z.string(), z.date()]).optional(),
  category: z.string().optional(),
  receiptNumber: z.string().optional(),
})

/**
 * Modern Donation Schema
 * Bağış işlemleri için validation
 */
export const donationSchema = z.object({
  id: z.string().uuid(),
  donorId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.enum(['TRY', 'USD', 'EUR']).default('TRY'),
  type: z.enum(['cash', 'credit_card', 'bank_transfer', 'check']),
  description: z.string().max(500, { message: 'Açıklama en fazla 500 karakter olabilir' }).optional(),
  date: z.union([z.string(), z.date()]).optional(),
  category: z.string().optional(),
  receiptNumber: z.string().optional(),
  anonymous: z.boolean().optional(),
  receiptRequested: z.boolean().optional(),
})

/**
 * Modern Donation Form Schema
 * Bağış formu için validation
 */
export const donationFormSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(['TRY', 'USD', 'EUR']).default('TRY'),
  type: z.enum(['cash', 'credit_card', 'bank_transfer', 'check']),
  anonymous: z.boolean().default(false),
  receiptRequested: z.boolean().default(true),
  description: z.string().max(500, { message: 'Açıklama en fazla 500 karakter olabilir' }).optional(),
  personId: z.string().uuid().optional(),
  date: z.union([z.string(), z.date()]).optional(),
  category: z.string().optional(),
  receiptNumber: z.string().optional(),
})

// ============================================================================
// ORGANIZATION SCHEMAS
// ============================================================================

/**
 * Modern Organization Schema
 * Kurum bilgileri için validation
 */
export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, { message: 'Kurum adı en az 3 karakter olmalıdır' }),
  type: z.enum(['charity', 'foundation', 'association', 'company']),
  taxNumber: z.string().optional(),
  phone: z.string().optional(),
  email: emailSchema.optional(),
  website: z.string().url().optional(),
  address: z.string().optional(),
  description: z.string().max(1000, { message: 'Açıklama en fazla 1000 karakter olabilir' }).optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
  createdAt: dateSchema,
  updatedAt: dateSchema.optional(),
})

// ============================================================================
// PERSON SCHEMAS
// ============================================================================

/**
 * Modern Person Schema
 * Kişi bilgileri için validation
 */
export const personSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(2, { message: 'Ad en az 2 karakter olmalıdır' }),
  lastName: z.string().min(2, { message: 'Soyad en az 2 karakter olmalıdır' }),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  mobilePhone: phoneSchema.optional(),
  internationalPhone: z.string().optional(),
  birthDate: dateSchema.optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  nationality: z.string().optional(),
  address: z.object({
    street: z.string().min(5, { message: 'Sokak adresi en az 5 karakter olmalıdır' }),
    city: z.string().min(2, { message: 'Şehir en az 2 karakter olmalıdır' }),
    postalCode: z.string().regex(/^\d{5}$/, { message: 'Posta kodu 5 haneli olmalıdır' }),
    country: z.string().min(2, { message: 'Ülke en az 2 karakter olmalıdır' }),
  }).optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
  createdAt: dateSchema,
  updatedAt: dateSchema.optional(),
})

// ============================================================================
// ASYNC VALIDATION SCHEMAS
// ============================================================================

/**
 * Modern Async Email Validation
 * Database'de unique email kontrolü
 */
export const uniqueEmailSchema = z.string().email().refine(
  async (email) => {
    // Database check for unique email
    // Bu fonksiyon gerçek database bağlantısı ile değiştirilmeli
    return true // Placeholder
  },
  { message: 'Bu e-posta adresi zaten kullanılıyor' }
)

/**
 * Modern Async Username Validation
 * Database'de unique username kontrolü
 */
export const uniqueUsernameSchema = z.string()
  .min(3, { message: 'Kullanıcı adı en az 3 karakter olmalıdır' })
  .max(20, { message: 'Kullanıcı adı en fazla 20 karakter olabilir' })
  .regex(/^[a-zA-Z0-9_]+$/, { message: 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir' })
  .refine(
    async (username) => {
      // Database check for unique username
      // Bu fonksiyon gerçek database bağlantısı ile değiştirilmeli
      return true // Placeholder
    },
    { message: 'Bu kullanıcı adı zaten kullanılıyor' }
  )



/**
 * Modern Turkish Phone Schema
 * Türkiye telefon numarası için özel format
 */
export const turkishPhoneSchema = z.string()
  .regex(/^(\+90|0)?[0-9]{10}$/, { message: 'Geçerli bir Türkiye telefon numarası giriniz' })
  .transform((val) => {
    // Format as +90 5XX XXX XX XX
    const cleaned = val.replace(/\D/g, '')
    if (cleaned.startsWith('90')) {
      return `+${cleaned}`
    } else if (cleaned.startsWith('0')) {
      return `+90${cleaned.slice(1)}`
    } else {
      return `+90${cleaned}`
    }
  })

/**
 * Modern Address Schema
 * Türkiye adres formatı
 */
export const addressSchema = z.object({
  street: z.string().min(5, { message: 'Sokak adresi en az 5 karakter olmalıdır' }),
  city: z.string().min(2, { message: 'Şehir en az 2 karakter olmalıdır' }),
  district: z.string().min(2, { message: 'İlçe en az 2 karakter olmalıdır' }),
  postalCode: z.string().regex(/^\d{5}$/, { message: 'Posta kodu 5 haneli olmalıdır' }),
  country: z.string().min(2, { message: 'Ülke en az 2 karakter olmalıdır' }),
})

/**
 * Modern Tax Number Schema
 * Türkiye vergi numarası formatı
 */
export const taxNumberSchema = z.string()
  .regex(/^\d{10}$/, { message: 'Vergi numarası 10 haneli olmalıdır' })

/**
 * Modern TC Identity Number Schema
 * Türkiye TC kimlik numarası formatı
 */
export const tcIdentitySchema = z.string()
  .regex(/^\d{11}$/, { message: 'TC kimlik numarası 11 haneli olmalıdır' })
  .refine(
    (value) => {
      // TC kimlik numarası algoritma kontrolü
      if (value.length !== 11) return false
      
      const digits = value.split('').map(Number)
      
      // İlk hane 0 olamaz
      if (digits[0] === 0) return false
      
      // 1, 3, 5, 7, 9. hanelerin toplamının 7 katından, 2, 4, 6, 8. hanelerin toplamı çıkartılıp 10'a bölümünden kalan, 10. haneyi vermelidir
      const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8]
      const evenSum = digits[1] + digits[3] + digits[5] + digits[7]
      const digit10 = ((oddSum * 7) - evenSum) % 10
      
      if (digits[9] !== digit10) return false
      
      // İlk 10 hanenin toplamının 10'a bölümünden kalan, 11. haneyi vermelidir
      const sum10 = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0)
      const digit11 = sum10 % 10
      
      return digits[10] === digit11
    },
    { message: 'Geçersiz TC kimlik numarası' }
  )

/**
 * Modern IBAN Schema
 * Türkiye IBAN formatı
 */
export const ibanSchema = z.string()
  .regex(/^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/, { message: 'Geçerli bir IBAN giriniz' })
  .transform((val) => val.replace(/\s/g, '').toUpperCase())

/**
 * Modern Credit Card Schema
 * Kredi kartı numarası formatı
 */
export const creditCardSchema = z.string()
  .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, { message: 'Geçerli bir kredi kartı numarası giriniz' })
  .transform((val) => val.replace(/\s/g, ''))

/**
 * Modern CVV Schema
 * CVV formatı
 */
export const cvvSchema = z.string()
  .regex(/^\d{3,4}$/, { message: 'CVV 3 veya 4 haneli olmalıdır' })

/**
 * Modern Expiry Date Schema
 * Son kullanma tarihi formatı
 */
export const expiryDateSchema = z.string()
  .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: 'Geçerli bir son kullanma tarihi giriniz (MM/YY)' })

// ============================================================================
// MODERN TYPE EXPORTS
// ============================================================================

export type UserRegistration = z.infer<typeof userRegistrationSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type BaseDonation = z.infer<typeof BaseDonationSchema>
export type Donation = z.infer<typeof donationSchema>
export type DonationForm = z.infer<typeof donationFormSchema>
export type Organization = z.infer<typeof organizationSchema>
export type Person = z.infer<typeof personSchema>
export type Address = z.infer<typeof addressSchema>
export type TurkishPhone = z.infer<typeof turkishPhoneSchema> 