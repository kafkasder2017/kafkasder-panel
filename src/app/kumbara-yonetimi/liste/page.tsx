'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PiggyBank, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  MapPin,
  Calendar,
  User
} from 'lucide-react';

// Mock data
const kumbaralar = [
  {
    id: 1,
    kumbaraNo: 'KMB-001',
    personName: 'Ahmet Yılmaz',
    phone: '0532 123 45 67',
    location: 'İstanbul, Kadıköy',
    distributionDate: '2024-01-10',
    lastCollectionDate: '2024-01-15',
    totalCollected: 1250,
    status: 'active',
    type: 'standard'
  },
  {
    id: 2,
    kumbaraNo: 'KMB-002',
    personName: 'Fatma Demir',
    phone: '0533 234 56 78',
    location: 'Ankara, Çankaya',
    distributionDate: '2024-01-08',
    lastCollectionDate: '2024-01-14',
    totalCollected: 890,
    status: 'active',
    type: 'standard'
  },
  {
    id: 3,
    kumbaraNo: 'KMB-003',
    personName: 'Mehmet Kaya',
    phone: '0534 345 67 89',
    location: 'İzmir, Konak',
    distributionDate: '2024-01-05',
    lastCollectionDate: '2024-01-12',
    totalCollected: 2100,
    status: 'collected',
    type: 'premium'
  },
  {
    id: 4,
    kumbaraNo: 'KMB-004',
    personName: 'Ayşe Özkan',
    phone: '0535 456 78 90',
    location: 'Bursa, Nilüfer',
    distributionDate: '2024-01-03',
    lastCollectionDate: '2024-01-10',
    totalCollected: 750,
    status: 'active',
    type: 'standard'
  },
  {
    id: 5,
    kumbaraNo: 'KMB-005',
    personName: 'Ali Veli',
    phone: '0536 567 89 01',
    location: 'Antalya, Muratpaşa',
    distributionDate: '2024-01-01',
    lastCollectionDate: '2024-01-08',
    totalCollected: 1800,
    status: 'inactive',
    type: 'premium'
  },
  {
    id: 6,
    kumbaraNo: 'KMB-006',
    personName: 'Zeynep Kaya',
    phone: '0537 678 90 12',
    location: 'Adana, Seyhan',
    distributionDate: '2023-12-28',
    lastCollectionDate: '2024-01-05',
    totalCollected: 950,
    status: 'active',
    type: 'standard'
  },
  {
    id: 7,
    kumbaraNo: 'KMB-007',
    personName: 'Mustafa Demir',
    phone: '0538 789 01 23',
    location: 'Konya, Selçuklu',
    distributionDate: '2023-12-25',
    lastCollectionDate: '2024-01-02',
    totalCollected: 3200,
    status: 'collected',
    type: 'premium'
  },
  {
    id: 8,
    kumbaraNo: 'KMB-008',
    personName: 'Elif Yıldız',
    phone: '0539 890 12 34',
    location: 'Gaziantep, Şahinbey',
    distributionDate: '2023-12-20',
    lastCollectionDate: '2023-12-30',
    totalCollected: 650,
    status: 'active',
    type: 'standard'
  }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'collected', label: 'Toplandı' },
  { value: 'inactive', label: 'Pasif' }
];

const typeOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'standard', label: 'Standart' },
  { value: 'premium', label: 'Premium' }
];

export default function KumbaraListesiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedKumbaralar, setSelectedKumbaralar] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'collected':
        return <Badge variant="secondary">Toplandı</Badge>;
      case 'inactive':
        return <Badge variant="outline">Pasif</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'premium':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Premium</Badge>;
      case 'standard':
        return <Badge variant="outline">Standart</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredKumbaralar = kumbaralar.filter(kumbara => {
    const matchesSearch = kumbara.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kumbara.kumbaraNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kumbara.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || kumbara.status === statusFilter;
    const matchesType = typeFilter === 'all' || kumbara.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectAll = () => {
    if (selectedKumbaralar.length === filteredKumbaralar.length) {
      setSelectedKumbaralar([]);
    } else {
      setSelectedKumbaralar(filteredKumbaralar.map(k => k.id));
    }
  };

  const handleSelectKumbara = (id: number) => {
    if (selectedKumbaralar.includes(id)) {
      setSelectedKumbaralar(selectedKumbaralar.filter(k => k !== id));
    } else {
      setSelectedKumbaralar([...selectedKumbaralar, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kumbara Listesi</h1>
          <p className="text-gray-600 mt-1">
            Tüm kumbaraları görüntüle, yönet ve takip et
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kumbara
          </Button>
        </div>
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
                placeholder="Kumbara ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tip seçin" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}>
              Filtreleri Temizle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredKumbaralar.length} kumbara bulundu
        </p>
        {selectedKumbaralar.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedKumbaralar.length} kumbara seçildi
            </span>
            <Button variant="outline" size="sm">
              Toplu İşlem
            </Button>
          </div>
        )}
      </div>

      {/* Kumbara Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedKumbaralar.length === filteredKumbaralar.length && filteredKumbaralar.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kumbara No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kişi Bilgileri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Konum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dağıtım Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Son Toplama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Toplanan Tutar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredKumbaralar.map((kumbara) => (
                  <tr key={kumbara.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedKumbaralar.includes(kumbara.id)}
                        onChange={() => handleSelectKumbara(kumbara.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <PiggyBank className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-gray-900">{kumbara.kumbaraNo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{kumbara.personName}</div>
                          <div className="text-sm text-gray-500">{kumbara.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {kumbara.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {kumbara.distributionDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {kumbara.lastCollectionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₺{kumbara.totalCollected.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(kumbara.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(kumbara.type)}
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