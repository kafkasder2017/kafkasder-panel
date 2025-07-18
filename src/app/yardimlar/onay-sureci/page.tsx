'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  Search, 
  Eye, 
  Clock,
  AlertCircle,
  XCircle,
  UserCheck,
  FileCheck,
  Download,
  Calendar,
  User,
  ArrowRight,
  CheckSquare
} from 'lucide-react';

interface OnaySureci {
  id: number;
  islemNo: string;
  basvuranAd: string;
  basvuranSoyad: string;
  telefon: string;
  yardimTuru: 'nakdi' | 'ayni' | 'hizmet';
  tutar?: number;
  aciklama: string;
  basvuruTarihi: string;
  mevcutAdim: number;
  toplamAdim: number;
  durum: 'beklemede' | 'incelemede' | 'onaylandi' | 'reddedildi';
  onaylayanlar: string[];
  reddedenler: string[];
  sonGuncelleme: string;
}

export default function OnaySureciPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stepFilter, setStepFilter] = useState('all');

  const [onaySurecleri] = useState<OnaySureci[]>([
    {
      id: 1,
      islemNo: 'OS-2024-001',
      basvuranAd: 'Ahmet',
      basvuranSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      yardimTuru: 'nakdi',
      tutar: 2500,
      aciklama: 'Kira yardımı talep ediyorum',
      basvuruTarihi: '2024-01-15',
      mevcutAdim: 2,
      toplamAdim: 3,
      durum: 'incelemede',
      onaylayanlar: ['Mehmet Bey'],
      reddedenler: [],
      sonGuncelleme: '2024-01-16'
    },
    {
      id: 2,
      islemNo: 'OS-2024-002',
      basvuranAd: 'Fatma',
      basvuranSoyad: 'Demir',
      telefon: '0533 234 56 78',
      yardimTuru: 'ayni',
      aciklama: 'Gıda yardımı acil ihtiyaç',
      basvuruTarihi: '2024-01-14',
      mevcutAdim: 1,
      toplamAdim: 3,
      durum: 'beklemede',
      onaylayanlar: [],
      reddedenler: [],
      sonGuncelleme: '2024-01-14'
    },
    {
      id: 3,
      islemNo: 'OS-2024-003',
      basvuranAd: 'Mehmet',
      basvuranSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      yardimTuru: 'hizmet',
      aciklama: 'Sağlık hizmeti yardımı',
      basvuruTarihi: '2024-01-13',
      mevcutAdim: 3,
      toplamAdim: 3,
      durum: 'onaylandi',
      onaylayanlar: ['Ali Bey', 'Ayşe Hanım', 'Fatma Hanım'],
      reddedenler: [],
      sonGuncelleme: '2024-01-17'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'incelemede': return 'bg-blue-100 text-blue-800';
      case 'onaylandi': return 'bg-green-100 text-green-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'beklemede': return 'Beklemede';
      case 'incelemede': return 'İncelemede';
      case 'onaylandi': return 'Onaylandı';
      case 'reddedildi': return 'Reddedildi';
      default: return 'Bilinmiyor';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'beklemede': return <Clock className="w-4 h-4" />;
      case 'incelemede': return <AlertCircle className="w-4 h-4" />;
      case 'onaylandi': return <CheckCircle className="w-4 h-4" />;
      case 'reddedildi': return <XCircle className="w-4 h-4" />;
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

  const getStepColor = (current: number, total: number) => {
    const progress = (current / total) * 100;
    if (progress >= 100) return 'bg-green-100 text-green-800';
    if (progress >= 66) return 'bg-blue-100 text-blue-800';
    if (progress >= 33) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const filteredData = onaySurecleri.filter(surec => {
    const matchesSearch = `${surec.basvuranAd} ${surec.basvuranSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surec.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surec.telefon.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || surec.durum === statusFilter;
    const matchesType = typeFilter === 'all' || surec.yardimTuru === typeFilter;
    const matchesStep = stepFilter === 'all' || 
                       (stepFilter === 'baslangic' && surec.mevcutAdim === 1) ||
                       (stepFilter === 'orta' && surec.mevcutAdim > 1 && surec.mevcutAdim < surec.toplamAdim) ||
                       (stepFilter === 'son' && surec.mevcutAdim === surec.toplamAdim);
    
    return matchesSearch && matchesStatus && matchesType && matchesStep;
  });

  const totalProcesses = onaySurecleri.length;
  const pendingProcesses = onaySurecleri.filter(p => p.durum === 'beklemede').length;
  const inProgressProcesses = onaySurecleri.filter(p => p.durum === 'incelemede').length;
  const approvedProcesses = onaySurecleri.filter(p => p.durum === 'onaylandi').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onay Süreci</h1>
          <p className="text-gray-600">Çok adımlı onay süreçleri</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CheckSquare className="w-4 h-4 mr-2" />
          Yeni Onay Süreci
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Süreç</p>
                <p className="text-xl font-bold">{totalProcesses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-xl font-bold text-yellow-600">{pendingProcesses}</p>
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
                <p className="text-xl font-bold text-blue-600">{inProgressProcesses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Onaylanan</p>
                <p className="text-xl font-bold text-green-600">{approvedProcesses}</p>
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
                  placeholder="İşlem no, ad soyad veya telefon ara..."
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
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Yardım Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="nakdi">Nakdi</SelectItem>
                <SelectItem value="ayni">Ayni</SelectItem>
                <SelectItem value="hizmet">Hizmet</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={stepFilter} onValueChange={setStepFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Adım" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Adımlar</SelectItem>
                <SelectItem value="baslangic">Başlangıç</SelectItem>
                <SelectItem value="orta">Orta</SelectItem>
                <SelectItem value="son">Son</SelectItem>
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
          <CardTitle>Onay Süreçleri Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Başvuran</th>
                  <th className="text-left p-3 font-medium">Yardım Türü</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Adım</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">Onaylayanlar</th>
                  <th className="text-left p-3 font-medium">Son Güncelleme</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((surec) => (
                  <tr key={surec.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{surec.islemNo}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{surec.basvuranAd} {surec.basvuranSoyad}</div>
                          <div className="text-sm text-gray-500">{surec.telefon}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTypeColor(surec.yardimTuru)}>
                        {surec.yardimTuru.charAt(0).toUpperCase() + surec.yardimTuru.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {surec.tutar ? (
                        <div className="font-medium text-green-600">{surec.tutar.toLocaleString('tr-TR')} ₺</div>
                      ) : (
                        <div className="text-gray-500">-</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Badge className={getStepColor(surec.mevcutAdim, surec.toplamAdim)}>
                          {surec.mevcutAdim}/{surec.toplamAdim}
                        </Badge>
                        <div className="flex space-x-1">
                          {Array.from({ length: surec.toplamAdim }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < surec.mevcutAdim ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(surec.durum)}
                        <Badge className={getStatusColor(surec.durum)}>
                          {getStatusText(surec.durum)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {surec.onaylayanlar.length > 0 ? (
                          <div className="space-y-1">
                            {surec.onaylayanlar.map((onaylayan, index) => (
                              <div key={index} className="flex items-center text-green-600">
                                <UserCheck className="w-3 h-3 mr-1" />
                                {onaylayan}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-500">Henüz onaylayan yok</div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {surec.sonGuncelleme}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        {surec.durum === 'beklemede' && (
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                        )}
                        {surec.durum === 'beklemede' && (
                          <Button size="sm" variant="outline" className="text-red-600">
                            <XCircle className="w-3 h-3" />
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