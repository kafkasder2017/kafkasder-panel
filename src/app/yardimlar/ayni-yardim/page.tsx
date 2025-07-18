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
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Calendar,
  User,
  Truck,
  Box,
  ShoppingCart
} from 'lucide-react';

interface AyniYardim {
  id: number;
  islemNo: string;
  aliciAd: string;
  aliciSoyad: string;
  telefon: string;
  urunAdi: string;
  miktar: number;
  birim: string;
  kategori: 'gida' | 'giysi' | 'ev_esyalari' | 'saglik' | 'egitim' | 'diger';
  durum: 'beklemede' | 'hazirlaniyor' | 'teslim_edildi' | 'iptal';
  islemTarihi: string;
  teslimTarihi?: string;
  aciklama: string;
  teslimatAdresi: string;
}

export default function AyniYardimPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [ayniYardimlar] = useState<AyniYardim[]>([
    {
      id: 1,
      islemNo: 'AY-2024-001',
      aliciAd: 'Ahmet',
      aliciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      urunAdi: 'Gıda Paketi',
      miktar: 1,
      birim: 'adet',
      kategori: 'gida',
      durum: 'teslim_edildi',
      islemTarihi: '2024-01-15',
      teslimTarihi: '2024-01-16',
      aciklama: 'Acil gıda yardımı',
      teslimatAdresi: 'İstanbul, Kadıköy'
    },
    {
      id: 2,
      islemNo: 'AY-2024-002',
      aliciAd: 'Fatma',
      aliciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      urunAdi: 'Kışlık Mont',
      miktar: 2,
      birim: 'adet',
      kategori: 'giysi',
      durum: 'hazirlaniyor',
      islemTarihi: '2024-01-14',
      aciklama: 'Çocuklar için kışlık mont',
      teslimatAdresi: 'Ankara, Çankaya'
    },
    {
      id: 3,
      islemNo: 'AY-2024-003',
      aliciAd: 'Mehmet',
      aliciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      urunAdi: 'İlaç Paketi',
      miktar: 1,
      birim: 'paket',
      kategori: 'saglik',
      durum: 'beklemede',
      islemTarihi: '2024-01-13',
      aciklama: 'Kronik hastalık ilaçları',
      teslimatAdresi: 'İzmir, Konak'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'hazirlaniyor': return 'bg-blue-100 text-blue-800';
      case 'teslim_edildi': return 'bg-green-100 text-green-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'beklemede': return 'Beklemede';
      case 'hazirlaniyor': return 'Hazırlanıyor';
      case 'teslim_edildi': return 'Teslim Edildi';
      case 'iptal': return 'İptal';
      default: return 'Bilinmiyor';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gida': return 'bg-green-100 text-green-800';
      case 'giysi': return 'bg-blue-100 text-blue-800';
      case 'ev_esyalari': return 'bg-purple-100 text-purple-800';
      case 'saglik': return 'bg-red-100 text-red-800';
      case 'egitim': return 'bg-orange-100 text-orange-800';
      case 'diger': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'gida': return 'Gıda';
      case 'giysi': return 'Giysi';
      case 'ev_esyalari': return 'Ev Eşyaları';
      case 'saglik': return 'Sağlık';
      case 'egitim': return 'Eğitim';
      case 'diger': return 'Diğer';
      default: return category;
    }
  };

  const filteredData = ayniYardimlar.filter(yardim => {
    const matchesSearch = `${yardim.aliciAd} ${yardim.aliciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yardim.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yardim.urunAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yardim.telefon.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || yardim.durum === statusFilter;
    const matchesCategory = categoryFilter === 'all' || yardim.kategori === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalItems = ayniYardimlar.length;
  const deliveredItems = ayniYardimlar.filter(y => y.durum === 'teslim_edildi').length;
  const pendingItems = ayniYardimlar.filter(y => y.durum === 'beklemede').length;
  const preparingItems = ayniYardimlar.filter(y => y.durum === 'hazirlaniyor').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ayni Yardım İşlemleri</h1>
          <p className="text-gray-600">Eşya, gıda, giysi yardımları</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ayni Yardım
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam İşlem</p>
                <p className="text-xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Teslim Edilen</p>
                <p className="text-xl font-bold text-green-600">{deliveredItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Box className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Hazırlanan</p>
                <p className="text-xl font-bold text-blue-600">{preparingItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-xl font-bold text-yellow-600">{pendingItems}</p>
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
                  placeholder="İşlem no, ad soyad, ürün adı veya telefon ara..."
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
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="hazirlaniyor">Hazırlanıyor</SelectItem>
                <SelectItem value="teslim_edildi">Teslim Edildi</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="gida">Gıda</SelectItem>
                <SelectItem value="giysi">Giysi</SelectItem>
                <SelectItem value="ev_esyalari">Ev Eşyaları</SelectItem>
                <SelectItem value="saglik">Sağlık</SelectItem>
                <SelectItem value="egitim">Eğitim</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
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
          <CardTitle>Ayni Yardım Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Alıcı</th>
                  <th className="text-left p-3 font-medium">Ürün</th>
                  <th className="text-left p-3 font-medium">Miktar</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">İşlem Tarihi</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((yardim) => (
                  <tr key={yardim.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{yardim.islemNo}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium">{yardim.aliciAd} {yardim.aliciSoyad}</div>
                          <div className="text-sm text-gray-500">{yardim.telefon}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{yardim.urunAdi}</div>
                        <div className="text-sm text-gray-500">{yardim.aciklama}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">
                        {yardim.miktar} {yardim.birim}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getCategoryColor(yardim.kategori)}>
                        {getCategoryText(yardim.kategori)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {yardim.islemTarihi}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(yardim.durum)}>
                        {getStatusText(yardim.durum)}
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
                        {yardim.durum === 'beklemede' && (
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="w-3 h-3" />
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