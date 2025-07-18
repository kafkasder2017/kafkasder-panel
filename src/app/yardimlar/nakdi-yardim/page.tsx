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
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface NakdiYardim {
  id: number;
  islemNo: string;
  aliciAd: string;
  aliciSoyad: string;
  telefon: string;
  tutar: number;
  odemeYontemi: 'nakit' | 'banka' | 'cek' | 'havale';
  durum: 'beklemede' | 'onaylandi' | 'odendi' | 'iptal';
  islemTarihi: string;
  odemeTarihi?: string;
  aciklama: string;
  kategori: 'kira' | 'gida' | 'saglik' | 'egitim' | 'diger';
}

export default function NakdiYardimPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [nakdiYardimlar] = useState<NakdiYardim[]>([
    {
      id: 1,
      islemNo: 'NY-2024-001',
      aliciAd: 'Ahmet',
      aliciSoyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      tutar: 2500,
      odemeYontemi: 'banka',
      durum: 'odendi',
      islemTarihi: '2024-01-15',
      odemeTarihi: '2024-01-16',
      aciklama: 'Kira yardımı',
      kategori: 'kira'
    },
    {
      id: 2,
      islemNo: 'NY-2024-002',
      aliciAd: 'Fatma',
      aliciSoyad: 'Demir',
      telefon: '0533 234 56 78',
      tutar: 1500,
      odemeYontemi: 'nakit',
      durum: 'beklemede',
      islemTarihi: '2024-01-14',
      aciklama: 'Gıda yardımı',
      kategori: 'gida'
    },
    {
      id: 3,
      islemNo: 'NY-2024-003',
      aliciAd: 'Mehmet',
      aliciSoyad: 'Kaya',
      telefon: '0534 345 67 89',
      tutar: 3000,
      odemeYontemi: 'cek',
      durum: 'onaylandi',
      islemTarihi: '2024-01-13',
      aciklama: 'Sağlık yardımı',
      kategori: 'saglik'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'onaylandi': return 'bg-blue-100 text-blue-800';
      case 'odendi': return 'bg-green-100 text-green-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'beklemede': return 'Beklemede';
      case 'onaylandi': return 'Onaylandı';
      case 'odendi': return 'Ödendi';
      case 'iptal': return 'İptal';
      default: return 'Bilinmiyor';
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'nakit': return 'bg-green-100 text-green-800';
      case 'banka': return 'bg-blue-100 text-blue-800';
      case 'cek': return 'bg-purple-100 text-purple-800';
      case 'havale': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kira': return 'bg-red-100 text-red-800';
      case 'gida': return 'bg-green-100 text-green-800';
      case 'saglik': return 'bg-blue-100 text-blue-800';
      case 'egitim': return 'bg-purple-100 text-purple-800';
      case 'diger': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = nakdiYardimlar.filter(yardim => {
    const matchesSearch = `${yardim.aliciAd} ${yardim.aliciSoyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yardim.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yardim.telefon.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || yardim.durum === statusFilter;
    const matchesPayment = paymentFilter === 'all' || yardim.odemeYontemi === paymentFilter;
    const matchesCategory = categoryFilter === 'all' || yardim.kategori === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesCategory;
  });

  const totalAmount = nakdiYardimlar.reduce((sum, yardim) => sum + yardim.tutar, 0);
  const paidAmount = nakdiYardimlar.filter(y => y.durum === 'odendi').reduce((sum, yardim) => sum + yardim.tutar, 0);
  const pendingAmount = nakdiYardimlar.filter(y => y.durum === 'beklemede').reduce((sum, yardim) => sum + yardim.tutar, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nakdi Yardım İşlemleri</h1>
          <p className="text-gray-600">Para yardımları ve ödemeler</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Nakdi Yardım
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Tutar</p>
                <p className="text-xl font-bold">{totalAmount.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Ödenen Tutar</p>
                <p className="text-xl font-bold text-green-600">{paidAmount.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Bekleyen Tutar</p>
                <p className="text-xl font-bold text-yellow-600">{pendingAmount.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam İşlem</p>
                <p className="text-xl font-bold">{nakdiYardimlar.length}</p>
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
                  placeholder="İşlem no, ad soyad veya telefon ara..."
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
                <SelectItem value="onaylandi">Onaylandı</SelectItem>
                <SelectItem value="odendi">Ödendi</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Ödeme Yöntemi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Yöntemler</SelectItem>
                <SelectItem value="nakit">Nakit</SelectItem>
                <SelectItem value="banka">Banka</SelectItem>
                <SelectItem value="cek">Çek</SelectItem>
                <SelectItem value="havale">Havale</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="kira">Kira</SelectItem>
                <SelectItem value="gida">Gıda</SelectItem>
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
          <CardTitle>Nakdi Yardım Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Alıcı</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Ödeme Yöntemi</th>
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
                      <div className="font-medium text-green-600">{yardim.tutar.toLocaleString('tr-TR')} ₺</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getPaymentColor(yardim.odemeYontemi)}>
                        {yardim.odemeYontemi.charAt(0).toUpperCase() + yardim.odemeYontemi.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getCategoryColor(yardim.kategori)}>
                        {yardim.kategori.charAt(0).toUpperCase() + yardim.kategori.slice(1)}
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