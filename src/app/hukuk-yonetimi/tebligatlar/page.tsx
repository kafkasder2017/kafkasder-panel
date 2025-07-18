'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mock data
const notifications = [
  {
    id: 1,
    notificationNumber: 'TEB-2024-001',
    caseNumber: '2024/001',
    title: 'KAFKASDER vs. ABC Şirketi',
    type: 'Duruşma Tebligatı',
    status: 'received',
    sender: 'İstanbul 5. Asliye Ticaret Mahkemesi',
    recipient: 'KAFKASDER',
    receivedDate: '2024-01-16',
    dueDate: '2024-01-25',
    priority: 'high',
    description: 'Duruşma tarihi 25 Ocak 2024 saat 10:00 olarak belirlenmiştir.',
    lawyer: 'Av. Mehmet Yılmaz'
  },
  {
    id: 2,
    notificationNumber: 'TEB-2024-002',
    caseNumber: '2024/002',
    title: 'KAFKASDER vs. XYZ Vakfı',
    type: 'Cevap Tebligatı',
    status: 'pending',
    sender: 'Ankara 1. İdare Mahkemesi',
    recipient: 'KAFKASDER',
    receivedDate: '2024-01-15',
    dueDate: '2024-01-30',
    priority: 'medium',
    description: 'Cevap dilekçesi 30 gün içinde sunulmalıdır.',
    lawyer: 'Av. Fatma Demir'
  },
  {
    id: 3,
    notificationNumber: 'TEB-2024-003',
    caseNumber: '2024/003',
    title: 'KAFKASDER vs. DEF Derneği',
    type: 'Karar Tebligatı',
    status: 'completed',
    sender: 'Dış Hukuki Danışmanlık',
    recipient: 'KAFKASDER',
    receivedDate: '2024-01-14',
    dueDate: '2024-01-20',
    priority: 'low',
    description: 'Danışmanlık sözleşmesi sonlandırılmıştır.',
    lawyer: 'Av. Ali Kaya'
  },
  {
    id: 4,
    notificationNumber: 'TEB-2024-004',
    caseNumber: '2024/004',
    title: 'KAFKASDER vs. GHI Limited',
    type: 'Delil Tebligatı',
    status: 'received',
    sender: 'İzmir 3. Asliye Ticaret Mahkemesi',
    recipient: 'KAFKASDER',
    receivedDate: '2024-01-13',
    dueDate: '2024-02-05',
    priority: 'high',
    description: 'Delil sunma süresi 5 Şubat 2024\'e kadar uzatılmıştır.',
    lawyer: 'Av. Zeynep Özkan'
  },
  {
    id: 5,
    notificationNumber: 'TEB-2024-005',
    caseNumber: '2024/005',
    title: 'KAFKASDER vs. JKL Şirketi',
    type: 'Arabuluculuk Tebligatı',
    status: 'pending',
    sender: 'İstanbul 2. Sulh Hukuk Mahkemesi',
    recipient: 'KAFKASDER',
    receivedDate: '2024-01-12',
    dueDate: '2024-02-01',
    priority: 'medium',
    description: 'Arabuluculuk görüşmesi 1 Şubat 2024\'te yapılacaktır.',
    lawyer: 'Av. Burak Demir'
  },
  {
    id: 6,
    notificationNumber: 'TEB-2024-006',
    caseNumber: '2024/006',
    title: 'KAFKASDER vs. MNO Vakfı',
    type: 'İhtarname Tebligatı',
    status: 'overdue',
    sender: 'Bursa 1. İdare Mahkemesi',
    recipient: 'KAFKASDER',
    receivedDate: '2023-12-28',
    dueDate: '2024-01-10',
    priority: 'high',
    description: 'İhtarname süresi geçmiş, acil işlem gereklidir.',
    lawyer: 'Av. Can Yıldız'
  }
];

const notificationTypes = [
  { value: 'all', label: 'Tümü' },
  { value: 'durusma', label: 'Duruşma Tebligatı' },
  { value: 'cevap', label: 'Cevap Tebligatı' },
  { value: 'karar', label: 'Karar Tebligatı' },
  { value: 'delil', label: 'Delil Tebligatı' },
  { value: 'arabuluculuk', label: 'Arabuluculuk Tebligatı' },
  { value: 'ihtarname', label: 'İhtarname Tebligatı' }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'received', label: 'Alındı' },
  { value: 'pending', label: 'Bekliyor' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'overdue', label: 'Gecikmiş' }
];

const priorityOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'high', label: 'Yüksek' },
  { value: 'medium', label: 'Orta' },
  { value: 'low', label: 'Düşük' }
];

export default function TebligatlarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <Badge variant="default" className="bg-green-100 text-green-800">Alındı</Badge>;
      case 'pending':
        return <Badge variant="secondary">Bekliyor</Badge>;
      case 'completed':
        return <Badge variant="outline">Tamamlandı</Badge>;
      case 'overdue':
        return <Badge variant="default" className="bg-red-100 text-red-800">Gecikmiş</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="default" className="bg-red-100 text-red-800">Yüksek</Badge>;
      case 'medium':
        return <Badge variant="secondary">Orta</Badge>;
      case 'low':
        return <Badge variant="outline">Düşük</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Duruşma Tebligatı':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Duruşma</Badge>;
      case 'Cevap Tebligatı':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Cevap</Badge>;
      case 'Karar Tebligatı':
        return <Badge variant="default" className="bg-green-100 text-green-800">Karar</Badge>;
      case 'Delil Tebligatı':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">Delil</Badge>;
      case 'Arabuluculuk Tebligatı':
        return <Badge variant="outline">Arabuluculuk</Badge>;
      case 'İhtarname Tebligatı':
        return <Badge variant="default" className="bg-red-100 text-red-800">İhtarname</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.notificationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.lawyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type.toLowerCase().includes(typeFilter);
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleSelectNotification = (id: number) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(n => n !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tebligatlar</h1>
          <p className="text-gray-600 mt-1">
            Hukuki tebligatları takip et ve yönet
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Tebligat
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alınan Tebligatlar</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gecikmiş</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tebligat ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tebligat tipi" />
              </SelectTrigger>
              <SelectContent>
                {notificationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setTypeFilter('all');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}>
              Filtreleri Temizle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredNotifications.length} tebligat bulundu
        </p>
        {selectedNotifications.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedNotifications.length} tebligat seçildi
            </span>
            <Button variant="outline" size="sm">
              Toplu İşlem
            </Button>
          </div>
        )}
      </div>

      {/* Notifications Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tebligat No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dava Bilgileri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gönderen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avukat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alınma Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Son Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <tr key={notification.id} className={`hover:bg-gray-50 ${
                    isOverdue(notification.dueDate) ? 'bg-red-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => handleSelectNotification(notification.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-medium text-gray-900">{notification.notificationNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          {getTypeBadge(notification.type)}
                          {getPriorityBadge(notification.priority)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {notification.caseNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{notification.sender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{notification.lawyer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {notification.receivedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className={`flex items-center ${
                        isOverdue(notification.dueDate) ? 'text-red-600 font-medium' : ''
                      }`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {notification.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(notification.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 