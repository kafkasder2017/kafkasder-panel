'use client'

import { useState } from 'react'
import { useOrganizations, useOrganizationOperations, useCountries, useCities, useDistricts } from '@/hooks/useServices'
import { Organization, OrganizationInsert } from '@/types/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Context7 Organization Management Component
export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newOrganization, setNewOrganization] = useState<Partial<OrganizationInsert>>({
    name: '',
    type: '',
    status: 'active'
  })

  // Context7 API Hooks
  const organizationsHook = useOrganizations({
    status: selectedStatus,
    page: 1,
    limit: 10
  })
  
  // Context7 Safe Data Extraction
  const organizations = (organizationsHook as any).data || (organizationsHook as any).results || []
  const loading = (organizationsHook as any).loading || false
  const error = (organizationsHook as any).error || null
  const pagination = (organizationsHook as any).pagination || null
  const goToPage = (organizationsHook as any).goToPage || (() => {})
  const nextPage = (organizationsHook as any).nextPage || (() => {})
  const prevPage = (organizationsHook as any).prevPage || (() => {})

  const { createOrganization } = useOrganizationOperations()
  const countriesHook = useCountries()
  const citiesHook = useCities()
  const districtsHook = useDistricts()
  
  const countries = (countriesHook as any).data || (countriesHook as any).results || []
  const cities = (citiesHook as any).data || (citiesHook as any).results || []
  const districts = (districtsHook as any).data || (districtsHook as any).results || []

  // Context7 Filter Functions
  const filteredOrganizations = organizations?.filter((organization: any) => {
    const matchesSearch = searchQuery === '' || 
      organization.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      organization.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      organization.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  }) || []

  // Context7 Create Organization Function
  const handleCreateOrganization = async () => {
    try {
      await createOrganization(newOrganization as OrganizationInsert)
      setShowCreateModal(false)
      setNewOrganization({
        name: '',
        type: '',
        status: 'active'
      })
    } catch (error) {
      console.error('Organizasyon oluşturma hatası:', error)
    }
  }

  // Context7 Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-gray-100 text-gray-800'
    }

    const labels = {
      active: 'Aktif',
      inactive: 'Pasif',
      pending: 'Beklemede',
      suspended: 'Askıya Alınmış'
    }

    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {labels[status as keyof typeof labels] || status}
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
          <h1 className="text-3xl font-bold text-gray-900">Organizasyon Yönetimi</h1>
          <p className="text-gray-600 mt-2">KAFKASDER kurum ve organizasyon kayıtları</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Yeni Organizasyon Ekle
        </Button>
      </div>

      {/* Context7 Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arama
              </label>
              <Input
                placeholder="Organizasyon adı, email veya telefon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="suspended">Askıya Alınmış</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
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
              {organizations?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Toplam Organizasyon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {organizations?.filter((o: any) => o.status === 'active').length || 0}
            </div>
            <div className="text-sm text-gray-600">Aktif</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {organizations?.filter((o: any) => o.status === 'pending').length || 0}
            </div>
            <div className="text-sm text-gray-600">Beklemede</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {organizations?.filter((o: any) => o.status === 'inactive').length || 0}
            </div>
            <div className="text-sm text-gray-600">Pasif</div>
          </CardContent>
        </Card>
      </div>

      {/* Context7 Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Organizasyon Listesi</CardTitle>
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
                    <TableHead>Organizasyon Adı</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>İletişim</TableHead>
                    <TableHead>Adres</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Kayıt Tarihi</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrganizations.map((organization: any) => (
                    <TableRow key={organization.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{organization.name}</div>
                          {organization.tax_number && (
                            <div className="text-sm text-gray-500">
                              Vergi No: {organization.tax_number}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {organization.type || '-'}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{organization.email || '-'}</div>
                          <div className="text-sm text-gray-500">
                            {organization.phone || '-'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {organization.address ? (
                            <div>
                              {organization.address}
                              {organization.country_id && (
                                <div className="text-gray-500">
                                  {countries?.find((c: any) => c.id === organization.country_id)?.name}
                                </div>
                              )}
                            </div>
                          ) : '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={organization.status} />
                      </TableCell>
                      <TableCell>
                        {new Date(organization.created_at).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Düzenle
                          </Button>
                          <Button size="sm" variant="outline">
                            Görüntüle
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
              <h2 className="text-xl font-semibold">Yeni Organizasyon Ekle</h2>
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizasyon Adı *
                </label>
                <Input
                  value={newOrganization.name || ''}
                  onChange={(e) => setNewOrganization(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Organizasyon adı"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tür
                  </label>
                  <Input
                    value={newOrganization.type || ''}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="Organizasyon türü"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vergi Numarası
                  </label>
                  <Input
                    value={newOrganization.tax_number || ''}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, tax_number: e.target.value }))}
                    placeholder="Vergi no"
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
                    value={newOrganization.email || ''}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <Input
                    value={newOrganization.phone || ''}
                    onChange={(e) => setNewOrganization(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <Input
                  value={newOrganization.website || ''}
                  onChange={(e) => setNewOrganization(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <Input
                  value={newOrganization.address || ''}
                  onChange={(e) => setNewOrganization(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Tam adres"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notlar
                </label>
                <Input
                  value={newOrganization.notes || ''}
                  onChange={(e) => setNewOrganization(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Organizasyon hakkında notlar..."
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  İptal
                </Button>
                <Button onClick={handleCreateOrganization}>
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 