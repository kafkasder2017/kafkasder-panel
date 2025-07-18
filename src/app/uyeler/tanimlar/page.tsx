'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { FormModal } from '@/components/ui/modal'
import { ConfirmationModal } from '@/components/ui/modal'
import { useAuth } from '@/hooks/useAuth'
import { hasPermission } from '@/lib/auth'
import {
  Plus,
  Edit,
  Trash2,
  Settings,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react'

// Mock data - gerçek uygulamada API'den gelecek
const mockMembershipTypes = [
  {
    id: 1,
    name: 'Normal Üyelik',
    code: 'NORMAL',
    description: 'Standart üyelik paketi',
    monthlyFee: 500,
    annualFee: 6000,
    benefits: ['Aylık bülten', 'Etkinliklere katılım', 'Temel hizmetler'],
    isActive: true,
    memberCount: 980,
  },
  {
    id: 2,
    name: 'Premium Üyelik',
    code: 'PREMIUM',
    description: 'Gelişmiş üyelik paketi',
    monthlyFee: 750,
    annualFee: 9000,
    benefits: ['Öncelikli hizmet', 'Özel etkinlikler', 'İndirimler', '7/24 destek'],
    isActive: true,
    memberCount: 200,
  },
  {
    id: 3,
    name: 'VIP Üyelik',
    code: 'VIP',
    description: 'En üst düzey üyelik',
    monthlyFee: 1500,
    annualFee: 18000,
    benefits: ['Kişisel danışman', 'Özel etkinlikler', 'Maksimum indirimler', 'Öncelikli erişim'],
    isActive: true,
    memberCount: 50,
  },
  {
    id: 4,
    name: 'Öğrenci Üyeliği',
    code: 'STUDENT',
    description: 'Öğrenciler için özel üyelik',
    monthlyFee: 250,
    annualFee: 3000,
    benefits: ['Öğrenci etkinlikleri', 'Kütüphane erişimi', 'Mentorluk programı'],
    isActive: true,
    memberCount: 20,
  },
]

const mockPaymentMethods = [
  { id: 1, name: 'Banka Transferi', code: 'BANK_TRANSFER', isActive: true },
  { id: 2, name: 'Kredi Kartı', code: 'CREDIT_CARD', isActive: true },
  { id: 3, name: 'Nakit', code: 'CASH', isActive: true },
  { id: 4, name: 'Çek', code: 'CHECK', isActive: false },
]

const mockMemberStatuses = [
  { id: 1, name: 'Aktif', code: 'ACTIVE', color: 'green', isActive: true },
  { id: 2, name: 'Pasif', code: 'INACTIVE', color: 'gray', isActive: true },
  { id: 3, name: 'Askıya Alınmış', code: 'SUSPENDED', color: 'yellow', isActive: true },
  { id: 4, name: 'İptal Edilmiş', code: 'CANCELLED', color: 'red', isActive: true },
]

export default function MemberDefinitionsPage() {
  const [activeTab, setActiveTab] = useState('membership-types')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const { user } = useAuth()

  const canManageDefinitions = hasPermission(user, 'members:manage')

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
  }

  const handleDelete = (item: any) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    console.log('Deleting item:', selectedItem)
    setIsDeleteModalOpen(false)
    setSelectedItem(null)
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Aktif
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        <XCircle className="h-3 w-3 mr-1" />
        Pasif
      </Badge>
    )
  }

  const renderMembershipTypes = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Üyelik Tipleri</h3>
        {canManageDefinitions && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Tip Ekle
          </Button>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMembershipTypes.map((type) => (
          <Card key={type.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </div>
                {getStatusBadge(type.isActive)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Aylık Ücret</p>
                  <p className="text-lg font-semibold">₺{type.monthlyFee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yıllık Ücret</p>
                  <p className="text-lg font-semibold">₺{type.annualFee}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Avantajlar:</p>
                <ul className="space-y-1">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  {type.memberCount} üye
                </span>
                {canManageDefinitions && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(type)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(type)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Ödeme Yöntemleri</h3>
        {canManageDefinitions && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Yöntem Ekle
          </Button>
        )}
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Yöntem Adı</TableHead>
                <TableHead>Kod</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPaymentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell className="font-medium">{method.name}</TableCell>
                  <TableCell>{method.code}</TableCell>
                  <TableCell>{getStatusBadge(method.isActive)}</TableCell>
                  <TableCell>
                    {canManageDefinitions && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(method)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(method)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderMemberStatuses = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Üye Durumları</h3>
        {canManageDefinitions && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Durum Ekle
          </Button>
        )}
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Durum Adı</TableHead>
                <TableHead>Kod</TableHead>
                <TableHead>Renk</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMemberStatuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className="font-medium">{status.name}</TableCell>
                  <TableCell>{status.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full bg-${status.color}-500`}></div>
                      <span className="capitalize">{status.color}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(status.isActive)}</TableCell>
                  <TableCell>
                    {canManageDefinitions && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(status)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(status)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Üye Tanımları</h1>
          <p className="text-muted-foreground">
            Üyelik tipleri, ödeme yöntemleri ve durum tanımları
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'membership-types', label: 'Üyelik Tipleri', icon: Users },
            { id: 'payment-methods', label: 'Ödeme Yöntemleri', icon: DollarSign },
            { id: 'member-statuses', label: 'Üye Durumları', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'membership-types' && renderMembershipTypes()}
        {activeTab === 'payment-methods' && renderPaymentMethods()}
        {activeTab === 'member-statuses' && renderMemberStatuses()}
      </div>

      {/* Add/Edit Modal */}
      <FormModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedItem(null)
        }}
        title={isEditModalOpen ? 'Düzenle' : 'Yeni Ekle'}
        description={isEditModalOpen ? 'Seçili öğeyi düzenleyin' : 'Yeni tanım ekleyin'}
        submitText={isEditModalOpen ? 'Güncelle' : 'Ekle'}
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Saving item:', selectedItem)
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedItem(null)
        }}
        size="lg"
      >
        {activeTab === 'membership-types' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Üyelik Adı</label>
              <Input defaultValue={selectedItem?.name} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kod</label>
              <Input defaultValue={selectedItem?.code} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Açıklama</label>
              <Input defaultValue={selectedItem?.description} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Aylık Ücret</label>
              <Input type="number" defaultValue={selectedItem?.monthlyFee} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Yıllık Ücret</label>
              <Input type="number" defaultValue={selectedItem?.annualFee} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Durum</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="true">Aktif</option>
                <option value="false">Pasif</option>
              </select>
            </div>
          </div>
        )}
        
        {(activeTab === 'payment-methods' || activeTab === 'member-statuses') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ad</label>
              <Input defaultValue={selectedItem?.name} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kod</label>
              <Input defaultValue={selectedItem?.code} required />
            </div>
            {activeTab === 'member-statuses' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Renk</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="green">Yeşil</option>
                  <option value="red">Kırmızı</option>
                  <option value="yellow">Sarı</option>
                  <option value="blue">Mavi</option>
                  <option value="gray">Gri</option>
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Durum</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="true">Aktif</option>
                <option value="false">Pasif</option>
              </select>
            </div>
          </div>
        )}
      </FormModal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Silme Onayı"
        description={`"${selectedItem?.name}" adlı öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        variant="destructive"
      />
    </div>
  )
} 