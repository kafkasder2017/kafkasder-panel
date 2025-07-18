'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Scale,
  Building,
  Star
} from 'lucide-react';

// Mock data
const lawyers = [
  {
    id: 1,
    name: 'Av. Mehmet Yılmaz',
    barNumber: '12345',
    specialization: 'Ticaret Hukuku',
    lawFirm: 'Yılmaz Hukuk Bürosu',
    email: 'mehmet.yilmaz@hukuk.com',
    phone: '0532 123 45 67',
    address: 'İstanbul, Kadıköy',
    experience: 15,
    activeCases: 8,
    completedCases: 45,
    successRate: 92,
    status: 'active',
    joinDate: '2010-03-15',
    hourlyRate: 500,
    rating: 4.8,
    languages: ['Türkçe', 'İngilizce'],
    education: 'İstanbul Üniversitesi Hukuk Fakültesi'
  },
  {
    id: 2,
    name: 'Av. Fatma Demir',
    barNumber: '12346',
    specialization: 'İdare Hukuku',
    lawFirm: 'Demir & Ortakları',
    email: 'fatma.demir@hukuk.com',
    phone: '0533 234 56 78',
    address: 'Ankara, Çankaya',
    experience: 12,
    activeCases: 5,
    completedCases: 38,
    successRate: 89,
    status: 'active',
    joinDate: '2012-07-20',
    hourlyRate: 450,
    rating: 4.6,
    languages: ['Türkçe', 'Almanca'],
    education: 'Ankara Üniversitesi Hukuk Fakültesi'
  },
  {
    id: 3,
    name: 'Av. Ali Kaya',
    barNumber: '12347',
    specialization: 'Sözleşme Hukuku',
    lawFirm: 'Kaya Hukuk',
    email: 'ali.kaya@hukuk.com',
    phone: '0534 345 67 89',
    address: 'İzmir, Konak',
    experience: 8,
    activeCases: 3,
    completedCases: 22,
    successRate: 85,
    status: 'active',
    joinDate: '2016-01-10',
    hourlyRate: 350,
    rating: 4.4,
    languages: ['Türkçe'],
    education: 'İzmir Üniversitesi Hukuk Fakültesi'
  },
  {
    id: 4,
    name: 'Av. Zeynep Özkan',
    barNumber: '12348',
    specialization: 'Ticaret Hukuku',
    lawFirm: 'Özkan Hukuk Bürosu',
    email: 'zeynep.ozkan@hukuk.com',
    phone: '0535 456 78 90',
    address: 'Bursa, Nilüfer',
    experience: 10,
    activeCases: 6,
    completedCases: 31,
    successRate: 91,
    status: 'active',
    joinDate: '2014-05-12',
    hourlyRate: 400,
    rating: 4.7,
    languages: ['Türkçe', 'İngilizce', 'Arapça'],
    education: 'Bursa Üniversitesi Hukuk Fakültesi'
  },
  {
    id: 5,
    name: 'Av. Burak Demir',
    barNumber: '12349',
    specialization: 'Sulh Hukuku',
    lawFirm: 'Demir Hukuk',
    email: 'burak.demir@hukuk.com',
    phone: '0536 567 89 01',
    address: 'Antalya, Muratpaşa',
    experience: 6,
    activeCases: 4,
    completedCases: 18,
    successRate: 88,
    status: 'active',
    joinDate: '2018-09-05',
    hourlyRate: 300,
    rating: 4.3,
    languages: ['Türkçe', 'İngilizce'],
    education: 'Akdeniz Üniversitesi Hukuk Fakültesi'
  },
  {
    id: 6,
    name: 'Av. Can Yıldız',
    barNumber: '12350',
    specialization: 'İdare Hukuku',
    lawFirm: 'Yıldız & Yıldız',
    email: 'can.yildiz@hukuk.com',
    phone: '0537 678 90 12',
    address: 'Adana, Seyhan',
    experience: 14,
    activeCases: 7,
    completedCases: 42,
    successRate: 94,
    status: 'inactive',
    joinDate: '2010-11-08',
    hourlyRate: 550,
    rating: 4.9,
    languages: ['Türkçe', 'İngilizce', 'Fransızca'],
    education: 'Çukurova Üniversitesi Hukuk Fakültesi'
  }
];

const lawFirms = [
  {
    id: 1,
    name: 'Yılmaz Hukuk Bürosu',
    address: 'İstanbul, Kadıköy',
    phone: '0216 123 45 67',
    email: 'info@yilmazhukuk.com',
    website: 'www.yilmazhukuk.com',
    lawyers: 3,
    activeCases: 12,
    specialization: 'Ticaret Hukuku',
    status: 'active'
  },
  {
    id: 2,
    name: 'Demir & Ortakları',
    address: 'Ankara, Çankaya',
    phone: '0312 234 56 78',
    email: 'info@demirortaklari.com',
    website: 'www.demirortaklari.com',
    lawyers: 5,
    activeCases: 18,
    specialization: 'İdare Hukuku',
    status: 'active'
  },
  {
    id: 3,
    name: 'Kaya Hukuk',
    address: 'İzmir, Konak',
    phone: '0232 345 67 89',
    email: 'info@kayahukuk.com',
    website: 'www.kayahukuk.com',
    lawyers: 2,
    activeCases: 8,
    specialization: 'Sözleşme Hukuku',
    status: 'active'
  }
];

const specializations = [
  { value: 'all', label: 'Tümü' },
  { value: 'ticaret', label: 'Ticaret Hukuku' },
  { value: 'idare', label: 'İdare Hukuku' },
  { value: 'sozlesme', label: 'Sözleşme Hukuku' },
  { value: 'sulh', label: 'Sulh Hukuku' },
  { value: 'ceza', label: 'Ceza Hukuku' },
  { value: 'aile', label: 'Aile Hukuku' }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
  { value: 'busy', label: 'Meşgul' }
];

export default function AvukatlarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLawyers, setSelectedLawyers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('lawyers');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'inactive':
        return <Badge variant="outline">Pasif</Badge>;
      case 'busy':
        return <Badge variant="secondary">Meşgul</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSpecializationBadge = (specialization: string) => {
    switch (specialization) {
      case 'Ticaret Hukuku':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Ticaret</Badge>;
      case 'İdare Hukuku':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">İdare</Badge>;
      case 'Sözleşme Hukuku':
        return <Badge variant="default" className="bg-green-100 text-green-800">Sözleşme</Badge>;
      case 'Sulh Hukuku':
        return <Badge variant="outline">Sulh</Badge>;
      default:
        return <Badge variant="outline">{specialization}</Badge>;
    }
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.lawFirm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === 'all' || lawyer.specialization.toLowerCase().includes(specializationFilter);
    const matchesStatus = statusFilter === 'all' || lawyer.status === statusFilter;
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedLawyers.length === filteredLawyers.length) {
      setSelectedLawyers([]);
    } else {
      setSelectedLawyers(filteredLawyers.map(l => l.id));
    }
  };

  const handleSelectLawyer = (id: number) => {
    if (selectedLawyers.includes(id)) {
      setSelectedLawyers(selectedLawyers.filter(l => l !== id));
    } else {
      setSelectedLawyers([...selectedLawyers, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Avukatlar & Bürolar</h1>
          <p className="text-gray-600 mt-1">
            Hukuk profesyonelleri ve büro yönetimi
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Avukat
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Avukat</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hukuk Bürosu</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktif Dava</p>
                <p className="text-2xl font-bold text-gray-900">33</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ortalama Başarı</p>
                <p className="text-2xl font-bold text-gray-900">90%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'lawyers' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('lawyers')}
        >
          <Users className="w-4 h-4 mr-2" />
          Avukatlar
        </Button>
        <Button
          variant={activeTab === 'firms' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('firms')}
        >
          <Building className="w-4 h-4 mr-2" />
          Hukuk Büroları
        </Button>
      </div>

      {activeTab === 'lawyers' && (
        <>
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
                    placeholder="Avukat ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Uzmanlık alanı" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec.value} value={spec.value}>
                        {spec.label}
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
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSpecializationFilter('all');
                  setStatusFilter('all');
                }}>
                  Filtreleri Temizle
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredLawyers.length} avukat bulundu
            </p>
            {selectedLawyers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedLawyers.length} avukat seçildi
                </span>
                <Button variant="outline" size="sm">
                  Toplu İşlem
                </Button>
              </div>
            )}
          </div>

          {/* Lawyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{lawyer.name}</h3>
                        <p className="text-sm text-gray-500">Baro No: {lawyer.barNumber}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedLawyers.includes(lawyer.id)}
                      onChange={() => handleSelectLawyer(lawyer.id)}
                      className="rounded border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {getSpecializationBadge(lawyer.specialization)}
                      {getStatusBadge(lawyer.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {lawyer.lawFirm}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {lawyer.address}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {lawyer.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {lawyer.email}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Deneyim</p>
                        <p className="font-medium">{lawyer.experience} yıl</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aktif Dava</p>
                        <p className="font-medium">{lawyer.activeCases}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Başarı Oranı</p>
                        <p className="font-medium">{lawyer.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Puan</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{lawyer.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2 border-t">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Detay
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Düzenle
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'firms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawFirms.map((firm) => (
            <Card key={firm.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{firm.name}</h3>
                    <p className="text-sm text-gray-500">{firm.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(firm.status)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {firm.address}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {firm.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {firm.email}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Avukat Sayısı</p>
                      <p className="font-medium">{firm.lawyers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Aktif Dava</p>
                      <p className="font-medium">{firm.activeCases}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Detay
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Düzenle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 