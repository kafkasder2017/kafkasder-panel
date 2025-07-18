'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormField } from './form-components'
import { BaseDonationSchema } from '@/lib/validations'
import { ArrowLeft, ArrowRight, Check, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { z } from 'zod'

// Basit bağış formu tipi
type BaseDonationData = z.infer<typeof BaseDonationSchema>

// Adım türleri
type Step = 'type' | 'basic' | 'details' | 'review'

interface DonationFormProps {
  onSubmit?: (data: BaseDonationData) => void
  onCancel?: () => void
  initialData?: Partial<BaseDonationData>
}

// Bağış türü seçenekleri
const donationTypes = [
  {
    value: 'nakit',
    label: 'Nakit Bağış',
    description: 'Nakit veya POS ile alınan bağışlar',
    icon: '💵',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
  },
  {
    value: 'cek',
    label: 'Çek/Senet',
    description: 'Çek veya senet ile alınan bağışlar',
    icon: '📝',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400'
  },
  {
    value: 'kredi_karti',
    label: 'Kredi Kartı',
    description: 'Kredi kartı ile alınan bağışlar',
    icon: '💳',
    color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400'
  },
  {
    value: 'online',
    label: 'Online Bağış',
    description: 'Web sitesi veya uygulama üzerinden',
    icon: '🌐',
    color: 'bg-green-50 border-green-200 hover:border-green-400'
  },
  {
    value: 'ayni',
    label: 'Ayni Bağış',
    description: 'Eşya, gıda ve diğer ayni yardımlar',
    icon: '📦',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400'
  },
  {
    value: 'tekrarli',
    label: 'Tekrarlı Bağış',
    description: 'Düzenli olarak tekrarlanan bağışlar',
    icon: '🔄',
    color: 'bg-pink-50 border-pink-200 hover:border-pink-400'
  }
]

// Adım göstergesi
const StepIndicator: React.FC<{ steps: Step[], currentStep: Step }> = ({ steps, currentStep }) => {
  const stepLabels = {
    type: 'Tür Seçimi',
    basic: 'Temel Bilgiler',
    details: 'Detay Bilgiler',
    review: 'Önizleme'
  }

  const currentIndex = steps.indexOf(currentStep)

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold",
              index < currentIndex
                ? "bg-green-100 text-green-800"
                : index === currentIndex
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-500"
            )}
          >
            {index < currentIndex ? <Check className="h-5 w-5" /> : index + 1}
          </div>
          <span className={cn(
            "ml-2 text-sm font-medium",
            index <= currentIndex ? "text-gray-900" : "text-gray-500"
          )}>
            {stepLabels[step]}
          </span>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-16 h-0.5 ml-4",
              index < currentIndex ? "bg-green-300" : "bg-gray-200"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}

export function DonationForm({ onSubmit, onCancel, initialData }: DonationFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('type')
  const [selectedType, setSelectedType] = useState<string>(initialData?.type || '')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<BaseDonationData>({
    resolver: zodResolver(BaseDonationSchema),
    defaultValues: {
      ...initialData,
      amount: 0,
    }
  })

  const steps: Step[] = ['type', 'basic']

  // Adım geçişi
  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  // Form gönderimi
  const onFormSubmit = async (data: BaseDonationData) => {
    console.log('Form data:', data)
    onSubmit?.(data)
  }

  // Tür seçimi adımı
  const renderTypeStep = () => (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          Bağış Türü Seçimi
        </CardTitle>
        <CardDescription>
          Kaydetmek istediğiniz bağış türünü seçin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donationTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                setSelectedType(type.value)
                setValue('type', type.value as any)
              }}
              className={cn(
                "p-6 border-2 rounded-lg text-left transition-all",
                type.color,
                selectedType === type.value
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : ""
              )}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={nextStep} 
            disabled={!selectedType}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Devam Et <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Temel bilgiler adımı
  const renderBasicStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Temel Bağış Bilgileri</CardTitle>
        <CardDescription>
          Bağışçı ve genel bağış bilgilerini girin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Bağışçı"
            name="personId"
            error={errors.personId?.message}
            required
          >
            <select
              {...register('personId')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bağışçı seçin</option>
              <option value="1">Ahmet Yılmaz</option>
              <option value="2">Fatma Demir</option>
              <option value="3">Mehmet Özkan</option>
            </select>
          </FormField>

          <FormField
            label="Para Birimi"
            name="currency"
            error={errors.currency?.message}
            required
          >
            <select
              {...register('currency')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="TRY">Türk Lirası (₺)</option>
              <option value="USD">Amerikan Doları ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={selectedType === 'ayni' ? 'Tahmini Değer' : 'Bağış Tutarı'}
            name="amount"
            error={errors.amount?.message}
            required
          >
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
            />
          </FormField>

          <FormField
            label="Bağış Tarihi"
            name="date"
            error={errors.date?.message}
            required
          >
            <Input
              type="date"
              {...register('date', { valueAsDate: true })}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Kategori"
            name="category"
            error={errors.category?.message}
          >
            <select
              {...register('category')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Kategori seçin</option>
              <option value="Genel">Genel Bağış</option>
              <option value="Eğitim">Eğitim Fonu</option>
              <option value="Sağlık">Sağlık Yardımı</option>
              <option value="Barınma">Barınma Yardımı</option>
              <option value="Gıda">Gıda Yardımı</option>
            </select>
          </FormField>

          <FormField
            label="Fiş Numarası"
            name="receiptNumber"
            error={errors.receiptNumber?.message}
          >
            <Input
              placeholder="Otomatik oluşturulacak"
              {...register('receiptNumber')}
            />
          </FormField>
        </div>

        <FormField
          label="Açıklama"
          name="description"
          error={errors.description?.message}
        >
          <textarea
            rows={3}
            placeholder="Bağış hakkında ek bilgiler..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register('description')}
          />
        </FormField>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              İptal
            </Button>
            <Button 
              onClick={handleSubmit(onFormSubmit)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      {currentStep === 'type' && renderTypeStep()}
      {currentStep === 'basic' && renderBasicStep()}
    </div>
  )
} 