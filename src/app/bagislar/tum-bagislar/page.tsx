'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  DollarSign,
  CreditCard,
  Receipt,
  Package,
  Repeat,
  Filter
} from 'lucide-react';

interface Bagis {
  id: number;
  bagisNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  tutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  bagisTuru: 'nakit' | 'cek' | 'kredi_karti' | 'online' | 'ayni' | 'tekrarli';
  durum: 'tamamlandi' | 'beklemede' | 'iptal' | 'iade';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  bagisTarihi: string;
  aciklama?: string;
  fişNo?: string;
}

export default function TumBagislarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [bagislar] = useState<Bagis[]>([
    {
      id: 1,
      bagisNo: 'BAG-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      tutar: 5000,
      paraBirimi: 'TRY',
      bagisTuru: 'nakit',
      durum: 'tamamlandi',
      kategori: 'genel',
      bagisTarihi: '2024-01-15',
      aciklama: 'Genel bağış',
      fişNo: 'FIS-2024-001'
    },
    {
      id: 2,
      bagisNo: 'BAG-2024-002',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      tutar: 2500,
      paraBirimi: 'TRY',
      bagisTuru: 'kredi_karti',
      durum: 'tamamlandi',
      kategori: 'egitim',
      bagisTarihi: '2024-01-14',
      aciklama: 'Eğitim fonu bağışı',
      fişNo: 'FIS-2024-002'
    },
    {
      id: 3,
      bagisNo: 'BAG-2024-003',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 0,
      paraBirimi: 'TRY',
      bagisTuru: 'ayni',
      durum: 'tamamlandi',
      kategori: 'genel',
      bagisTarihi: '2024-01-13',
      aciklama: 'Gıda kolisi - 50 adet'
    },
    {
      id: 4,
      bagisNo: 'BAG-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      tutar: 1000,
      paraBirimi: 'TRY',
      bagisTuru: 'tekrarli',
      durum: 'tamamlandi',
      kategori: 'genel',
      bagisTarihi: '2024-01-12',
      aciklama: 'Aylık otomatik bağış',
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nakit': return 'bg-blue-100 text-blue-800';
      case 'cek': return 'bg-purple-100 text-purple-800';
      case 'kredi_karti': return 'bg-indigo-100 text-indigo-800';
      case 'online': return 'bg-green-100 text-green-800';
      case 'ayni': return 'bg-orange-100 text-orange-800';
      case 'tekrarli': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'nakit': return 'Nakit';
      case 'cek': return 'Çek/Senet';
      case 'kredi_karti': return 'Kredi Kartı';
      case 'online': return 'Online';
      case 'ayni': return 'Ayni';
      case 'tekrarli': return 'Tekrarlı';
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

  const filteredData = bagislar.filter(bagis => {
    const matchesSearch = `${bagis.bagisciAd} ${bagis.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.bagisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.telefon.includes(searchTerm) ||
                         (bagis.email && bagis.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || bagis.durum === statusFilter;
    const matchesType = typeFilter === 'all' || bagis.bagisTuru === typeFilter;
    const matchesCategory = categoryFilter === 'all' || bagis.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || bagis.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesCurrency;
  });

  const totalAmount = bagislar.filter(b => b.durum === 'tamamlandi' && b.bagisTuru !== 'ayni').reduce((sum, bagis) => sum + bagis.tutar, 0);
  const totalDonations = bagislar.length;
  const completedDonations = bagislar.filter(b => b.durum === 'tamamlandi').length;
  const pendingDonations = bagislar.filter(b => b.durum === 'beklemede').length;

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
          <h1 className="text-2xl font-bold text-gray-900">Tüm Bağışlar</h1>
          <p className="text-gray-600">Tüm bağışların listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Bağış
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Bağış</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Bağış</p>
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
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Bağış Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="nakit">Nakit</SelectItem>
                <SelectItem value="cek">Çek/Senet</SelectItem>
                <SelectItem value="kredi_karti">Kredi Kartı</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="ayni">Ayni</SelectItem>
                <SelectItem value="tekrarli">Tekrarlı</SelectItem>
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
          <CardTitle>Bağış Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Bağış No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Bağış Türü</th>
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
                      {bagis.bagisTuru === 'ayni' ? (
                        <div className="text-sm text-gray-600">Ayni Bağış</div>
                      ) : (
                        <div className="font-medium text-green-600">
                          {formatCurrency(bagis.tutar, bagis.paraBirimi)}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge className={getTypeColor(bagis.bagisTuru)}>
                        {getTypeText(bagis.bagisTuru)}
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