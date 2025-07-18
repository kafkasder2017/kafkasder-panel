'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Calendar,
  User,
  MapPin
} from 'lucide-react';

interface YardimBasvurusu {
  id: number;
  basvuruNo: string;
  basvuranAd: string;
  basvuranSoyad: string;
  telefon: string;
  sehir: string;
  basvuruTarihi: string;
  yardimTuru: 'nakdi' | 'ayni' | 'hizmet';
  aciliyet: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  durum: 'beklemede' | 'incelemede' | 'onaylandi' | 'reddedildi' | 'tamamlandi';
  tutar?: number;
  aciklama: string;
}

export default function YardimBasvurulariPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  const [basvurular] = useState<YardimBasvurusu[]>([
    {
      id: 1,
      basvuruNo: 'YB-2024-001',
      basvuranAd: 'Ahmet',
      basvuranSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      sehir: 'İstanbul',
      basvuruTarihi: '2024-01-15',
      yardimTuru: 'nakdi',
      aciliyet: 'orta',
      durum: 'beklemede',
      tutar: 2500,
      aciklama: 'Kira yardımı talep ediyorum'
    },
    {
      id: 2,
      basvuruNo: 'YB-2024-002',
      basvuranAd: 'Fatma',
      basvuranSoyad: 'Demir',
      telefon: '0533 234 56 78',
      sehir: 'Ankara',
      basvuruTarihi: '2024-01-14',
      yardimTuru: 'ayni',
      aciliyet: 'acil',
      durum: 'incelemede',
      aciklama: 'Gıda yardımı acil ihtiyaç'
    },
    {
      id: 3,
      basvuruNo: 'YB-2024-003',
      basvuranAd: 'Mehmet',
      basvuranSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      sehir: 'İzmir',
      basvuruTarihi: '2024-01-13',
      yardimTuru: 'hizmet',
      aciliyet: 'dusuk',
      durum: 'onaylandi',
      aciklama: 'Sağlık hizmeti yardımı'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'incelemede': return 'bg-blue-100 text-blue-800';
      case 'onaylandi': return 'bg-green-100 text-green-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      case 'tamamlandi': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'beklemede': return 'Beklemede';
      case 'incelemede': return 'İncelemede';
      case 'onaylandi': return 'Onaylandı';
      case 'reddedildi': return 'Reddedildi';
      case 'tamamlandi': return 'Tamamlandı';
      default: return 'Bilinmiyor';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'beklemede': return <Clock className="w-4 h-4" />;
      case 'incelemede': return <AlertCircle className="w-4 h-4" />;
      case 'onaylandi': return <CheckCircle className="w-4 h-4" />;
      case 'reddedildi': return <XCircle className="w-4 h-4" />;
      case 'tamamlandi': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nakdi': return 'bg-green-100 text-green-800';
      case 'ayni': return 'bg-blue-100 text-blue-800';
      case 'hizmet': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'dusuk': return 'bg-green-100 text-green-800';
      case 'orta': return 'bg-yellow-100 text-yellow-800';
      case 'yuksek': return 'bg-orange-100 text-orange-800';
      case 'acil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = basvurular.filter(basvuru => {
    const matchesSearch = `${basvuru.basvuranAd} ${basvuru.basvuranSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         basvuru.basvuruNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         basvuru.telefon.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || basvuru.durum === statusFilter;
    const matchesType = typeFilter === 'all' || basvuru.yardimTuru === typeFilter;
    const matchesUrgency = urgencyFilter === 'all' || basvuru.aciliyet === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesUrgency;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yardım Başvuruları</h1>
          <p className="text-gray-600">Gelen yardım başvuruları ve durumları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Başvuru
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Başvuru</p>
                <p className="text-xl font-bold">{basvurular.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Beklemede</p>
                <p className="text-xl font-bold">{basvurular.filter(b => b.durum === 'beklemede').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">İncelemede</p>
                <p className="text-xl font-bold">{basvurular.filter(b => b.durum === 'incelemede').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Onaylandı</p>
                <p className="text-xl font-bold">{basvurular.filter(b => b.durum === 'onaylandi').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Acil</p>
                <p className="text-xl font-bold">{basvurular.filter(b => b.aciliyet === 'acil').length}</p>
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
                  placeholder="Başvuru no, ad soyad veya telefon ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="incelemede">İncelemede</SelectItem>
                <SelectItem value="onaylandi">Onaylandı</SelectItem>
                <SelectItem value="reddedildi">Reddedildi</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Tür" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="nakdi">Nakdi</SelectItem>
                <SelectItem value="ayni">Ayni</SelectItem>
                <SelectItem value="hizmet">Hizmet</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Aciliyet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Aciliyetler</SelectItem>
                <SelectItem value="dusuk">Düşük</SelectItem>
                <SelectItem value="orta">Orta</SelectItem>
                <SelectItem value="yuksek">Yüksek</SelectItem>
                <SelectItem value="acil">Acil</SelectItem>
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
          <CardTitle>Başvuru Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Başvuru No</th>
                  <th className="text-left p-3 font-medium">Başvuran</th>
                  <th className="text-left p-3 font-medium">İletişim</th>
                  <th className="text-left p-3 font-medium">Başvuru Tarihi</th>
                  <th className="text-left p-3 font-medium">Yardım Türü</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Aciliyet</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((basvuru) => (
                  <tr key={basvuru.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{basvuru.basvuruNo}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{basvuru.basvuranAd} {basvuru.basvuranSoyad}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            {basvuru.sehir}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{basvuru.telefon}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {basvuru.basvuruTarihi}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTypeColor(basvuru.yardimTuru)}>
                        {basvuru.yardimTuru.charAt(0).toUpperCase() + basvuru.yardimTuru.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {basvuru.tutar ? (
                        <div className="font-medium text-green-600">{basvuru.tutar.toLocaleString('tr-TR')} ₺</div>
                      ) : (
                        <div className="text-gray-500">-</div>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge className={getUrgencyColor(basvuru.aciliyet)}>
                        {basvuru.aciliyet.charAt(0).toUpperCase() + basvuru.aciliyet.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(basvuru.durum)}
                        <Badge className={getStatusColor(basvuru.durum)}>
                          {getStatusText(basvuru.durum)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        {basvuru.durum === 'beklemede' && (
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                        )}
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