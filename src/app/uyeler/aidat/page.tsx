'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Badge } from '@/components/ui/badge' // Removed due to missing module
import { FormModal } from '@/components/ui/modal'
import { useAuth } from '@/hooks/useAuth'
import { hasPermission } from '@/lib/auth'
import { Filter, Plus, Download, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, TrendingUp, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
 

// Mock data - gerçek uygulamada API'den gelecek
const mockPayments = [
  {
    id: 1,
    memberNumber: 'UYE-2024-001',
    memberName: 'Ahmet Yılmaz',
    period: '2024-03',
    amount: 500,
    dueDate: '2024-03-01',
    paymentDate: '2024-03-01',
    status: 'paid',
    paymentMethod: 'bank_transfer',
    notes: 'Aidat ödemesi',
  },
  {
    id: 2,
    memberNumber: 'UYE-2024-002',
    memberName: 'Fatma Demir',
    period: '2024-03',
    amount: 750,
    dueDate: '2024-03-01',
    paymentDate: '2024-03-15',
    status: 'paid',
    paymentMethod: 'credit_card',
    notes: 'Premium üyelik aidatı',
  },
  {
    id: 3,
    memberNumber: 'UYE-2024-003',
    memberName: 'Mehmet Kaya',
    period: '2024-03',
    amount: 500,
    dueDate: '2024-03-01',
    paymentDate: null,
    status: 'overdue',
    paymentMethod: null,
    notes: 'Ödeme gecikti',
  },
  {
    id: 4,
    memberNumber: 'UYE-2024-004',
    memberName: 'Ayşe Çelik',
    period: '2024-04',
    amount: 500,
    dueDate: '2024-04-01',
    paymentDate: null,
    status: 'pending',
    paymentMethod: null,
    notes: 'Henüz ödenmedi',
  },
]

export default function MembershipFeesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const { user } = useAuth()

  const userRole = user?.profile?.role || 'viewer'
  const canManagePayments = hasPermission(userRole, 'manager')

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.memberNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus
    const matchesPeriod = selectedPeriod === 'all' || payment.period === selectedPeriod
    
    return matchesSearch && matchesStatus && matchesPeriod
  })

  const stats = [
    {
      title: 'Toplam Aidat',
      value: '₺125,430',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Ödenen',
      value: '₺98,250',
      change: '+8.2%',
      icon: CheckCircle,
      color: 'text-blue-600',
    },
    {
      title: 'Geciken',
      value: '₺27,180',
      change: '+15.3%',
      icon: AlertTriangle,
      color: 'text-red-600',
    },
    {
      title: 'Tahsilat Oranı',
      value: '78.3%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ]

  const handlePayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsPaymentModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Ödendi</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Gecikti</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Bekliyor</Badge>
      default:
        return <Badge className="border border-gray-300 text-gray-700">Bilinmiyor</Badge>
    }
  }

  const getPaymentMethodBadge = (method: string | null) => {
    if (!method) return <span className="text-muted-foreground">-</span>
    
    switch (method) {
      case 'bank_transfer':
        return <Badge className="border border-gray-300 text-gray-700">Banka Transferi</Badge>
      case 'credit_card':
        return <Badge className="border border-gray-300 text-gray-700">Kredi Kartı</Badge>
      case 'cash':
        return <Badge className="border border-gray-300 text-gray-700">Nakit</Badge>
      default:
        return <Badge className="border border-gray-300 text-gray-700">Diğer</Badge>
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aidat Takibi</h1>
          <p className="text-muted-foreground">
            Üye aidat ödemeleri ve takibi
          </p>
        </div>
        {canManagePayments && (
          <Button onClick={() => setIsPaymentModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Toplu Ödeme
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
          <CardTitle>Aidat Listesi</CardTitle>
          <CardDescription>
            Tüm üyelerin aidat ödemeleri ve durumları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <Input
                placeholder="Üye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="paid">Ödendi</option>
              <option value="pending">Bekliyor</option>
              <option value="overdue">Gecikti</option>
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Tüm Dönemler</option>
              <option value="2024-03">Mart 2024</option>
              <option value="2024-04">Nisan 2024</option>
              <option value="2024-05">Mayıs 2024</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Rapor
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Üye</TableHead>
                  <TableHead>Dönem</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Son Ödeme</TableHead>
                  <TableHead>Ödeme Tarihi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Ödeme Yöntemi</TableHead>
                  <TableHead>Notlar</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className={isOverdue(payment.dueDate) && payment.status !== 'paid' ? 'bg-red-50' : ''}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{payment.memberName}</div>
                        <div className="text-sm text-muted-foreground">{payment.memberNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>{payment.period}</TableCell>
                    <TableCell className="font-medium">₺{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(payment.dueDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {payment.paymentDate ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {formatDate(payment.paymentDate)}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          -
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{getPaymentMethodBadge(payment.paymentMethod)}</TableCell>
                    <TableCell className="max-w-xs truncate">{payment.notes}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {payment.status !== 'paid' && canManagePayments && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handlePayment(payment)}
                          >
                            <DollarSign className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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
              Toplam {filteredPayments.length} kayıt gösteriliyor
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

      {/* Payment Modal */}
      <FormModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={selectedPayment ? "Ödeme Kaydet" : "Toplu Ödeme"}
        description={selectedPayment ? "Seçili üyenin ödemesini kaydedin" : "Birden fazla üye için toplu ödeme kaydedin"}
        submitText="Ödeme Kaydet"
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Recording payment:', selectedPayment)
          setIsPaymentModalOpen(false)
          setSelectedPayment(null)
        }}
        size="lg"
      >
        {selectedPayment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Üye</label>
              <Input value={selectedPayment.memberName} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dönem</label>
              <Input value={selectedPayment.period} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tutar</label>
              <Input type="number" defaultValue={selectedPayment.amount} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ödeme Tarihi</label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ödeme Yöntemi</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="bank_transfer">Banka Transferi</option>
                <option value="credit_card">Kredi Kartı</option>
                <option value="cash">Nakit</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notlar</label>
              <Input placeholder="Ödeme notu" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                Toplu ödeme için Excel dosyası yükleyebilir veya manuel olarak üye seçebilirsiniz.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dönem</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="2024-04">Nisan 2024</option>
                  <option value="2024-05">Mayıs 2024</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ödeme Yöntemi</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="bank_transfer">Banka Transferi</option>
                  <option value="credit_card">Kredi Kartı</option>
                  <option value="cash">Nakit</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </FormModal>
    </div>
  )
} 