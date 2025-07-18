'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  Truck,
  Scale
} from 'lucide-react';

interface AyniBagis {
  id: number;
  bagisNo: string;
  bagisciAd: string;
  bagisciSoyad: string;
  telefon: string;
  email?: string;
  urunAdi: string;
  urunKategorisi: 'gida' | 'giysi' | 'esya' | 'elektronik' | 'kitap' | 'diger';
  miktar: number;
  birim: string;
  tahminiDeger: number;
  paraBirimi: 'TRY' | 'USD' | 'EUR';
  durum: 'kabul_edildi' | 'beklemede' | 'reddedildi' | 'teslim_edildi' | 'iptal';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  bagisTarihi: string;
  aciklama?: string;
  fişNo?: string;
  teslimatAdresi?: string;
  teslimatTarihi?: string;
  durumKontrolu?: string;
  fotografUrl?: string;
}

export default function AyniBagislarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');

  const [ayniBagislar] = useState<AyniBagis[]>([
    {
      id: 1,
      bagisNo: 'AYN-2024-001',
      bagisciAd: 'Ahmet',
      bagisciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      urunAdi: 'Gıda Kolisi',
      urunKategorisi: 'gida',
      miktar: 50,
      birim: 'adet',
      tahminiDeger: 5000,
      paraBirimi: 'TRY',
      durum: 'kabul_edildi',
      kategori: 'genel',
      bagisTarihi: '2024-01-15',
      aciklama: '50 adet gıda kolisi bağışı',
      fişNo: 'FIS-2024-001',
      teslimatAdresi: 'Merkez Ofis, İstanbul',
      teslimatTarihi: '2024-01-16',
      durumKontrolu: 'Kontrol edildi',
      fotografUrl: '/images/gida-kolisi.jpg'
    },
    {
      id: 2,
      bagisNo: 'AYN-2024-002',
      bagisciAd: 'Fatma',
      bagisciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      urunAdi: 'Kışlık Mont',
      urunKategorisi: 'giysi',
      miktar: 25,
      birim: 'adet',
      tahminiDeger: 7500,
      paraBirimi: 'TRY',
      durum: 'beklemede',
      kategori: 'acil',
      bagisTarihi: '2024-01-14',
      aciklama: '25 adet kışlık mont bağışı',
      teslimatAdresi: 'Depo, Ankara'
    },
    {
      id: 3,
      bagisNo: 'AYN-2024-003',
      bagisciAd: 'Mehmet',
      bagisciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      urunAdi: 'Laptop',
      urunKategorisi: 'elektronik',
      miktar: 5,
      birim: 'adet',
      tahminiDeger: 25000,
      paraBirimi: 'TRY',
      durum: 'kabul_edildi',
      kategori: 'egitim',
      bagisTarihi: '2024-01-13',
      aciklama: '5 adet laptop eğitim için',
      fişNo: 'FIS-2024-003',
      teslimatAdresi: 'Eğitim Merkezi, İzmir',
      teslimatTarihi: '2024-01-18',
      durumKontrolu: 'Test edildi',
      fotografUrl: '/images/laptop.jpg'
    },
    {
      id: 4,
      bagisNo: 'AYN-2024-004',
      bagisciAd: 'Ayşe',
      bagisciSoyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      urunAdi: 'Kitap Seti',
      urunKategorisi: 'kitap',
      miktar: 100,
      birim: 'adet',
      tahminiDeger: 3000,
      paraBirimi: 'TRY',
      durum: 'teslim_edildi',
      kategori: 'egitim',
      bagisTarihi: '2024-01-12',
      aciklama: '100 adet eğitim kitabı',
      fişNo: 'FIS-2024-004',
      teslimatAdresi: 'Kütüphane, Bursa',
      teslimatTarihi: '2024-01-15',
      durumKontrolu: 'Teslim edildi'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'kabul_edildi': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      case 'teslim_edildi': return 'bg-blue-100 text-blue-800';
      case 'iptal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'kabul_edildi': return 'Kabul Edildi';
      case 'beklemede': return 'Beklemede';
      case 'reddedildi': return 'Reddedildi';
      case 'teslim_edildi': return 'Teslim Edildi';
      case 'iptal': return 'İptal';
      default: return 'Bilinmiyor';
    }
  };

  const getProductCategoryColor = (category: string) => {
    switch (category) {
      case 'gida': return 'bg-green-100 text-green-800';
      case 'giysi': return 'bg-blue-100 text-blue-800';
      case 'esya': return 'bg-purple-100 text-purple-800';
      case 'elektronik': return 'bg-indigo-100 text-indigo-800';
      case 'kitap': return 'bg-orange-100 text-orange-800';
      case 'diger': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductCategoryText = (category: string) => {
    switch (category) {
      case 'gida': return 'Gıda';
      case 'giysi': return 'Giysi';
      case 'esya': return 'Eşya';
      case 'elektronik': return 'Elektronik';
      case 'kitap': return 'Kitap';
      case 'diger': return 'Diğer';
      default: return category;
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

  const filteredData = ayniBagislar.filter(bagis => {
    const matchesSearch = `${bagis.bagisciAd} ${bagis.bagisciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.bagisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bagis.telefon.includes(searchTerm) ||
                         (bagis.email && bagis.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         bagis.urunAdi.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bagis.durum === statusFilter;
    const matchesProductCategory = productCategoryFilter === 'all' || bagis.urunKategorisi === productCategoryFilter;
    const matchesCategory = categoryFilter === 'all' || bagis.kategori === categoryFilter;
    const matchesCurrency = currencyFilter === 'all' || bagis.paraBirimi === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesProductCategory && matchesCategory && matchesCurrency;
  });

  const totalValue = ayniBagislar.filter(b => b.durum === 'kabul_edildi' || b.durum === 'teslim_edildi').reduce((sum, bagis) => sum + bagis.tahminiDeger, 0);
  const totalDonations = ayniBagislar.length;
  const acceptedDonations = ayniBagislar.filter(b => b.durum === 'kabul_edildi').length;
  const deliveredDonations = ayniBagislar.filter(b => b.durum === 'teslim_edildi').length;
  const pendingDonations = ayniBagislar.filter(b => b.durum === 'beklemede').length;

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
          <h1 className="text-2xl font-bold text-gray-900">Ayni Bağışlar</h1>
          <p className="text-gray-600">Eşya, gıda, giysi bağışlarının listesi ve detayları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ayni Bağış
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-blue-600" />
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
              <Package className="w-5 h-5 text-green-600" />
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
                <p className="text-sm text-gray-600">Kabul Edilen</p>
                <p className="text-xl font-bold">{acceptedDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Teslim Edilen</p>
                <p className="text-xl font-bold">{deliveredDonations}</p>
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
                  placeholder="Bağış no, ad soyad, ürün adı ara..."
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
                <SelectItem value="kabul_edildi">Kabul Edildi</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="reddedildi">Reddedildi</SelectItem>
                <SelectItem value="teslim_edildi">Teslim Edildi</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={productCategoryFilter} onValueChange={setProductCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Ürün Kategorisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="gida">Gıda</SelectItem>
                <SelectItem value="giysi">Giysi</SelectItem>
                <SelectItem value="esya">Eşya</SelectItem>
                <SelectItem value="elektronik">Elektronik</SelectItem>
                <SelectItem value="kitap">Kitap</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Bağış Kategorisi" />
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
          <CardTitle>Ayni Bağış Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Bağış No</th>
                  <th className="text-left p-3 font-medium">Bağışçı</th>
                  <th className="text-left p-3 font-medium">Ürün</th>
                  <th className="text-left p-3 font-medium">Miktar</th>
                  <th className="text-left p-3 font-medium">Tahmini Değer</th>
                  <th className="text-left p-3 font-medium">Ürün Kategorisi</th>
                  <th className="text-left p-3 font-medium">Bağış Kategorisi</th>
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
                      <div className="font-medium">{bagis.urunAdi}</div>
                      {bagis.aciklama && (
                        <div className="text-xs text-gray-500">{bagis.aciklama}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">
                        {bagis.miktar} {bagis.birim}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-green-600">
                        {formatCurrency(bagis.tahminiDeger, bagis.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getProductCategoryColor(bagis.urunKategorisi)}>
                        {getProductCategoryText(bagis.urunKategorisi)}
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
                      {bagis.teslimatTarihi && (
                        <div className="text-xs text-gray-500 mt-1">
                          Teslim: {bagis.teslimatTarihi}
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