'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PiggyBank, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  MapPin,
  DollarSign
} from 'lucide-react';

interface Kumbara {
  id: number;
  kumbaraNo: string;
  kumbaraAdi: string;
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  konum: string;
  adres: string;
  koordinatlar?: string;
  sorumluKisi: string;
  telefon: string;
  email?: string;
  toplamTutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  durum: 'aktif' | 'pasif' | 'dolu' | 'bozuk' | 'kayip';
  sonKontrolTarihi: string;
  sonBosaltmaTarihi?: string;
  sonBosaltmaTutari?: number;
  aciklama?: string;
  fotografUrl?: string;
  qrKodu?: string;
}

export default function KumbaralarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [kumbaralar] = useState<Kumbara[]>([
    {
      id: 1,
      kumbaraNo: 'KUM-2024-001',
      kumbaraAdi: 'Merkez Camii Kumbarası',
      kategori: 'genel',
      konum: 'Merkez Camii',
      adres: 'Merkez Mahallesi, Camii Sokak No:1, İstanbul',
      koordinatlar: '41.0082,28.9784',
      sorumluKisi: 'Ahmet Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      toplamTutar: 2500,
      paraBirimi: 'TRY',
      durum: 'aktif',
      sonKontrolTarihi: '2024-01-15',
      sonBosaltmaTarihi: '2024-01-10',
      sonBosaltmaTutari: 1800,
      aciklama: 'Merkez camii girişinde bulunan kumbara',
      qrKodu: 'QR-KUM-001'
    },
    {
      id: 2,
      kumbaraNo: 'KUM-2024-002',
      kumbaraAdi: 'Eğitim Merkezi Kumbarası',
      kategori: 'egitim',
      konum: 'Eğitim Merkezi',
      adres: 'Eğitim Mahallesi, Okul Caddesi No:15, Ankara',
      koordinatlar: '39.9334,32.8597',
      sorumluKisi: 'Fatma Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      toplamTutar: 1800,
      paraBirimi: 'TRY',
      durum: 'dolu',
      sonKontrolTarihi: '2024-01-14',
      sonBosaltmaTarihi: '2024-01-05',
      sonBosaltmaTutari: 1200,
      aciklama: 'Eğitim merkezi lobisinde',
      qrKodu: 'QR-KUM-002'
    },
    {
      id: 3,
      kumbaraNo: 'KUM-2024-003',
      kumbaraAdi: 'Hastane Kumbarası',
      kategori: 'saglik',
      konum: 'Devlet Hastanesi',
      adres: 'Sağlık Mahallesi, Hastane Sokak No:8, İzmir',
      koordinatlar: '38.4192,27.1287',
      sorumluKisi: 'Mehmet Kaya',
      telefon: '0534 345 67 89',
      toplamTutar: 3200,
      paraBirimi: 'TRY',
      durum: 'aktif',
      sonKontrolTarihi: '2024-01-13',
      sonBosaltmaTarihi: '2024-01-08',
      sonBosaltmaTutari: 2800,
      aciklama: 'Hastane giriş holünde',
      qrKodu: 'QR-KUM-003'
    },
    {
      id: 4,
      kumbaraNo: 'KUM-2024-004',
      kumbaraAdi: 'AVM Kumbarası',
      kategori: 'genel',
      konum: 'Merkez AVM',
      adres: 'Ticaret Mahallesi, AVM Caddesi No:25, Bursa',
      koordinatlar: '40.1885,29.0610',
      sorumluKisi: 'Ayşe Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      toplamTutar: 4500,
      paraBirimi: 'TRY',
      durum: 'aktif',
      sonKontrolTarihi: '2024-01-12',
      sonBosaltmaTarihi: '2024-01-03',
      sonBosaltmaTutari: 3800,
      aciklama: 'AVM giriş katında',
      qrKodu: 'QR-KUM-004'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'dolu': return 'bg-orange-100 text-orange-800';
      case 'bozuk': return 'bg-red-100 text-red-800';
      case 'kayip': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'dolu': return 'Dolu';
      case 'bozuk': return 'Bozuk';
      case 'kayip': return 'Kayıp';
      default: return 'Bilinmiyor';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'genel': return 'bg-gray-100 text-gray-800';
      case 'egitim': return 'bg-blue-100 text-blue-800';
      case 'saglik': return 'bg-red-100 text-red-800';
      case 'acil': return 'bg-orange-100 text-orange-800';
      case 'ramazan': return 'bg-green-100 text-green-800';
      case 'kurban': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'genel': return 'Genel';
      case 'egitim': return 'Eğitim';
      case 'saglik': return 'Sağlık';
      case 'acil': return 'Acil';
      case 'ramazan': return 'Ramazan';
      case 'kurban': return 'Kurban';
      default: return category;
    }
  };

  const filteredData = kumbaralar.filter(kumbara => {
    const matchesSearch = kumbara.kumbaraAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kumbara.kumbaraNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kumbara.konum.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kumbara.sorumluKisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kumbara.telefon.includes(searchTerm) ||
                         (kumbara.email && kumbara.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || kumbara.durum === statusFilter;
    const matchesCategory = categoryFilter === 'all' || kumbara.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || kumbara.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesCurrency;
  });

  const totalAmount = kumbaralar.reduce((sum, kumbara) => sum + kumbara.toplamTutar, 0);
  const totalKumbaralar = kumbaralar.length;
  const activeKumbaralar = kumbaralar.filter(k => k.durum === 'aktif').length;
  const fullKumbaralar = kumbaralar.filter(k => k.durum === 'dolu').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getDaysSinceLastCheck = (lastCheckDate: string) => {
    const today = new Date();
    const lastCheck = new Date(lastCheckDate);
    const diffTime = today.getTime() - lastCheck.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kumbaralar</h1>
          <p className="text-gray-600">Kumbara listesi ve takip sistemi</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Kumbara Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Kumbara</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <PiggyBank className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Kumbara</p>
                <p className="text-xl font-bold">{totalKumbaralar}</p>
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
                <p className="text-xl font-bold">{activeKumbaralar}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Dolu</p>
                <p className="text-xl font-bold">{fullKumbaralar}</p>
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
                  placeholder="Kumbara adı, konum, sorumlu kişi ara..."
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
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="pasif">Pasif</SelectItem>
                <SelectItem value="dolu">Dolu</SelectItem>
                <SelectItem value="bozuk">Bozuk</SelectItem>
                <SelectItem value="kayip">Kayıp</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="genel">Genel</SelectItem>
                <SelectItem value="egitim">Eğitim</SelectItem>
                <SelectItem value="saglik">Sağlık</SelectItem>
                <SelectItem value="acil">Acil</SelectItem>
                <SelectItem value="ramazan">Ramazan</SelectItem>
                <SelectItem value="kurban">Kurban</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Para Birimi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Para Birimleri</SelectItem>
                <SelectItem value="TRY">TRY</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
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
          <CardTitle>Kumbara Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Kumbara No</th>
                  <th className="text-left p-3 font-medium">Kumbara Adı</th>
                  <th className="text-left p-3 font-medium">Konum</th>
                  <th className="text-left p-3 font-medium">Sorumlu Kişi</th>
                  <th className="text-left p-3 font-medium">Toplam Tutar</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Son Kontrol</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((kumbara) => {
                  const daysSinceLastCheck = getDaysSinceLastCheck(kumbara.sonKontrolTarihi);
                  const needsCheck = daysSinceLastCheck > 7;
                  
                  return (
                    <tr key={kumbara.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-blue-600">{kumbara.kumbaraNo}</div>
                        {kumbara.qrKodu && (
                          <div className="text-xs text-gray-500">QR: {kumbara.qrKodu}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{kumbara.kumbaraAdi}</div>
                        {kumbara.aciklama && (
                          <div className="text-xs text-gray-500">{kumbara.aciklama}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{kumbara.konum}</div>
                            <div className="text-xs text-gray-500">{kumbara.adres}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{kumbara.sorumluKisi}</div>
                            <div className="text-sm text-gray-500">{kumbara.telefon}</div>
                            {kumbara.email && (
                              <div className="text-xs text-gray-400">{kumbara.email}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-green-600">
                          {formatCurrency(kumbara.toplamTutar, kumbara.paraBirimi)}
                        </div>
                        {kumbara.sonBosaltmaTarihi && kumbara.sonBosaltmaTutari && (
                          <div className="text-xs text-gray-500">
                            Son boşaltma: {formatCurrency(kumbara.sonBosaltmaTutari, kumbara.paraBirimi)}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge className={getCategoryColor(kumbara.kategori)}>
                          {getCategoryText(kumbara.kategori)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          <div>
                            <div>{kumbara.sonKontrolTarihi}</div>
                            {needsCheck && (
                              <div className="text-xs text-orange-600 font-medium">
                                {daysSinceLastCheck} gün önce
                              </div>
                            )}
                            {!needsCheck && (
                              <div className="text-xs text-gray-500">
                                {daysSinceLastCheck} gün önce
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(kumbara.durum)}>
                          {getStatusText(kumbara.durum)}
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
                          <Button size="sm" variant="outline" className="text-green-600">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 