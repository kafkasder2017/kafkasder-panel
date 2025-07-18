'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Receipt, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  Building,
  Clock
} from 'lucide-react';

interface CekSenetBagis {
  id: number;
  bagisNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  tutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  cekSenetTuru: 'cek' | 'senet' | 'bono';
  cekNo?: string;
  senetNo?: string;
  bankaAdi: string;
  subeAdi?: string;
  vadeTarihi: string;
  durum: 'tamamlandi' | 'beklemede' | 'vadesi_geldi' | 'iptal' | 'iade';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  bagisTarihi: string;
  aciklama?: string;
  fişNo?: string;
  tahsilatTarihi?: string;
}

export default function CekSenetBagislarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [cekSenetBagislar] = useState<CekSenetBagis[]>([
    {
      id: 1,
      bagisNo: 'CEK-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      tutar: 10000,
      paraBirimi: 'TRY',
      cekSenetTuru: 'cek',
      cekNo: '12345678',
      bankaAdi: 'Ziraat Bankası',
      subeAdi: 'Merkez Şubesi',
      vadeTarihi: '2024-02-15',
      durum: 'beklemede',
      kategori: 'genel',
      bagisTarihi: '2024-01-15',
      aciklama: 'Çek ile bağış - vade: 30 gün'
    },
    {
      id: 2,
      bagisNo: 'SEN-2024-001',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      tutar: 5000,
      paraBirimi: 'TRY',
      cekSenetTuru: 'senet',
      senetNo: 'SEN001',
      bankaAdi: 'İş Bankası',
      vadeTarihi: '2024-03-01',
      durum: 'beklemede',
      kategori: 'egitim',
      bagisTarihi: '2024-01-14',
      aciklama: 'Senet ile eğitim bağışı'
    },
    {
      id: 3,
      bagisNo: 'CEK-2024-002',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 7500,
      paraBirimi: 'TRY',
      cekSenetTuru: 'cek',
      cekNo: '87654321',
      bankaAdi: 'Garanti BBVA',
      subeAdi: 'Kadıköy Şubesi',
      vadeTarihi: '2024-01-20',
      durum: 'vadesi_geldi',
      kategori: 'saglik',
      bagisTarihi: '2024-01-10',
      aciklama: 'Sağlık fonu çek bağışı'
    },
    {
      id: 4,
      bagisNo: 'BON-2024-001',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      tutar: 15000,
      paraBirimi: 'TRY',
      cekSenetTuru: 'bono',
      bankaAdi: 'Yapı Kredi',
      vadeTarihi: '2024-04-15',
      durum: 'beklemede',
      kategori: 'acil',
      bagisTarihi: '2024-01-12',
      aciklama: 'Acil yardım bono bağışı'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'vadesi_geldi': return 'bg-orange-100 text-orange-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'iade': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'beklemede': return 'Beklemede';
      case 'vadesi_geldi': return 'Vadesi Geldi';
      case 'iptal': return 'İptal';
      case 'iade': return 'İade';
      default: return 'Bilinmiyor';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cek': return 'bg-blue-100 text-blue-800';
      case 'senet': return 'bg-purple-100 text-purple-800';
      case 'bono': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'cek': return 'Çek';
      case 'senet': return 'Senet';
      case 'bono': return 'Bono';
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

  const filteredData = cekSenetBagislar.filter(bagis => {
    const matchesSearch = `${bagis.bagisciAd} ${bagis.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.bagisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.telefon.includes(searchTerm) ||
                         (bagis.email && bagis.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (bagis.cekNo && bagis.cekNo.includes(searchTerm)) ||
                         (bagis.senetNo && bagis.senetNo.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || bagis.durum === statusFilter;
    const matchesType = typeFilter === 'all' || bagis.cekSenetTuru === typeFilter;
    const matchesCategory = categoryFilter === 'all' || bagis.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || bagis.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesCurrency;
  });

  const totalAmount = cekSenetBagislar.filter(b => b.durum === 'tamamlandi').reduce((sum, bagis) => sum + bagis.tutar, 0);
  const totalDonations = cekSenetBagislar.length;
  const completedDonations = cekSenetBagislar.filter(b => b.durum === 'tamamlandi').length;
  const pendingDonations = cekSenetBagislar.filter(b => b.durum === 'beklemede').length;
  const dueDonations = cekSenetBagislar.filter(b => b.durum === 'vadesi_geldi').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getDaysUntilDue = (vadeTarihi: string) => {
    const today = new Date();
    const dueDate = new Date(vadeTarihi);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Çek/Senet Bağışlar</h1>
          <p className="text-gray-600">Çek ve senet bağışlarının listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Çek/Senet Bağış
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Çek/Senet</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-green-600" />
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
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Vadesi Gelen</p>
                <p className="text-xl font-bold">{dueDonations}</p>
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
                  placeholder="Bağış no, ad soyad, çek/senet no ara..."
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
                <SelectItem value="vadesi_geldi">Vadesi Geldi</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="iade">İade</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Tür" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="cek">Çek</SelectItem>
                <SelectItem value="senet">Senet</SelectItem>
                <SelectItem value="bono">Bono</SelectItem>
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
          <CardTitle>Çek/Senet Bağış Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Bağış No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Tür</th>
                  <th className="text-left p-3 font-medium">Banka</th>
                  <th className="text-left p-3 font-medium">Vade Tarihi</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((bagis) => {
                  const daysUntilDue = getDaysUntilDue(bagis.vadeTarihi);
                  const isOverdue = daysUntilDue < 0;
                  const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;
                  
                  return (
                    <tr key={bagis.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-blue-600">{bagis.bagisNo}</div>
                        {bagis.cekNo && (
                          <div className="text-xs text-gray-500">Çek: {bagis.cekNo}</div>
                        )}
                        {bagis.senetNo && (
                          <div className="text-xs text-gray-500">Senet: {bagis.senetNo}</div>
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
                        <Badge className={getTypeColor(bagis.cekSenetTuru)}>
                          {getTypeText(bagis.cekSenetTuru)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{bagis.bankaAdi}</div>
                          {bagis.subeAdi && (
                            <div className="text-xs text-gray-500">{bagis.subeAdi}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          <div>
                            <div>{bagis.vadeTarihi}</div>
                            {isOverdue && (
                              <div className="text-xs text-red-600 font-medium">
                                {Math.abs(daysUntilDue)} gün gecikmiş
                              </div>
                            )}
                            {isDueSoon && (
                              <div className="text-xs text-orange-600 font-medium">
                                {daysUntilDue} gün kaldı
                              </div>
                            )}
                            {!isOverdue && !isDueSoon && daysUntilDue > 7 && (
                              <div className="text-xs text-gray-500">
                                {daysUntilDue} gün kaldı
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getCategoryColor(bagis.kategori)}>
                          {getCategoryText(bagis.kategori)}
                        </Badge>
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