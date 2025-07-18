'use client'

import { useState } from 'react'
import { usePersons, usePersonOperations, useCountries, useCities, useDistricts } from '@/hooks/useServices'
import { Person, PersonInsert } from '@/types/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Context7 Aid Management Component
export default function AidPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newAid, setNewAid] = useState<Partial<PersonInsert>>({
    first_name: '',
    last_name: '',
    category: 'beneficiary',
    status: 'draft'
  })

  // Context7 API Hooks
  const beneficiariesHook = usePersons({
    category: 'beneficiary',
    status: selectedStatus as any,
    page: 1,
    limit: 10
  })
  
  // Context7 Safe Data Extraction
  const beneficiaries = (beneficiariesHook as any).data || (beneficiariesHook as any).results || []
  const loading = (beneficiariesHook as any).loading || false
  const error = (beneficiariesHook as any).error || null
  const pagination = (beneficiariesHook as any).pagination || null
  const goToPage = (beneficiariesHook as any).goToPage || (() => {})
  const nextPage = (beneficiariesHook as any).nextPage || (() => {})
  const prevPage = (beneficiariesHook as any).prevPage || (() => {})

  const { createPerson } = usePersonOperations()
  const countriesHook = useCountries()
  const citiesHook = useCities()
  const districtsHook = useDistricts()
  
  const countries = (countriesHook as any).data || (countriesHook as any).results || []
  const cities = (citiesHook as any).data || (citiesHook as any).results || []
  const districts = (districtsHook as any).data || (districtsHook as any).results || []

  // Context7 Filter Functions
  const filteredBeneficiaries = beneficiaries?.filter((beneficiary: any) => {
    const matchesSearch = searchQuery === '' || 
      beneficiary.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  }) || []

  // Context7 Create Beneficiary Function
  const handleCreateBeneficiary = async () => {
    try {
      await createPerson(newAid as PersonInsert)
      setShowCreateModal(false)
      setNewAid({
        first_name: '',
        last_name: '',
        category: 'beneficiary',
        status: 'draft'
      })
    } catch (error) {
      console.error('Yardım alanı oluşturma hatası:', error)
    }
  }

  // Context7 Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-gray-100 text-gray-800'
    }

    const labels = {
      pending: 'Beklemede',
      approved: 'Onaylandı',
      rejected: 'Reddedildi',
      completed: 'Tamamlandı',
      cancelled: 'İptal'
    }

    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  // Context7 Urgency Badge Component
  const UrgencyBadge = ({ urgency }: { urgency: string }) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
      critical: 'bg-purple-100 text-purple-800'
    }

    const labels = {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek',
      critical: 'Kritik'
    }

    return (
      <Badge className={colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {labels[urgency as keyof typeof labels] || urgency}
      </Badge>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600">Hata Oluştu</h3>
              <p className="text-gray-600 mt-2">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Sayfayı Yenile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Context7 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yardım Yönetimi</h1>
          <p className="text-gray-600 mt-2">KAFKASDER yardım başvuruları ve takibi</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Yeni Yardım Başvurusu
        </Button>
      </div>

      {/* Context7 Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arama
              </label>
              <Input
                placeholder="Ad, soyad, email veya telefon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yardım Türü
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tüm türler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm türler</SelectItem>
                  <SelectItem value="financial">Nakdi Yardım</SelectItem>
                  <SelectItem value="in_kind">Ayni Yardım</SelectItem>
                  <SelectItem value="medical">Sağlık Yardımı</SelectItem>
                  <SelectItem value="education">Eğitim Yardımı</SelectItem>
                  <SelectItem value="housing">Barınma Yardımı</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tüm durumlar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm durumlar</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="approved">Onaylandı</SelectItem>
                  <SelectItem value="rejected">Reddedildi</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="cancelled">İptal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedType('')
                  setSelectedStatus('')
                }}
                className="w-full"
              >
                Filtreleri Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context7 Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {beneficiaries?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Toplam Başvuru</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {beneficiaries?.filter((b: any) => b.status === 'pending').length || 0}
            </div>
            <div className="text-sm text-gray-600">Beklemede</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {beneficiaries?.filter((b: any) => b.status === 'approved').length || 0}
            </div>
            <div className="text-sm text-gray-600">Onaylandı</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {beneficiaries?.filter((b: any) => b.status === 'completed').length || 0}
            </div>
            <div className="text-sm text-gray-600">Tamamlandı</div>
          </CardContent>
        </Card>
      </div>

      {/* Context7 Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Yardım Başvuru Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Yükleniyor...</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başvuran</TableHead>
                    <TableHead>Yardım Türü</TableHead>
                    <TableHead>İletişim</TableHead>
                    <TableHead>Adres</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Başvuru Tarihi</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiaries.map((beneficiary: any) => (
                    <TableRow key={beneficiary.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {beneficiary.first_name} {beneficiary.last_name}
                          </div>
                          {beneficiary.identity_number && (
                            <div className="text-sm text-gray-500">
                              TC: {beneficiary.identity_number}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>Nakdi Yardım</div>
                          <UrgencyBadge urgency="medium" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{beneficiary.email || '-'}</div>
                          <div className="text-sm text-gray-500">
                            {beneficiary.phone || '-'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {beneficiary.address ? (
                            <div>
                              {beneficiary.address}
                              {beneficiary.country_id && (
                                <div className="text-gray-500">
                                  {countries?.find((c: any) => c.id === beneficiary.country_id)?.name}
                                </div>
                              )}
                            </div>
                          ) : '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={beneficiary.status} />
                      </TableCell>
                      <TableCell>
                        {new Date(beneficiary.created_at).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            İncele
                          </Button>
                          <Button size="sm" variant="outline">
                            Onayla
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Context7 Pagination */}
              {pagination && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    Toplam {pagination.total} kayıt, {pagination.page}. sayfa
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={prevPage}
                      disabled={!pagination.hasPrev}
                    >
                      Önceki
                    </Button>
                    <Button
                      variant="outline"
                      onClick={nextPage}
                      disabled={!pagination.hasNext}
                    >
                      Sonraki
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Context7 Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Yeni Yardım Başvurusu</h2>
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad *
                  </label>
                  <Input
                    value={newAid.first_name || ''}
                    onChange={(e) => setNewAid(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Ad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <Input
                    value={newAid.last_name || ''}
                    onChange={(e) => setNewAid(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Soyad"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TC Kimlik No
                  </label>
                  <Input
                    value={newAid.identity_number || ''}
                    onChange={(e) => setNewAid(prev => ({ ...prev, identity_number: e.target.value }))}
                    placeholder="TC kimlik numarası"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doğum Tarihi
                  </label>
                  <Input
                    type="date"
                    value={newAid.birth_date || ''}
                    onChange={(e) => setNewAid(prev => ({ ...prev, birth_date: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={newAid.email || ''}
                    onChange={(e) => setNewAid(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <Input
                    value={newAid.phone || ''}
                    onChange={(e) => setNewAid(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <Input
                  value={newAid.address || ''}
                  onChange={(e) => setNewAid(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Tam adres"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yardım Talebi Açıklaması
                </label>
                <Input
                  value={(newAid as any).notes || ''}
                  onChange={(e) => setNewAid(prev => ({ ...prev, notes: e.target.value } as any))}
                  placeholder="Yardım talebinizi detaylı olarak açıklayın..."
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  İptal
                </Button>
                <Button onClick={handleCreateBeneficiary}>
                  Başvuru Gönder
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 