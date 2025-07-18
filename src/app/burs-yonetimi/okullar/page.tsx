'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  School, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Phone,
  Mail,
  Globe,
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
  Tag,
  CalendarDays,
  Timer,
  BookOpen,
  Heart,
  Star,
  DollarSign,
  GraduationCap,
  Building,
  Map,
  Navigation,
  Mail as MailIcon,
  Phone as PhoneIcon,
  ExternalLink
} from 'lucide-react';

interface Okul {
  id: number;
  ad: string;
  tur: 'ilkokul' | 'ortaokul' | 'lise' | 'meslek-lisesi' | 'imam-hatip' | 'universite' | 'diger';
  sehir: string;
  ilce: string;
  adres: string;
  telefon: string;
  email?: string;
  website?: string;
  müdürAdi: string;
  müdürTelefon: string;
  müdürEmail?: string;
  ogrenciSayisi: number;
  ogretmenSayisi: number;
  sinifSayisi: number;
  durum: 'aktif' | 'pasif' | 'kapali';
  bursluOgrenciSayisi: number;
  toplamBursMiktari: number;
  ortalamaBursMiktari: number;
  notlar: string[];
  kayitTarihi: string;
  sonGuncelleme: string;
  fotoUrl?: string;
  koordinatlar?: {
    lat: number;
    lng: number;
  };
}

export default function OkullarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showNewSchool, setShowNewSchool] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [okullar] = useState<Okul[]>([
    {
      id: 1,
      ad: 'Atatürk İlkokulu',
      tur: 'ilkokul',
      sehir: 'İstanbul',
      ilce: 'Kadıköy',
      adres: 'Atatürk Mah. Cumhuriyet Cad. No:123',
      telefon: '+90 216 123 45 67',
      email: 'ataturk.ilkokulu@meb.gov.tr',
      website: 'https://ataturkilkokulu.meb.k12.tr',
      müdürAdi: 'Ahmet Yılmaz',
      müdürTelefon: '+90 532 123 45 67',
      müdürEmail: 'ahmet.yilmaz@meb.gov.tr',
      ogrenciSayisi: 450,
      ogretmenSayisi: 25,
      sinifSayisi: 18,
      durum: 'aktif',
      bursluOgrenciSayisi: 15,
      toplamBursMiktari: 7500,
      ortalamaBursMiktari: 500,
      notlar: ['Başarılı okul', 'Düzenli takip'],
      kayitTarihi: '2024-01-15',
      sonGuncelleme: '2024-02-26',
      koordinatlar: { lat: 40.9909, lng: 29.0303 }
    },
    {
      id: 2,
      ad: 'Cumhuriyet Ortaokulu',
      tur: 'ortaokul',
      sehir: 'Ankara',
      ilce: 'Çankaya',
      adres: 'Cumhuriyet Mah. İstiklal Sok. No:45',
      telefon: '+90 312 234 56 78',
      email: 'cumhuriyet.ortaokulu@meb.gov.tr',
      website: 'https://cumhuriyetortaokulu.meb.k12.tr',
      müdürAdi: 'Fatma Demir',
      müdürTelefon: '+90 533 234 56 78',
      müdürEmail: 'fatma.demir@meb.gov.tr',
      ogrenciSayisi: 320,
      ogretmenSayisi: 20,
      sinifSayisi: 12,
      durum: 'aktif',
      bursluOgrenciSayisi: 12,
      toplamBursMiktari: 7200,
      ortalamaBursMiktari: 600,
      notlar: ['Orta seviye başarı', 'Gelişim potansiyeli var'],
      kayitTarihi: '2024-02-10',
      sonGuncelleme: '2024-02-25',
      koordinatlar: { lat: 39.9334, lng: 32.8597 }
    },
    {
      id: 3,
      ad: 'Anadolu Lisesi',
      tur: 'lise',
      sehir: 'İzmir',
      ilce: 'Konak',
      adres: 'Yeni Mah. Barış Cad. No:78',
      telefon: '+90 232 345 67 89',
      email: 'anadolu.lisesi@meb.gov.tr',
      website: 'https://anadolulisesi.meb.k12.tr',
      müdürAdi: 'Mehmet Kaya',
      müdürTelefon: '+90 534 345 67 89',
      müdürEmail: 'mehmet.kaya@meb.gov.tr',
      ogrenciSayisi: 280,
      ogretmenSayisi: 18,
      sinifSayisi: 10,
      durum: 'aktif',
      bursluOgrenciSayisi: 8,
      toplamBursMiktari: 8000,
      ortalamaBursMiktari: 1000,
      notlar: ['Yüksek başarı oranı', 'Üniversite hazırlık odaklı'],
      kayitTarihi: '2024-01-05',
      sonGuncelleme: '2024-02-20',
      koordinatlar: { lat: 38.4192, lng: 27.1287 }
    },
    {
      id: 4,
      ad: 'İmam Hatip Ortaokulu',
      tur: 'imam-hatip',
      sehir: 'Bursa',
      ilce: 'Nilüfer',
      adres: 'Gazi Mah. Kurtuluş Sok. No:34',
      telefon: '+90 224 456 78 90',
      email: 'imamhatip.ortaokulu@meb.gov.tr',
      website: 'https://imamhatiportaokulu.meb.k12.tr',
      müdürAdi: 'Veli Özkan',
      müdürTelefon: '+90 535 456 78 90',
      müdürEmail: 'veli.ozkan@meb.gov.tr',
      ogrenciSayisi: 180,
      ogretmenSayisi: 15,
      sinifSayisi: 8,
      durum: 'aktif',
      bursluOgrenciSayisi: 6,
      toplamBursMiktari: 3600,
      ortalamaBursMiktari: 600,
      notlar: ['Dini eğitim odaklı', 'Aile desteği güçlü'],
      kayitTarihi: '2024-02-15',
      sonGuncelleme: '2024-02-22',
      koordinatlar: { lat: 40.1885, lng: 29.0610 }
    },
    {
      id: 5,
      ad: 'Meslek Lisesi',
      tur: 'meslek-lisesi',
      sehir: 'Antalya',
      ilce: 'Muratpaşa',
      adres: 'Merkez Mah. Atatürk Cad. No:56',
      telefon: '+90 242 567 89 01',
      email: 'meslek.lisesi@meb.gov.tr',
      website: 'https://mesleklisesi.meb.k12.tr',
      müdürAdi: 'Mehmet Veli',
      müdürTelefon: '+90 536 567 89 01',
      müdürEmail: 'mehmet.veli@meb.gov.tr',
      ogrenciSayisi: 220,
      ogretmenSayisi: 16,
      sinifSayisi: 9,
      durum: 'aktif',
      bursluOgrenciSayisi: 10,
      toplamBursMiktari: 8000,
      ortalamaBursMiktari: 800,
      notlar: ['Pratik eğitim ağırlıklı', 'İş garantili bölümler'],
      kayitTarihi: '2024-01-20',
      sonGuncelleme: '2024-02-18',
      koordinatlar: { lat: 36.8969, lng: 30.7133 }
    },
    {
      id: 6,
      ad: 'Fen Lisesi',
      tur: 'lise',
      sehir: 'Konya',
      ilce: 'Selçuklu',
      adres: 'Yeni Mah. Cumhuriyet Sok. No:89',
      telefon: '+90 332 678 90 12',
      email: 'fen.lisesi@meb.gov.tr',
      website: 'https://fenlisesi.meb.k12.tr',
      müdürAdi: 'Ahmet Hüseyin',
      müdürTelefon: '+90 537 678 90 12',
      müdürEmail: 'ahmet.huseyin@meb.gov.tr',
      ogrenciSayisi: 150,
      ogretmenSayisi: 12,
      sinifSayisi: 6,
      durum: 'aktif',
      bursluOgrenciSayisi: 5,
      toplamBursMiktari: 6000,
      ortalamaBursMiktari: 1200,
      notlar: ['Yüksek akademik başarı', 'Bilimsel projeler'],
      kayitTarihi: '2024-01-25',
      sonGuncelleme: '2024-02-24',
      koordinatlar: { lat: 37.8667, lng: 32.4833 }
    }
  ]);

  const getTurColor = (tur: string) => {
    switch (tur) {
      case 'ilkokul': return 'bg-blue-100 text-blue-800';
      case 'ortaokul': return 'bg-green-100 text-green-800';
      case 'lise': return 'bg-purple-100 text-purple-800';
      case 'meslek-lisesi': return 'bg-orange-100 text-orange-800';
      case 'imam-hatip': return 'bg-indigo-100 text-indigo-800';
      case 'universite': return 'bg-red-100 text-red-800';
      case 'diger': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTurText = (tur: string) => {
    switch (tur) {
      case 'ilkokul': return 'İlkokul';
      case 'ortaokul': return 'Ortaokul';
      case 'lise': return 'Lise';
      case 'meslek-lisesi': return 'Meslek Lisesi';
      case 'imam-hatip': return 'İmam Hatip';
      case 'universite': return 'Üniversite';
      case 'diger': return 'Diğer';
      default: return tur;
    }
  };

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'kapali': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'kapali': return 'Kapalı';
      default: return status;
    }
  };

  const filteredOkullar = okullar.filter(okul => {
    const matchesSearch = okul.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         okul.sehir.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         okul.ilce.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         okul.müdürAdi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || okul.tur === selectedType;
    const matchesStatus = !selectedStatus || okul.durum === selectedStatus;
    const matchesCity = !selectedCity || okul.sehir === selectedCity;
    
    return matchesSearch && matchesType && matchesStatus && matchesCity;
  });

  const toplamOkul = okullar.length;
  const aktifOkul = okullar.filter(o => o.durum === 'aktif').length;
  const toplamOgrenci = okullar.reduce((sum, o) => sum + o.ogrenciSayisi, 0);
  const toplamBursluOgrenci = okullar.reduce((sum, o) => sum + o.bursluOgrenciSayisi, 0);
  const toplamBursMiktari = okullar.reduce((sum, o) => sum + o.toplamBursMiktari, 0);

  const uniqueCities = [...new Set(okullar.map(o => o.sehir))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Okullar</h1>
          <p className="text-gray-600">Okul ve eğitim kurumları yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'Liste Görünümü' : 'Grid Görünümü'}
          </Button>
          <Button onClick={() => setShowNewSchool(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Okul
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Okul</p>
                <p className="text-2xl font-bold text-gray-900">{toplamOkul}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <School className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Okul</p>
                <p className="text-2xl font-bold text-green-600">{aktifOkul}</p>
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
                <p className="text-sm text-gray-600">Toplam Öğrenci</p>
                <p className="text-2xl font-bold text-purple-600">{toplamOgrenci.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Burslu Öğrenci</p>
                <p className="text-2xl font-bold text-orange-600">{toplamBursluOgrenci}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Burs</p>
                <p className="text-2xl font-bold text-indigo-600">₺{toplamBursMiktari.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <DollarSign className="w-6 h-6 text-indigo-600" />
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
                placeholder="Okul ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Okul Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="ilkokul">İlkokul</SelectItem>
                <SelectItem value="ortaokul">Ortaokul</SelectItem>
                <SelectItem value="lise">Lise</SelectItem>
                <SelectItem value="meslek-lisesi">Meslek Lisesi</SelectItem>
                <SelectItem value="imam-hatip">İmam Hatip</SelectItem>
                <SelectItem value="universite">Üniversite</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="pasif">Pasif</SelectItem>
                <SelectItem value="kapali">Kapalı</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Şehir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Şehirler</SelectItem>
                {uniqueCities.map(sehir => (
                  <SelectItem key={sehir} value={sehir}>
                    {sehir}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schools */}
      <Card>
        <CardHeader>
          <CardTitle>Okullar ({filteredOkullar.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOkullar.map((okul) => (
                <div key={okul.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-lg">{okul.ad}</div>
                      <div className="text-sm text-gray-500">{okul.sehir} - {okul.ilce}</div>
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
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{getTurText(okul.tur)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{okul.adres}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{okul.telefon}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{okul.ogrenciSayisi} öğrenci</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getDurumColor(okul.durum)}>
                      {getDurumText(okul.durum)}
                    </Badge>
                    <Badge className={getTurColor(okul.tur)}>
                      {getTurText(okul.tur)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Burslu Öğrenci</div>
                      <div className="font-medium">{okul.bursluOgrenciSayisi}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Toplam Burs</div>
                      <div className="font-medium">₺{okul.toplamBursMiktari.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {okul.notlar.slice(0, 2).map((not, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {not}
                      </Badge>
                    ))}
                    {okul.notlar.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{okul.notlar.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Map className="w-4 h-4 mr-1" />
                      Harita
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Okul</th>
                    <th className="text-left p-3">Tür</th>
                    <th className="text-left p-3">Şehir/İlçe</th>
                    <th className="text-left p-3">Durum</th>
                    <th className="text-left p-3">Öğrenci Sayısı</th>
                    <th className="text-left p-3">Burslu Öğrenci</th>
                    <th className="text-left p-3">Toplam Burs</th>
                    <th className="text-left p-3">Müdür</th>
                    <th className="text-left p-3">İletişim</th>
                    <th className="text-left p-3">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOkullar.map((okul) => (
                    <tr key={okul.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{okul.ad}</div>
                          <div className="text-sm text-gray-500">{okul.adres}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getTurColor(okul.tur)}>
                          {getTurText(okul.tur)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="text-sm">{okul.sehir}</div>
                          <div className="text-xs text-gray-500">{okul.ilce}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={getDurumColor(okul.durum)}>
                          {getDurumText(okul.durum)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{okul.ogrenciSayisi.toLocaleString()}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{okul.bursluOgrenciSayisi}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">₺{okul.toplamBursMiktari.toLocaleString()}</div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="text-sm">{okul.müdürAdi}</div>
                          <div className="text-xs text-gray-500">{okul.müdürTelefon}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          {okul.telefon && (
                            <Button size="sm" variant="outline">
                              <PhoneIcon className="w-4 h-4" />
                            </Button>
                          )}
                          {okul.email && (
                            <Button size="sm" variant="outline">
                              <MailIcon className="w-4 h-4" />
                            </Button>
                          )}
                          {okul.website && (
                            <Button size="sm" variant="outline">
                              <Globe className="w-4 h-4" />
                            </Button>
                          )}
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
                            <Trash2 className="w-4 h-4" />
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

      {/* New School Modal */}
      {showNewSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Okul Kaydı</h2>
              <Button variant="outline" onClick={() => setShowNewSchool(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Okul Adı</label>
                <Input placeholder="Okul adı girin" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Okul Türü</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Okul türü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ilkokul">İlkokul</SelectItem>
                      <SelectItem value="ortaokul">Ortaokul</SelectItem>
                      <SelectItem value="lise">Lise</SelectItem>
                      <SelectItem value="meslek-lisesi">Meslek Lisesi</SelectItem>
                      <SelectItem value="imam-hatip">İmam Hatip</SelectItem>
                      <SelectItem value="universite">Üniversite</SelectItem>
                      <SelectItem value="diger">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Durum</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="pasif">Pasif</SelectItem>
                      <SelectItem value="kapali">Kapalı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Şehir</label>
                  <Input placeholder="Şehir girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">İlçe</label>
                  <Input placeholder="İlçe girin" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Adres</label>
                <Textarea placeholder="Adres girin" rows={2} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input placeholder="Telefon numarası girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <Input placeholder="E-posta adresi girin" type="email" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input placeholder="Website adresi girin" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Müdür Adı</label>
                  <Input placeholder="Müdür adı girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Müdür Telefon</label>
                  <Input placeholder="Müdür telefonu girin" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Müdür E-posta</label>
                <Input placeholder="Müdür e-posta adresi girin" type="email" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Öğrenci Sayısı</label>
                  <Input placeholder="0" type="number" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Öğretmen Sayısı</label>
                  <Input placeholder="0" type="number" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sınıf Sayısı</label>
                  <Input placeholder="0" type="number" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Notlar</label>
                <Textarea placeholder="Okul hakkında notlar girin" rows={3} />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Okul Kaydet
                </Button>
                <Button variant="outline" onClick={() => setShowNewSchool(false)}>
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