'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Scale, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Calendar,
  User,
  MapPin,
  FileText
} from 'lucide-react';

// Mock data
const cases = [
  {
    id: 1,
    caseNumber: '2024/001',
    title: 'KAFKASDER vs. ABC Şirketi',
    type: 'Ticari Dava',
    status: 'active',
    court: 'İstanbul 5. Asliye Ticaret Mahkemesi',
    lawyer: 'Av. Mehmet Yılmaz',
    client: 'KAFKASDER',
    opponent: 'ABC Şirketi',
    filingDate: '2024-01-10',
    nextHearing: '2024-01-25',
    priority: 'high',
    estimatedValue: 50000
  },
  {
    id: 2,
    caseNumber: '2024/002',
    title: 'KAFKASDER vs. XYZ Vakfı',
    type: 'İdari Dava',
    status: 'pending',
    court: 'Ankara 1. İdare Mahkemesi',
    lawyer: 'Av. Fatma Demir',
    client: 'KAFKASDER',
    opponent: 'XYZ Vakfı',
    filingDate: '2024-01-08',
    nextHearing: '2024-01-30',
    priority: 'medium',
    estimatedValue: 25000
  },
  {
    id: 3,
    caseNumber: '2024/003',
    title: 'KAFKASDER vs. DEF Derneği',
    type: 'Hukuki Danışmanlık',
    status: 'completed',
    court: 'Dış Hukuki Danışmanlık',
    lawyer: 'Av. Ali Kaya',
    client: 'KAFKASDER',
    opponent: 'DEF Derneği',
    filingDate: '2024-01-05',
    nextHearing: '2024-01-20',
    priority: 'low',
    estimatedValue: 10000
  },
  {
    id: 4,
    caseNumber: '2024/004',
    title: 'KAFKASDER vs. GHI Limited',
    type: 'Ticari Dava',
    status: 'active',
    court: 'İzmir 3. Asliye Ticaret Mahkemesi',
    lawyer: 'Av. Zeynep Özkan',
    client: 'KAFKASDER',
    opponent: 'GHI Limited',
    filingDate: '2024-01-03',
    nextHearing: '2024-02-05',
    priority: 'high',
    estimatedValue: 75000
  },
  {
    id: 5,
    caseNumber: '2024/005',
    title: 'KAFKASDER vs. JKL Şirketi',
    type: 'Sulh Dava',
    status: 'active',
    court: 'İstanbul 2. Sulh Hukuk Mahkemesi',
    lawyer: 'Av. Burak Demir',
    client: 'KAFKASDER',
    opponent: 'JKL Şirketi',
    filingDate: '2024-01-01',
    nextHearing: '2024-02-01',
    priority: 'medium',
    estimatedValue: 15000
  },
  {
    id: 6,
    caseNumber: '2024/006',
    title: 'KAFKASDER vs. MNO Vakfı',
    type: 'İdari Dava',
    status: 'pending',
    court: 'Bursa 1. İdare Mahkemesi',
    lawyer: 'Av. Can Yıldız',
    client: 'KAFKASDER',
    opponent: 'MNO Vakfı',
    filingDate: '2023-12-28',
    nextHearing: '2024-02-10',
    priority: 'high',
    estimatedValue: 30000
  }
];

const caseTypes = [
  { value: 'all', label: 'Tümü' },
  { value: 'ticari', label: 'Ticari Dava' },
  { value: 'idari', label: 'İdari Dava' },
  { value: 'sulh', label: 'Sulh Dava' },
  { value: 'danismanlik', label: 'Hukuki Danışmanlık' }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'pending', label: 'Bekliyor' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'İptal' }
];

const priorityOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'high', label: 'Yüksek' },
  { value: 'medium', label: 'Orta' },
  { value: 'low', label: 'Düşük' }
];

export default function DavalarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedCases, setSelectedCases] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'pending':
        return <Badge variant="secondary">Bekliyor</Badge>;
      case 'completed':
        return <Badge variant="outline">Tamamlandı</Badge>;
      case 'cancelled':
        return <Badge variant="outline">İptal</Badge>;
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
      case 'Ticari Dava':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Ticari</Badge>;
      case 'İdari Dava':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">İdari</Badge>;
      case 'Sulh Dava':
        return <Badge variant="default" className="bg-green-100 text-green-800">Sulh</Badge>;
      case 'Hukuki Danışmanlık':
        return <Badge variant="outline">Danışmanlık</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredCases = cases.filter((case_) => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.lawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.opponent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || case_.type.toLowerCase().includes(typeFilter);
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || case_.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleSelectAll = () => {
    if (selectedCases.length === filteredCases.length) {
      setSelectedCases([]);
    } else {
      setSelectedCases(filteredCases.map(c => c.id));
    }
  };

  const handleSelectCase = (id: number) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter(c => c !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dava ve Dosyalar</h1>
          <p className="text-gray-600 mt-1">
            Tüm davaları görüntüle, yönet ve takip et
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Dava
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Dava ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Dava tipi" />
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map((type) => (
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
          {filteredCases.length} dava bulundu
        </p>
        {selectedCases.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedCases.length} dava seçildi
            </span>
            <Button variant="outline" size="sm">
              Toplu İşlem
            </Button>
          </div>
        )}
      </div>

      {/* Cases Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCases.length === filteredCases.length && filteredCases.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dava No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dava Bilgileri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mahkeme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avukat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açılış Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sonraki Duruşma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tahmini Değer
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
                {filteredCases.map((case_) => (
                  <tr key={case_.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCases.includes(case_.id)}
                        onChange={() => handleSelectCase(case_.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Scale className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-gray-900">{case_.caseNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{case_.title}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          {getTypeBadge(case_.type)}
                          {getPriorityBadge(case_.priority)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {case_.client} vs {case_.opponent}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {case_.court}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{case_.lawyer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {case_.filingDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {case_.nextHearing}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₺{case_.estimatedValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(case_.status)}
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