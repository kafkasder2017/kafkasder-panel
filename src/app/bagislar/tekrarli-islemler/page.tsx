'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Repeat, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  CreditCard,
  Clock
} from 'lucide-react';

interface TekrarliIslem {
  id: number;
  islemNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  tutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  odemeYontemi: 'kredi_karti' | 'banka_karti' | 'havale' | 'eft' | 'cek' | 'senet';
  frekans: 'gunluk' | 'haftalik' | 'aylik' | 'yillik';
  baslangicTarihi: string;
  bitisTarihi?: string;
  sonOdemeTarihi: string;
  sonrakiOdemeTarihi: string;
  toplamOdemeSayisi: number;
  tamamlananOdemeSayisi: number;
  durum: 'aktif' | 'pasif' | 'tamamlandi' | 'iptal' | 'basarisiz';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  aciklama?: string;
  kartSonDort?: string;
  bankaAdi?: string;
  hesapNo?: string;
  iban?: string;
}

export default function TekrarliIslemlerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [tekrarliIslemler] = useState<TekrarliIslem[]>([
    {
      id: 1,
      islemNo: 'TEK-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      tutar: 1000,
      paraBirimi: 'TRY',
      odemeYontemi: 'kredi_karti',
      frekans: 'aylik',
      baslangicTarihi: '2024-01-01',
      sonOdemeTarihi: '2024-01-01',
      sonrakiOdemeTarihi: '2024-02-01',
      toplamOdemeSayisi: 12,
      tamamlananOdemeSayisi: 1,
      durum: 'aktif',
      kategori: 'genel',
      aciklama: 'Aylık düzenli bağış',
      kartSonDort: '1234',
      bankaAdi: 'Garanti BBVA'
    },
    {
      id: 2,
      islemNo: 'TEK-2024-002',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      tutar: 500,
      paraBirimi: 'TRY',
      odemeYontemi: 'havale',
      frekans: 'haftalik',
      baslangicTarihi: '2024-01-01',
      sonOdemeTarihi: '2024-01-08',
      sonrakiOdemeTarihi: '2024-01-15',
      toplamOdemeSayisi: 52,
      tamamlananOdemeSayisi: 2,
      durum: 'aktif',
      kategori: 'egitim',
      aciklama: 'Haftalık eğitim bağışı',
      bankaAdi: 'İş Bankası',
      hesapNo: '12345678',
      iban: 'TR12 0001 2000 1234 5678 9012 34'
    },
    {
      id: 3,
      islemNo: 'TEK-2024-003',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 2500,
      paraBirimi: 'TRY',
      odemeYontemi: 'cek',
      frekans: 'aylik',
      baslangicTarihi: '2024-01-01',
      sonOdemeTarihi: '2024-01-01',
      sonrakiOdemeTarihi: '2024-02-01',
      toplamOdemeSayisi: 6,
      tamamlananOdemeSayisi: 1,
      durum: 'aktif',
      kategori: 'saglik',
      aciklama: 'Aylık sağlık fonu çek bağışı',
      bankaAdi: 'Yapı Kredi'
    },
    {
      id: 4,
      islemNo: 'TEK-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      tutar: 100,
      paraBirimi: 'USD',
      odemeYontemi: 'kredi_karti',
      frekans: 'gunluk',
      baslangicTarihi: '2024-01-01',
      sonOdemeTarihi: '2024-01-15',
      sonrakiOdemeTarihi: '2024-01-16',
      toplamOdemeSayisi: 365,
      tamamlananOdemeSayisi: 15,
      durum: 'aktif',
      kategori: 'acil',
      aciklama: 'Günlük acil yardım bağışı',
      kartSonDort: '5678',
      bankaAdi: 'Ziraat Bankası'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'tamamlandi': return 'bg-blue-100 text-blue-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'basarisiz': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'tamamlandi': return 'Tamamlandı';
      case 'iptal': return 'İptal';
      case 'basarisiz': return 'Başarısız';
      default: return 'Bilinmiyor';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'gunluk': return 'bg-purple-100 text-purple-800';
      case 'haftalik': return 'bg-blue-100 text-blue-800';
      case 'aylik': return 'bg-green-100 text-green-800';
      case 'yillik': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'gunluk': return 'Günlük';
      case 'haftalik': return 'Haftalık';
      case 'aylik': return 'Aylık';
      case 'yillik': return 'Yıllık';
      default: return frequency;
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'kredi_karti': return 'bg-blue-100 text-blue-800';
      case 'banka_karti': return 'bg-green-100 text-green-800';
      case 'havale': return 'bg-purple-100 text-purple-800';
      case 'eft': return 'bg-orange-100 text-orange-800';
      case 'cek': return 'bg-indigo-100 text-indigo-800';
      case 'senet': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'kredi_karti': return 'Kredi Kartı';
      case 'banka_karti': return 'Banka Kartı';
      case 'havale': return 'Havale';
      case 'eft': return 'EFT';
      case 'cek': return 'Çek';
      case 'senet': return 'Senet';
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

  const filteredData = tekrarliIslemler.filter(islem => {
    const matchesSearch = `${islem.bagisciAd} ${islem.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         islem.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         islem.telefon.includes(searchTerm) ||
                         (islem.email && islem.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || islem.durum === statusFilter;
    const matchesFrequency = frequencyFilter === 'all' || islem.frekans === frequencyFilter;
    const matchesCategory = categoryFilter === 'all' || islem.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || islem.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesFrequency && matchesCategory && matchesCurrency;
  });

  const totalAmount = tekrarliIslemler.filter(i => i.durum === 'aktif').reduce((sum, islem) => sum + islem.tutar, 0);
  const totalTransactions = tekrarliIslemler.length;
  const activeTransactions = tekrarliIslemler.filter(i => i.durum === 'aktif').length;
  const completedTransactions = tekrarliIslemler.filter(i => i.durum === 'tamamlandi').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getDaysUntilNextPayment = (nextPaymentDate: string) => {
    const today = new Date();
    const nextPayment = new Date(nextPaymentDate);
    const diffTime = nextPayment.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tekrarlı İşlemler</h1>
          <p className="text-gray-600">Düzenli ve tekrarlı bağış işlemlerinin listesi</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Tekrarlı İşlem
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Repeat className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Aktif İşlem Tutarı</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam İşlem</p>
                <p className="text-xl font-bold">{totalTransactions}</p>
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
                <p className="text-xl font-bold">{activeTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-xl font-bold">{completedTransactions}</p>
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
                  placeholder="İşlem no, ad soyad ara..."
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
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="basarisiz">Başarısız</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Frekans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Frekanslar</SelectItem>
                <SelectItem value="gunluk">Günlük</SelectItem>
                <SelectItem value="haftalik">Haftalık</SelectItem>
                <SelectItem value="aylik">Aylık</SelectItem>
                <SelectItem value="yillik">Yıllık</SelectItem>
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
          <CardTitle>Tekrarlı İşlem Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Frekans</th>
                  <th className="text-left p-3 font-medium">Ödeme Yöntemi</th>
                  <th className="text-left p-3 font-medium">İlerleme</th>
                  <th className="text-left p-3 font-medium">Sonraki Ödeme</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((islem) => {
                  const daysUntilNext = getDaysUntilNextPayment(islem.sonrakiOdemeTarihi);
                  const progressPercentage = getProgressPercentage(islem.tamamlananOdemeSayisi, islem.toplamOdemeSayisi);
                  const isDueSoon = daysUntilNext <= 3 && daysUntilNext >= 0;
                  const isOverdue = daysUntilNext < 0;
                  
                  return (
                    <tr key={islem.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-blue-600">{islem.islemNo}</div>
                        <div className="text-xs text-gray-500">
                          {islem.tamamlananOdemeSayisi}/{islem.toplamOdemeSayisi} ödeme
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{islem.bagisciAd} {islem.bagisciSoyad}</div>
                            <div className="text-sm text-gray-500">{islem.telefon}</div>
                            {islem.email && (
                              <div className="text-xs text-gray-400">{islem.email}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-green-600">
                          {formatCurrency(islem.tutar, islem.paraBirimi)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {islem.frekans === 'gunluk' ? 'günlük' : 
                           islem.frekans === 'haftalik' ? 'haftalık' : 
                           islem.frekans === 'aylik' ? 'aylık' : 'yıllık'}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getFrequencyColor(islem.frekans)}>
                          {getFrequencyText(islem.frekans)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getPaymentMethodColor(islem.odemeYontemi)}>
                            {getPaymentMethodText(islem.odemeYontemi)}
                          </Badge>
                          {islem.kartSonDort && (
                            <div className="text-xs text-gray-500">
                              **** {islem.kartSonDort}
                            </div>
                          )}
                        </div>
                        {islem.bankaAdi && (
                          <div className="text-xs text-gray-500">{islem.bankaAdi}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          %{progressPercentage} tamamlandı
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          <div>
                            <div>{islem.sonrakiOdemeTarihi}</div>
                            {isOverdue && (
                              <div className="text-xs text-red-600 font-medium">
                                {Math.abs(daysUntilNext)} gün gecikmiş
                              </div>
                            )}
                            {isDueSoon && (
                              <div className="text-xs text-orange-600 font-medium">
                                {daysUntilNext} gün kaldı
                              </div>
                            )}
                            {!isOverdue && !isDueSoon && daysUntilNext > 3 && (
                              <div className="text-xs text-gray-500">
                                {daysUntilNext} gün kaldı
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getCategoryColor(islem.kategori)}>
                          {getCategoryText(islem.kategori)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(islem.durum)}>
                          {getStatusText(islem.durum)}
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
                          <Button size="sm" variant="outline" className="text-blue-600">
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