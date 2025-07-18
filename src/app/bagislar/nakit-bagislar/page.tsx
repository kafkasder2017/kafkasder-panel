'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  Receipt,
  Filter
} from 'lucide-react';

interface NakitBagis {
  id: number;
  bagisNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  tutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  odemeYontemi: 'nakit' | 'banka_havalesi' | 'eft' | 'posta_cek';
  durum: 'tamamlandi' | 'beklemede' | 'iptal' | 'iade';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  bagisTarihi: string;
  aciklama?: string;
  fişNo?: string;
  bankaAdi?: string;
  hesapNo?: string;
}

export default function NakitBagislarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [nakitBagislar] = useState<NakitBagis[]>([
    {
      id: 1,
      bagisNo: 'NAK-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      tutar: 5000,
      paraBirimi: 'TRY',
      odemeYontemi: 'nakit',
      durum: 'tamamlandi',
      kategori: 'genel',
      bagisTarihi: '2024-01-15',
      aciklama: 'Genel bağış',
      fişNo: 'FIS-2024-001'
    },
    {
      id: 2,
      bagisNo: 'NAK-2024-002',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      tutar: 2500,
      paraBirimi: 'TRY',
      odemeYontemi: 'banka_havalesi',
      durum: 'tamamlandi',
      kategori: 'egitim',
      bagisTarihi: '2024-01-14',
      aciklama: 'Eğitim fonu bağışı',
      fişNo: 'FIS-2024-002',
      bankaAdi: 'Ziraat Bankası',
      hesapNo: '1234567890'
    },
    {
      id: 3,
      bagisNo: 'NAK-2024-003',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 1000,
      paraBirimi: 'USD',
      odemeYontemi: 'eft',
      durum: 'beklemede',
      kategori: 'genel',
      bagisTarihi: '2024-01-13',
      aciklama: 'Dolar ile bağış',
      bankaAdi: 'İş Bankası',
      hesapNo: '0987654321'
    },
    {
      id: 4,
      bagisNo: 'NAK-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      tutar: 750,
      paraBirimi: 'EUR',
      odemeYontemi: 'posta_cek',
      durum: 'tamamlandi',
      kategori: 'saglik',
      bagisTarihi: '2024-01-12',
      aciklama: 'Sağlık fonu bağışı',
      fişNo: 'FIS-2024-004'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'iade': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'beklemede': return 'Beklemede';
      case 'iptal': return 'İptal';
      case 'iade': return 'İade';
      default: return 'Bilinmiyor';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'nakit': return 'bg-green-100 text-green-800';
      case 'banka_havalesi': return 'bg-blue-100 text-blue-800';
      case 'eft': return 'bg-purple-100 text-purple-800';
      case 'posta_cek': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'nakit': return 'Nakit';
      case 'banka_havalesi': return 'Banka Havalesi';
      case 'eft': return 'EFT';
      case 'posta_cek': return 'Posta Çeki';
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

  const filteredData = nakitBagislar.filter(bagis => {
    const matchesSearch = `${bagis.bagisciAd} ${bagis.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.bagisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.telefon.includes(searchTerm) ||
                         (bagis.email && bagis.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || bagis.durum === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || bagis.odemeYontemi === paymentMethodFilter;
    const matchesCategory = categoryFilter === 'all' || bagis.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || bagis.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesCategory && matchesCurrency;
  });

  const totalAmount = nakitBagislar.filter(b => b.durum === 'tamamlandi').reduce((sum, bagis) => sum + bagis.tutar, 0);
  const totalDonations = nakitBagislar.length;
  const completedDonations = nakitBagislar.filter(b => b.durum === 'tamamlandi').length;
  const pendingDonations = nakitBagislar.filter(b => b.durum === 'beklemede').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nakit Bağışlar</h1>
          <p className="text-gray-600">Nakit para bağışlarının listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Nakit Bağış
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Nakit Bağış</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-blue-600" />
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
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-xl font-bold">{completedDonations}</p>
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
                  placeholder="Bağış no, ad soyad, telefon veya e-posta ara..."
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
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="iade">İade</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Ödeme Yöntemi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Yöntemler</SelectItem>
                <SelectItem value="nakit">Nakit</SelectItem>
                <SelectItem value="banka_havalesi">Banka Havalesi</SelectItem>
                <SelectItem value="eft">EFT</SelectItem>
                <SelectItem value="posta_cek">Posta Çeki</SelectItem>
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
          <CardTitle>Nakit Bağış Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Bağış No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Ödeme Yöntemi</th>
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
                      {bagis.fişNo && (
                        <div className="text-xs text-gray-500">Fiş: {bagis.fişNo}</div>
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
                      <Badge className={getPaymentMethodColor(bagis.odemeYontemi)}>
                        {getPaymentMethodText(bagis.odemeYontemi)}
                      </Badge>
                      {bagis.bankaAdi && (
                        <div className="text-xs text-gray-500 mt-1">{bagis.bankaAdi}</div>
                      )}
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
                      <Badge className={getStatusColor(bagis.durum)}>
                        {getStatusText(bagis.durum)}
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