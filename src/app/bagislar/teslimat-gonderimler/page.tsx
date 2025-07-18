'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Truck, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  MapPin,
  Package
} from 'lucide-react';

interface TeslimatGonderim {
  id: number;
  teslimatNo: string;
  bagisNo?: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  teslimatTuru: 'ayni_bagis' | 'yardim_paketi' | 'kumbara_bosaltma' | 'dokuman' | 'diger';
  icerik: string;
  miktar: number;
  birim: string;
  tahminiDeger: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  durum: 'hazirlaniyor' | 'yolda' | 'teslim_edildi' | 'iptal' | 'kayip';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  gonderimTarihi: string;
  tahminiTeslimatTarihi: string;
  gercekTeslimatTarihi?: string;
  gondericiAdres: string;
  aliciAdres: string;
  aliciAd: string;
  aliciTelefon: string;
  kargoFirmasi?: string;
  takipNo?: string;
  aciklama?: string;
  fotografUrl?: string;
}

export default function TeslimatGonderimlerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [teslimatGonderimler] = useState<TeslimatGonderim[]>([
    {
      id: 1,
      teslimatNo: 'TES-2024-001',
      bagisNo: 'AYN-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      teslimatTuru: 'ayni_bagis',
      icerik: 'Gıda Kolisi',
      miktar: 50,
      birim: 'adet',
      tahminiDeger: 5000,
      paraBirimi: 'TRY',
      durum: 'teslim_edildi',
      kategori: 'genel',
      gonderimTarihi: '2024-01-15',
      tahminiTeslimatTarihi: '2024-01-16',
      gercekTeslimatTarihi: '2024-01-16',
      gondericiAdres: 'Merkez Ofis, İstanbul',
      aliciAdres: 'Yardım Merkezi, Ankara',
      aliciAd: 'Fatma Demir',
      aliciTelefon: '0533 234 56 78',
      kargoFirmasi: 'MNG Kargo',
      takipNo: 'MNG123456789',
      aciklama: '50 adet gıda kolisi teslimatı'
    },
    {
      id: 2,
      teslimatNo: 'TES-2024-002',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      teslimatTuru: 'kumbara_bosaltma',
      icerik: 'Kumbara İçeriği',
      miktar: 1,
      birim: 'adet',
      tahminiDeger: 2500,
      paraBirimi: 'TRY',
      durum: 'yolda',
      kategori: 'genel',
      gonderimTarihi: '2024-01-14',
      tahminiTeslimatTarihi: '2024-01-17',
      gondericiAdres: 'Merkez Camii, İstanbul',
      aliciAdres: 'Merkez Ofis, İstanbul',
      aliciAd: 'Ayşe Özkan',
      aliciTelefon: '0535 456 78 90',
      kargoFirmasi: 'Yurtiçi Kargo',
      takipNo: 'YURT987654321',
      aciklama: 'Merkez camii kumbarası boşaltma'
    },
    {
      id: 3,
      teslimatNo: 'TES-2024-003',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      teslimatTuru: 'yardim_paketi',
      icerik: 'Kışlık Mont',
      miktar: 25,
      birim: 'adet',
      tahminiDeger: 7500,
      paraBirimi: 'TRY',
      durum: 'hazirlaniyor',
      kategori: 'acil',
      gonderimTarihi: '2024-01-13',
      tahminiTeslimatTarihi: '2024-01-18',
      gondericiAdres: 'Depo, Ankara',
      aliciAdres: 'Acil Yardım Merkezi, Van',
      aliciAd: 'Ali Veli',
      aliciTelefon: '0536 567 89 01',
      aciklama: 'Acil yardım paketi - kışlık montlar'
    },
    {
      id: 4,
      teslimatNo: 'TES-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      teslimatTuru: 'dokuman',
      icerik: 'Eğitim Dokümanları',
      miktar: 100,
      birim: 'adet',
      tahminiDeger: 500,
      paraBirimi: 'TRY',
      durum: 'teslim_edildi',
      kategori: 'egitim',
      gonderimTarihi: '2024-01-12',
      tahminiTeslimatTarihi: '2024-01-15',
      gercekTeslimatTarihi: '2024-01-14',
      gondericiAdres: 'Eğitim Merkezi, İzmir',
      aliciAdres: 'Kütüphane, Bursa',
      aliciAd: 'Mehmet Kaya',
      aliciTelefon: '0534 345 67 89',
      kargoFirmasi: 'PTT Kargo',
      takipNo: 'PTT456789123',
      aciklama: 'Eğitim dokümanları teslimatı'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hazirlaniyor': return 'bg-yellow-100 text-yellow-800';
      case 'yolda': return 'bg-blue-100 text-blue-800';
      case 'teslim_edildi': return 'bg-green-100 text-green-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'kayip': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'hazirlaniyor': return 'Hazırlanıyor';
      case 'yolda': return 'Yolda';
      case 'teslim_edildi': return 'Teslim Edildi';
      case 'iptal': return 'İptal';
      case 'kayip': return 'Kayıp';
      default: return 'Bilinmiyor';
    }
  };

  const getDeliveryTypeColor = (type: string) => {
    switch (type) {
      case 'ayni_bagis': return 'bg-blue-100 text-blue-800';
      case 'yardim_paketi': return 'bg-green-100 text-green-800';
      case 'kumbara_bosaltma': return 'bg-purple-100 text-purple-800';
      case 'dokuman': return 'bg-orange-100 text-orange-800';
      case 'diger': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryTypeText = (type: string) => {
    switch (type) {
      case 'ayni_bagis': return 'Ayni Bağış';
      case 'yardim_paketi': return 'Yardım Paketi';
      case 'kumbara_bosaltma': return 'Kumbara Boşaltma';
      case 'dokuman': return 'Doküman';
      case 'diger': return 'Diğer';
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

  const filteredData = teslimatGonderimler.filter(teslimat => {
    const matchesSearch = teslimat.teslimatNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${teslimat.bagisciAd} ${teslimat.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teslimat.telefon.includes(searchTerm) ||
                         (teslimat.email && teslimat.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         teslimat.icerik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (teslimat.takipNo && teslimat.takipNo.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || teslimat.durum === statusFilter;
    const matchesDeliveryType = deliveryTypeFilter === 'all' || teslimat.teslimatTuru === deliveryTypeFilter;
    const matchesCategory = categoryFilter === 'all' || teslimat.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || teslimat.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesDeliveryType && matchesCategory && matchesCurrency;
  });

  const totalValue = teslimatGonderimler.reduce((sum, teslimat) => sum + teslimat.tahminiDeger, 0);
  const totalDeliveries = teslimatGonderimler.length;
  const deliveredCount = teslimatGonderimler.filter(t => t.durum === 'teslim_edildi').length;
  const inTransitCount = teslimatGonderimler.filter(t => t.durum === 'yolda').length;

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getDaysUntilDelivery = (estimatedDate: string) => {
    const today = new Date();
    const estimated = new Date(estimatedDate);
    const diffTime = estimated.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teslimat & Gönderimler</h1>
          <p className="text-gray-600">Teslimat ve gönderim işlemlerinin takibi</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Teslimat
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Değer</p>
                <p className="text-xl font-bold">{formatCurrency(totalValue, 'TRY')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Teslimat</p>
                <p className="text-xl font-bold">{totalDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Teslim Edilen</p>
                <p className="text-xl font-bold">{deliveredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Yolda</p>
                <p className="text-xl font-bold">{inTransitCount}</p>
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
                  placeholder="Teslimat no, ad soyad, içerik ara..."
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
                <SelectItem value="hazirlaniyor">Hazırlanıyor</SelectItem>
                <SelectItem value="yolda">Yolda</SelectItem>
                <SelectItem value="teslim_edildi">Teslim Edildi</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="kayip">Kayıp</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={deliveryTypeFilter} onValueChange={setDeliveryTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Teslimat Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="ayni_bagis">Ayni Bağış</SelectItem>
                <SelectItem value="yardim_paketi">Yardım Paketi</SelectItem>
                <SelectItem value="kumbara_bosaltma">Kumbara Boşaltma</SelectItem>
                <SelectItem value="dokuman">Doküman</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
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
          <CardTitle>Teslimat & Gönderim Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Teslimat No</th>
                  <th className="text-left p-3 font-medium">Gönderici</th>
                  <th className="text-left p-3 font-medium">İçerik</th>
                  <th className="text-left p-3 font-medium">Alıcı</th>
                  <th className="text-left p-3 font-medium">Teslimat Türü</th>
                  <th className="text-left p-3 font-medium">Tahmini Değer</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Gönderim Tarihi</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((teslimat) => {
                  const daysUntilDelivery = getDaysUntilDelivery(teslimat.tahminiTeslimatTarihi);
                  const isOverdue = daysUntilDelivery < 0;
                  const isDueSoon = daysUntilDelivery <= 3 && daysUntilDelivery >= 0;
                  
                  return (
                    <tr key={teslimat.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-blue-600">{teslimat.teslimatNo}</div>
                        {teslimat.bagisNo && (
                          <div className="text-xs text-gray-500">Bağış: {teslimat.bagisNo}</div>
                        )}
                        {teslimat.takipNo && (
                          <div className="text-xs text-green-600">Takip: {teslimat.takipNo}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{teslimat.bagisciAd} {teslimat.bagisciSoyad}</div>
                            <div className="text-sm text-gray-500">{teslimat.telefon}</div>
                            {teslimat.email && (
                              <div className="text-xs text-gray-400">{teslimat.email}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{teslimat.icerik}</div>
                        <div className="text-sm text-gray-500">
                          {teslimat.miktar} {teslimat.birim}
                        </div>
                        {teslimat.aciklama && (
                          <div className="text-xs text-gray-400">{teslimat.aciklama}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{teslimat.aliciAd}</div>
                            <div className="text-sm text-gray-500">{teslimat.aliciTelefon}</div>
                            <div className="text-xs text-gray-400">{teslimat.aliciAdres}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getDeliveryTypeColor(teslimat.teslimatTuru)}>
                          {getDeliveryTypeText(teslimat.teslimatTuru)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-green-600">
                          {formatCurrency(teslimat.tahminiDeger, teslimat.paraBirimi)}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getCategoryColor(teslimat.kategori)}>
                          {getCategoryText(teslimat.kategori)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          <div>
                            <div>{teslimat.gonderimTarihi}</div>
                            {teslimat.gercekTeslimatTarihi && (
                              <div className="text-xs text-green-600">
                                Teslim: {teslimat.gercekTeslimatTarihi}
                              </div>
                            )}
                            {!teslimat.gercekTeslimatTarihi && (
                              <div className="text-xs text-gray-500">
                                Tahmini: {teslimat.tahminiTeslimatTarihi}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(teslimat.durum)}>
                          {getStatusText(teslimat.durum)}
                        </Badge>
                        {!teslimat.gercekTeslimatTarihi && teslimat.durum === 'yolda' && (
                          <div className="text-xs text-gray-500 mt-1">
                            {isOverdue ? (
                              <span className="text-red-600">{Math.abs(daysUntilDelivery)} gün gecikmiş</span>
                            ) : isDueSoon ? (
                              <span className="text-orange-600">{daysUntilDelivery} gün kaldı</span>
                            ) : (
                              <span>{daysUntilDelivery} gün kaldı</span>
                            )}
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