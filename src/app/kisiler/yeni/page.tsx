'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { hasPermission } from '@/lib/auth'
import {
  User,
  MapPin,
  FileText,
  Heart,
  Shield,
  Briefcase,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Save,
} from 'lucide-react'

// Form adımları
const steps = [
  {
    id: 1,
    title: 'Genel Bilgiler',
    icon: User,
    description: 'Temel kişisel bilgiler',
  },
  {
    id: 2,
    title: 'İletişim & Adres',
    icon: MapPin,
    description: 'İletişim bilgileri ve adres',
  },
  {
    id: 3,
    title: 'Kimlik Bilgileri',
    icon: FileText,
    description: 'Kimlik ve pasaport bilgileri',
  },
  {
    id: 4,
    title: 'Kişisel Veriler',
    icon: Shield,
    description: 'Kişisel ve demografik bilgiler',
  },
  {
    id: 5,
    title: 'İş & Gelir',
    icon: Briefcase,
    description: 'İş durumu ve gelir bilgileri',
  },
  {
    id: 6,
    title: 'Sağlık Durumu',
    icon: Heart,
    description: 'Sağlık ve tıbbi bilgiler',
  },
  {
    id: 7,
    title: 'Acil Durum',
    icon: AlertTriangle,
    description: 'Acil durum iletişim bilgileri',
  },
  {
    id: 8,
    title: 'Etiketler & Notlar',
    icon: Activity,
    description: 'Etiketler ve açıklamalar',
  },
]

// Form verileri için tip tanımı
interface PersonFormData {
  // Genel Bilgiler
  firstName: string
  lastName: string
  nationality: string
  identityNumber: string
  birthDate: string
  category: string
  fileNumber: string
  sponsorshipType: string
  recordStatus: string
  
  // İletişim & Adres
  mobilePhone: string
  phone: string
  internationalPhone: string
  email: string
  country: string
  city: string
  district: string
  neighborhood: string
  address: string
  
  // Kimlik Bilgileri
  fatherName: string
  motherName: string
  idType: string
  idIssuer: string
  idSerial: string
  prevIds: string
  prevResidences: string
  
  // Pasaport ve Vize
  passportType: string
  passportNumber: string
  passportValidUntil: string
  visaStart: string
  visaEnd: string
  returnDoc: string
  
  // Kişisel Veriler
  gender: string
  birthPlace: string
  maritalStatus: string
  education: string
  employmentStatus: string
  sector: string
  professionGroup: string
  professionDesc: string
  criminalRecord: string
  
  // İş ve Gelir
  residenceType: string
  monthlyIncome: string
  monthlyExpense: string
  socialSecurity: string
  incomeSources: string[]
  
  // Sağlık Durumu
  bloodType: string
  smoking: string
  disability: string
  prosthetics: string
  medicalDevices: string
  medications: string
  surgeries: string
  diseases: string[]
  healthNote: string
  
  // Acil Durum
  emergencyName: string
  emergencyRelation: string
  emergencyPhone1: string
  emergencyPhone2: string
  
  // Etiketler
  regularAid: boolean
  rejectFuture: boolean
  negative: boolean
  fakeDoc: boolean
  earthquakeVictim: boolean
  
  // Açıklamalar
  noteTr: string
  noteEn: string
  noteAr: string
}

export default function NewPersonPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PersonFormData>({
    // Varsayılan değerler
    firstName: '',
    lastName: '',
    nationality: '',
    identityNumber: '',
    birthDate: '',
    category: 'donor',
    fileNumber: '',
    sponsorshipType: '',
    recordStatus: 'draft',
    mobilePhone: '',
    phone: '',
    internationalPhone: '',
    email: '',
    country: 'Türkiye',
    city: '',
    district: '',
    neighborhood: '',
    address: '',
    fatherName: '',
    motherName: '',
    idType: '',
    idIssuer: '',
    idSerial: '',
    prevIds: '',
    prevResidences: '',
    passportType: '',
    passportNumber: '',
    passportValidUntil: '',
    visaStart: '',
    visaEnd: '',
    returnDoc: '',
    gender: '',
    birthPlace: '',
    maritalStatus: '',
    education: '',
    employmentStatus: '',
    sector: '',
    professionGroup: '',
    professionDesc: '',
    criminalRecord: '',
    residenceType: '',
    monthlyIncome: '',
    monthlyExpense: '',
    socialSecurity: '',
    incomeSources: [],
    bloodType: '',
    smoking: '',
    disability: '',
    prosthetics: '',
    medicalDevices: '',
    medications: '',
    surgeries: '',
    diseases: [],
    healthNote: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone1: '',
    emergencyPhone2: '',
    regularAid: false,
    rejectFuture: false,
    negative: false,
    fakeDoc: false,
    earthquakeVictim: false,
    noteTr: '',
    noteEn: '',
    noteAr: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const userRole = user?.profile?.role || 'viewer'
  const canManagePeople = hasPermission(userRole, 'user')

  if (!canManagePeople) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Erişim Reddedildi</h3>
          <p className="text-muted-foreground">
            Kişi eklemek için yetkiniz bulunmamaktadır.
          </p>
        </div>
      </div>
    )
  }

  const updateFormData = (field: keyof PersonFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // API call to save person
      console.log('Saving person data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to people list
      router.push('/kisiler')
    } catch (error) {
      console.error('Error saving person:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ad *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                placeholder="Ad"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Soyad *</label>
              <Input
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                placeholder="Soyad"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Uyruk</label>
              <Input
                value={formData.nationality}
                onChange={(e) => updateFormData('nationality', e.target.value)}
                placeholder="Uyruk"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kimlik No</label>
              <Input
                value={formData.identityNumber}
                onChange={(e) => updateFormData('identityNumber', e.target.value)}
                placeholder="Kimlik Numarası"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Doğum Tarihi</label>
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateFormData('birthDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori *</label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                required
              >
                <option value="donor">Bağışçı</option>
                <option value="aid_recipient">Yardım Alan</option>
                <option value="member">Üye</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dosya Numarası</label>
              <Input
                value={formData.fileNumber}
                onChange={(e) => updateFormData('fileNumber', e.target.value)}
                placeholder="Dosya Numarası"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sponsorluk Tipi</label>
              <select
                value={formData.sponsorshipType}
                onChange={(e) => updateFormData('sponsorshipType', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Seçiniz</option>
                <option value="individual">Bireysel</option>
                <option value="corporate">Kurumsal</option>
                <option value="group">Grup</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kayıt Durumu</label>
              <select
                value={formData.recordStatus}
                onChange={(e) => updateFormData('recordStatus', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="draft">Taslak</option>
                <option value="active">Kayda Al</option>
              </select>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cep Telefonu *</label>
              <Input
                value={formData.mobilePhone}
                onChange={(e) => updateFormData('mobilePhone', e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sabit Telefon</label>
              <Input
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Sabit Telefon"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Yurtdışı Telefonu</label>
              <Input
                value={formData.internationalPhone}
                onChange={(e) => updateFormData('internationalPhone', e.target.value)}
                placeholder="Yurtdışı Telefonu"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-posta</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="ornek@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ülke</label>
              <Input
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                placeholder="Ülke"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Şehir/Bölge</label>
              <Input
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="Şehir/Bölge"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Yerleşim</label>
              <Input
                value={formData.district}
                onChange={(e) => updateFormData('district', e.target.value)}
                placeholder="Yerleşim"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mahalle/Köy</label>
              <Input
                value={formData.neighborhood}
                onChange={(e) => updateFormData('neighborhood', e.target.value)}
                placeholder="Mahalle/Köy"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Adres</label>
              <textarea
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Detaylı adres"
                className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[80px]"
              />
            </div>
          </div>
        )
      
      // Diğer adımlar için placeholder
      default:
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">
              {steps[currentStep - 1]?.title} Adımı
            </h3>
            <p className="text-muted-foreground">
              Bu adımın detaylı form alanları yakında eklenecek.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Yeni Kişi Ekle</h1>
            <p className="text-muted-foreground">
              Çok adımlı kişi kayıt formu
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Adım {currentStep} / {steps.length}
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-muted bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-muted-foreground">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Önceki
          </Button>
          
          <div className="flex gap-2">
            {currentStep < steps.length ? (
              <Button type="button" onClick={nextStep}>
                Sonraki
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
} 