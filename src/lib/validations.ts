import { z } from 'zod'

// Kişi Formu Validasyon Şeması
export const PersonFormSchema = z.object({
  // Genel Bilgiler
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  nationality: z.string().min(1, 'Uyruk seçilmelidir'),
  identityNumber: z.string().min(10, 'Kimlik numarası en az 10 karakter olmalıdır'),
  birthDate: z.date({ message: 'Doğum tarihi gereklidir' }),
  
  // İletişim Bilgileri
  mobilePhone: z.string().min(10, 'Cep telefonu en az 10 karakter olmalıdır'),
  landlinePhone: z.string().optional(),
  internationalPhone: z.string().optional(),
  email: z.string().email('Geçerli bir e-posta adresi giriniz').optional(),
  
  // Adres Bilgileri
  countryId: z.string().min(1, 'Ülke seçilmelidir'),
  cityId: z.string().min(1, 'Şehir seçilmelidir'),
  districtId: z.string().min(1, 'İlçe seçilmelidir'),
  neighborhoodId: z.string().optional(),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  
  // Kategori ve Durum
  category: z.enum(['bagisc', 'yardim_alan', 'uye']),
  fileNumber: z.string().optional(),
  sponsorshipType: z.string().optional(),
  recordStatus: z.enum(['taslak', 'kayitli']),
  
  // Kimlik Detayları
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  identityType: z.string().optional(),
  validityAuthority: z.string().optional(),
  serialNumber: z.string().optional(),
  
  // Pasaport ve Vize
  passportType: z.string().optional(),
  passportNumber: z.string().optional(),
  passportValidityDate: z.date().optional(),
  visaStartDate: z.date().optional(),
  visaEndDate: z.date().optional(),
  returnDocument: z.string().optional(),
  
  // Kişisel Veriler
  gender: z.enum(['erkek', 'kadin']).optional(),
  birthPlace: z.string().optional(),
  maritalStatus: z.enum(['bekar', 'evli', 'bosanmis', 'dul']).optional(),
  education: z.string().optional(),
  workStatus: z.string().optional(),
  workSector: z.string().optional(),
  jobGroup: z.string().optional(),
  jobDescription: z.string().optional(),
  criminalRecord: z.boolean().optional(),
  
  // Gelir ve Barınma
  housingType: z.enum(['kira', 'sahip', 'diger']).optional(),
  monthlyIncome: z.number().min(0).optional(),
  monthlyExpenses: z.number().min(0).optional(),
  socialSecurity: z.boolean().optional(),
  incomeSource: z.array(z.string()).optional(),
  
  // Sağlık
  bloodType: z.string().optional(),
  smoking: z.boolean().optional(),
  disability: z.string().optional(),
  prosthesis: z.string().optional(),
  medicalDevices: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  diseases: z.array(z.string()).optional(),
  healthDescription: z.string().optional(),
  
  // Acil Durum İletişim
  emergencyContactName: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  emergencyContactPhone1: z.string().optional(),
  emergencyContactPhone2: z.string().optional(),
  
  // Etiketler
  regularDonationPossible: z.boolean().optional(),
  futureApplicationsRejected: z.boolean().optional(),
  negative: z.boolean().optional(),
  fakeDocumentLie: z.boolean().optional(),
  
  // Özel Durumlar
  earthquake: z.boolean().optional(),
  
  // Açıklamalar
  descriptionTurkish: z.string().optional(),
  descriptionEnglish: z.string().optional(),
  descriptionArabic: z.string().optional(),
})

export type PersonFormData = z.infer<typeof PersonFormSchema>

// Bağış Formu Validasyon Şeması - Temel
export const BaseDonationSchema = z.object({
  personId: z.string().min(1, 'Bağışçı seçilmelidir'),
  amount: z.number().min(1, 'Tutar 0\'dan büyük olmalıdır'),
  currency: z.enum(['TRY', 'USD', 'EUR']),
  type: z.enum(['nakit', 'cek', 'kredi_karti', 'online', 'ayni', 'tekrarli']),
  description: z.string().optional(),
  date: z.date({ message: 'Tarih gereklidir' }),
  category: z.string().optional(),
  receiptNumber: z.string().optional(),
})

// Nakit Bağış Şeması
export const CashDonationSchema = BaseDonationSchema.extend({
  type: z.literal('nakit'),
  receivedBy: z.string().min(1, 'Teslim alan kişi belirtilmelidir'),
  paymentMethod: z.enum(['nakit', 'pos']),
})

// Çek/Senet Bağış Şeması
export const CheckDonationSchema = BaseDonationSchema.extend({
  type: z.literal('cek'),
  checkNumber: z.string().min(1, 'Çek numarası gereklidir'),
  bankName: z.string().min(1, 'Banka adı gereklidir'),
  dueDate: z.date({ message: 'Vade tarihi gereklidir' }),
  accountHolder: z.string().min(1, 'Hesap sahibi gereklidir'),
})

// Kredi Kartı Bağış Şeması
export const CreditCardDonationSchema = BaseDonationSchema.extend({
  type: z.literal('kredi_karti'),
  transactionId: z.string().min(1, 'İşlem numarası gereklidir'),
  cardLastFour: z.string().length(4, 'Son 4 hane gereklidir'),
  bankName: z.string().min(1, 'Banka adı gereklidir'),
  installments: z.number().min(1).max(12, 'Taksit sayısı 1-12 arasında olmalıdır'),
})

// Online Bağış Şeması
export const OnlineDonationSchema = BaseDonationSchema.extend({
  type: z.literal('online'),
  platform: z.enum(['website', 'mobile_app', 'social_media']),
  transactionId: z.string().min(1, 'İşlem numarası gereklidir'),
  paymentGateway: z.string().min(1, 'Ödeme sağlayıcısı gereklidir'),
  ipAddress: z.string().optional(),
})

// Ayni Bağış Şeması
export const InKindDonationSchema = BaseDonationSchema.extend({
  type: z.literal('ayni'),
  itemName: z.string().min(1, 'Eşya adı gereklidir'),
  itemDescription: z.string().optional(),
  estimatedValue: z.number().min(0, 'Tahmini değer 0\'dan büyük olmalıdır'),
  condition: z.enum(['yeni', 'cok_iyi', 'iyi', 'kullanilabilir']),
  quantity: z.number().min(1, 'Adet en az 1 olmalıdır'),
  unit: z.string().min(1, 'Birim belirtilmelidir'),
})

// Tekrarlı Bağış Şeması
export const RecurringDonationSchema = BaseDonationSchema.extend({
  type: z.literal('tekrarli'),
  frequency: z.enum(['haftalik', 'aylik', 'ucaylik', 'altiaylik', 'yillik']),
  startDate: z.date({ message: 'Başlangıç tarihi gereklidir' }),
  endDate: z.date({ message: 'Bitiş tarihi gereklidir' }).optional(),
  isActive: z.boolean().default(true),
  nextPaymentDate: z.date({ message: 'Sonraki ödeme tarihi gereklidir' }),
})

// Birleşik Bağış Şeması
export const DonationFormSchema = z.discriminatedUnion('type', [
  CashDonationSchema,
  CheckDonationSchema,
  CreditCardDonationSchema,
  OnlineDonationSchema,
  InKindDonationSchema,
  RecurringDonationSchema,
])

export type DonationFormData = z.infer<typeof DonationFormSchema>
export type CashDonationData = z.infer<typeof CashDonationSchema>
export type CheckDonationData = z.infer<typeof CheckDonationSchema>
export type CreditCardDonationData = z.infer<typeof CreditCardDonationSchema>
export type OnlineDonationData = z.infer<typeof OnlineDonationSchema>
export type InKindDonationData = z.infer<typeof InKindDonationSchema>
export type RecurringDonationData = z.infer<typeof RecurringDonationSchema>

// Yardım Alan Kişi/Aile Şeması
export const BeneficiarySchema = z.object({
  // Temel bilgiler
  firstName: z.string().min(1, 'Ad gereklidir'),
  lastName: z.string().min(1, 'Soyad gereklidir'),
  tcNo: z.string().min(11, 'TC No 11 haneli olmalıdır').max(11),
  phone: z.string().min(10, 'Telefon numarası gereklidir'),
  email: z.string().email('Geçerli email adresi girin').optional(),
  
  // Adres bilgileri
  address: z.string().min(1, 'Adres gereklidir'),
  city: z.string().min(1, 'Şehir gereklidir'),
  district: z.string().min(1, 'İlçe gereklidir'),
  neighborhood: z.string().optional(),
  
  // Aile bilgileri
  familySize: z.number().min(1, 'Aile büyüklüğü en az 1 olmalıdır'),
  childrenCount: z.number().min(0, 'Çocuk sayısı 0 veya daha fazla olmalıdır'),
  elderlyCount: z.number().min(0, 'Yaşlı sayısı 0 veya daha fazla olmalıdır'),
  disabledCount: z.number().min(0, 'Engelli sayısı 0 veya daha fazla olmalıdır'),
  
  // Ekonomik durum
  monthlyIncome: z.number().min(0, 'Aylık gelir 0 veya daha fazla olmalıdır'),
  incomeSource: z.enum(['calisiyor', 'emekli', 'issiz', 'ogrenci', 'diger']),
  housingStatus: z.enum(['kira', 'ev_sahibi', 'aile_yaninda', 'diger']),
  monthlyRent: z.number().min(0).optional(),
  
  // Sağlık durumu
  healthStatus: z.enum(['saglikli', 'kronik_hasta', 'engelli', 'diger']),
  healthDetails: z.string().optional(),
  
  // Yardım durumu
  previousAid: z.boolean().default(false),
  otherAidSources: z.string().optional(),
  urgencyLevel: z.enum(['dusuk', 'orta', 'yuksek', 'acil']),
  
  // Notlar
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  
  // Durum
  status: z.enum(['aktif', 'pasif', 'beklemede']).default('aktif'),
  registrationDate: z.date({ message: 'Kayıt tarihi gereklidir' }),
})

// Yardım Başvuru Şeması
export const AidApplicationSchema = z.object({
  beneficiaryId: z.string().min(1, 'Yardım alan kişi seçilmelidir'),
  aidType: z.enum(['nakdi', 'ayni', 'hizmet', 'saglik', 'egitim', 'barinma']),
  category: z.string().min(1, 'Kategori seçilmelidir'),
  amount: z.number().min(0, 'Tutar 0 veya daha fazla olmalıdır').optional(),
  currency: z.enum(['TRY', 'USD', 'EUR']).default('TRY'),
  
  // Başvuru detayları
  title: z.string().min(1, 'Başlık gereklidir'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  urgencyLevel: z.enum(['dusuk', 'orta', 'yuksek', 'acil']),
  
  // Başvuru durumu
  status: z.enum(['yeni', 'inceleniyor', 'onaylandi', 'reddedildi', 'tamamlandi']).default('yeni'),
  applicationDate: z.date({ message: 'Başvuru tarihi gereklidir' }),
  requestedDate: z.date({ message: 'Talep edilen tarih gereklidir' }),
  
  // Değerlendirme
  evaluatorId: z.string().optional(),
  evaluationNotes: z.string().optional(),
  evaluationDate: z.date().optional(),
  
  // Onay
  approverId: z.string().optional(),
  approvalNotes: z.string().optional(),
  approvalDate: z.date().optional(),
  
  // Ödeme/Teslimat
  paymentMethod: z.enum(['nakit', 'banka_havalesi', 'ayni_teslimat', 'hizmet']).optional(),
  paymentDate: z.date().optional(),
  paymentReference: z.string().optional(),
  
  // Belgeler
  documents: z.array(z.string()).optional(),
  
  // Notlar
  notes: z.string().optional(),
})

// Nakdi Yardım Şeması
export const CashAidSchema = z.object({
  applicationId: z.string().min(1, 'Başvuru ID gereklidir'),
  beneficiaryId: z.string().min(1, 'Yardım alan kişi gereklidir'),
  amount: z.number().min(1, 'Tutar 0\'dan büyük olmalıdır'),
  currency: z.enum(['TRY', 'USD', 'EUR']).default('TRY'),
  
  // Ödeme detayları
  paymentMethod: z.enum(['nakit', 'banka_havalesi', 'pos', 'cek']),
  paymentDate: z.date({ message: 'Ödeme tarihi gereklidir' }),
  referenceNumber: z.string().min(1, 'Referans numarası gereklidir'),
  
  // Banka bilgileri (havale için)
  bankName: z.string().optional(),
  iban: z.string().optional(),
  accountHolder: z.string().optional(),
  
  // Teslim eden bilgileri
  deliveredBy: z.string().min(1, 'Teslim eden kişi gereklidir'),
  deliveryNotes: z.string().optional(),
  
  // Durum
  status: z.enum(['hazirlaniyor', 'odendi', 'teslim_edildi', 'iptal']).default('hazirlaniyor'),
  
  // Notlar
  notes: z.string().optional(),
})

// Ayni Yardım Şeması
export const InKindAidSchema = z.object({
  applicationId: z.string().min(1, 'Başvuru ID gereklidir'),
  beneficiaryId: z.string().min(1, 'Yardım alan kişi gereklidir'),
  
  // Eşya detayları
  items: z.array(z.object({
    name: z.string().min(1, 'Eşya adı gereklidir'),
    category: z.string().min(1, 'Kategori gereklidir'),
    quantity: z.number().min(1, 'Miktar en az 1 olmalıdır'),
    unit: z.string().min(1, 'Birim gereklidir'),
    estimatedValue: z.number().min(0, 'Tahmini değer 0 veya daha fazla olmalıdır'),
    condition: z.enum(['yeni', 'cok_iyi', 'iyi', 'kullanilabilir']),
    description: z.string().optional(),
  })).min(1, 'En az bir eşya eklenmeli'),
  
  // Teslimat bilgileri
  deliveryMethod: z.enum(['teslim_alma', 'kargo', 'kurye', 'depo']),
  deliveryDate: z.date({ message: 'Teslimat tarihi gereklidir' }),
  deliveryAddress: z.string().optional(),
  
  // Teslim eden bilgileri
  deliveredBy: z.string().min(1, 'Teslim eden kişi gereklidir'),
  deliveryNotes: z.string().optional(),
  
  // Durum
  status: z.enum(['hazirlaniyor', 'hazir', 'teslim_edildi', 'iptal']).default('hazirlaniyor'),
  
  // Notlar
  notes: z.string().optional(),
})

// Banka Ödeme Emri Şeması
export const BankPaymentOrderSchema = z.object({
  // Toplu ödeme bilgileri
  batchId: z.string().min(1, 'Batch ID gereklidir'),
  batchName: z.string().min(1, 'Batch adı gereklidir'),
  totalAmount: z.number().min(1, 'Toplam tutar 0\'dan büyük olmalıdır'),
  currency: z.enum(['TRY', 'USD', 'EUR']).default('TRY'),
  
  // Banka bilgileri
  bankName: z.string().min(1, 'Banka adı gereklidir'),
  bankCode: z.string().min(1, 'Banka kodu gereklidir'),
  
  // Ödeme emirleri
  payments: z.array(z.object({
    applicationId: z.string(),
    beneficiaryId: z.string(),
    beneficiaryName: z.string(),
    iban: z.string().min(26, 'IBAN 26 karakter olmalıdır'),
    amount: z.number().min(1),
    description: z.string(),
  })).min(1, 'En az bir ödeme emri olmalı'),
  
  // Durum
  status: z.enum(['hazirlaniyor', 'onay_bekliyor', 'gonderildi', 'tamamlandi', 'iptal']).default('hazirlaniyor'),
  
  // Onay bilgileri
  preparedBy: z.string().min(1, 'Hazırlayan kişi gereklidir'),
  approvedBy: z.string().optional(),
  approvalDate: z.date().optional(),
  sentDate: z.date().optional(),
  
  // Notlar
  notes: z.string().optional(),
})

// Yardım Formu Validasyon Şeması
export const AidFormSchema = z.object({
  personId: z.string().min(1, 'Yardım alan kişi seçilmelidir'),
  amount: z.number().min(1, 'Tutar 0\'dan büyük olmalıdır'),
  currency: z.enum(['TRY', 'USD', 'EUR']),
  type: z.enum(['nakdi', 'ayni', 'hizmet']),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  requestDate: z.date({ message: 'Başvuru tarihi gereklidir' }),
  approvalStatus: z.enum(['beklemede', 'onaylandi', 'reddedildi']),
  urgencyLevel: z.enum(['dusuk', 'orta', 'yuksek', 'acil']),
})

export type AidFormData = z.infer<typeof AidFormSchema>

// Yardım tipi exports
export type BeneficiaryData = z.infer<typeof BeneficiarySchema>
export type AidApplicationData = z.infer<typeof AidApplicationSchema>
export type CashAidData = z.infer<typeof CashAidSchema>
export type InKindAidData = z.infer<typeof InKindAidSchema>
export type BankPaymentOrderData = z.infer<typeof BankPaymentOrderSchema> 