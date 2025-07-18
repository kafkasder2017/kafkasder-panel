'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DonationForm } from '@/components/forms/donation-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import toast from 'react-hot-toast'

export default function YeniBagisPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      // Burada API'ye veri gönderilecek
      console.log('Yeni bağış verisi:', data)
      
      // Simüle edilmiş başarılı kayıt
      console.log('Bağış başarıyla kaydedildi!')
      
      // Bağış listesine geri dön
      router.push('/bagislar')
    } catch (error) {
      console.error('Bağış kaydı hatası:', error)
      console.error('Bağış kaydedilirken bir hata oluştu!')
    }
  }

  const handleCancel = () => {
    router.push('/bagislar')
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve Geri Butonu */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push('/bagislar')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Bağış Kaydı</h1>
          <p className="text-gray-600">Yeni bir bağış kaydı oluşturun</p>
        </div>
      </div>

      {/* Bağış Formu */}
      <DonationForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
} 