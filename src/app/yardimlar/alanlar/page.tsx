'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

interface YardimAlani {
  id: number;
  ad: string;
  soyad: string;
  telefon: string;
  email: string;
  sehir: string;
  sonYardimTarihi: string;
  toplamYardimSayisi: number;
  durum: 'aktif' | 'pasif' | 'beklemede';
  kategori: 'acil' | 'düzenli' | 'geçici';
}

export default function YardimAlanlarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [yardimAlanlari] = useState<YardimAlani[]>([
    {
      id: 1,
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      sehir: 'İstanbul',
      sonYardimTarihi: '2024-01-15',
      toplamYardimSayisi: 5,
      durum: 'aktif',
      kategori: 'düzenli'
    },
    {
      id: 2,
      ad: 'Fatma',
      soyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      sehir: 'Ankara',
      sonYardimTarihi: '2024-01-10',
      toplamYardimSayisi: 3,
      durum: 'beklemede',
      kategori: 'acil'
    },
    {
      id: 3,
      ad: 'Mehmet',
      soyad: 'Kaya',
      telefon: '0534 345 67 89',
      email: 'mehmet@email.com',
      sehir: 'İzmir',
      sonYardimTarihi: '2024-01-08',
      toplamYardimSayisi: 2,
      durum: 'aktif',
      kategori: 'geçici'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'beklemede': return 'Beklemede';
      default: return 'Bilinmiyor';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'acil': return 'bg-red-100 text-red-800';
      case 'düzenli': return 'bg-blue-100 text-blue-800';
      case 'geçici': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = yardimAlanlari.filter(person => {
    const matchesSearch = `${person.ad} ${person.soyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.telefon.includes(searchTerm) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || person.durum === statusFilter;
    const matchesCategory = categoryFilter === 'all' || person.kategori === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yardım Alanlar</h1>
          <p className="text-gray-600">Yardım alan kişilerin listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Yardım Alanı Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Yardım Alanı</p>
                <p className="text-xl font-bold">{yardimAlanlari.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Aktif</p>
                <p className="text-xl font-bold">{yardimAlanlari.filter(p => p.durum === 'aktif').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Beklemede</p>
                <p className="text-xl font-bold">{yardimAlanlari.filter(p => p.durum === 'beklemede').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Acil</p>
                <p className="text-xl font-bold">{yardimAlanlari.filter(p => p.kategori === 'acil').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Ad, soyad, telefon veya e-posta ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Durum Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="pasif">Pasif</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="acil">Acil</SelectItem>
                <SelectItem value="düzenli">Düzenli</SelectItem>
                <SelectItem value="geçici">Geçici</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Dışa Aktar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Yardım Alanlar Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Ad Soyad</th>
                  <th className="text-left p-3 font-medium">İletişim</th>
                  <th className="text-left p-3 font-medium">Şehir</th>
                  <th className="text-left p-3 font-medium">Son Yardım</th>
                  <th className="text-left p-3 font-medium">Toplam Yardım</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((person) => (
                  <tr key={person.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{person.ad} {person.soyad}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {person.telefon}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-1" />
                          {person.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {person.sehir}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {person.sonYardimTarihi}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{person.toplamYardimSayisi}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(person.durum)}>
                        {getStatusText(person.durum)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getCategoryColor(person.kategori)}>
                        {person.kategori.charAt(0).toUpperCase() + person.kategori.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="w-3 h-3" />
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