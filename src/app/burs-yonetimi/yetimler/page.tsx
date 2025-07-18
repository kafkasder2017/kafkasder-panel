'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
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
  School,
  BookOpen,
  Heart,
  Star,
  DollarSign,
  GraduationCap
} from 'lucide-react';

interface YetimOgrenci {
  id: number;
  ad: string;
  soyad: string;
  dogumTarihi: string;
  cinsiyet: 'erkek' | 'kiz';
  kimlikNo: string;
  telefon: string;
  email?: string;
  adres: string;
  sehir: string;
  okulAdi: string;
  sinif: string;
  ogrenciNo: string;
  durum: 'aktif' | 'pasif' | 'mezun' | 'transfer';
  bursDurumu: 'burslu' | 'burssuz' | 'beklemede' | 'reddedildi';
  bursMiktari?: number;
  sponsorAdi?: string;
  veliAdi: string;
  veliTelefon: string;
  veliYakinlik: string;
  aileDurumu: 'yetim' | 'yoksul' | 'engelli' | 'diger';
  aileGelir: number;
  aileUyeSayisi: number;
  notlar: string[];
  kayitTarihi: string;
  sonGuncelleme: string;
  fotoUrl?: string;
}

export default function YetimlerOgrencilerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBursDurumu, setSelectedBursDurumu] = useState('');
  const [selectedAileDurumu, setSelectedAileDurumu] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showNewStudent, setShowNewStudent] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [yetimOgrenciler] = useState<YetimOgrenci[]>([
    {
      id: 1,
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      dogumTarihi: '2015-03-15',
      cinsiyet: 'erkek',
      kimlikNo: '12345678901',
      telefon: '+90 532 123 45 67',
      email: 'ahmet.yilmaz@email.com',
      adres: 'Atatürk Mah. Cumhuriyet Cad. No:123',
      sehir: 'İstanbul',
      okulAdi: 'Atatürk İlkokulu',
      sinif: '3. Sınıf',
      ogrenciNo: '2024001',
      durum: 'aktif',
      bursDurumu: 'burslu',
      bursMiktari: 500,
      sponsorAdi: 'Mehmet Bey',
      veliAdi: 'Fatma Yılmaz',
      veliTelefon: '+90 533 234 56 78',
      veliYakinlik: 'Anne',
      aileDurumu: 'yetim',
      aileGelir: 2500,
      aileUyeSayisi: 3,
      notlar: ['Başarılı öğrenci', 'Düzenli takip gerekli'],
      kayitTarihi: '2024-01-15',
      sonGuncelleme: '2024-02-26'
    },
    {
      id: 2,
      ad: 'Fatma',
      soyad: 'Demir',
      dogumTarihi: '2012-07-22',
      cinsiyet: 'kiz',
      kimlikNo: '98765432109',
      telefon: '+90 534 345 67 89',
      email: 'fatma.demir@email.com',
      adres: 'Cumhuriyet Mah. İstiklal Sok. No:45',
      sehir: 'Ankara',
      okulAdi: 'Cumhuriyet Ortaokulu',
      sinif: '7. Sınıf',
      ogrenciNo: '2024002',
      durum: 'aktif',
      bursDurumu: 'beklemede',
      veliAdi: 'Ali Demir',
      veliTelefon: '+90 535 456 78 90',
      veliYakinlik: 'Baba',
      aileDurumu: 'yoksul',
      aileGelir: 1800,
      aileUyeSayisi: 4,
      notlar: ['Evrak eksik', 'Acil durum'],
      kayitTarihi: '2024-02-10',
      sonGuncelleme: '2024-02-25'
    },
    {
      id: 3,
      ad: 'Mehmet',
      soyad: 'Kaya',
      dogumTarihi: '2008-11-08',
      cinsiyet: 'erkek',
      kimlikNo: '45678912345',
      telefon: '+90 536 567 89 01',
      email: 'mehmet.kaya@email.com',
      adres: 'Yeni Mah. Barış Cad. No:78',
      sehir: 'İzmir',
      okulAdi: 'Anadolu Lisesi',
      sinif: '11. Sınıf',
      ogrenciNo: '2024003',
      durum: 'aktif',
      bursDurumu: 'burslu',
      bursMiktari: 1000,
      sponsorAdi: 'Ayşe Hanım',
      veliAdi: 'Hasan Kaya',
      veliTelefon: '+90 537 678 90 12',
      veliYakinlik: 'Amca',
      aileDurumu: 'yetim',
      aileGelir: 3000,
      aileUyeSayisi: 2,
      notlar: ['Üniversite hazırlık', 'Başarılı öğrenci'],
      kayitTarihi: '2024-01-05',
      sonGuncelleme: '2024-02-20'
    },
    {
      id: 4,
      ad: 'Ayşe',
      soyad: 'Özkan',
      dogumTarihi: '2014-05-12',
      cinsiyet: 'kiz',
      kimlikNo: '78912345678',
      telefon: '+90 538 789 01 23',
      email: 'ayse.ozkan@email.com',
      adres: 'Gazi Mah. Kurtuluş Sok. No:34',
      sehir: 'Bursa',
      okulAdi: 'İmam Hatip Ortaokulu',
      sinif: '6. Sınıf',
      ogrenciNo: '2024004',
      durum: 'aktif',
      bursDurumu: 'reddedildi',
      veliAdi: 'Veli Özkan',
      veliTelefon: '+90 539 890 12 34',
      veliYakinlik: 'Baba',
      aileDurumu: 'yoksul',
      aileGelir: 2200,
      aileUyeSayisi: 5,
      notlar: ['Evrak eksikliği', 'Yeniden başvuru gerekli'],
      kayitTarihi: '2024-02-15',
      sonGuncelleme: '2024-02-22'
    },
    {
      id: 5,
      ad: 'Ali',
      soyad: 'Veli',
      dogumTarihi: '2010-09-30',
      cinsiyet: 'erkek',
      kimlikNo: '32165498765',
      telefon: '+90 530 901 23 45',
      email: 'ali.veli@email.com',
      adres: 'Merkez Mah. Atatürk Cad. No:56',
      sehir: 'Antalya',
      okulAdi: 'Meslek Lisesi',
      sinif: '10. Sınıf',
      ogrenciNo: '2024005',
      durum: 'aktif',
      bursDurumu: 'burslu',
      bursMiktari: 800,
      sponsorAdi: 'Hasan Bey',
      veliAdi: 'Mehmet Veli',
      veliTelefon: '+90 531 012 34 56',
      veliYakinlik: 'Baba',
      aileDurumu: 'engelli',
      aileGelir: 1500,
      aileUyeSayisi: 3,
      notlar: ['Meslek eğitimi', 'Pratik eğitim gerekli'],
      kayitTarihi: '2024-01-20',
      sonGuncelleme: '2024-02-18'
    },
    {
      id: 6,
      ad: 'Hasan',
      soyad: 'Hüseyin',
      dogumTarihi: '2007-12-03',
      cinsiyet: 'erkek',
      kimlikNo: '65432198709',
      telefon: '+90 532 123 45 67',
      email: 'hasan.huseyin@email.com',
      adres: 'Yeni Mah. Cumhuriyet Sok. No:89',
      sehir: 'Konya',
      okulAdi: 'Fen Lisesi',
      sinif: '12. Sınıf',
      ogrenciNo: '2024006',
      durum: 'aktif',
      bursDurumu: 'burslu',
      bursMiktari: 1200,
      sponsorAdi: 'Veli Bey',
      veliAdi: 'Ahmet Hüseyin',
      veliTelefon: '+90 533 234 56 78',
      veliYakinlik: 'Baba',
      aileDurumu: 'yetim',
      aileGelir: 2800,
      aileUyeSayisi: 2,
      notlar: ['Üniversite hazırlık', 'Özel ders desteği'],
      kayitTarihi: '2024-01-25',
      sonGuncelleme: '2024-02-24'
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'mezun': return 'bg-blue-100 text-blue-800';
      case 'transfer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'mezun': return 'Mezun';
      case 'transfer': return 'Transfer';
      default: return status;
    }
  };

  const getBursDurumColor = (status: string) => {
    switch (status) {
      case 'burslu': return 'bg-green-100 text-green-800';
      case 'burssuz': return 'bg-gray-100 text-gray-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBursDurumText = (status: string) => {
    switch (status) {
      case 'burslu': return 'Burslu';
      case 'burssuz': return 'Burssuz';
      case 'beklemede': return 'Beklemede';
      case 'reddedildi': return 'Reddedildi';
      default: return status;
    }
  };

  const getAileDurumColor = (status: string) => {
    switch (status) {
      case 'yetim': return 'bg-red-100 text-red-800';
      case 'yoksul': return 'bg-orange-100 text-orange-800';
      case 'engelli': return 'bg-purple-100 text-purple-800';
      case 'diger': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAileDurumText = (status: string) => {
    switch (status) {
      case 'yetim': return 'Yetim';
      case 'yoksul': return 'Yoksul';
      case 'engelli': return 'Engelli';
      case 'diger': return 'Diğer';
      default: return status;
    }
  };

  const getCinsiyetIcon = (cinsiyet: string) => {
    return cinsiyet === 'erkek' ? '👦' : '👧';
  };

  const calculateAge = (dogumTarihi: string) => {
    const today = new Date();
    const birthDate = new Date(dogumTarihi);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const filteredOgrenciler = yetimOgrenciler.filter(ogrenci => {
    const matchesSearch = `${ogrenci.ad} ${ogrenci.soyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ogrenci.okulAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ogrenci.ogrenciNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ogrenci.kimlikNo.includes(searchTerm);
    const matchesStatus = !selectedStatus || ogrenci.durum === selectedStatus;
    const matchesBursDurumu = !selectedBursDurumu || ogrenci.bursDurumu === selectedBursDurumu;
    const matchesAileDurumu = !selectedAileDurumu || ogrenci.aileDurumu === selectedAileDurumu;
    const matchesCity = !selectedCity || ogrenci.sehir === selectedCity;
    
    return matchesSearch && matchesStatus && matchesBursDurumu && matchesAileDurumu && matchesCity;
  });

  const toplamOgrenci = yetimOgrenciler.length;
  const aktifOgrenci = yetimOgrenciler.filter(o => o.durum === 'aktif').length;
  const bursluOgrenci = yetimOgrenciler.filter(o => o.bursDurumu === 'burslu').length;
  const yetimOgrenci = yetimOgrenciler.filter(o => o.aileDurumu === 'yetim').length;
  const toplamBursMiktari = yetimOgrenciler.filter(o => o.bursDurumu === 'burslu').reduce((sum, o) => sum + (o.bursMiktari || 0), 0);

  const uniqueCities = [...new Set(yetimOgrenciler.map(o => o.sehir))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yetimler & Öğrenciler</h1>
          <p className="text-gray-600">Yetim ve öğrenci kayıtları yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'Liste Görünümü' : 'Grid Görünümü'}
          </Button>
          <Button onClick={() => setShowNewStudent(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Öğrenci
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
                <p className="text-sm text-gray-600">Toplam Öğrenci</p>
                <p className="text-2xl font-bold text-gray-900">{toplamOgrenci}</p>
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
                <p className="text-sm text-gray-600">Aktif Öğrenci</p>
                <p className="text-2xl font-bold text-green-600">{aktifOgrenci}</p>
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
                <p className="text-sm text-gray-600">Burslu Öğrenci</p>
                <p className="text-2xl font-bold text-purple-600">{bursluOgrenci}</p>
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
                <p className="text-sm text-gray-600">Yetim Öğrenci</p>
                <p className="text-2xl font-bold text-red-600">{yetimOgrenci}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Heart className="w-6 h-6 text-red-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Öğrenci ara..."
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
                <SelectItem value="mezun">Mezun</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedBursDurumu} onValueChange={setSelectedBursDurumu}>
              <SelectTrigger>
                <SelectValue placeholder="Burs Durumu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Burs Durumları</SelectItem>
                <SelectItem value="burslu">Burslu</SelectItem>
                <SelectItem value="burssuz">Burssuz</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="reddedildi">Reddedildi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAileDurumu} onValueChange={setSelectedAileDurumu}>
              <SelectTrigger>
                <SelectValue placeholder="Aile Durumu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Aile Durumları</SelectItem>
                <SelectItem value="yetim">Yetim</SelectItem>
                <SelectItem value="yoksul">Yoksul</SelectItem>
                <SelectItem value="engelli">Engelli</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
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

      {/* Students */}
      <Card>
        <CardHeader>
          <CardTitle>Öğrenciler ({filteredOgrenciler.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOgrenciler.map((ogrenci) => (
                <div key={ogrenci.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCinsiyetIcon(ogrenci.cinsiyet)}</div>
                      <div>
                        <div className="font-medium text-lg">{ogrenci.ad} {ogrenci.soyad}</div>
                        <div className="text-sm text-gray-500">{ogrenci.okulAdi} - {ogrenci.sinif}</div>
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
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{calculateAge(ogrenci.dogumTarihi)} yaşında</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{ogrenci.sehir}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{ogrenci.telefon}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <School className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Öğrenci No: {ogrenci.ogrenciNo}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getDurumColor(ogrenci.durum)}>
                      {getDurumText(ogrenci.durum)}
                    </Badge>
                    <Badge className={getBursDurumColor(ogrenci.bursDurumu)}>
                      {getBursDurumText(ogrenci.bursDurumu)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getAileDurumColor(ogrenci.aileDurumu)}>
                      {getAileDurumText(ogrenci.aileDurumu)}
                    </Badge>
                    {ogrenci.bursMiktari && (
                      <div className="text-sm font-medium text-green-600">
                        ₺{ogrenci.bursMiktari.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {ogrenci.notlar.slice(0, 2).map((not, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {not}
                      </Badge>
                    ))}
                    {ogrenci.notlar.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{ogrenci.notlar.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    Kayıt: {new Date(ogrenci.kayitTarihi).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Öğrenci</th>
                    <th className="text-left p-3">Okul</th>
                    <th className="text-left p-3">Şehir</th>
                    <th className="text-left p-3">Durum</th>
                    <th className="text-left p-3">Burs Durumu</th>
                    <th className="text-left p-3">Aile Durumu</th>
                    <th className="text-left p-3">Burs Miktarı</th>
                    <th className="text-left p-3">Veli</th>
                    <th className="text-left p-3">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOgrenciler.map((ogrenci) => (
                    <tr key={ogrenci.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{getCinsiyetIcon(ogrenci.cinsiyet)}</div>
                          <div>
                            <div className="font-medium">{ogrenci.ad} {ogrenci.soyad}</div>
                            <div className="text-sm text-gray-500">{calculateAge(ogrenci.dogumTarihi)} yaş</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="text-sm">{ogrenci.okulAdi}</div>
                          <div className="text-xs text-gray-500">{ogrenci.sinif}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{ogrenci.sehir}</div>
                      </td>
                      <td className="p-3">
                        <Badge className={getDurumColor(ogrenci.durum)}>
                          {getDurumText(ogrenci.durum)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getBursDurumColor(ogrenci.bursDurumu)}>
                          {getBursDurumText(ogrenci.bursDurumu)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getAileDurumColor(ogrenci.aileDurumu)}>
                          {getAileDurumText(ogrenci.aileDurumu)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          {ogrenci.bursMiktari ? `₺${ogrenci.bursMiktari.toLocaleString()}` : '-'}
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="text-sm">{ogrenci.veliAdi}</div>
                          <div className="text-xs text-gray-500">{ogrenci.veliYakinlik}</div>
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

      {/* New Student Modal */}
      {showNewStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Öğrenci Kaydı</h2>
              <Button variant="outline" onClick={() => setShowNewStudent(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad</label>
                  <Input placeholder="Öğrenci adı girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Soyad</label>
                  <Input placeholder="Öğrenci soyadı girin" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Doğum Tarihi</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cinsiyet</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cinsiyet seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="erkek">Erkek</SelectItem>
                      <SelectItem value="kiz">Kız</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kimlik No</label>
                  <Input placeholder="TC Kimlik No girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input placeholder="Telefon numarası girin" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <Input placeholder="E-posta adresi girin" type="email" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Adres</label>
                <Textarea placeholder="Adres girin" rows={2} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Şehir</label>
                  <Input placeholder="Şehir girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Okul</label>
                  <Input placeholder="Okul adı girin" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                
                <div>
                  <label className="block text-sm font-medium mb-2">Öğrenci No</label>
                  <Input placeholder="Öğrenci numarası girin" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Aile Durumu</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Aile durumu seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yetim">Yetim</SelectItem>
                      <SelectItem value="yoksul">Yoksul</SelectItem>
                      <SelectItem value="engelli">Engelli</SelectItem>
                      <SelectItem value="diger">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Aile Geliri</label>
                  <Input placeholder="₺0.00" type="number" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Veli Adı</label>
                  <Input placeholder="Veli adı girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Veli Telefon</label>
                  <Input placeholder="Veli telefonu girin" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Veli Yakınlık</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Yakınlık seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anne">Anne</SelectItem>
                    <SelectItem value="baba">Baba</SelectItem>
                    <SelectItem value="amca">Amca</SelectItem>
                    <SelectItem value="dayı">Dayı</SelectItem>
                    <SelectItem value="teyze">Teyze</SelectItem>
                    <SelectItem value="hala">Hala</SelectItem>
                    <SelectItem value="diger">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Notlar</label>
                <Textarea placeholder="Öğrenci hakkında notlar girin" rows={3} />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Öğrenci Kaydet
                </Button>
                <Button variant="outline" onClick={() => setShowNewStudent(false)}>
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