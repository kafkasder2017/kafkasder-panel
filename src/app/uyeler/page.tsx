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

// Context7 Member Management Component
export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newMember, setNewMember] = useState<Partial<PersonInsert>>({
    first_name: '',
    last_name: '',
    category: 'member',
    status: 'active'
  })

  // Context7 API Hooks
  const membersHook = usePersons({
    category: selectedCategory as any,
    status: selectedStatus as any,
    page: 1,
    limit: 10
  })
  
  // Context7 Safe Data Extraction
  const members = (membersHook as any).data || (membersHook as any).results || []
  const loading = (membersHook as any).loading || false
  const error = (membersHook as any).error || null
  const pagination = (membersHook as any).pagination || null
  const goToPage = (membersHook as any).goToPage || (() => {})
  const nextPage = (membersHook as any).nextPage || (() => {})
  const prevPage = (membersHook as any).prevPage || (() => {})

  const { createPerson } = usePersonOperations()
  const countriesHook = useCountries()
  const citiesHook = useCities()
  const districtsHook = useDistricts()
  
  const countries = (countriesHook as any).data || (countriesHook as any).results || []
  const cities = (citiesHook as any).data || (citiesHook as any).results || []
  const districts = (districtsHook as any).data || (districtsHook as any).results || []

  // Context7 Filter Functions
  const filteredMembers = members?.filter((member: any) => {
    const matchesSearch = searchQuery === '' || 
      member.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  }) || []

  // Context7 Create Member Function
  const handleCreateMember = async () => {
    try {
      await createPerson(newMember as PersonInsert)
      setShowCreateModal(false)
      setNewMember({
        first_name: '',
        last_name: '',
        category: 'member',
        status: 'active'
      })
    } catch (error) {
      console.error('Üye oluşturma hatası:', error)
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

  // Context7 Category Badge Component
  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = {
      member: 'bg-blue-100 text-blue-800',
      donor: 'bg-green-100 text-green-800',
      volunteer: 'bg-purple-100 text-purple-800',
      beneficiary: 'bg-orange-100 text-orange-800',
      staff: 'bg-gray-100 text-gray-800'
    }

    const labels = {
      member: 'Üye',
      donor: 'Bağışçı',
      volunteer: 'Gönüllü',
      beneficiary: 'Yardım Alan',
      staff: 'Personel'
    }

    return (
      <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {labels[category as keyof typeof labels] || category}
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
          <h1 className="text-3xl font-bold text-gray-900">Üye Yönetimi</h1>
          <p className="text-gray-600 mt-2">KAFKASDER üye kayıtları ve takibi</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Yeni Üye Ekle
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
                Kategori
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Tüm kategoriler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm kategoriler</SelectItem>
                  <SelectItem value="member">Üye</SelectItem>
                  <SelectItem value="donor">Bağışçı</SelectItem>
                  <SelectItem value="volunteer">Gönüllü</SelectItem>
                  <SelectItem value="beneficiary">Yardım Alan</SelectItem>
                  <SelectItem value="staff">Personel</SelectItem>
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
                  setSelectedCategory('')
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
              {members?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Toplam Üye</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {members?.filter((m: any) => m.status === 'active').length || 0}
            </div>
            <div className="text-sm text-gray-600">Aktif</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {members?.filter((m: any) => m.category === 'member').length || 0}
            </div>
            <div className="text-sm text-gray-600">Üye</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {members?.filter((m: any) => m.category === 'donor').length || 0}
            </div>
            <div className="text-sm text-gray-600">Bağışçı</div>
          </CardContent>
        </Card>
      </div>

      {/* Context7 Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Üye Listesi</CardTitle>
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
                    <TableHead>Ad Soyad</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>İletişim</TableHead>
                    <TableHead>Adres</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Kayıt Tarihi</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {member.first_name} {member.last_name}
                          </div>
                          {member.identity_number && (
                            <div className="text-sm text-gray-500">
                              TC: {member.identity_number}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <CategoryBadge category={member.category} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{member.email || '-'}</div>
                          <div className="text-sm text-gray-500">
                            {member.phone || '-'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {member.address ? (
                            <div>
                              {member.address}
                              {member.country_id && (
                                <div className="text-gray-500">
                                  {countries?.find((c: any) => c.id === member.country_id)?.name}
                                </div>
                              )}
                            </div>
                          ) : '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={member.status} />
                      </TableCell>
                      <TableCell>
                        {new Date(member.created_at).toLocaleDateString('tr-TR')}
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
              <h2 className="text-xl font-semibold">Yeni Üye Ekle</h2>
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
                    value={newMember.first_name || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Ad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <Input
                    value={newMember.last_name || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Soyad"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <Select
                    value={newMember.category || ''}
                    onValueChange={(value) => setNewMember(prev => ({ ...prev, category: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Üye</SelectItem>
                      <SelectItem value="donor">Bağışçı</SelectItem>
                      <SelectItem value="volunteer">Gönüllü</SelectItem>
                      <SelectItem value="beneficiary">Yardım Alan</SelectItem>
                      <SelectItem value="staff">Personel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TC Kimlik No
                  </label>
                  <Input
                    value={newMember.identity_number || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, identity_number: e.target.value }))}
                    placeholder="TC kimlik numarası"
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
                    value={newMember.email || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <Input
                    value={newMember.phone || ''}
                    onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <Input
                  value={newMember.address || ''}
                  onChange={(e) => setNewMember(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Tam adres"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notlar
                </label>
                <Input
                  value={(newMember as any).notes || ''}
                  onChange={(e) => setNewMember(prev => ({ ...prev, notes: e.target.value } as any))}
                  placeholder="Üye hakkında notlar..."
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  İptal
                </Button>
                <Button onClick={handleCreateMember}>
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