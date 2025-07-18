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
  Briefcase,
  Star,
  Shield,
  Zap
} from 'lucide-react';

interface EkipUyesi {
  id: number;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  departman: string;
  pozisyon: string;
  rol: 'yonetici' | 'uzman' | 'asistan' | 'stajyer';
  durum: 'aktif' | 'pasif' | 'izinli' | 'istifa';
  iseBaslamaTarihi: string;
  maas: number;
  performansPuani: number;
  tamamlananProje: number;
  aktifProje: number;
  tamamlananGorev: number;
  bekleyenGorev: number;
  yetenekler: string[];
  projeler: string[];
  avatar?: string;
  sonGiris: string;
  calismaSuresi: number;
}

interface Departman {
  id: number;
  ad: string;
  aciklama: string;
  uyeSayisi: number;
  yonetici: string;
  projeSayisi: number;
  butce: number;
}

export default function EkipYonetimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showNewMember, setShowNewMember] = useState(false);
  const [showNewDepartment, setShowNewDepartment] = useState(false);
  const [viewMode, setViewMode] = useState<'members' | 'departments'>('members');

  const [ekipUyeleri] = useState<EkipUyesi[]>([
    {
      id: 1,
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      email: 'ahmet.yilmaz@kafkasder.org',
      telefon: '+90 532 123 45 67',
      departman: 'Proje Yönetimi',
      pozisyon: 'Proje Yöneticisi',
      rol: 'yonetici',
      durum: 'aktif',
      iseBaslamaTarihi: '2020-03-15',
      maas: 8500,
      performansPuani: 92,
      tamamlananProje: 15,
      aktifProje: 3,
      tamamlananGorev: 45,
      bekleyenGorev: 2,
      yetenekler: ['Proje Yönetimi', 'Agile', 'Scrum', 'Risk Yönetimi'],
      projeler: ['Yardım Kampanyası 2024', 'Web Sitesi Yenileme'],
      sonGiris: '2024-02-26 09:15',
      calismaSuresi: 3
    },
    {
      id: 2,
      ad: 'Fatma',
      soyad: 'Demir',
      email: 'fatma.demir@kafkasder.org',
      telefon: '+90 533 234 56 78',
      departman: 'Teknoloji',
      pozisyon: 'Frontend Geliştirici',
      rol: 'uzman',
      durum: 'aktif',
      iseBaslamaTarihi: '2021-06-01',
      maas: 7200,
      performansPuani: 88,
      tamamlananProje: 8,
      aktifProje: 2,
      tamamlananGorev: 32,
      bekleyenGorev: 4,
      yetenekler: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      projeler: ['Web Sitesi Yenileme'],
      sonGiris: '2024-02-26 08:45',
      calismaSuresi: 2
    },
    {
      id: 3,
      ad: 'Mehmet',
      soyad: 'Kaya',
      email: 'mehmet.kaya@kafkasder.org',
      telefon: '+90 534 345 67 89',
      departman: 'Teknoloji',
      pozisyon: 'Backend Geliştirici',
      rol: 'uzman',
      durum: 'aktif',
      iseBaslamaTarihi: '2021-08-15',
      maas: 7500,
      performansPuani: 85,
      tamamlananProje: 6,
      aktifProje: 2,
      tamamlananGorev: 28,
      bekleyenGorev: 3,
      yetenekler: ['Node.js', 'PostgreSQL', 'Supabase', 'API Geliştirme'],
      projeler: ['Web Sitesi Yenileme'],
      sonGiris: '2024-02-26 09:00',
      calismaSuresi: 2
    },
    {
      id: 4,
      ad: 'Ayşe',
      soyad: 'Özkan',
      email: 'ayse.ozkan@kafkasder.org',
      telefon: '+90 535 456 78 90',
      departman: 'Eğitim',
      pozisyon: 'Eğitim Uzmanı',
      rol: 'uzman',
      durum: 'aktif',
      iseBaslamaTarihi: '2022-01-10',
      maas: 6800,
      performansPuani: 90,
      tamamlananProje: 4,
      aktifProje: 1,
      tamamlananGorev: 18,
      bekleyenGorev: 5,
      yetenekler: ['Eğitim Planlama', 'Müfredat Geliştirme', 'Öğretim Tasarımı'],
      projeler: ['Eğitim Programı'],
      sonGiris: '2024-02-26 08:30',
      calismaSuresi: 2
    },
    {
      id: 5,
      ad: 'Ali',
      soyad: 'Veli',
      email: 'ali.veli@kafkasder.org',
      telefon: '+90 536 567 89 01',
      departman: 'Teknoloji',
      pozisyon: 'DevOps Uzmanı',
      rol: 'uzman',
      durum: 'aktif',
      iseBaslamaTarihi: '2022-03-20',
      maas: 7800,
      performansPuani: 87,
      tamamlananProje: 5,
      aktifProje: 2,
      tamamlananGorev: 22,
      bekleyenGorev: 1,
      yetenekler: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      projeler: ['Web Sitesi Yenileme'],
      sonGiris: '2024-02-26 09:30',
      calismaSuresi: 1
    },
    {
      id: 6,
      ad: 'Hasan',
      soyad: 'Hüseyin',
      email: 'hasan.huseyin@kafkasder.org',
      telefon: '+90 537 678 90 12',
      departman: 'Pazarlama',
      pozisyon: 'Pazarlama Uzmanı',
      rol: 'uzman',
      durum: 'aktif',
      iseBaslamaTarihi: '2022-05-15',
      maas: 6500,
      performansPuani: 83,
      tamamlananProje: 3,
      aktifProje: 1,
      tamamlananGorev: 15,
      bekleyenGorev: 2,
      yetenekler: ['Sosyal Medya', 'İçerik Pazarlama', 'Kampanya Yönetimi'],
      projeler: ['Yardım Kampanyası 2024'],
      sonGiris: '2024-02-26 08:15',
      calismaSuresi: 1
    }
  ]);

  const [departmanlar] = useState<Departman[]>([
    {
      id: 1,
      ad: 'Proje Yönetimi',
      aciklama: 'Proje planlama, takip ve yönetimi',
      uyeSayisi: 3,
      yonetici: 'Ahmet Yılmaz',
      projeSayisi: 5,
      butce: 150000
    },
    {
      id: 2,
      ad: 'Teknoloji',
      aciklama: 'Yazılım geliştirme ve teknoloji altyapısı',
      uyeSayisi: 4,
      yonetici: 'Fatma Demir',
      projeSayisi: 3,
      butce: 200000
    },
    {
      id: 3,
      ad: 'Eğitim',
      aciklama: 'Eğitim programları ve içerik geliştirme',
      uyeSayisi: 2,
      yonetici: 'Ayşe Özkan',
      projeSayisi: 2,
      butce: 80000
    },
    {
      id: 4,
      ad: 'Pazarlama',
      aciklama: 'Pazarlama stratejileri ve kampanya yönetimi',
      uyeSayisi: 2,
      yonetici: 'Hasan Hüseyin',
      projeSayisi: 2,
      butce: 60000
    }
  ]);

  const getRolColor = (role: string) => {
    switch (role) {
      case 'yonetici': return 'bg-purple-100 text-purple-800';
      case 'uzman': return 'bg-blue-100 text-blue-800';
      case 'asistan': return 'bg-green-100 text-green-800';
      case 'stajyer': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolText = (role: string) => {
    switch (role) {
      case 'yonetici': return 'Yönetici';
      case 'uzman': return 'Uzman';
      case 'asistan': return 'Asistan';
      case 'stajyer': return 'Stajyer';
      default: return role;
    }
  };

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'izinli': return 'bg-yellow-100 text-yellow-800';
      case 'istifa': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'izinli': return 'İzinli';
      case 'istifa': return 'İstifa';
      default: return status;
    }
  };

  const getPerformansColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredUyeler = ekipUyeleri.filter(uye => {
    const matchesSearch = `${uye.ad} ${uye.soyad}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uye.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uye.pozisyon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || uye.departman === selectedDepartment;
    const matchesRole = !selectedRole || uye.rol === selectedRole;
    const matchesStatus = !selectedStatus || uye.durum === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const toplamUye = ekipUyeleri.length;
  const aktifUye = ekipUyeleri.filter(u => u.durum === 'aktif').length;
  const toplamDepartman = departmanlar.length;
  const ortalamaPerformans = ekipUyeleri.reduce((sum, u) => sum + u.performansPuani, 0) / ekipUyeleri.length;
  const toplamProje = ekipUyeleri.reduce((sum, u) => sum + u.aktifProje, 0);

  const uniqueDepartments = [...new Set(ekipUyeleri.map(u => u.departman))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ekip Yönetimi</h1>
          <p className="text-gray-600">Ekip üyeleri ve departman yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'members' ? 'departments' : 'members')}>
            {viewMode === 'members' ? 'Departmanlar' : 'Ekip Üyeleri'}
          </Button>
          <Button onClick={() => setShowNewMember(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Üye
          </Button>
          <Button variant="outline" onClick={() => setShowNewDepartment(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Departman
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
                <p className="text-sm text-gray-600">Toplam Üye</p>
                <p className="text-2xl font-bold text-gray-900">{toplamUye}</p>
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
                <p className="text-sm text-gray-600">Aktif Üyeler</p>
                <p className="text-2xl font-bold text-green-600">{aktifUye}</p>
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
                <p className="text-sm text-gray-600">Departmanlar</p>
                <p className="text-2xl font-bold text-purple-600">{toplamDepartman}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ortalama Performans</p>
                <p className="text-2xl font-bold text-orange-600">%{Math.round(ortalamaPerformans)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="w-6 h-6 text-orange-600" />
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
                placeholder="Üye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Departman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Departmanlar</SelectItem>
                {uniqueDepartments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Roller</SelectItem>
                <SelectItem value="yonetici">Yönetici</SelectItem>
                <SelectItem value="uzman">Uzman</SelectItem>
                <SelectItem value="asistan">Asistan</SelectItem>
                <SelectItem value="stajyer">Stajyer</SelectItem>
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
                <SelectItem value="izinli">İzinli</SelectItem>
                <SelectItem value="istifa">İstifa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'members' ? (
        <Card>
          <CardHeader>
            <CardTitle>Ekip Üyeleri ({filteredUyeler.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUyeler.map((uye) => (
                <div key={uye.id} className="p-6 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {uye.ad[0]}{uye.soyad[0]}
                      </div>
                      <div>
                        <div className="font-medium text-lg">{uye.ad} {uye.soyad}</div>
                        <div className="text-sm text-gray-500">{uye.pozisyon}</div>
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
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{uye.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{uye.telefon}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{uye.departman}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getRolColor(uye.rol)}>
                      {getRolText(uye.rol)}
                    </Badge>
                    <Badge className={getDurumColor(uye.durum)}>
                      {getDurumText(uye.durum)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-gray-500">Performans</div>
                      <div className={`font-semibold ${getPerformansColor(uye.performansPuani)}`}>
                        %{uye.performansPuani}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Aktif Projeler</div>
                      <div className="font-semibold">{uye.aktifProje}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tamamlanan Görev</div>
                      <div className="font-semibold">{uye.tamamlananGorev}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Çalışma Süresi</div>
                      <div className="font-semibold">{uye.calismaSuresi} yıl</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Yetenekler</div>
                    <div className="flex flex-wrap gap-1">
                      {uye.yetenekler.slice(0, 3).map((yetenek, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {yetenek}
                        </Badge>
                      ))}
                      {uye.yetenekler.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{uye.yetenekler.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Son giriş: {new Date(uye.sonGiris).toLocaleString('tr-TR')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Departmanlar ({departmanlar.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departmanlar.map((departman) => (
                <div key={departman.id} className="p-6 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-medium text-lg">{departman.ad}</div>
                      <div className="text-sm text-gray-500">{departman.aciklama}</div>
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
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-gray-500">Üye Sayısı</div>
                      <div className="font-semibold">{departman.uyeSayisi}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Proje Sayısı</div>
                      <div className="font-semibold">{departman.projeSayisi}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Yönetici</div>
                      <div className="font-semibold">{departman.yonetici}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Bütçe</div>
                      <div className="font-semibold">₺{departman.butce.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      <Users className="w-3 h-3 mr-1" />
                      {departman.uyeSayisi} Üye
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {departman.projeSayisi} Proje
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Member Modal */}
      {showNewMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Ekip Üyesi</h2>
              <Button variant="outline" onClick={() => setShowNewMember(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ad</label>
                  <Input placeholder="Ad girin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Soyad</label>
                  <Input placeholder="Soyad girin" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <Input placeholder="E-posta girin" type="email" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                <Input placeholder="Telefon girin" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Departman</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Departman seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueDepartments.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Pozisyon</label>
                  <Input placeholder="Pozisyon girin" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rol</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rol seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yonetici">Yönetici</SelectItem>
                      <SelectItem value="uzman">Uzman</SelectItem>
                      <SelectItem value="asistan">Asistan</SelectItem>
                      <SelectItem value="stajyer">Stajyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">İşe Başlama Tarihi</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Maaş</label>
                <Input placeholder="₺0.00" type="number" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Yetenekler</label>
                <Input placeholder="Yetenekleri virgülle ayırarak girin" />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Üyeyi Ekle
                </Button>
                <Button variant="outline" onClick={() => setShowNewMember(false)}>
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Department Modal */}
      {showNewDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Departman</h2>
              <Button variant="outline" onClick={() => setShowNewDepartment(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Departman Adı</label>
                <Input placeholder="Departman adı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Departman açıklaması girin" rows={3} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Yönetici</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Yönetici seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {ekipUyeleri.filter(u => u.rol === 'yonetici').map(uye => (
                      <SelectItem key={uye.id} value={uye.id.toString()}>
                        {uye.ad} {uye.soyad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Bütçe</label>
                <Input placeholder="₺0.00" type="number" />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Departmanı Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewDepartment(false)}>
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