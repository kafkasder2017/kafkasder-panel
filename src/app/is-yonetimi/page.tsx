'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Briefcase, 
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
  Link
} from 'lucide-react';

interface Proje {
  id: number;
  ad: string;
  aciklama: string;
  kategori: string;
  durum: 'planlaniyor' | 'aktif' | 'tamamlandi' | 'iptal' | 'beklemede';
  oncelik: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  baslangicTarihi: string;
  bitisTarihi: string;
  projeYoneticisi: string;
  ekipUyeleri: string[];
  tamamlanmaOrani: number;
  butce: number;
  harcananButce: number;
  gorevSayisi: number;
  tamamlananGorevSayisi: number;
  olusturmaTarihi: string;
}

interface Gorev {
  id: number;
  baslik: string;
  aciklama: string;
  projeId: number;
  atananKisi: string;
  durum: 'beklemede' | 'devam-ediyor' | 'tamamlandi' | 'iptal';
  oncelik: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  baslangicTarihi: string;
  bitisTarihi: string;
  tahminiSure: number;
  gerceklesenSure: number;
  etiketler: string[];
}

export default function ProjeYonetimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);

  const [projeler] = useState<Proje[]>([
    {
      id: 1,
      ad: 'Yardım Kampanyası 2024',
      aciklama: '2024 yılı için kapsamlı yardım kampanyası projesi',
      kategori: 'Yardım',
      durum: 'aktif',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-01-01',
      bitisTarihi: '2024-12-31',
      projeYoneticisi: 'Ahmet Yılmaz',
      ekipUyeleri: ['Fatma Demir', 'Mehmet Kaya', 'Ayşe Özkan'],
      tamamlanmaOrani: 65,
      butce: 50000,
      harcananButce: 32500,
      gorevSayisi: 25,
      tamamlananGorevSayisi: 16,
      olusturmaTarihi: '2024-01-01'
    },
    {
      id: 2,
      ad: 'Web Sitesi Yenileme',
      aciklama: 'KAFKASDER web sitesinin modern tasarımla yenilenmesi',
      kategori: 'Teknoloji',
      durum: 'aktif',
      oncelik: 'orta',
      baslangicTarihi: '2024-02-01',
      bitisTarihi: '2024-05-31',
      projeYoneticisi: 'Fatma Demir',
      ekipUyeleri: ['Mehmet Kaya', 'Ali Veli'],
      tamamlanmaOrani: 45,
      butce: 15000,
      harcananButce: 6750,
      gorevSayisi: 18,
      tamamlananGorevSayisi: 8,
      olusturmaTarihi: '2024-02-01'
    },
    {
      id: 3,
      ad: 'Eğitim Programı',
      aciklama: 'İhtiyaç sahiplerine yönelik eğitim programı',
      kategori: 'Eğitim',
      durum: 'planlaniyor',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-03-01',
      bitisTarihi: '2024-08-31',
      projeYoneticisi: 'Mehmet Kaya',
      ekipUyeleri: ['Ayşe Özkan', 'Hasan Hüseyin'],
      tamamlanmaOrani: 15,
      butce: 25000,
      harcananButce: 3750,
      gorevSayisi: 12,
      tamamlananGorevSayisi: 2,
      olusturmaTarihi: '2024-03-01'
    },
    {
      id: 4,
      ad: 'Sağlık Taraması',
      aciklama: 'Toplum sağlığı taraması ve bilgilendirme projesi',
      kategori: 'Sağlık',
      durum: 'tamamlandi',
      oncelik: 'acil',
      baslangicTarihi: '2023-10-01',
      bitisTarihi: '2023-12-31',
      projeYoneticisi: 'Ayşe Özkan',
      ekipUyeleri: ['Dr. Ali Veli', 'Hemşire Fatma'],
      tamamlanmaOrani: 100,
      butce: 30000,
      harcananButce: 28500,
      gorevSayisi: 20,
      tamamlananGorevSayisi: 20,
      olusturmaTarihi: '2023-10-01'
    }
  ]);

  const [gorevler] = useState<Gorev[]>([
    {
      id: 1,
      baslik: 'Kampanya materyalleri hazırlama',
      aciklama: 'Yardım kampanyası için broşür ve afiş tasarımı',
      projeId: 1,
      atananKisi: 'Fatma Demir',
      durum: 'tamamlandi',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-01-15',
      bitisTarihi: '2024-01-30',
      tahminiSure: 10,
      gerceklesenSure: 8,
      etiketler: ['tasarım', 'materyal']
    },
    {
      id: 2,
      baslik: 'Web sitesi ana sayfa tasarımı',
      aciklama: 'Yeni web sitesi için ana sayfa tasarımı',
      projeId: 2,
      atananKisi: 'Mehmet Kaya',
      durum: 'devam-ediyor',
      oncelik: 'orta',
      baslangicTarihi: '2024-02-15',
      bitisTarihi: '2024-03-15',
      tahminiSure: 15,
      gerceklesenSure: 8,
      etiketler: ['web', 'tasarım']
    },
    {
      id: 3,
      baslik: 'Eğitim programı içerik hazırlama',
      aciklama: 'Eğitim programı için ders içeriklerinin hazırlanması',
      projeId: 3,
      atananKisi: 'Ayşe Özkan',
      durum: 'beklemede',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-03-15',
      bitisTarihi: '2024-04-15',
      tahminiSure: 20,
      gerceklesenSure: 0,
      etiketler: ['eğitim', 'içerik']
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'planlaniyor': return 'bg-blue-100 text-blue-800';
      case 'tamamlandi': return 'bg-purple-100 text-purple-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'planlaniyor': return 'Planlanıyor';
      case 'tamamlandi': return 'Tamamlandı';
      case 'iptal': return 'İptal';
      case 'beklemede': return 'Beklemede';
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

  const filteredProjeler = projeler.filter(proje => {
    const matchesSearch = proje.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proje.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || proje.durum === selectedStatus;
    const matchesCategory = !selectedCategory || proje.kategori === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toplamProje = projeler.length;
  const aktifProje = projeler.filter(p => p.durum === 'aktif').length;
  const tamamlananProje = projeler.filter(p => p.durum === 'tamamlandi').length;
  const toplamButce = projeler.reduce((sum, p) => sum + p.butce, 0);
  const harcananButce = projeler.reduce((sum, p) => sum + p.harcananButce, 0);
  const ortalamaTamamlanma = projeler.reduce((sum, p) => sum + p.tamamlanmaOrani, 0) / projeler.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proje Yönetimi</h1>
          <p className="text-gray-600">Proje ve görev takibi sistemi</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewProject(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Proje</p>
                <p className="text-2xl font-bold text-gray-900">{toplamProje}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Projeler</p>
                <p className="text-2xl font-bold text-green-600">{aktifProje}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-2xl font-bold text-purple-600">{tamamlananProje}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ortalama Tamamlanma</p>
                <p className="text-2xl font-bold text-orange-600">%{Math.round(ortalamaTamamlanma)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Bütçe Özeti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₺{toplamButce.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Toplam Bütçe</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">₺{harcananButce.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Harcanan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₺{(toplamButce - harcananButce).toLocaleString()}</div>
              <div className="text-sm text-gray-500">Kalan</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Bütçe Kullanımı</span>
              <span>%{Math.round((harcananButce / toplamButce) * 100)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(harcananButce / toplamButce) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Proje adı veya açıklama ara..."
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
                <SelectItem value="planlaniyor">Planlanıyor</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="Yardım">Yardım</SelectItem>
                <SelectItem value="Teknoloji">Teknoloji</SelectItem>
                <SelectItem value="Eğitim">Eğitim</SelectItem>
                <SelectItem value="Sağlık">Sağlık</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Projeler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjeler.map((proje) => (
              <div key={proje.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{proje.ad}</div>
                      <div className="text-sm text-gray-500">{proje.aciklama}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDurumColor(proje.durum)}>
                      {getDurumText(proje.durum)}
                    </Badge>
                    <Badge className={getOncelikColor(proje.oncelik)}>
                      {getOncelikText(proje.oncelik)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Proje Yöneticisi</div>
                    <div className="font-medium">{proje.projeYoneticisi}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ekip Üyeleri</div>
                    <div className="font-medium">{proje.ekipUyeleri.length} kişi</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Görevler</div>
                    <div className="font-medium">{proje.tamamlananGorevSayisi}/{proje.gorevSayisi}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Bütçe</div>
                    <div className="font-medium">₺{proje.harcananButce.toLocaleString()}/{proje.butce.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>İlerleme</span>
                    <span>%{proje.tamamlanmaOrani}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${proje.tamamlanmaOrani}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Başlangıç</div>
                    <div className="font-medium">{new Date(proje.baslangicTarihi).toLocaleDateString('tr-TR')}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Bitiş</div>
                    <div className="font-medium">{new Date(proje.bitisTarihi).toLocaleDateString('tr-TR')}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Kategori</div>
                    <div className="font-medium">{proje.kategori}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Oluşturma</div>
                    <div className="font-medium">{new Date(proje.olusturmaTarihi).toLocaleDateString('tr-TR')}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {proje.ekipUyeleri.join(', ')}
                  </div>
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Proje</h2>
              <Button variant="outline" onClick={() => setShowNewProject(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Proje Adı</label>
                <Input placeholder="Proje adı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Proje açıklaması girin" rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yardim">Yardım</SelectItem>
                      <SelectItem value="teknoloji">Teknoloji</SelectItem>
                      <SelectItem value="egitim">Eğitim</SelectItem>
                      <SelectItem value="saglik">Sağlık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
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
              
              <div>
                <label className="block text-sm font-medium mb-2">Bütçe</label>
                <Input placeholder="₺0.00" type="number" />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Projeyi Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewProject(false)}>
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