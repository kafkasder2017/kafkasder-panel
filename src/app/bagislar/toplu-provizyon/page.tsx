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
  FileText,
  CheckCircle
} from 'lucide-react';

interface TopluProvizyon {
  id: number;
  islemNo: string;
  dosyaAdi: string;
  dosyaBoyutu: string;
  satirSayisi: number;
  islemTuru: 'kredi_karti' | 'banka_karti' | 'havale' | 'cek' | 'senet';
  durum: 'yukleniyor' | 'isleniyor' | 'tamamlandi' | 'hata' | 'iptal';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  yuklenmeTarihi: string;
  tamamlanmaTarihi?: string;
  toplamTutar: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  basariliIslem: number;
  basarisizIslem: number;
  hataDetayi?: string;
  islemYapan: string;
  aciklama?: string;
  dosyaUrl?: string;
}

export default function TopluProvizyonPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [topluProvizyonlar] = useState<TopluProvizyon[]>([
    {
      id: 1,
      islemNo: 'TP-2024-001',
      dosyaAdi: 'kredi_karti_bagislar_2024_01.xlsx',
      dosyaBoyutu: '2.5 MB',
      satirSayisi: 150,
      islemTuru: 'kredi_karti',
      durum: 'tamamlandi',
      kategori: 'genel',
      yuklenmeTarihi: '2024-01-15',
      tamamlanmaTarihi: '2024-01-15',
      toplamTutar: 75000,
      paraBirimi: 'TRY',
      basariliIslem: 145,
      basarisizIslem: 5,
      islemYapan: 'Ahmet Yılmaz',
      aciklama: 'Ocak ayı kredi kartı bağışları'
    },
    {
      id: 2,
      islemNo: 'TP-2024-002',
      dosyaAdi: 'havale_bagislar_2024_01.csv',
      dosyaBoyutu: '1.8 MB',
      satirSayisi: 89,
      islemTuru: 'havale',
      durum: 'isleniyor',
      kategori: 'egitim',
      yuklenmeTarihi: '2024-01-14',
      toplamTutar: 45000,
      paraBirimi: 'TRY',
      basariliIslem: 67,
      basarisizIslem: 22,
      islemYapan: 'Fatma Demir',
      aciklama: 'Eğitim fonu havale bağışları'
    },
    {
      id: 3,
      islemNo: 'TP-2024-003',
      dosyaAdi: 'cek_bagislar_2024_01.xlsx',
      dosyaBoyutu: '3.2 MB',
      satirSayisi: 75,
      islemTuru: 'cek',
      durum: 'yukleniyor',
      kategori: 'saglik',
      yuklenmeTarihi: '2024-01-13',
      toplamTutar: 125000,
      paraBirimi: 'TRY',
      basariliIslem: 0,
      basarisizIslem: 0,
      islemYapan: 'Mehmet Kaya',
      aciklama: 'Sağlık fonu çek bağışları',
      hataDetayi: 'Dosya yükleniyor...'
    },
    {
      id: 4,
      islemNo: 'TP-2024-004',
      dosyaAdi: 'banka_karti_bagislar_2024_01.csv',
      dosyaBoyutu: '1.5 MB',
      satirSayisi: 120,
      islemTuru: 'banka_karti',
      durum: 'hata',
      kategori: 'acil',
      yuklenmeTarihi: '2024-01-12',
      toplamTutar: 60000,
      paraBirimi: 'TRY',
      basariliIslem: 45,
      basarisizIslem: 75,
      islemYapan: 'Ayşe Özkan',
      aciklama: 'Acil yardım banka kartı bağışları',
      hataDetayi: 'Bazı kart numaraları geçersiz format'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yukleniyor': return 'bg-yellow-100 text-yellow-800';
      case 'isleniyor': return 'bg-blue-100 text-blue-800';
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'hata': return 'bg-red-100 text-red-800';
      case 'iptal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'yukleniyor': return 'Yükleniyor';
      case 'isleniyor': return 'İşleniyor';
      case 'tamamlandi': return 'Tamamlandı';
      case 'hata': return 'Hata';
      case 'iptal': return 'İptal';
      default: return 'Bilinmiyor';
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'kredi_karti': return 'bg-blue-100 text-blue-800';
      case 'banka_karti': return 'bg-green-100 text-green-800';
      case 'havale': return 'bg-purple-100 text-purple-800';
      case 'cek': return 'bg-orange-100 text-orange-800';
      case 'senet': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case 'kredi_karti': return 'Kredi Kartı';
      case 'banka_karti': return 'Banka Kartı';
      case 'havale': return 'Havale';
      case 'cek': return 'Çek';
      case 'senet': return 'Senet';
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

  const filteredData = topluProvizyonlar.filter(provizyon => {
    const matchesSearch = provizyon.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provizyon.dosyaAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provizyon.islemYapan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (provizyon.aciklama && provizyon.aciklama.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || provizyon.durum === statusFilter;
    const matchesTransactionType = transactionTypeFilter === 'all' || provizyon.islemTuru === transactionTypeFilter;
    const matchesCategory = categoryFilter === 'all' || provizyon.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || provizyon.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesTransactionType && matchesCategory && matchesCurrency;
  });

  const totalAmount = topluProvizyonlar.filter(p => p.durum === 'tamamlandi').reduce((sum, provizyon) => sum + provizyon.toplamTutar, 0);
  const totalTransactions = topluProvizyonlar.length;
  const completedTransactions = topluProvizyonlar.filter(p => p.durum === 'tamamlandi').length;
  const processingTransactions = topluProvizyonlar.filter(p => p.durum === 'isleniyor' || p.durum === 'yukleniyor').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getSuccessRate = (successful: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((successful / total) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Toplu Provizyon Alma</h1>
          <p className="text-gray-600">Toplu bağış işlemlerinin yönetimi</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Toplu İşlem
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam İşlem Tutarı</p>
                <p className="text-xl font-bold">{formatCurrency(totalAmount, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-600" />
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
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-xl font-bold">{completedTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">İşleniyor</p>
                <p className="text-xl font-bold">{processingTransactions}</p>
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
                  placeholder="İşlem no, dosya adı, işlem yapan ara..."
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
                <SelectItem value="yukleniyor">Yükleniyor</SelectItem>
                <SelectItem value="isleniyor">İşleniyor</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="hata">Hata</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="İşlem Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="kredi_karti">Kredi Kartı</SelectItem>
                <SelectItem value="banka_karti">Banka Kartı</SelectItem>
                <SelectItem value="havale">Havale</SelectItem>
                <SelectItem value="cek">Çek</SelectItem>
                <SelectItem value="senet">Senet</SelectItem>
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
          <CardTitle>Toplu Provizyon Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Dosya Bilgileri</th>
                  <th className="text-left p-3 font-medium">İşlem Türü</th>
                  <th className="text-left p-3 font-medium">Toplam Tutar</th>
                  <th className="text-left p-3 font-medium">Başarı Oranı</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">İşlem Yapan</th>
                  <th className="text-left p-3 font-medium">Yükleme Tarihi</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((provizyon) => {
                  const successRate = getSuccessRate(provizyon.basariliIslem, provizyon.basariliIslem + provizyon.basarisizIslem);
                  
                  return (
                    <tr key={provizyon.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-blue-600">{provizyon.islemNo}</div>
                        {provizyon.aciklama && (
                          <div className="text-xs text-gray-500">{provizyon.aciklama}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{provizyon.dosyaAdi}</div>
                        <div className="text-sm text-gray-500">
                          {provizyon.dosyaBoyutu} • {provizyon.satirSayisi} satır
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getTransactionTypeColor(provizyon.islemTuru)}>
                          {getTransactionTypeText(provizyon.islemTuru)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-green-600">
                          {formatCurrency(provizyon.toplamTutar, provizyon.paraBirimi)}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${successRate >= 80 ? 'bg-green-600' : successRate >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                              style={{ width: `${successRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{successRate}%</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {provizyon.basariliIslem}/{provizyon.basariliIslem + provizyon.basarisizIslem} başarılı
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getCategoryColor(provizyon.kategori)}>
                          {getCategoryText(provizyon.kategori)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm">{provizyon.islemYapan}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          <div>
                            <div>{provizyon.yuklenmeTarihi}</div>
                            {provizyon.tamamlanmaTarihi && (
                              <div className="text-xs text-gray-500">
                                Tamamlanma: {provizyon.tamamlanmaTarihi}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(provizyon.durum)}>
                          {getStatusText(provizyon.durum)}
                        </Badge>
                        {provizyon.hataDetayi && (
                          <div className="text-xs text-red-600 mt-1">
                            {provizyon.hataDetayi}
                          </div>
                        )}
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