'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Link,
  Tag,
  CalendarDays,
  Timer,
  School,
  BookOpen,
  Heart,
  Star,
  GraduationCap,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  BarChart3,
  Share2,
  Settings,
  MoreHorizontal
} from 'lucide-react';

interface BursKampanyasi {
  id: number;
  ad: string;
  aciklama: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  hedefMiktar: number;
  toplananMiktar: number;
  durum: 'aktif' | 'pasif' | 'tamamlandi' | 'iptal';
  basvuruSayisi: number;
  onaylananSayisi: number;
  kategori: string;
  sponsorSayisi: number;
  ortalamaBursMiktari: number;
  notlar: string[];
  olusturanKisi: string;
  olusturmaTarihi: string;
  sonGuncelleme: string;
  fotoUrl?: string;
  renk: string;
}

export default function BursKampanyalariPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [bursKampanyalari] = useState<BursKampanyasi[]>([
    {
      id: 1,
      ad: 'Yetim Burs Kampanyası 2024',
      aciklama: 'Yetim öğrencilere eğitim desteği sağlamak amacıyla başlatılan kampanya',
      baslangicTarihi: '2024-01-01',
      bitisTarihi: '2024-12-31',
      hedefMiktar: 50000,
      toplananMiktar: 35000,
      durum: 'aktif',
      basvuruSayisi: 45,
      onaylananSayisi: 32,
      kategori: 'Yetim Bursu',
      sponsorSayisi: 28,
      ortalamaBursMiktari: 750,
      notlar: ['Yüksek talep var', 'Düzenli takip gerekli'],
      olusturanKisi: 'Ahmet Yılmaz',
      olusturmaTarihi: '2024-01-01',
      sonGuncelleme: '2024-02-26',
      renk: 'blue'
    },
    {
      id: 2,
      ad: 'Eğitim Destek Kampanyası',
      aciklama: 'Maddi sıkıntı yaşayan öğrencilere destek olmak için başlatılan kampanya',
      baslangicTarihi: '2024-02-01',
      bitisTarihi: '2024-06-30',
      hedefMiktar: 25000,
      toplananMiktar: 18000,
      durum: 'aktif',
      basvuruSayisi: 28,
      onaylananSayisi: 20,
      kategori: 'Genel Burs',
      sponsorSayisi: 15,
      ortalamaBursMiktari: 600,
      notlar: ['Orta seviye talep', 'Başvurular devam ediyor'],
      olusturanKisi: 'Fatma Demir',
      olusturmaTarihi: '2024-02-01',
      sonGuncelleme: '2024-02-25',
      renk: 'green'
    },
    {
      id: 3,
      ad: 'Lise Burs Kampanyası',
      aciklama: 'Lise öğrencilerine eğitim desteği sağlamak amacıyla başlatılan kampanya',
      baslangicTarihi: '2024-01-15',
      bitisTarihi: '2024-05-31',
      hedefMiktar: 30000,
      toplananMiktar: 30000,
      durum: 'tamamlandi',
      basvuruSayisi: 35,
      onaylananSayisi: 30,
      kategori: 'Lise Bursu',
      sponsorSayisi: 22,
      ortalamaBursMiktari: 1000,
      notlar: ['Başarıyla tamamlandı', 'Tüm başvurular karşılandı'],
      olusturanKisi: 'Mehmet Kaya',
      olusturmaTarihi: '2024-01-15',
      sonGuncelleme: '2024-02-20',
      renk: 'purple'
    },
    {
      id: 4,
      ad: 'Meslek Lisesi Burs Kampanyası',
      aciklama: 'Meslek eğitimi alan öğrencilere destek olmak için başlatılan kampanya',
      baslangicTarihi: '2024-02-15',
      bitisTarihi: '2024-07-31',
      hedefMiktar: 20000,
      toplananMiktar: 12000,
      durum: 'aktif',
      basvuruSayisi: 18,
      onaylananSayisi: 12,
      kategori: 'Meslek Bursu',
      sponsorSayisi: 10,
      ortalamaBursMiktari: 800,
      notlar: ['Meslek eğitimi odaklı', 'Pratik eğitim desteği'],
      olusturanKisi: 'Ali Veli',
      olusturmaTarihi: '2024-02-15',
      sonGuncelleme: '2024-02-18',
      renk: 'orange'
    },
    {
      id: 5,
      ad: 'Üniversite Hazırlık Bursu',
      aciklama: 'Üniversite sınavına hazırlanan öğrencilere destek kampanyası',
      baslangicTarihi: '2024-03-01',
      bitisTarihi: '2024-08-31',
      hedefMiktar: 40000,
      toplananMiktar: 25000,
      durum: 'aktif',
      basvuruSayisi: 22,
      onaylananSayisi: 18,
      kategori: 'Üniversite Bursu',
      sponsorSayisi: 18,
      ortalamaBursMiktari: 1200,
      notlar: ['Yüksek maliyet', 'Özel ders desteği gerekli'],
      olusturanKisi: 'Hasan Hüseyin',
      olusturmaTarihi: '2024-03-01',
      sonGuncelleme: '2024-02-24',
      renk: 'red'
    },
    {
      id: 6,
      ad: 'Engelli Öğrenci Burs Kampanyası',
      aciklama: 'Engelli öğrencilere özel eğitim desteği kampanyası',
      baslangicTarihi: '2024-01-10',
      bitisTarihi: '2024-04-30',
      hedefMiktar: 15000,
      toplananMiktar: 15000,
      durum: 'tamamlandi',
      basvuruSayisi: 12,
      onaylananSayisi: 12,
      kategori: 'Engelli Bursu',
      sponsorSayisi: 8,
      ortalamaBursMiktari: 1250,
      notlar: ['Özel eğitim gereksinimleri', 'Tamamlandı'],
      olusturanKisi: 'Ayşe Özkan',
      olusturmaTarihi: '2024-01-10',
      sonGuncelleme: '2024-02-15',
      renk: 'indigo'
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'tamamlandi': return 'bg-blue-100 text-blue-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'tamamlandi': return 'Tamamlandı';
      case 'iptal': return 'İptal';
      default: return status;
    }
  };

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Yetim Bursu': return 'bg-red-100 text-red-800';
      case 'Genel Burs': return 'bg-blue-100 text-blue-800';
      case 'Lise Bursu': return 'bg-purple-100 text-purple-800';
      case 'Meslek Bursu': return 'bg-orange-100 text-orange-800';
      case 'Üniversite Bursu': return 'bg-indigo-100 text-indigo-800';
      case 'Engelli Bursu': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRenkClass = (renk: string) => {
    switch (renk) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-500';
      case 'indigo': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateProgress = (toplanan: number, hedef: number) => {
    return Math.min((toplanan / hedef) * 100, 100);
  };

  const calculateRemainingDays = (bitisTarihi: string) => {
    const today = new Date();
    const endDate = new Date(bitisTarihi);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredKampanyalar = bursKampanyalari.filter(kampanya => {
    const matchesSearch = kampanya.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kampanya.aciklama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kampanya.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || kampanya.durum === selectedStatus;
    const matchesCategory = !selectedCategory || kampanya.kategori === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toplamKampanya = bursKampanyalari.length;
  const aktifKampanya = bursKampanyalari.filter(k => k.durum === 'aktif').length;
  const tamamlananKampanya = bursKampanyalari.filter(k => k.durum === 'tamamlandi').length;
  const toplamHedefMiktar = bursKampanyalari.reduce((sum, k) => sum + k.hedefMiktar, 0);
  const toplamToplananMiktar = bursKampanyalari.reduce((sum, k) => sum + k.toplananMiktar, 0);
  const toplamBasvuru = bursKampanyalari.reduce((sum, k) => sum + k.basvuruSayisi, 0);

  const uniqueCategories = [...new Set(bursKampanyalari.map(k => k.kategori))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Burs Kampanyaları</h1>
          <p className="text-gray-600">Burs kampanyası yönetimi ve takibi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'Liste Görünümü' : 'Grid Görünümü'}
          </Button>
          <Button onClick={() => setShowNewCampaign(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kampanya
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kampanya</p>
                <p className="text-2xl font-bold text-gray-900">{toplamKampanya}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Kampanya</p>
                <p className="text-2xl font-bold text-green-600">{aktifKampanya}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-2xl font-bold text-blue-600">{tamamlananKampanya}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Toplanan</p>
                <p className="text-2xl font-bold text-purple-600">₺{toplamToplananMiktar.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Başvuru</p>
                <p className="text-2xl font-bold text-indigo-600">{toplamBasvuru}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Kampanya ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="pasif">Pasif</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {uniqueCategories.map(kategori => (
                  <SelectItem key={kategori} value={kategori}>
                    {kategori}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Tarih Aralığı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tarihler</SelectItem>
                <SelectItem value="bu-ay">Bu Ay</SelectItem>
                <SelectItem value="bu-yil">Bu Yıl</SelectItem>
                <SelectItem value="son-3-ay">Son 3 Ay</SelectItem>
                <SelectItem value="son-6-ay">Son 6 Ay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Kampanyalar ({filteredKampanyalar.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKampanyalar.map((kampanya) => {
                const progress = calculateProgress(kampanya.toplananMiktar, kampanya.hedefMiktar);
                const remainingDays = calculateRemainingDays(kampanya.bitisTarihi);
                
                return (
                  <div key={kampanya.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getRenkClass(kampanya.renk)}`}></div>
                        <div>
                          <div className="font-medium text-lg">{kampanya.ad}</div>
                          <div className="text-sm text-gray-500">{kampanya.kategori}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-2">{kampanya.aciklama}</div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">İlerleme</span>
                          <span className="font-medium">%{Math.round(progress)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getRenkClass(kampanya.renk)}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Hedef</div>
                          <div className="font-medium">₺{kampanya.hedefMiktar.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Toplanan</div>
                          <div className="font-medium">₺{kampanya.toplananMiktar.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Başvuru</div>
                          <div className="font-medium">{kampanya.basvuruSayisi}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Onaylanan</div>
                          <div className="font-medium">{kampanya.onaylananSayisi}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Sponsor</div>
                          <div className="font-medium">{kampanya.sponsorSayisi}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Ortalama Burs</div>
                          <div className="font-medium">₺{kampanya.ortalamaBursMiktari.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getDurumColor(kampanya.durum)}>
                        {getDurumText(kampanya.durum)}
                      </Badge>
                      <Badge className={getKategoriColor(kampanya.kategori)}>
                        {kampanya.kategori}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(kampanya.baslangicTarihi).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{remainingDays > 0 ? `${remainingDays} gün kaldı` : 'Süresi doldu'}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {kampanya.notlar.slice(0, 2).map((not, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {not}
                        </Badge>
                      ))}
                      {kampanya.notlar.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{kampanya.notlar.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Detay
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Kampanya</th>
                    <th className="text-left p-3">Kategori</th>
                    <th className="text-left p-3">Durum</th>
                    <th className="text-left p-3">İlerleme</th>
                    <th className="text-left p-3">Hedef/Toplanan</th>
                    <th className="text-left p-3">Başvuru/Onaylanan</th>
                    <th className="text-left p-3">Sponsor</th>
                    <th className="text-left p-3">Tarih</th>
                    <th className="text-left p-3">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKampanyalar.map((kampanya) => {
                    const progress = calculateProgress(kampanya.toplananMiktar, kampanya.hedefMiktar);
                    const remainingDays = calculateRemainingDays(kampanya.bitisTarihi);
                    
                    return (
                      <tr key={kampanya.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{kampanya.ad}</div>
                            <div className="text-sm text-gray-500">{kampanya.aciklama.substring(0, 50)}...</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getKategoriColor(kampanya.kategori)}>
                            {kampanya.kategori}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getDurumColor(kampanya.durum)}>
                            {getDurumText(kampanya.durum)}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="w-24">
                            <div className="flex justify-between text-xs mb-1">
                              <span>%{Math.round(progress)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getRenkClass(kampanya.renk)}`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="text-sm">₺{kampanya.hedefMiktar.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">₺{kampanya.toplananMiktar.toLocaleString()}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="text-sm">{kampanya.basvuruSayisi}</div>
                            <div className="text-xs text-gray-500">{kampanya.onaylananSayisi}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">{kampanya.sponsorSayisi}</div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="text-sm">{new Date(kampanya.baslangicTarihi).toLocaleDateString('tr-TR')}</div>
                            <div className="text-xs text-gray-500">
                              {remainingDays > 0 ? `${remainingDays} gün kaldı` : 'Süresi doldu'}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Burs Kampanyası</h2>
              <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kampanya Adı</label>
                <Input placeholder="Kampanya adı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Kampanya açıklaması girin" rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlangıç Tarihi</label>
                  <Input type="date" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bitiş Tarihi</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hedef Miktar</label>
                  <Input placeholder="₺0.00" type="number" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yetim">Yetim Bursu</SelectItem>
                      <SelectItem value="genel">Genel Burs</SelectItem>
                      <SelectItem value="lise">Lise Bursu</SelectItem>
                      <SelectItem value="meslek">Meslek Bursu</SelectItem>
                      <SelectItem value="universite">Üniversite Bursu</SelectItem>
                      <SelectItem value="engelli">Engelli Bursu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Renk</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Renk seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Mavi</SelectItem>
                    <SelectItem value="green">Yeşil</SelectItem>
                    <SelectItem value="purple">Mor</SelectItem>
                    <SelectItem value="orange">Turuncu</SelectItem>
                    <SelectItem value="red">Kırmızı</SelectItem>
                    <SelectItem value="indigo">İndigo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Notlar</label>
                <Textarea placeholder="Kampanya hakkında notlar girin" rows={3} />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Kampanya Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 