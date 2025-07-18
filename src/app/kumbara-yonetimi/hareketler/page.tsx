'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  Search, 
  Filter, 
  Plus, 
  Calendar,
  MapPin,
  User,
  PiggyBank,
  TrendingUp,
  Download,
  Eye
} from 'lucide-react';

// Mock data
const activities = [
  {
    id: 1,
    type: 'collection',
    kumbaraNo: 'KMB-001',
    personName: 'Ahmet Yılmaz',
    location: 'İstanbul, Kadıköy',
    amount: 1250,
    date: '2024-01-15',
    time: '14:30',
    collector: 'Mehmet Toplayıcı',
    status: 'completed',
    notes: 'Kumbara tamamen dolu, güvenli şekilde toplandı'
  },
  {
    id: 2,
    type: 'distribution',
    kumbaraNo: 'KMB-009',
    personName: 'Hasan Yıldız',
    location: 'İstanbul, Beşiktaş',
    amount: 0,
    date: '2024-01-16',
    time: '10:15',
    collector: 'Ayşe Dağıtıcı',
    status: 'completed',
    notes: 'Yeni kumbara teslim edildi, kullanım talimatları verildi'
  },
  {
    id: 3,
    type: 'collection',
    kumbaraNo: 'KMB-002',
    personName: 'Fatma Demir',
    location: 'Ankara, Çankaya',
    amount: 890,
    date: '2024-01-14',
    time: '16:45',
    collector: 'Ali Toplayıcı',
    status: 'completed',
    notes: 'Kısmi toplama yapıldı'
  },
  {
    id: 4,
    type: 'collection',
    kumbaraNo: 'KMB-003',
    personName: 'Mehmet Kaya',
    location: 'İzmir, Konak',
    amount: 2100,
    date: '2024-01-12',
    time: '11:20',
    collector: 'Zeynep Toplayıcı',
    status: 'completed',
    notes: 'Kumbara ağırlığı fazla, iki kişi ile taşındı'
  },
  {
    id: 5,
    type: 'distribution',
    kumbaraNo: 'KMB-010',
    personName: 'Selin Demir',
    location: 'Ankara, Keçiören',
    amount: 0,
    date: '2024-01-15',
    time: '13:00',
    collector: 'Burak Dağıtıcı',
    status: 'completed',
    notes: 'Premium kumbara teslim edildi'
  },
  {
    id: 6,
    type: 'collection',
    kumbaraNo: 'KMB-004',
    personName: 'Ayşe Özkan',
    location: 'Bursa, Nilüfer',
    amount: 750,
    date: '2024-01-10',
    time: '15:30',
    collector: 'Can Toplayıcı',
    status: 'completed',
    notes: 'Normal toplama işlemi'
  },
  {
    id: 7,
    type: 'collection',
    kumbaraNo: 'KMB-005',
    personName: 'Ali Veli',
    location: 'Antalya, Muratpaşa',
    amount: 1800,
    date: '2024-01-08',
    time: '09:15',
    collector: 'Deniz Toplayıcı',
    status: 'completed',
    notes: 'Kumbara hasarlı, yeni kumbara ile değiştirildi'
  },
  {
    id: 8,
    type: 'distribution',
    kumbaraNo: 'KMB-011',
    personName: 'Burak Kaya',
    location: 'İzmir, Bornova',
    amount: 0,
    date: '2024-01-14',
    time: '14:00',
    collector: 'Elif Dağıtıcı',
    status: 'pending',
    notes: 'Teslimat bekleniyor, kişi evde değildi'
  }
];

const activityTypes = [
  { value: 'all', label: 'Tümü' },
  { value: 'collection', label: 'Toplama' },
  { value: 'distribution', label: 'Dağıtım' }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'pending', label: 'Bekliyor' },
  { value: 'cancelled', label: 'İptal' }
];

export default function KumbaraHareketleriPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'collection':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'distribution':
        return <PiggyBank className="w-5 h-5 text-blue-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      case 'pending':
        return <Badge variant="secondary">Bekliyor</Badge>;
      case 'cancelled':
        return <Badge variant="outline">İptal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'collection':
        return <Badge variant="default" className="bg-green-100 text-green-800">Toplama</Badge>;
      case 'distribution':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Dağıtım</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.kumbaraNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.collector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    const matchesDate = !selectedDate || activity.date === selectedDate;
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const totalCollected = filteredActivities
    .filter(a => a.type === 'collection')
    .reduce((sum, a) => sum + a.amount, 0);

  const totalDistributed = filteredActivities
    .filter(a => a.type === 'distribution')
    .length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kumbara Hareketleri</h1>
          <p className="text-gray-600 mt-1">
            Kumbara toplama ve dağıtım işlemlerinin detaylı takibi
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni İşlem
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplanan Tutar</p>
                <p className="text-2xl font-bold text-gray-900">₺{totalCollected.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <PiggyBank className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Dağıtım Sayısı</p>
                <p className="text-2xl font-bold text-gray-900">{totalDistributed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam İşlem</p>
                <p className="text-2xl font-bold text-gray-900">{filteredActivities.length}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="İşlem tipi" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
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
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Tarih seçin"
            />
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle>İşlem Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{activity.kumbaraNo}</h3>
                    {getTypeBadge(activity.type)}
                    {getStatusBadge(activity.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      {activity.personName}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {activity.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {activity.date} {activity.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">
                        {activity.type === 'collection' ? '₺' + activity.amount.toLocaleString() : 'Dağıtım'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">İşlemi Yapan:</span> {activity.collector}
                    </p>
                    {activity.notes && (
                      <p className="text-sm text-gray-500 mt-1">{activity.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 