'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Calendar,
  Clock,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Link,
  School,
  BookOpen,
  Heart,
  Star,
  DollarSign,
  User,
  Tag,
  CalendarDays,
  Timer
} from 'lucide-react';

interface BursBasvurusu {
  id: number;
  ogrenciAdi: string;
  ogrenciSoyadi: string;
  okulAdi: string;
  sinif: string;
  bursMiktari: number;
  durum: 'beklemede' | 'onaylandi' | 'reddedildi' | 'odendi';
  basvuruTarihi: string;
  onayTarihi?: string;
  odemeTarihi?: string;
  kampanyaAdi: string;
  sponsorAdi?: string;
  aciklama: string;
  oncelik: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  notlar: string[];
}

interface BursKampanyasi {
  id: number;
  ad: string;
  aciklama: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  hedefMiktar: number;
  toplananMiktar: number;
  durum: 'aktif' | 'pasif' | 'tamamlandi';
  basvuruSayisi: number;
  onaylananSayisi: number;
  kategori: string;
}

export default function BursYonetimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const [bursBasvurulari] = useState<BursBasvurusu[]>([
    {
      id: 1,
      ogrenciAdi: 'Ahmet',
      ogrenciSoyadi: 'Yılmaz',
      okulAdi: 'Atatürk İlkokulu',
      sinif: '3. Sınıf',
      bursMiktari: 500,
      durum: 'onaylandi',
      basvuruTarihi: '2024-01-15',
      onayTarihi: '2024-01-20',
      odemeTarihi: '2024-02-01',
      kampanyaAdi: 'Yetim Burs Kampanyası 2024',
      sponsorAdi: 'Mehmet Bey',
      aciklama: 'Ailesi maddi sıkıntı yaşayan öğrenci',
      oncelik: 'yuksek',
      notlar: ['Düzenli takip gerekli', 'Başarılı öğrenci']
    },
    {
      id: 2,
      ogrenciAdi: 'Fatma',
      ogrenciSoyadi: 'Demir',
      okulAdi: 'Cumhuriyet Ortaokulu',
      sinif: '7. Sınıf',
      bursMiktari: 750,
      durum: 'beklemede',
      basvuruTarihi: '2024-02-10',
      kampanyaAdi: 'Eğitim Destek Kampanyası',
      aciklama: 'Yetim öğrenci, eğitim masrafları yüksek',
      oncelik: 'acil',
      notlar: ['Acil durum', 'Evrak eksik']
    },
    {
      id: 3,
      ogrenciAdi: 'Mehmet',
      ogrenciSoyadi: 'Kaya',
      okulAdi: 'Anadolu Lisesi',
      sinif: '11. Sınıf',
      bursMiktari: 1000,
      durum: 'odendi',
      basvuruTarihi: '2024-01-05',
      onayTarihi: '2024-01-10',
      odemeTarihi: '2024-02-01',
      kampanyaAdi: 'Lise Burs Kampanyası',
      sponsorAdi: 'Ayşe Hanım',
      aciklama: 'Başarılı öğrenci, üniversite hazırlık',
      oncelik: 'orta',
      notlar: ['Başarılı öğrenci', 'Düzenli ödeme']
    },
    {
      id: 4,
      ogrenciAdi: 'Ayşe',
      ogrenciSoyadi: 'Özkan',
      okulAdi: 'İmam Hatip Ortaokulu',
      sinif: '6. Sınıf',
      bursMiktari: 600,
      durum: 'reddedildi',
      basvuruTarihi: '2024-02-15',
      onayTarihi: '2024-02-20',
      kampanyaAdi: 'Yetim Burs Kampanyası 2024',
      aciklama: 'Evrak eksikliği nedeniyle reddedildi',
      oncelik: 'dusuk',
      notlar: ['Evrak eksik', 'Yeniden başvuru gerekli']
    },
    {
      id: 5,
      ogrenciAdi: 'Ali',
      ogrenciSoyadi: 'Veli',
      okulAdi: 'Meslek Lisesi',
      sinif: '10. Sınıf',
      bursMiktari: 800,
      durum: 'beklemede',
      basvuruTarihi: '2024-02-20',
      kampanyaAdi: 'Meslek Lisesi Burs Kampanyası',
      aciklama: 'Meslek eğitimi alan öğrenci',
      oncelik: 'yuksek',
      notlar: ['Meslek eğitimi', 'Pratik eğitim gerekli']
    },
    {
      id: 6,
      ogrenciAdi: 'Hasan',
      ogrenciSoyadi: 'Hüseyin',
      okulAdi: 'Fen Lisesi',
      sinif: '12. Sınıf',
      bursMiktari: 1200,
      durum: 'onaylandi',
      basvuruTarihi: '2024-01-25',
      onayTarihi: '2024-02-01',
      kampanyaAdi: 'Üniversite Hazırlık Bursu',
      sponsorAdi: 'Veli Bey',
      aciklama: 'Üniversite sınavına hazırlanan öğrenci',
      oncelik: 'acil',
      notlar: ['Üniversite hazırlık', 'Özel ders desteği']
    }
  ]);

  const [bursKampanyalari] = useState<BursKampanyasi[]>([
    {
      id: 1,
      ad: 'Yetim Burs Kampanyası 2024',
      aciklama: 'Yetim öğrencilere eğitim desteği',
      baslangicTarihi: '2024-01-01',
      bitisTarihi: '2024-12-31',
      hedefMiktar: 50000,
      toplananMiktar: 35000,
      durum: 'aktif',
      basvuruSayisi: 45,
      onaylananSayisi: 32,
      kategori: 'Yetim Bursu'
    },
    {
      id: 2,
      ad: 'Eğitim Destek Kampanyası',
      aciklama: 'Maddi sıkıntı yaşayan öğrencilere destek',
      baslangicTarihi: '2024-02-01',
      bitisTarihi: '2024-06-30',
      hedefMiktar: 25000,
      toplananMiktar: 18000,
      durum: 'aktif',
      basvuruSayisi: 28,
      onaylananSayisi: 20,
      kategori: 'Genel Burs'
    },
    {
      id: 3,
      ad: 'Lise Burs Kampanyası',
      aciklama: 'Lise öğrencilerine eğitim desteği',
      baslangicTarihi: '2024-01-15',
      bitisTarihi: '2024-05-31',
      hedefMiktar: 30000,
      toplananMiktar: 30000,
      durum: 'tamamlandi',
      basvuruSayisi: 35,
      onaylananSayisi: 30,
      kategori: 'Lise Bursu'
    },
    {
      id: 4,
      ad: 'Meslek Lisesi Burs Kampanyası',
      aciklama: 'Meslek eğitimi alan öğrencilere destek',
      baslangicTarihi: '2024-02-15',
      bitisTarihi: '2024-07-31',
      hedefMiktar: 20000,
      toplananMiktar: 12000,
      durum: 'aktif',
      basvuruSayisi: 18,
      onaylananSayisi: 12,
      kategori: 'Meslek Bursu'
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'onaylandi': return 'bg-green-100 text-green-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      case 'odendi': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'beklemede': return 'Beklemede';
      case 'onaylandi': return 'Onaylandı';
      case 'reddedildi': return 'Reddedildi';
      case 'odendi': return 'Ödendi';
      default: return status;
    }
  };

  const getOncelikColor = (priority: string) => {
    switch (priority) {
      case 'acil': return 'bg-red-100 text-red-800';
      case 'yuksek': return 'bg-orange-100 text-orange-800';
      case 'orta': return 'bg-yellow-100 text-yellow-800';
      case 'dusuk': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOncelikText = (priority: string) => {
    switch (priority) {
      case 'acil': return 'Acil';
      case 'yuksek': return 'Yüksek';
      case 'orta': return 'Orta';
      case 'dusuk': return 'Düşük';
      default: return priority;
    }
  };

  const getKampanyaDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'tamamlandi': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKampanyaDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'tamamlandi': return 'Tamamlandı';
      default: return status;
    }
  };

  const filteredBasvurular = bursBasvurulari.filter(basvuru => {
    const matchesSearch = `${basvuru.ogrenciAdi} ${basvuru.ogrenciSoyadi}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         basvuru.okulAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         basvuru.kampanyaAdi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || basvuru.durum === selectedStatus;
    const matchesPriority = !selectedPriority || basvuru.oncelik === selectedPriority;
    const matchesCampaign = !selectedCampaign || basvuru.kampanyaAdi === selectedCampaign;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCampaign;
  });

  const toplamBasvuru = bursBasvurulari.length;
  const onaylananBasvuru = bursBasvurulari.filter(b => b.durum === 'onaylandi').length;
  const bekleyenBasvuru = bursBasvurulari.filter(b => b.durum === 'beklemede').length;
  const toplamBursMiktari = bursBasvurulari.filter(b => b.durum === 'odendi').reduce((sum, b) => sum + b.bursMiktari, 0);
  const aktifKampanya = bursKampanyalari.filter(k => k.durum === 'aktif').length;

  const uniqueKampanyalar = [...new Set(bursBasvurulari.map(b => b.kampanyaAdi))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Burs Yönetimi</h1>
          <p className="text-gray-600">Burs başvuruları ve kampanya yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewApplication(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Başvuru
          </Button>
          <Button variant="outline" onClick={() => setShowNewCampaign(true)}>
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
                <p className="text-sm text-gray-600">Toplam Başvuru</p>
                <p className="text-2xl font-bold text-gray-900">{toplamBasvuru}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Onaylanan</p>
                <p className="text-2xl font-bold text-green-600">{onaylananBasvuru}</p>
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
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-orange-600">{bekleyenBasvuru}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Ödenen</p>
                <p className="text-2xl font-bold text-purple-600">₺{toplamBursMiktari.toLocaleString()}</p>
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
                <p className="text-sm text-gray-600">Aktif Kampanya</p>
                <p className="text-2xl font-bold text-indigo-600">{aktifKampanya}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Aktif Burs Kampanyaları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bursKampanyalari.filter(k => k.durum === 'aktif').map((kampanya) => {
              const progress = (kampanya.toplananMiktar / kampanya.hedefMiktar) * 100;
              
              return (
                <div key={kampanya.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-lg">{kampanya.ad}</div>
                      <div className="text-sm text-gray-500">{kampanya.aciklama}</div>
                    </div>
                    <Badge className={getKampanyaDurumColor(kampanya.durum)}>
                      {getKampanyaDurumText(kampanya.durum)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">İlerleme</span>
                        <span className="font-medium">%{Math.round(progress)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Detay
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Öğrenci, okul veya kampanya ara..."
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
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="onaylandi">Onaylandı</SelectItem>
                <SelectItem value="reddedildi">Reddedildi</SelectItem>
                <SelectItem value="odendi">Ödendi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="acil">Acil</SelectItem>
                <SelectItem value="yuksek">Yüksek</SelectItem>
                <SelectItem value="orta">Orta</SelectItem>
                <SelectItem value="dusuk">Düşük</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Kampanya" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                {uniqueKampanyalar.map(kampanya => (
                  <SelectItem key={kampanya} value={kampanya}>
                    {kampanya}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Burs Başvuruları ({filteredBasvurular.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Öğrenci</th>
                  <th className="text-left p-3">Okul</th>
                  <th className="text-left p-3">Kampanya</th>
                  <th className="text-left p-3">Burs Miktarı</th>
                  <th className="text-left p-3">Durum</th>
                  <th className="text-left p-3">Öncelik</th>
                  <th className="text-left p-3">Başvuru Tarihi</th>
                  <th className="text-left p-3">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredBasvurular.map((basvuru) => (
                  <tr key={basvuru.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{basvuru.ogrenciAdi} {basvuru.ogrenciSoyadi}</div>
                        <div className="text-sm text-gray-500">{basvuru.sinif}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{basvuru.okulAdi}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{basvuru.kampanyaAdi}</div>
                      {basvuru.sponsorAdi && (
                        <div className="text-xs text-gray-500">Sponsor: {basvuru.sponsorAdi}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">₺{basvuru.bursMiktari.toLocaleString()}</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getDurumColor(basvuru.durum)}>
                        {getDurumText(basvuru.durum)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={getOncelikColor(basvuru.oncelik)}>
                        {getOncelikText(basvuru.oncelik)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{new Date(basvuru.basvuruTarihi).toLocaleDateString('tr-TR')}</div>
                      {basvuru.onayTarihi && (
                        <div className="text-xs text-gray-500">
                          Onay: {new Date(basvuru.onayTarihi).toLocaleDateString('tr-TR')}
                        </div>
                      )}
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
                          <Trash2 className="w-4 h-4" />
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

      {/* New Application Modal */}
      {showNewApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Burs Başvurusu</h2>
              <Button variant="outline" onClick={() => setShowNewApplication(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Öğrenci Adı</label>
                  <Input placeholder="Öğrenci adı girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Öğrenci Soyadı</label>
                  <Input placeholder="Öğrenci soyadı girin" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Okul</label>
                  <Input placeholder="Okul adı girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sınıf</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sınıf seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1. Sınıf</SelectItem>
                      <SelectItem value="2">2. Sınıf</SelectItem>
                      <SelectItem value="3">3. Sınıf</SelectItem>
                      <SelectItem value="4">4. Sınıf</SelectItem>
                      <SelectItem value="5">5. Sınıf</SelectItem>
                      <SelectItem value="6">6. Sınıf</SelectItem>
                      <SelectItem value="7">7. Sınıf</SelectItem>
                      <SelectItem value="8">8. Sınıf</SelectItem>
                      <SelectItem value="9">9. Sınıf</SelectItem>
                      <SelectItem value="10">10. Sınıf</SelectItem>
                      <SelectItem value="11">11. Sınıf</SelectItem>
                      <SelectItem value="12">12. Sınıf</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kampanya</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kampanya seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {bursKampanyalari.filter(k => k.durum === 'aktif').map(kampanya => (
                        <SelectItem key={kampanya.id} value={kampanya.id.toString()}>
                          {kampanya.ad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Burs Miktarı</label>
                  <Input placeholder="₺0.00" type="number" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Öncelik</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dusuk">Düşük</SelectItem>
                      <SelectItem value="orta">Orta</SelectItem>
                      <SelectItem value="yuksek">Yüksek</SelectItem>
                      <SelectItem value="acil">Acil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sponsor</label>
                  <Input placeholder="Sponsor adı (opsiyonel)" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Başvuru açıklaması girin" rows={3} />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Başvuru Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewApplication(false)}>
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    </SelectContent>
                  </Select>
                </div>
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