'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  MessageSquare, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  User,
  TrendingUp,
  Bell,
  CheckCircle
} from 'lucide-react';

interface Abonelik {
  id: number;
  aboneNo: string;
  ad: string;
  soyad: string;
  telefon: string;
  email?: string;
  abonelikTuru: 'sms' | 'email' | 'her_ikisi';
  durum: 'aktif' | 'pasif' | 'iptal' | 'gecersiz';
  kategori: 'genel' | 'egitim' | 'saglik' | 'acil' | 'ramazan' | 'kurban';
  kayitTarihi: string;
  sonGonderimTarihi?: string;
  toplamGonderim: number;
  basariliGonderim: number;
  basarisizGonderim: number;
  tercihler: {
    gunluk: boolean;
    haftalik: boolean;
    aylik: boolean;
    ozel: boolean;
  };
  aciklama?: string;
  ipAdresi?: string;
  kaynak: 'website' | 'mobil_app' | 'manuel' | 'toplu_yukleme';
}

export default function SmsEmailAbonelikPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionTypeFilter, setSubscriptionTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const [abonelikler] = useState<Abonelik[]>([
    {
      id: 1,
      aboneNo: 'ABN-2024-001',
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      telefon: '0532 123 45 67',
      email: 'ahmet@email.com',
      abonelikTuru: 'her_ikisi',
      durum: 'aktif',
      kategori: 'genel',
      kayitTarihi: '2024-01-15',
      sonGonderimTarihi: '2024-01-20',
      toplamGonderim: 15,
      basariliGonderim: 14,
      basarisizGonderim: 1,
      tercihler: {
        gunluk: false,
        haftalik: true,
        aylik: true,
        ozel: true
      },
      aciklama: 'Haftalık ve aylık bildirimler',
      ipAdresi: '192.168.1.100',
      kaynak: 'website'
    },
    {
      id: 2,
      aboneNo: 'ABN-2024-002',
      ad: 'Fatma',
      soyad: 'Demir',
      telefon: '0533 234 56 78',
      email: 'fatma@email.com',
      abonelikTuru: 'email',
      durum: 'aktif',
      kategori: 'egitim',
      kayitTarihi: '2024-01-14',
      sonGonderimTarihi: '2024-01-19',
      toplamGonderim: 8,
      basariliGonderim: 8,
      basarisizGonderim: 0,
      tercihler: {
        gunluk: false,
        haftalik: false,
        aylik: true,
        ozel: true
      },
      aciklama: 'Sadece e-posta bildirimleri',
      ipAdresi: '192.168.1.101',
      kaynak: 'mobil_app'
    },
    {
      id: 3,
      aboneNo: 'ABN-2024-003',
      ad: 'Mehmet',
      soyad: 'Kaya',
      telefon: '0534 345 67 89',
      abonelikTuru: 'sms',
      durum: 'aktif',
      kategori: 'acil',
      kayitTarihi: '2024-01-13',
      sonGonderimTarihi: '2024-01-18',
      toplamGonderim: 25,
      basariliGonderim: 23,
      basarisizGonderim: 2,
      tercihler: {
        gunluk: true,
        haftalik: true,
        aylik: false,
        ozel: true
      },
      aciklama: 'Acil durum SMS bildirimleri',
      ipAdresi: '192.168.1.102',
      kaynak: 'manuel'
    },
    {
      id: 4,
      aboneNo: 'ABN-2024-004',
      ad: 'Ayşe',
      soyad: 'Özkan',
      telefon: '0535 456 78 90',
      email: 'ayse@email.com',
      abonelikTuru: 'her_ikisi',
      durum: 'pasif',
      kategori: 'ramazan',
      kayitTarihi: '2024-01-12',
      sonGonderimTarihi: '2024-01-10',
      toplamGonderim: 5,
      basariliGonderim: 5,
      basarisizGonderim: 0,
      tercihler: {
        gunluk: false,
        haftalik: false,
        aylik: true,
        ozel: false
      },
      aciklama: 'Ramazan özel bildirimleri',
      ipAdresi: '192.168.1.103',
      kaynak: 'toplu_yukleme'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'gecersiz': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'iptal': return 'İptal';
      case 'gecersiz': return 'Geçersiz';
      default: return 'Bilinmiyor';
    }
  };

  const getSubscriptionTypeColor = (type: string) => {
    switch (type) {
      case 'sms': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'her_ikisi': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionTypeText = (type: string) => {
    switch (type) {
      case 'sms': return 'SMS';
      case 'email': return 'E-posta';
      case 'her_ikisi': return 'SMS + E-posta';
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

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'mobil_app': return 'bg-green-100 text-green-800';
      case 'manuel': return 'bg-purple-100 text-purple-800';
      case 'toplu_yukleme': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceText = (source: string) => {
    switch (source) {
      case 'website': return 'Web Sitesi';
      case 'mobil_app': return 'Mobil Uygulama';
      case 'manuel': return 'Manuel';
      case 'toplu_yukleme': return 'Toplu Yükleme';
      default: return source;
    }
  };

  const filteredData = abonelikler.filter(abonelik => {
    const matchesSearch = `${abonelik.ad} ${abonelik.soyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         abonelik.aboneNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         abonelik.telefon.includes(searchTerm) ||
                         (abonelik.email && abonelik.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || abonelik.durum === statusFilter;
    const matchesSubscriptionType = subscriptionTypeFilter === 'all' || abonelik.abonelikTuru === subscriptionTypeFilter;
    const matchesCategory = categoryFilter === 'all' || abonelik.kategori === categoryFilter;
    const matchesSource = sourceFilter === 'all' || abonelik.kaynak === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSubscriptionType && matchesCategory && matchesSource;
  });

  const totalSubscribers = abonelikler.length;
  const activeSubscribers = abonelikler.filter(a => a.durum === 'aktif').length;
  const smsSubscribers = abonelikler.filter(a => a.abonelikTuru === 'sms' || a.abonelikTuru === 'her_ikisi').length;
  const emailSubscribers = abonelikler.filter(a => a.abonelikTuru === 'email' || a.abonelikTuru === 'her_ikisi').length;

  const getSuccessRate = (successful: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((successful / total) * 100);
  };

  const getPreferenceText = (tercihler: any) => {
    const preferences = [];
    if (tercihler.gunluk) preferences.push('Günlük');
    if (tercihler.haftalik) preferences.push('Haftalık');
    if (tercihler.aylik) preferences.push('Aylık');
    if (tercihler.ozel) preferences.push('Özel');
    return preferences.join(', ') || 'Yok';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS/e-Posta Aboneliği</h1>
          <p className="text-gray-600">Abonelik listesi ve yönetimi</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Abonelik
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Abone</p>
                <p className="text-xl font-bold">{totalSubscribers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Aktif Abone</p>
                <p className="text-xl font-bold">{activeSubscribers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">SMS Abonesi</p>
                <p className="text-xl font-bold">{smsSubscribers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">E-posta Abonesi</p>
                <p className="text-xl font-bold">{emailSubscribers}</p>
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
                  placeholder="Abone no, ad soyad, telefon ara..."
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
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="gecersiz">Geçersiz</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={subscriptionTypeFilter} onValueChange={setSubscriptionTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Abonelik Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">E-posta</SelectItem>
                <SelectItem value="her_ikisi">SMS + E-posta</SelectItem>
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
            
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Kaynak" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kaynaklar</SelectItem>
                <SelectItem value="website">Web Sitesi</SelectItem>
                <SelectItem value="mobil_app">Mobil Uygulama</SelectItem>
                <SelectItem value="manuel">Manuel</SelectItem>
                <SelectItem value="toplu_yukleme">Toplu Yükleme</SelectItem>
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
          <CardTitle>Abonelik Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Abone No</th>
                  <th className="text-left p-3 font-medium">Abone</th>
                  <th className="text-left p-3 font-medium">Abonelik Türü</th>
                  <th className="text-left p-3 font-medium">Tercihler</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Başarı Oranı</th>
                  <th className="text-left p-3 font-medium">Kayıt Tarihi</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((abonelik) => {
                  const successRate = getSuccessRate(abonelik.basariliGonderim, abonelik.toplamGonderim);
                  
                  return (
                    <tr key={abonelik.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-blue-600">{abonelik.aboneNo}</div>
                        <div className="text-xs text-gray-500">{abonelik.kaynak}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{abonelik.ad} {abonelik.soyad}</div>
                            <div className="text-sm text-gray-500">{abonelik.telefon}</div>
                            {abonelik.email && (
                              <div className="text-xs text-gray-400">{abonelik.email}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getSubscriptionTypeColor(abonelik.abonelikTuru)}>
                          {getSubscriptionTypeText(abonelik.abonelikTuru)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{getPreferenceText(abonelik.tercihler)}</div>
                        {abonelik.aciklama && (
                          <div className="text-xs text-gray-500">{abonelik.aciklama}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge className={getCategoryColor(abonelik.kategori)}>
                          {getCategoryText(abonelik.kategori)}
                        </Badge>
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
                          {abonelik.basariliGonderim}/{abonelik.toplamGonderim} başarılı
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          <div>
                            <div>{abonelik.kayitTarihi}</div>
                            {abonelik.sonGonderimTarihi && (
                              <div className="text-xs text-gray-500">
                                Son: {abonelik.sonGonderimTarihi}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(abonelik.durum)}>
                          {getStatusText(abonelik.durum)}
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