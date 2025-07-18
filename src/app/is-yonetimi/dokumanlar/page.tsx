'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Upload,
  Folder,
  File,
  Calendar,
  User,
  Tag,
  Clock,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Link,
  Share2,
  Lock,
  Unlock
} from 'lucide-react';

interface Dokuman {
  id: number;
  ad: string;
  aciklama: string;
  dosyaAdi: string;
  dosyaBoyutu: number;
  dosyaTipi: string;
  kategori: string;
  projeId?: number;
  projeAdi?: string;
  yukleyenKisi: string;
  yuklemeTarihi: string;
  sonGuncelleme: string;
  versiyon: string;
  durum: 'taslak' | 'onay-bekliyor' | 'onaylandi' | 'yayinlandi' | 'arsivlendi';
  erisimSeviyesi: 'herkese-acik' | 'ekip-uyeleri' | 'yoneticiler' | 'gizli';
  etiketler: string[];
  indirmeSayisi: number;
  goruntulemeSayisi: number;
}

interface Kategori {
  id: number;
  ad: string;
  aciklama: string;
  dokumanSayisi: number;
  renk: string;
}

export default function DokumanYonetimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAccess, setSelectedAccess] = useState('');
  const [showNewDocument, setShowNewDocument] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [dokumanlar] = useState<Dokuman[]>([
    {
      id: 1,
      ad: 'Proje Planı - Yardım Kampanyası 2024',
      aciklama: 'Yardım Kampanyası 2024 projesinin detaylı planı ve zaman çizelgesi',
      dosyaAdi: 'proje_plani_yardim_kampanyasi_2024.pdf',
      dosyaBoyutu: 2.5,
      dosyaTipi: 'pdf',
      kategori: 'Proje Planları',
      projeId: 1,
      projeAdi: 'Yardım Kampanyası 2024',
      yukleyenKisi: 'Ahmet Yılmaz',
      yuklemeTarihi: '2024-01-15',
      sonGuncelleme: '2024-02-20',
      versiyon: '2.1',
      durum: 'onaylandi',
      erisimSeviyesi: 'ekip-uyeleri',
      etiketler: ['proje', 'plan', 'kampanya'],
      indirmeSayisi: 45,
      goruntulemeSayisi: 120
    },
    {
      id: 2,
      ad: 'Web Sitesi Tasarım Özellikleri',
      aciklama: 'Yeni web sitesi için tasarım özellikleri ve teknik gereksinimler',
      dosyaAdi: 'web_sitesi_tasarim_ozellikleri.docx',
      dosyaBoyutu: 1.8,
      dosyaTipi: 'docx',
      kategori: 'Teknik Dokümanlar',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      yukleyenKisi: 'Fatma Demir',
      yuklemeTarihi: '2024-02-10',
      sonGuncelleme: '2024-02-25',
      versiyon: '1.3',
      durum: 'onay-bekliyor',
      erisimSeviyesi: 'ekip-uyeleri',
      etiketler: ['web', 'tasarım', 'teknik'],
      indirmeSayisi: 23,
      goruntulemeSayisi: 67
    },
    {
      id: 3,
      ad: 'Eğitim Programı Müfredatı',
      aciklama: 'Eğitim programı için detaylı müfredat ve ders planları',
      dosyaAdi: 'egitim_programi_mufredati.xlsx',
      dosyaBoyutu: 3.2,
      dosyaTipi: 'xlsx',
      kategori: 'Eğitim Materyalleri',
      projeId: 3,
      projeAdi: 'Eğitim Programı',
      yukleyenKisi: 'Ayşe Özkan',
      yuklemeTarihi: '2024-03-01',
      sonGuncelleme: '2024-03-15',
      versiyon: '1.0',
      durum: 'taslak',
      erisimSeviyesi: 'yoneticiler',
      etiketler: ['eğitim', 'müfredat', 'ders'],
      indirmeSayisi: 8,
      goruntulemeSayisi: 34
    },
    {
      id: 4,
      ad: 'Bütçe Raporu 2024',
      aciklama: '2024 yılı bütçe raporu ve finansal analiz',
      dosyaAdi: 'butce_raporu_2024.pdf',
      dosyaBoyutu: 4.1,
      dosyaTipi: 'pdf',
      kategori: 'Finansal Raporlar',
      yukleyenKisi: 'Mehmet Kaya',
      yuklemeTarihi: '2024-01-30',
      sonGuncelleme: '2024-02-28',
      versiyon: '3.0',
      durum: 'yayinlandi',
      erisimSeviyesi: 'yoneticiler',
      etiketler: ['bütçe', 'finans', 'rapor'],
      indirmeSayisi: 67,
      goruntulemeSayisi: 189
    },
    {
      id: 5,
      ad: 'API Dokümantasyonu',
      aciklama: 'Web sitesi API endpoint\'leri ve kullanım kılavuzu',
      dosyaAdi: 'api_dokumantasyonu.md',
      dosyaBoyutu: 0.8,
      dosyaTipi: 'md',
      kategori: 'Teknik Dokümanlar',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      yukleyenKisi: 'Ali Veli',
      yuklemeTarihi: '2024-02-20',
      sonGuncelleme: '2024-02-26',
      versiyon: '2.0',
      durum: 'onaylandi',
      erisimSeviyesi: 'ekip-uyeleri',
      etiketler: ['api', 'dokümantasyon', 'teknik'],
      indirmeSayisi: 34,
      goruntulemeSayisi: 89
    },
    {
      id: 6,
      ad: 'Toplantı Notları - Haftalık Durum',
      aciklama: 'Haftalık proje durum toplantısı notları ve aksiyon maddeleri',
      dosyaAdi: 'toplanti_notlari_haftalik_durum.docx',
      dosyaBoyutu: 1.2,
      dosyaTipi: 'docx',
      kategori: 'Toplantı Notları',
      yukleyenKisi: 'Ahmet Yılmaz',
      yuklemeTarihi: '2024-02-26',
      sonGuncelleme: '2024-02-26',
      versiyon: '1.0',
      durum: 'yayinlandi',
      erisimSeviyesi: 'ekip-uyeleri',
      etiketler: ['toplantı', 'notlar', 'durum'],
      indirmeSayisi: 12,
      goruntulemeSayisi: 45
    }
  ]);

  const [kategoriler] = useState<Kategori[]>([
    {
      id: 1,
      ad: 'Proje Planları',
      aciklama: 'Proje planları ve zaman çizelgeleri',
      dokumanSayisi: 15,
      renk: 'bg-blue-500'
    },
    {
      id: 2,
      ad: 'Teknik Dokümanlar',
      aciklama: 'Teknik dokümantasyon ve kılavuzlar',
      dokumanSayisi: 28,
      renk: 'bg-green-500'
    },
    {
      id: 3,
      ad: 'Eğitim Materyalleri',
      aciklama: 'Eğitim programları ve materyaller',
      dokumanSayisi: 12,
      renk: 'bg-purple-500'
    },
    {
      id: 4,
      ad: 'Finansal Raporlar',
      aciklama: 'Bütçe ve finansal raporlar',
      dokumanSayisi: 8,
      renk: 'bg-orange-500'
    },
    {
      id: 5,
      ad: 'Toplantı Notları',
      aciklama: 'Toplantı notları ve aksiyon maddeleri',
      dokumanSayisi: 25,
      renk: 'bg-red-500'
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'taslak': return 'bg-gray-100 text-gray-800';
      case 'onay-bekliyor': return 'bg-yellow-100 text-yellow-800';
      case 'onaylandi': return 'bg-green-100 text-green-800';
      case 'yayinlandi': return 'bg-blue-100 text-blue-800';
      case 'arsivlendi': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'taslak': return 'Taslak';
      case 'onay-bekliyor': return 'Onay Bekliyor';
      case 'onaylandi': return 'Onaylandı';
      case 'yayinlandi': return 'Yayınlandı';
      case 'arsivlendi': return 'Arşivlendi';
      default: return status;
    }
  };

  const getErisimColor = (access: string) => {
    switch (access) {
      case 'herkese-acik': return 'bg-green-100 text-green-800';
      case 'ekip-uyeleri': return 'bg-blue-100 text-blue-800';
      case 'yoneticiler': return 'bg-orange-100 text-orange-800';
      case 'gizli': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getErisimText = (access: string) => {
    switch (access) {
      case 'herkese-acik': return 'Herkese Açık';
      case 'ekip-uyeleri': return 'Ekip Üyeleri';
      case 'yoneticiler': return 'Yöneticiler';
      case 'gizli': return 'Gizli';
      default: return access;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'docx': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'xlsx': return <FileText className="w-6 h-6 text-green-500" />;
      case 'md': return <FileText className="w-6 h-6 text-gray-500" />;
      default: return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
    return `${size.toFixed(1)} MB`;
  };

  const filteredDokumanlar = dokumanlar.filter(dokuman => {
    const matchesSearch = dokuman.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dokuman.aciklama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dokuman.etiketler.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || dokuman.kategori === selectedCategory;
    const matchesStatus = !selectedStatus || dokuman.durum === selectedStatus;
    const matchesAccess = !selectedAccess || dokuman.erisimSeviyesi === selectedAccess;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesAccess;
  });

  const toplamDokuman = dokumanlar.length;
  const toplamBoyut = dokumanlar.reduce((sum, d) => sum + d.dosyaBoyutu, 0);
  const toplamIndirme = dokumanlar.reduce((sum, d) => sum + d.indirmeSayisi, 0);
  const toplamGoruntuleme = dokumanlar.reduce((sum, d) => sum + d.goruntulemeSayisi, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doküman Yönetimi</h1>
          <p className="text-gray-600">Proje dokümanları ve dosya yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'Liste Görünümü' : 'Grid Görünümü'}
          </Button>
          <Button onClick={() => setShowNewDocument(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Doküman
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Toplu Yükle
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Doküman</p>
                <p className="text-2xl font-bold text-gray-900">{toplamDokuman}</p>
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
                <p className="text-sm text-gray-600">Toplam Boyut</p>
                <p className="text-2xl font-bold text-green-600">{formatFileSize(toplamBoyut)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam İndirme</p>
                <p className="text-2xl font-bold text-purple-600">{toplamIndirme}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Görüntüleme</p>
                <p className="text-2xl font-bold text-orange-600">{toplamGoruntuleme}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Kategoriler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {kategoriler.map((kategori) => (
              <div key={kategori.id} className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                <div className={`w-12 h-12 ${kategori.renk} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div className="font-medium">{kategori.ad}</div>
                <div className="text-sm text-gray-500 mb-2">{kategori.aciklama}</div>
                <div className="text-lg font-bold text-blue-600">{kategori.dokumanSayisi}</div>
              </div>
            ))}
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
                placeholder="Doküman ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {kategoriler.map(kategori => (
                  <SelectItem key={kategori.id} value={kategori.ad}>
                    {kategori.ad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="taslak">Taslak</SelectItem>
                <SelectItem value="onay-bekliyor">Onay Bekliyor</SelectItem>
                <SelectItem value="onaylandi">Onaylandı</SelectItem>
                <SelectItem value="yayinlandi">Yayınlandı</SelectItem>
                <SelectItem value="arsivlendi">Arşivlendi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAccess} onValueChange={setSelectedAccess}>
              <SelectTrigger>
                <SelectValue placeholder="Erişim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Erişimler</SelectItem>
                <SelectItem value="herkese-acik">Herkese Açık</SelectItem>
                <SelectItem value="ekip-uyeleri">Ekip Üyeleri</SelectItem>
                <SelectItem value="yoneticiler">Yöneticiler</SelectItem>
                <SelectItem value="gizli">Gizli</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Dokümanlar ({filteredDokumanlar.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDokumanlar.map((dokuman) => (
                <div key={dokuman.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(dokuman.dosyaTipi)}
                      <div>
                        <div className="font-medium">{dokuman.ad}</div>
                        <div className="text-sm text-gray-500">{dokuman.dosyaAdi}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">{dokuman.aciklama}</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Boyut</div>
                      <div className="font-medium">{formatFileSize(dokuman.dosyaBoyutu)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Versiyon</div>
                      <div className="font-medium">{dokuman.versiyon}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Yükleyen</div>
                      <div className="font-medium">{dokuman.yukleyenKisi}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tarih</div>
                      <div className="font-medium">{new Date(dokuman.yuklemeTarihi).toLocaleDateString('tr-TR')}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getDurumColor(dokuman.durum)}>
                      {getDurumText(dokuman.durum)}
                    </Badge>
                    <Badge className={getErisimColor(dokuman.erisimSeviyesi)}>
                      {getErisimText(dokuman.erisimSeviyesi)}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {dokuman.etiketler.map((etiket, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {etiket}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Download className="w-3 h-3" />
                      <span>{dokuman.indirmeSayisi}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3" />
                      <span>{dokuman.goruntulemeSayisi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Doküman</th>
                    <th className="text-left p-3">Kategori</th>
                    <th className="text-left p-3">Boyut</th>
                    <th className="text-left p-3">Durum</th>
                    <th className="text-left p-3">Erişim</th>
                    <th className="text-left p-3">Yükleyen</th>
                    <th className="text-left p-3">Tarih</th>
                    <th className="text-left p-3">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDokumanlar.map((dokuman) => (
                    <tr key={dokuman.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(dokuman.dosyaTipi)}
                          <div>
                            <div className="font-medium">{dokuman.ad}</div>
                            <div className="text-sm text-gray-500">{dokuman.dosyaAdi}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{dokuman.kategori}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{formatFileSize(dokuman.dosyaBoyutu)}</div>
                      </td>
                      <td className="p-3">
                        <Badge className={getDurumColor(dokuman.durum)}>
                          {getDurumText(dokuman.durum)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getErisimColor(dokuman.erisimSeviyesi)}>
                          {getErisimText(dokuman.erisimSeviyesi)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{dokuman.yukleyenKisi}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{new Date(dokuman.yuklemeTarihi).toLocaleDateString('tr-TR')}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Document Modal */}
      {showNewDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Doküman</h2>
              <Button variant="outline" onClick={() => setShowNewDocument(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Doküman Adı</label>
                <Input placeholder="Doküman adı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Doküman açıklaması girin" rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {kategoriler.map(kategori => (
                        <SelectItem key={kategori.id} value={kategori.ad}>
                          {kategori.ad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Proje</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Proje seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Proje Yok</SelectItem>
                      <SelectItem value="1">Yardım Kampanyası 2024</SelectItem>
                      <SelectItem value="2">Web Sitesi Yenileme</SelectItem>
                      <SelectItem value="3">Eğitim Programı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Durum</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taslak">Taslak</SelectItem>
                      <SelectItem value="onay-bekliyor">Onay Bekliyor</SelectItem>
                      <SelectItem value="onaylandi">Onaylandı</SelectItem>
                      <SelectItem value="yayinlandi">Yayınlandı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Erişim Seviyesi</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Erişim seviyesi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="herkese-acik">Herkese Açık</SelectItem>
                      <SelectItem value="ekip-uyeleri">Ekip Üyeleri</SelectItem>
                      <SelectItem value="yoneticiler">Yöneticiler</SelectItem>
                      <SelectItem value="gizli">Gizli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Dosya Yükle</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Dosyayı buraya sürükleyin veya tıklayın</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOCX, XLSX, MD dosyaları desteklenir</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Etiketler</label>
                <Input placeholder="Etiketleri virgülle ayırarak girin" />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Dokümanı Yükle
                </Button>
                <Button variant="outline" onClick={() => setShowNewDocument(false)}>
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