'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  PieChart,
  LineChart,
  Activity,
  Filter,
  RefreshCw,
  Eye,
  Share2,
  Settings,
  MoreHorizontal,
  School,
  BookOpen,
  Heart,
  Star,
  GraduationCap,
  MapPin,
  Clock,
  Timer
} from 'lucide-react';

interface BursRaporu {
  id: number;
  baslik: string;
  aciklama: string;
  tur: 'aylik' | 'yillik' | 'ozel' | 'karsilastirma';
  tarihAraligi: string;
  olusturanKisi: string;
  olusturmaTarihi: string;
  durum: 'hazir' | 'hazirlaniyor' | 'hata';
  dosyaBoyutu?: string;
  indirmeSayisi: number;
  kategori: string;
}

interface BursIstatistikleri {
  toplamBursluOgrenci: number;
  toplamBursMiktari: number;
  ortalamaBursMiktari: number;
  aktifKampanyaSayisi: number;
  tamamlananKampanyaSayisi: number;
  toplamSponsorSayisi: number;
  aylikOrtalamaBurs: number;
  yillikOrtalamaBurs: number;
  enYuksekBursMiktari: number;
  enDusukBursMiktari: number;
  bursluOgrenciOrani: number;
  basvuruOnayOrani: number;
}

export default function BursRaporlariPage() {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewReport, setShowNewReport] = useState(false);

  const [bursRaporlari] = useState<BursRaporu[]>([
    {
      id: 1,
      baslik: 'Ocak 2024 Burs Raporu',
      aciklama: 'Ocak ayı burs dağıtım ve başvuru istatistikleri',
      tur: 'aylik',
      tarihAraligi: '01.01.2024 - 31.01.2024',
      olusturanKisi: 'Ahmet Yılmaz',
      olusturmaTarihi: '2024-02-01',
      durum: 'hazir',
      dosyaBoyutu: '2.5 MB',
      indirmeSayisi: 15,
      kategori: 'Aylık Rapor'
    },
    {
      id: 2,
      baslik: '2023 Yılı Genel Burs Raporu',
      aciklama: '2023 yılı tüm burs faaliyetlerinin detaylı analizi',
      tur: 'yillik',
      tarihAraligi: '01.01.2023 - 31.12.2023',
      olusturanKisi: 'Fatma Demir',
      olusturmaTarihi: '2024-01-15',
      durum: 'hazir',
      dosyaBoyutu: '8.2 MB',
      indirmeSayisi: 28,
      kategori: 'Yıllık Rapor'
    },
    {
      id: 3,
      baslik: 'Yetim Burs Kampanyası Analizi',
      aciklama: 'Yetim öğrencilere verilen bursların detaylı analizi',
      tur: 'ozel',
      tarihAraligi: '01.01.2024 - 26.02.2024',
      olusturanKisi: 'Mehmet Kaya',
      olusturmaTarihi: '2024-02-26',
      durum: 'hazir',
      dosyaBoyutu: '3.1 MB',
      indirmeSayisi: 8,
      kategori: 'Özel Rapor'
    },
    {
      id: 4,
      baslik: 'Şehir Bazlı Burs Karşılaştırması',
      aciklama: 'Şehirlere göre burs dağıtım ve başvuru karşılaştırması',
      tur: 'karsilastirma',
      tarihAraligi: '01.01.2024 - 26.02.2024',
      olusturanKisi: 'Ali Veli',
      olusturmaTarihi: '2024-02-25',
      durum: 'hazirlaniyor',
      indirmeSayisi: 0,
      kategori: 'Karşılaştırma Raporu'
    },
    {
      id: 5,
      baslik: 'Şubat 2024 Burs Raporu',
      aciklama: 'Şubat ayı burs dağıtım ve başvuru istatistikleri',
      tur: 'aylik',
      tarihAraligi: '01.02.2024 - 29.02.2024',
      olusturanKisi: 'Hasan Hüseyin',
      olusturmaTarihi: '2024-03-01',
      durum: 'hazirlaniyor',
      indirmeSayisi: 0,
      kategori: 'Aylık Rapor'
    },
    {
      id: 6,
      baslik: 'Okul Türü Bazlı Burs Analizi',
      aciklama: 'Okul türlerine göre burs dağıtım analizi',
      tur: 'ozel',
      tarihAraligi: '01.01.2024 - 26.02.2024',
      olusturanKisi: 'Ayşe Özkan',
      olusturmaTarihi: '2024-02-24',
      durum: 'hata',
      indirmeSayisi: 0,
      kategori: 'Özel Rapor'
    }
  ]);

  const [bursIstatistikleri] = useState<BursIstatistikleri>({
    toplamBursluOgrenci: 156,
    toplamBursMiktari: 125000,
    ortalamaBursMiktari: 801,
    aktifKampanyaSayisi: 4,
    tamamlananKampanyaSayisi: 2,
    toplamSponsorSayisi: 89,
    aylikOrtalamaBurs: 45000,
    yillikOrtalamaBurs: 540000,
    enYuksekBursMiktari: 1500,
    enDusukBursMiktari: 300,
    bursluOgrenciOrani: 68.5,
    basvuruOnayOrani: 71.2
  });

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'hazir': return 'bg-green-100 text-green-800';
      case 'hazirlaniyor': return 'bg-yellow-100 text-yellow-800';
      case 'hata': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'hazir': return 'Hazır';
      case 'hazirlaniyor': return 'Hazırlanıyor';
      case 'hata': return 'Hata';
      default: return status;
    }
  };

  const getTurColor = (tur: string) => {
    switch (tur) {
      case 'aylik': return 'bg-blue-100 text-blue-800';
      case 'yillik': return 'bg-purple-100 text-purple-800';
      case 'ozel': return 'bg-orange-100 text-orange-800';
      case 'karsilastirma': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTurText = (tur: string) => {
    switch (tur) {
      case 'aylik': return 'Aylık';
      case 'yillik': return 'Yıllık';
      case 'ozel': return 'Özel';
      case 'karsilastirma': return 'Karşılaştırma';
      default: return tur;
    }
  };

  const filteredRaporlar = bursRaporlari.filter(rapor => {
    const matchesType = !selectedReportType || rapor.tur === selectedReportType;
    const matchesCategory = !selectedCategory || rapor.kategori === selectedCategory;
    
    return matchesType && matchesCategory;
  });

  const hazirRaporlar = bursRaporlari.filter(r => r.durum === 'hazir').length;
  const hazirlananRaporlar = bursRaporlari.filter(r => r.durum === 'hazirlaniyor').length;
  const toplamIndirme = bursRaporlari.reduce((sum, r) => sum + r.indirmeSayisi, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Burs Raporları</h1>
          <p className="text-gray-600">Burs istatistikleri ve rapor yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewReport(true)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Yeni Rapor
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Toplu İndir
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Burslu Öğrenci</p>
                <p className="text-2xl font-bold text-gray-900">{bursIstatistikleri.toplamBursluOgrenci}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Burs Miktarı</p>
                <p className="text-2xl font-bold text-green-600">₺{bursIstatistikleri.toplamBursMiktari.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Kampanya</p>
                <p className="text-2xl font-bold text-purple-600">{bursIstatistikleri.aktifKampanyaSayisi}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Sponsor</p>
                <p className="text-2xl font-bold text-indigo-600">{bursIstatistikleri.toplamSponsorSayisi}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Heart className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₺{bursIstatistikleri.ortalamaBursMiktari}</div>
              <div className="text-sm text-gray-600">Ortalama Burs</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">%{bursIstatistikleri.bursluOgrenciOrani}</div>
              <div className="text-sm text-gray-600">Burslu Öğrenci Oranı</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">%{bursIstatistikleri.basvuruOnayOrani}</div>
              <div className="text-sm text-gray-600">Başvuru Onay Oranı</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">₺{bursIstatistikleri.aylikOrtalamaBurs.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Aylık Ortalama Burs</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Burs Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Burs dağılım grafiği</p>
                <p className="text-sm text-gray-400">Pie chart component burada gösterilecek</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aylık Burs Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Aylık burs trend grafiği</p>
                <p className="text-sm text-gray-400">Line chart component burada gösterilecek</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Rapor Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="aylik">Aylık</SelectItem>
                <SelectItem value="yillik">Yıllık</SelectItem>
                <SelectItem value="ozel">Özel</SelectItem>
                <SelectItem value="karsilastirma">Karşılaştırma</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="Aylık Rapor">Aylık Rapor</SelectItem>
                <SelectItem value="Yıllık Rapor">Yıllık Rapor</SelectItem>
                <SelectItem value="Özel Rapor">Özel Rapor</SelectItem>
                <SelectItem value="Karşılaştırma Raporu">Karşılaştırma Raporu</SelectItem>
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

      {/* Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Raporlar ({filteredRaporlar.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Rapor</th>
                  <th className="text-left p-3">Tür</th>
                  <th className="text-left p-3">Kategori</th>
                  <th className="text-left p-3">Tarih Aralığı</th>
                  <th className="text-left p-3">Durum</th>
                  <th className="text-left p-3">Boyut</th>
                  <th className="text-left p-3">İndirme</th>
                  <th className="text-left p-3">Oluşturan</th>
                  <th className="text-left p-3">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredRaporlar.map((rapor) => (
                  <tr key={rapor.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{rapor.baslik}</div>
                        <div className="text-sm text-gray-500">{rapor.aciklama}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTurColor(rapor.tur)}>
                        {getTurText(rapor.tur)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{rapor.kategori}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{rapor.tarihAraligi}</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getDurumColor(rapor.durum)}>
                        {getDurumText(rapor.durum)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{rapor.dosyaBoyutu || '-'}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{rapor.indirmeSayisi}</div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="text-sm">{rapor.olusturanKisi}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(rapor.olusturmaTarihi).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        {rapor.durum === 'hazir' && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hazır Raporlar</p>
                <p className="text-2xl font-bold text-green-600">{hazirRaporlar}</p>
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
                <p className="text-sm text-gray-600">Hazırlanan Raporlar</p>
                <p className="text-2xl font-bold text-yellow-600">{hazirlananRaporlar}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam İndirme</p>
                <p className="text-2xl font-bold text-blue-600">{toplamIndirme}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Report Modal */}
      {showNewReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Rapor Oluştur</h2>
              <Button variant="outline" onClick={() => setShowNewReport(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rapor Başlığı</label>
                <Input placeholder="Rapor başlığı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Input placeholder="Rapor açıklaması girin" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rapor Türü</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tür seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aylik">Aylık</SelectItem>
                      <SelectItem value="yillik">Yıllık</SelectItem>
                      <SelectItem value="ozel">Özel</SelectItem>
                      <SelectItem value="karsilastirma">Karşılaştırma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aylık Rapor">Aylık Rapor</SelectItem>
                      <SelectItem value="Yıllık Rapor">Yıllık Rapor</SelectItem>
                      <SelectItem value="Özel Rapor">Özel Rapor</SelectItem>
                      <SelectItem value="Karşılaştırma Raporu">Karşılaştırma Raporu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Rapor Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewReport(false)}>
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