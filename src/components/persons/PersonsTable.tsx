'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { createPerson, updatePerson, deletePerson } from '@/lib/actions/persons'
import { useRouter } from 'next/navigation'

interface Person {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  category: string
  status: string
  created_at: string
}

interface PersonsTableProps {
  persons: Person[]
  totalCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onRefresh: () => void
}

// Context7 Client Component for Persons Table
export default function PersonsTable({ 
  persons, 
  totalCount, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onRefresh 
}: PersonsTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [newPerson, setNewPerson] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    category: 'donor',
    status: 'draft'
  })

  // Context7 Filter Functions
  const filteredPersons = persons?.filter((person: Person) => {
    const matchesSearch = searchQuery === '' || 
      person.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || person.category === selectedCategory
    const matchesStatus = selectedStatus === '' || selectedStatus === 'all' || person.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  }) || []

  // Context7 Create Person Function
  const handleCreatePerson = async () => {
    try {
      const formData = new FormData()
      formData.append('first_name', newPerson.first_name)
      formData.append('last_name', newPerson.last_name)
      formData.append('email', newPerson.email)
      formData.append('phone', newPerson.phone)
      formData.append('category', newPerson.category)
      formData.append('status', newPerson.status)
      
      await createPerson(formData)
      setShowCreateModal(false)
      setNewPerson({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        category: 'donor',
        status: 'draft'
      })
      onRefresh()
    } catch (error) {
      console.error('Kişi oluşturma hatası:', error)
    }
  }

  // Context7 Update Person Function
  const handleUpdatePerson = async () => {
    if (!editingPerson) return
    
    try {
      const formData = new FormData()
      formData.append('first_name', editingPerson.first_name)
      formData.append('last_name', editingPerson.last_name)
      formData.append('email', editingPerson.email)
      formData.append('phone', editingPerson.phone)
      formData.append('category', editingPerson.category)
      formData.append('status', editingPerson.status)
      
      await updatePerson(editingPerson.id, formData)
      setShowEditModal(false)
      setEditingPerson(null)
      onRefresh()
    } catch (error) {
      console.error('Kişi güncelleme hatası:', error)
    }
  }

  // Context7 Delete Person Function
  const handleDeletePerson = async (id: string) => {
    if (!confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) return
    
    try {
      await deletePerson(id)
      onRefresh()
    } catch (error) {
      console.error('Kişi silme hatası:', error)
    }
  }

  // Context7 Category Badge Component
  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = {
      donor: 'bg-green-100 text-green-800',
      beneficiary: 'bg-blue-100 text-blue-800',
      member: 'bg-purple-100 text-purple-800',
      volunteer: 'bg-orange-100 text-orange-800'
    }

    const labels = {
      donor: 'Bağışçı',
      beneficiary: 'Yardım Alan',
      member: 'Üye',
      volunteer: 'Gönüllü'
    }

    return (
      <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {labels[category as keyof typeof labels] || category}
      </Badge>
    )
  }

  // Context7 Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      blocked: 'bg-yellow-100 text-yellow-800'
    }

    const labels = {
      draft: 'Taslak',
      active: 'Aktif',
      inactive: 'Pasif',
      blocked: 'Engelli'
    }

    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Context7 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kişiler Yönetimi</h1>
          <p className="text-gray-600 mt-2">KAFKASDER kişi ve kurum kayıtları</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Yeni Kişi Ekle
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
                placeholder="Ad, soyad veya email ara..."
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
                  <SelectItem value="donor">Bağışçı</SelectItem>
                  <SelectItem value="beneficiary">Yardım Alan</SelectItem>
                  <SelectItem value="member">Üye</SelectItem>
                  <SelectItem value="volunteer">Gönüllü</SelectItem>
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
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                  <SelectItem value="blocked">Engelli</SelectItem>
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
              {totalCount}
            </div>
            <div className="text-sm text-gray-600">Toplam Kişi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {persons.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Aktif Kişi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {persons.filter(p => p.category === 'donor').length}
            </div>
            <div className="text-sm text-gray-600">Bağışçı</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {persons.filter(p => p.category === 'beneficiary').length}
            </div>
            <div className="text-sm text-gray-600">Yardım Alan</div>
          </CardContent>
        </Card>
      </div>

      {/* Context7 Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kişi Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersons.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="font-medium">
                        {person.first_name} {person.last_name}
                      </div>
                    </TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.phone}</TableCell>
                    <TableCell>
                      <CategoryBadge category={person.category} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={person.status} />
                    </TableCell>
                    <TableCell>
                      {new Date(person.created_at).toLocaleDateString('tr-TR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPerson(person)
                            setShowEditModal(true)
                          }}
                        >
                          Düzenle
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePerson(person.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Sil
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Context7 Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Önceki
                </Button>
                <span className="flex items-center px-4">
                  Sayfa {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Sonraki
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Context7 Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Yeni Kişi Ekle</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad
              </label>
              <Input
                value={newPerson.first_name}
                onChange={(e) => setNewPerson({...newPerson, first_name: e.target.value})}
                placeholder="Ad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soyad
              </label>
              <Input
                value={newPerson.last_name}
                onChange={(e) => setNewPerson({...newPerson, last_name: e.target.value})}
                placeholder="Soyad"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta
            </label>
            <Input
              type="email"
              value={newPerson.email}
              onChange={(e) => setNewPerson({...newPerson, email: e.target.value})}
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon
            </label>
            <Input
              value={newPerson.phone}
              onChange={(e) => setNewPerson({...newPerson, phone: e.target.value})}
              placeholder="+90 555 123 45 67"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <Select value={newPerson.category} onValueChange={(value) => setNewPerson({...newPerson, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donor">Bağışçı</SelectItem>
                  <SelectItem value="beneficiary">Yardım Alan</SelectItem>
                  <SelectItem value="member">Üye</SelectItem>
                  <SelectItem value="volunteer">Gönüllü</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <Select value={newPerson.status} onValueChange={(value) => setNewPerson({...newPerson, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                  <SelectItem value="blocked">Engelli</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              İptal
            </Button>
            <Button onClick={handleCreatePerson}>
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Context7 Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {editingPerson && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Kişi Düzenle</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad
                </label>
                <Input
                  value={editingPerson.first_name}
                  onChange={(e) => setEditingPerson({...editingPerson, first_name: e.target.value})}
                  placeholder="Ad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soyad
                </label>
                <Input
                  value={editingPerson.last_name}
                  onChange={(e) => setEditingPerson({...editingPerson, last_name: e.target.value})}
                  placeholder="Soyad"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <Input
                type="email"
                value={editingPerson.email}
                onChange={(e) => setEditingPerson({...editingPerson, email: e.target.value})}
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <Input
                value={editingPerson.phone}
                onChange={(e) => setEditingPerson({...editingPerson, phone: e.target.value})}
                placeholder="+90 555 123 45 67"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <Select value={editingPerson.category} onValueChange={(value) => setEditingPerson({...editingPerson, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donor">Bağışçı</SelectItem>
                    <SelectItem value="beneficiary">Yardım Alan</SelectItem>
                    <SelectItem value="member">Üye</SelectItem>
                    <SelectItem value="volunteer">Gönüllü</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <Select value={editingPerson.status} onValueChange={(value) => setEditingPerson({...editingPerson, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Taslak</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="blocked">Engelli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                İptal
              </Button>
              <Button onClick={handleUpdatePerson}>
                Güncelle
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 