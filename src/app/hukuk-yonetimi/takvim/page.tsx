'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Plus, 
  Filter, 
  Clock, 
  MapPin, 
  User,
  AlertTriangle,
  CheckCircle,
  FileText,
  Bell,
  Eye,
  Edit
} from 'lucide-react';

// Mock data
const events = [
  {
    id: 1,
    title: 'KAFKASDER vs. ABC Şirketi - Duruşma',
    caseNumber: '2024/001',
    type: 'durusma',
    date: '2024-01-25',
    time: '10:00',
    duration: 60,
    court: 'İstanbul 5. Asliye Ticaret Mahkemesi',
    lawyer: 'Av. Mehmet Yılmaz',
    status: 'scheduled',
    priority: 'high',
    description: 'ABC Şirketi aleyhine açılan ticari dava duruşması',
    notes: 'Deliller sunulacak, tanık dinlenmesi yapılacak'
  },
  {
    id: 2,
    title: 'KAFKASDER vs. XYZ Vakfı - Duruşma',
    caseNumber: '2024/002',
    type: 'durusma',
    date: '2024-01-30',
    time: '14:30',
    duration: 90,
    court: 'Ankara 1. İdare Mahkemesi',
    lawyer: 'Av. Fatma Demir',
    status: 'scheduled',
    priority: 'medium',
    description: 'XYZ Vakfı aleyhine açılan idari dava duruşması',
    notes: 'Cevap dilekçesi sunulacak'
  },
  {
    id: 3,
    title: 'KAFKASDER vs. JKL Şirketi - Arabuluculuk',
    caseNumber: '2024/005',
    type: 'arabuluculuk',
    date: '2024-02-01',
    time: '09:00',
    duration: 120,
    court: 'İstanbul 2. Sulh Hukuk Mahkemesi',
    lawyer: 'Av. Burak Demir',
    status: 'scheduled',
    priority: 'medium',
    description: 'JKL Şirketi ile arabuluculuk görüşmesi',
    notes: 'Uzlaşma görüşmesi yapılacak'
  },
  {
    id: 4,
    title: 'KAFKASDER vs. DEF Derneği - Toplantı',
    caseNumber: '2024/003',
    type: 'toplanti',
    date: '2024-01-20',
    time: '15:00',
    duration: 45,
    court: 'Dış Hukuki Danışmanlık',
    lawyer: 'Av. Ali Kaya',
    status: 'completed',
    priority: 'low',
    description: 'DEF Derneği ile danışmanlık toplantısı',
    notes: 'Sözleşme görüşmesi tamamlandı'
  },
  {
    id: 5,
    title: 'KAFKASDER vs. GHI Limited - Delil Sunumu',
    caseNumber: '2024/004',
    type: 'delil',
    date: '2024-02-05',
    time: '11:00',
    duration: 60,
    court: 'İzmir 3. Asliye Ticaret Mahkemesi',
    lawyer: 'Av. Zeynep Özkan',
    status: 'scheduled',
    priority: 'high',
    description: 'GHI Limited davası için delil sunumu',
    notes: 'Belgeler ve tanık ifadeleri sunulacak'
  },
  {
    id: 6,
    title: 'KAFKASDER vs. MNO Vakfı - İhtarname Süresi',
    caseNumber: '2024/006',
    type: 'ihtarname',
    date: '2024-01-10',
    time: '16:00',
    duration: 30,
    court: 'Bursa 1. İdare Mahkemesi',
    lawyer: 'Av. Can Yıldız',
    status: 'overdue',
    priority: 'high',
    description: 'MNO Vakfı\'na ihtarname süresi doldu',
    notes: 'Acil işlem gereklidir'
  }
];

const eventTypes = [
  { value: 'all', label: 'Tümü' },
  { value: 'durusma', label: 'Duruşma' },
  { value: 'arabuluculuk', label: 'Arabuluculuk' },
  { value: 'toplanti', label: 'Toplantı' },
  { value: 'delil', label: 'Delil Sunumu' },
  { value: 'ihtarname', label: 'İhtarname' }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'scheduled', label: 'Planlandı' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'İptal' },
  { value: 'overdue', label: 'Gecikmiş' }
];

const priorityOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'high', label: 'Yüksek' },
  { value: 'medium', label: 'Orta' },
  { value: 'low', label: 'Düşük' }
];

export default function HukukTakvimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Planlandı</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      case 'cancelled':
        return <Badge variant="outline">İptal</Badge>;
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
      case 'durusma':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Duruşma</Badge>;
      case 'arabuluculuk':
        return <Badge variant="default" className="bg-green-100 text-green-800">Arabuluculuk</Badge>;
      case 'toplanti':
        return <Badge variant="outline">Toplantı</Badge>;
      case 'delil':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">Delil</Badge>;
      case 'ihtarname':
        return <Badge variant="default" className="bg-red-100 text-red-800">İhtarname</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'durusma':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'arabuluculuk':
        return <User className="w-5 h-5 text-green-600" />;
      case 'toplanti':
        return <Calendar className="w-5 h-5 text-gray-600" />;
      case 'delil':
        return <FileText className="w-5 h-5 text-orange-600" />;
      case 'ihtarname':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.lawyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || event.priority === priorityFilter;
    const matchesDate = !selectedDate || event.date === selectedDate;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesDate;
  });

  const upcomingEvents = filteredEvents.filter(event => 
    event.status === 'scheduled' && new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const overdueEvents = filteredEvents.filter(event => 
    event.status === 'overdue'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hukuk Takvimi</h1>
          <p className="text-gray-600 mt-1">
            Duruşma ve hukuki etkinlik takvimi
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Etkinlik
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Planlanan</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tamamlanan</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
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
              <div className="p-3 rounded-lg bg-purple-100">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bu Hafta</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
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
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Etkinlik ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Etkinlik tipi" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
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
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Tarih seçin"
            />
          </div>
        </CardContent>
      </Card>

      {/* Overdue Events */}
      {overdueEvents.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Gecikmiş Etkinlikler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-3 rounded-lg border border-red-200 bg-white">
                  <div className="flex-shrink-0">
                    {getTypeIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                      {getTypeBadge(event.type)}
                      {getPriorityBadge(event.priority)}
                      {getStatusBadge(event.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{event.caseNumber}</span>
                      <span>{event.court}</span>
                      <span>{event.lawyer}</span>
                      <span className="text-red-600 font-medium">{event.date} {event.time}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                      Acil İşlem
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Etkinlikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {getTypeIcon(event.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                    {getTypeBadge(event.type)}
                    {getPriorityBadge(event.priority)}
                    {getStatusBadge(event.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date} {event.time}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.duration} dakika
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.court}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {event.lawyer}
                    </div>
                  </div>
                  {event.notes && (
                    <p className="text-sm text-gray-500 mt-2">{event.notes}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Takvim Görünümü</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Takvim görünümü burada olacak</p>
              <p className="text-sm text-gray-400">Aylık, haftalık ve günlük görünümler</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 