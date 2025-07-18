'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

interface KrediKartiBagis {
  id: number;
  bagisNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  tutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  kartSonDort: string;
  kartTuru: 'visa' | 'mastercard' | 'amex' | 'discover';
  taksitSayisi: number;
  odemeDurumu: 'basarili' | 'beklemede' | 'basarisiz' | 'iptal' | 'iade';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  bagisTarihi: string;
  aciklama?: string;
  fişNo?: string;
  islemNo?: string;
  bankaAdi?: string;
  komisyonOrani?: number;
}

export default function KrediKartiBagislarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cardTypeFilter, setCardTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [krediKartiBagislar] = useState<KrediKartiBagis[]>([
    {
      id: 1,
      bagisNo: 'KK-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      tutar: 5000,
      paraBirimi: 'TRY',
      kartSonDort: '1234',
      kartTuru: 'visa',
      taksitSayisi: 1,
      odemeDurumu: 'basarili',
      kategori: 'genel',
      bagisTarihi: '2024-01-15',
      aciklama: 'Kredi kartı ile genel bağış',
      fişNo: 'FIS-2024-001',
      islemNo: 'TRX123456789',
      bankaAdi: 'Garanti BBVA',
      komisyonOrani: 2.5
    },
    {
      id: 2,
      bagisNo: 'KK-2024-002',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      tutar: 2500,
      paraBirimi: 'TRY',
      kartSonDort: '5678',
      kartTuru: 'mastercard',
      taksitSayisi: 3,
      odemeDurumu: 'basarili',
      kategori: 'egitim',
      bagisTarihi: '2024-01-14',
      aciklama: 'Eğitim fonu - 3 taksit',
      fişNo: 'FIS-2024-002',
      islemNo: 'TRX987654321',
      bankaAdi: 'İş Bankası',
      komisyonOrani: 2.8
    },
    {
      id: 3,
      bagisNo: 'KK-2024-003',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 1000,
      paraBirimi: 'USD',
      kartSonDort: '9012',
      kartTuru: 'amex',
      taksitSayisi: 1,
      odemeDurumu: 'beklemede',
      kategori: 'saglik',
      bagisTarihi: '2024-01-13',
      aciklama: 'Sağlık fonu - dolar ile',
      islemNo: 'TRX456789123',
      bankaAdi: 'Yapı Kredi',
      komisyonOrani: 3.2
    },
    {
      id: 4,
      bagisNo: 'KK-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      tutar: 750,
      paraBirimi: 'EUR',
      kartSonDort: '3456',
      kartTuru: 'visa',
      taksitSayisi: 6,
      odemeDurumu: 'basarili',
      kategori: 'acil',
      bagisTarihi: '2024-01-12',
      aciklama: 'Acil yardım - 6 taksit',
      fişNo: 'FIS-2024-004',
      islemNo: 'TRX789123456',
      bankaAdi: 'Ziraat Bankası',
      komisyonOrani: 2.3
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

  const getCardTypeColor = (type: string) => {
    switch (type) {
      case 'visa': return 'bg-blue-100 text-blue-800';
      case 'mastercard': return 'bg-red-100 text-red-800';
      case 'amex': return 'bg-green-100 text-green-800';
      case 'discover': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardTypeText = (type: string) => {
    switch (type) {
      case 'visa': return 'Visa';
      case 'mastercard': return 'Mastercard';
      case 'amex': return 'American Express';
      case 'discover': return 'Discover';
      default: return type;
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

  const filteredData = krediKartiBagislar.filter(bagis => {
    const matchesSearch = `${bagis.bagisciAd} ${bagis.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.bagisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.telefon.includes(searchTerm) ||
                         (bagis.email && bagis.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         bagis.kartSonDort.includes(searchTerm) ||
                         (bagis.islemNo && bagis.islemNo.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || bagis.odemeDurumu === statusFilter;
    const matchesCardType = cardTypeFilter === 'all' || bagis.kartTuru === cardTypeFilter;
    const matchesCategory = categoryFilter === 'all' || bagis.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || bagis.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesCardType && matchesCategory && matchesCurrency;
  });

  const totalAmount = krediKartiBagislar.filter(b => b.odemeDurumu === 'basarili').reduce((sum, bagis) => sum + bagis.tutar, 0);
  const totalDonations = krediKartiBagislar.length;
  const successfulDonations = krediKartiBagislar.filter(b => b.odemeDurumu === 'basarili').length;
  const pendingDonations = krediKartiBagislar.filter(b => b.odemeDurumu === 'beklemede').length;
  const failedDonations = krediKartiBagislar.filter(b => b.odemeDurumu === 'basarisiz').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getInstallmentText = (taksit: number) => {
    if (taksit === 1) return 'Tek Çekim';
    return `${taksit} Taksit`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kredi Kartı Bağışları</h1>
          <p className="text-gray-600">Kredi kartı ile yapılan bağışların listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Kredi Kartı Bağış
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Kredi Kartı</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Başarılı İşlem</p>
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
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Başarısız</p>
                <p className="text-xl font-bold">{failedDonations}</p>
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
                  placeholder="Bağış no, ad soyad, kart son 4 hane ara..."
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
            
            <Select value={cardTypeFilter} onValueChange={setCardTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Kart Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kartlar</SelectItem>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
                <SelectItem value="discover">Discover</SelectItem>
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
          <CardTitle>Kredi Kartı Bağış Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Bağış No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Kart Bilgileri</th>
                  <th className="text-left p-3 font-medium">Taksit</th>
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
                      {bagis.komisyonOrani && (
                        <div className="text-xs text-gray-500">
                          Komisyon: %{bagis.komisyonOrani}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Badge className={getCardTypeColor(bagis.kartTuru)}>
                          {getCardTypeText(bagis.kartTuru)}
                        </Badge>
                        <div className="text-sm">
                          **** {bagis.kartSonDort}
                        </div>
                      </div>
                      {bagis.bankaAdi && (
                        <div className="text-xs text-gray-500">{bagis.bankaAdi}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">
                        {getInstallmentText(bagis.taksitSayisi)}
                      </Badge>
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