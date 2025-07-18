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
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  DollarSign,
} from 'lucide-react'

// Mock data - gerçek uygulamada API'den gelecek
const mockOrganizations = [
  {
    id: 1,
    organizationNumber: 'KUR-2024-001',
    name: 'ABC Şirketi A.Ş.',
    type: 'corporate',
    status: 'active',
    phone: '+90 212 123 45 67',
    email: 'info@abc.com.tr',
    website: 'www.abc.com.tr',
    city: 'İstanbul',
    country: 'Türkiye',
    address: 'Levent Mah. Büyükdere Cad. No:123',
    contactPerson: 'Ahmet Yılmaz',
    contactPhone: '+90 532 123 45 67',
    contactEmail: 'ahmet.yilmaz@abc.com.tr',
    employeeCount: 150,
    annualRevenue: 5000000,
    joinDate: '2024-01-15',
    lastActivity: '2024-03-15',
    totalDonations: 250000,
    tags: ['kurumsal_bağışçı', 'premium'],
  },
  {
    id: 2,
    organizationNumber: 'KUR-2024-002',
    name: 'XYZ Vakfı',
    type: 'foundation',
    status: 'active',
    phone: '+90 312 234 56 78',
    email: 'info@xyzvakfi.org',
    website: 'www.xyzvakfi.org',
    city: 'Ankara',
    country: 'Türkiye',
    address: 'Çankaya Mah. Atatürk Bulvarı No:456',
    contactPerson: 'Fatma Demir',
    contactPhone: '+90 533 234 56 78',
    contactEmail: 'fatma.demir@xyzvakfi.org',
    employeeCount: 25,
    annualRevenue: 1000000,
    joinDate: '2024-02-01',
    lastActivity: '2024-03-10',
    totalDonations: 75000,
    tags: ['vakıf', 'işbirliği'],
  },
  {
    id: 3,
    organizationNumber: 'KUR-2024-003',
    name: 'DEF Derneği',
    type: 'association',
    status: 'inactive',
    phone: '+90 232 345 67 89',
    email: 'info@defdernegi.org',
    website: 'www.defdernegi.org',
    city: 'İzmir',
    country: 'Türkiye',
    address: 'Alsancak Mah. Kıbrıs Şehitleri Cad. No:789',
    contactPerson: 'Mehmet Kaya',
    contactPhone: '+90 534 345 67 89',
    contactEmail: 'mehmet.kaya@defdernegi.org',
    employeeCount: 10,
    annualRevenue: 500000,
    joinDate: '2024-01-20',
    lastActivity: '2024-02-15',
    totalDonations: 30000,
    tags: ['dernek', 'pasif'],
  },
]

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null)
  const { user } = useAuth()

  const canManageOrganizations = hasPermission(user, 'people:manage')

  const filteredOrganizations = mockOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.organizationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === 'all' || org.type === selectedType
    const matchesStatus = selectedStatus === 'all' || org.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const stats = [
    {
      title: 'Toplam Kurum',
      value: mockOrganizations.length,
      change: '+5%',
      icon: Building,
      color: 'text-blue-600',
    },
    {
      title: 'Aktif Kurum',
      value: mockOrganizations.filter(o => o.status === 'active').length,
      change: '+8%',
      icon: Building,
      color: 'text-green-600',
    },
    {
      title: 'Toplam Bağış',
      value: '₺355,000',
      change: '+15%',
      icon: DollarSign,
      color: 'text-purple-600',
    },
    {
      title: 'Ortalama Çalışan',
      value: '62',
      change: '+3%',
      icon: Users,
      color: 'text-orange-600',
    },
  ]

  const handleEdit = (org: any) => {
    setSelectedOrganization(org)
    setIsEditModalOpen(true)
  }

  const handleDelete = (org: any) => {
    setSelectedOrganization(org)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    console.log('Deleting organization:', selectedOrganization)
    setIsDeleteModalOpen(false)
    setSelectedOrganization(null)
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'corporate':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Şirket</Badge>
      case 'foundation':
        return <Badge variant="default" className="bg-green-100 text-green-800">Vakıf</Badge>
      case 'association':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Dernek</Badge>
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Pasif</Badge>
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kurumlar</h1>
          <p className="text-muted-foreground">
            Kurum, vakıf ve dernek kayıtları
          </p>
        </div>
        {canManageOrganizations && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kurum Ekle
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  Geçen aya göre {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Kurum Listesi</CardTitle>
          <CardDescription>
            Tüm kurumların listesi ve yönetimi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Kurum ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Tüm Tipler</option>
              <option value="corporate">Şirket</option>
              <option value="foundation">Vakıf</option>
              <option value="association">Dernek</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kurum No</TableHead>
                  <TableHead>Kurum Adı</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Konum</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Çalışan</TableHead>
                  <TableHead>Yıllık Gelir</TableHead>
                  <TableHead>Toplam Bağış</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">
                      {org.organizationNumber}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{org.name}</div>
                        <div className="flex gap-1">
                          {org.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(org.type)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {org.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {org.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {org.city}, {org.country}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(org.status)}</TableCell>
                    <TableCell>{org.employeeCount}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(org.annualRevenue)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(org.totalDonations)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canManageOrganizations && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(org)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(org)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Toplam {filteredOrganizations.length} kurum gösteriliyor
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Önceki
              </Button>
              <Button variant="outline" size="sm">
                Sonraki
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Organization Modal */}
      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Yeni Kurum Ekle"
        description="Sisteme yeni kurum kaydı ekleyin"
        submitText="Kurum Ekle"
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Adding new organization')
          setIsAddModalOpen(false)
        }}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Kurum Adı</label>
            <Input placeholder="Kurum Adı" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Kurum Tipi</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
              <option value="corporate">Şirket</option>
              <option value="foundation">Vakıf</option>
              <option value="association">Dernek</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Telefon</label>
            <Input placeholder="+90 XXX XXX XX XX" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">E-posta</label>
            <Input type="email" placeholder="ornek@kurum.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input placeholder="www.kurum.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Şehir</label>
            <Input placeholder="Şehir" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">İletişim Kişisi</label>
            <Input placeholder="İletişim Kişisi" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">İletişim Telefonu</label>
            <Input placeholder="+90 5XX XXX XX XX" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Çalışan Sayısı</label>
            <Input type="number" placeholder="0" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Yıllık Gelir</label>
            <Input type="number" placeholder="0" />
          </div>
        </div>
      </FormModal>

      {/* Edit Organization Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Kurum Düzenle"
        description="Kurum bilgilerini güncelleyin"
        submitText="Güncelle"
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Updating organization:', selectedOrganization)
          setIsEditModalOpen(false)
          setSelectedOrganization(null)
        }}
        size="lg"
      >
        {selectedOrganization && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Kurum Adı</label>
              <Input defaultValue={selectedOrganization.name} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kurum Tipi</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="corporate" selected={selectedOrganization.type === 'corporate'}>Şirket</option>
                <option value="foundation" selected={selectedOrganization.type === 'foundation'}>Vakıf</option>
                <option value="association" selected={selectedOrganization.type === 'association'}>Dernek</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Durum</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="active" selected={selectedOrganization.status === 'active'}>Aktif</option>
                <option value="inactive" selected={selectedOrganization.status === 'inactive'}>Pasif</option>
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
        title="Kurum Sil"
        description={`"${selectedOrganization?.name}" adlı kurumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        variant="destructive"
      />
    </div>
  )
} 