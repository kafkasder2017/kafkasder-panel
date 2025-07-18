'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  Smartphone,
  Monitor
} from 'lucide-react';

interface OnlineBagis {
  id: number;
  bagisNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  tutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  platform: 'website' | 'mobil_app' | 'sosyal_medya' | 'qr_kod' | 'sms';
  odemeYontemi: 'kredi_karti' | 'banka_karti' | 'havale' | 'eft' | 'paypal';
  cihazTuru: 'desktop' | 'mobile' | 'tablet';
  ipAdresi: string;
  userAgent: string;
  odemeDurumu: 'basarili' | 'beklemede' | 'basarisiz' | 'iptal' | 'iade';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  bagisTarihi: string;
  aciklama?: string;
  fişNo?: string;
  islemNo?: string;
  kampanyaKodu?: string;
  referansKodu?: string;
}

export default function OnlineBagislarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [onlineBagislar] = useState<OnlineBagis[]>([
    {
      id: 1,
      bagisNo: 'ONL-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      tutar: 1000,
      paraBirimi: 'TRY',
      platform: 'website',
      odemeYontemi: 'kredi_karti',
      cihazTuru: 'desktop',
      ipAdresi: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      odemeDurumu: 'basarili',
      kategori: 'genel',
      bagisTarihi: '2024-01-15',
      aciklama: 'Web sitesi üzerinden bağış',
      fişNo: 'FIS-2024-001',
      islemNo: 'TRX123456789',
      kampanyaKodu: 'RAMAZAN2024'
    },
    {
      id: 2,
      bagisNo: 'ONL-2024-002',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      tutar: 500,
      paraBirimi: 'TRY',
      platform: 'mobil_app',
      odemeYontemi: 'banka_karti',
      cihazTuru: 'mobile',
      ipAdresi: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
      odemeDurumu: 'basarili',
      kategori: 'egitim',
      bagisTarihi: '2024-01-14',
      aciklama: 'Mobil uygulama üzerinden',
      fişNo: 'FIS-2024-002',
      islemNo: 'TRX987654321',
      referansKodu: 'REF001'
    },
    {
      id: 3,
      bagisNo: 'ONL-2024-003',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 250,
      paraBirimi: 'USD',
      platform: 'sosyal_medya',
      odemeYontemi: 'paypal',
      cihazTuru: 'mobile',
      ipAdresi: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Android 13)',
      odemeDurumu: 'beklemede',
      kategori: 'saglik',
      bagisTarihi: '2024-01-13',
      aciklama: 'Sosyal medya kampanyası',
      islemNo: 'TRX456789123'
    },
    {
      id: 4,
      bagisNo: 'ONL-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      tutar: 750,
      paraBirimi: 'TRY',
      platform: 'qr_kod',
      odemeYontemi: 'havale',
      cihazTuru: 'tablet',
      ipAdresi: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0)',
      odemeDurumu: 'basarili',
      kategori: 'acil',
      bagisTarihi: '2024-01-12',
      aciklama: 'QR kod ile acil yardım',
      fişNo: 'FIS-2024-004',
      islemNo: 'TRX789123456'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'basarili': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'basarisiz': return 'bg-red-100 text-red-800';
      case 'iptal': return 'bg-gray-100 text-gray-800';
      case 'iade': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'basarili': return 'Başarılı';
      case 'beklemede': return 'Beklemede';
      case 'basarisiz': return 'Başarısız';
      case 'iptal': return 'İptal';
      case 'iade': return 'İade';
      default: return 'Bilinmiyor';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'mobil_app': return 'bg-green-100 text-green-800';
      case 'sosyal_medya': return 'bg-purple-100 text-purple-800';
      case 'qr_kod': return 'bg-orange-100 text-orange-800';
      case 'sms': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformText = (platform: string) => {
    switch (platform) {
      case 'website': return 'Web Sitesi';
      case 'mobil_app': return 'Mobil Uygulama';
      case 'sosyal_medya': return 'Sosyal Medya';
      case 'qr_kod': return 'QR Kod';
      case 'sms': return 'SMS';
      default: return platform;
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'kredi_karti': return 'bg-blue-100 text-blue-800';
      case 'banka_karti': return 'bg-green-100 text-green-800';
      case 'havale': return 'bg-purple-100 text-purple-800';
      case 'eft': return 'bg-orange-100 text-orange-800';
      case 'paypal': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'kredi_karti': return 'Kredi Kartı';
      case 'banka_karti': return 'Banka Kartı';
      case 'havale': return 'Havale';
      case 'eft': return 'EFT';
      case 'paypal': return 'PayPal';
      default: return method;
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

  const filteredData = onlineBagislar.filter(bagis => {
    const matchesSearch = `${bagis.bagisciAd} ${bagis.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.bagisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.telefon.includes(searchTerm) ||
                         (bagis.email && bagis.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (bagis.islemNo && bagis.islemNo.includes(searchTerm)) ||
                         (bagis.kampanyaKodu && bagis.kampanyaKodu.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || bagis.odemeDurumu === statusFilter;
    const matchesPlatform = platformFilter === 'all' || bagis.platform === platformFilter;
    const matchesCategory = categoryFilter === 'all' || bagis.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || bagis.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform && matchesCategory && matchesCurrency;
  });

  const totalAmount = onlineBagislar.filter(b => b.odemeDurumu === 'basarili').reduce((sum, bagis) => sum + bagis.tutar, 0);
  const totalDonations = onlineBagislar.length;
  const successfulDonations = onlineBagislar.filter(b => b.odemeDurumu === 'basarili').length;
  const pendingDonations = onlineBagislar.filter(b => b.odemeDurumu === 'beklemede').length;
  const failedDonations = onlineBagislar.filter(b => b.odemeDurumu === 'basarisiz').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Monitor className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Online Bağışlar</h1>
          <p className="text-gray-600">Online platformlardan gelen bağışların listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Online Bağış
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Online Bağış</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam İşlem</p>
                <p className="text-xl font-bold">{totalDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Başarılı</p>
                <p className="text-xl font-bold">{successfulDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-xl font-bold">{pendingDonations}</p>
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
                  placeholder="Bağış no, ad soyad, kampanya kodu ara..."
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
                <SelectItem value="basarili">Başarılı</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="basarisiz">Başarısız</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="iade">İade</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Platformlar</SelectItem>
                <SelectItem value="website">Web Sitesi</SelectItem>
                <SelectItem value="mobil_app">Mobil Uygulama</SelectItem>
                <SelectItem value="sosyal_medya">Sosyal Medya</SelectItem>
                <SelectItem value="qr_kod">QR Kod</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
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
          <CardTitle>Online Bağış Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Bağış No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Platform</th>
                  <th className="text-left p-3 font-medium">Ödeme Yöntemi</th>
                  <th className="text-left p-3 font-medium">Cihaz</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Bağış Tarihi</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((bagis) => (
                  <tr key={bagis.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{bagis.bagisNo}</div>
                      {bagis.islemNo && (
                        <div className="text-xs text-gray-500">İşlem: {bagis.islemNo}</div>
                      )}
                      {bagis.kampanyaKodu && (
                        <div className="text-xs text-green-600">Kampanya: {bagis.kampanyaKodu}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{bagis.bagisciAd} {bagis.bagisciSoyad}</div>
                          <div className="text-sm text-gray-500">{bagis.telefon}</div>
                          {bagis.email && (
                            <div className="text-xs text-gray-400">{bagis.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-green-600">
                        {formatCurrency(bagis.tutar, bagis.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getPlatformColor(bagis.platform)}>
                        {getPlatformText(bagis.platform)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getPaymentMethodColor(bagis.odemeYontemi)}>
                        {getPaymentMethodText(bagis.odemeYontemi)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon(bagis.cihazTuru)}
                        <span className="text-sm capitalize">{bagis.cihazTuru}</span>
                      </div>
                      <div className="text-xs text-gray-500">{bagis.ipAdresi}</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getCategoryColor(bagis.kategori)}>
                        {getCategoryText(bagis.kategori)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {bagis.bagisTarihi}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(bagis.odemeDurumu)}>
                        {getStatusText(bagis.odemeDurumu)}
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
                        {bagis.fişNo && (
                          <Button size="sm" variant="outline" className="text-blue-600">
                            <Download className="w-3 h-3" />
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