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
  UserPlus,
  UserMinus,
  Mail,
  Smartphone,
  MessageSquare,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';

interface MesajGrubu {
  id: number;
  ad: string;
  aciklama: string;
  kategori: string;
  uyeSayisi: number;
  aktifUyeSayisi: number;
  olusturmaTarihi: string;
  olusturan: string;
  sonGuncelleme: string;
  durum: 'aktif' | 'pasif' | 'arsiv';
  iletisimKanali: 'sms' | 'email' | 'whatsapp' | 'tumu';
  otomatikGuncelleme: boolean;
  kriterler: string[];
}

interface GrupUyesi {
  id: number;
  ad: string;
  soyad: string;
  telefon: string;
  email: string;
  uyelikTarihi: string;
  sonIletisim: string;
  durum: 'aktif' | 'pasif';
  kaynak: string;
}

export default function MesajGruplariPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState<number | null>(null);

  const [mesajGruplari] = useState<MesajGrubu[]>([
    {
      id: 1,
      ad: 'Tüm Bağışçılar',
      aciklama: 'Sistemdeki tüm bağışçıların bulunduğu grup',
      kategori: 'Bağışçı',
      uyeSayisi: 2500,
      aktifUyeSayisi: 2200,
      olusturmaTarihi: '2024-01-15',
      olusturan: 'Sistem',
      sonGuncelleme: '2024-01-20',
      durum: 'aktif',
      iletisimKanali: 'tumu',
      otomatikGuncelleme: true,
      kriterler: ['Bağış yapmış kişiler', 'Son 2 yıl içinde']
    },
    {
      id: 2,
      ad: 'Aktif Üyeler',
      aciklama: 'Aktif üyelik durumundaki kişiler',
      kategori: 'Üye',
      uyeSayisi: 800,
      aktifUyeSayisi: 750,
      olusturmaTarihi: '2024-01-10',
      olusturan: 'Ahmet Yılmaz',
      sonGuncelleme: '2024-01-19',
      durum: 'aktif',
      iletisimKanali: 'email',
      otomatikGuncelleme: true,
      kriterler: ['Aktif üyelik', 'Son ödeme tarihi geçerli']
    },
    {
      id: 3,
      ad: 'Gönüllüler',
      aciklama: 'Gönüllü faaliyetlerde bulunan kişiler',
      kategori: 'Gönüllü',
      uyeSayisi: 300,
      aktifUyeSayisi: 280,
      olusturmaTarihi: '2024-01-05',
      olusturan: 'Fatma Demir',
      sonGuncelleme: '2024-01-18',
      durum: 'aktif',
      iletisimKanali: 'whatsapp',
      otomatikGuncelleme: false,
      kriterler: ['Gönüllü kaydı var', 'Son 6 ay içinde faaliyet']
    },
    {
      id: 4,
      ad: 'Süresi Dolan Üyeler',
      aciklama: 'Üyelik süresi dolmuş kişiler',
      kategori: 'Üye',
      uyeSayisi: 150,
      aktifUyeSayisi: 0,
      olusturmaTarihi: '2024-01-12',
      olusturan: 'Mehmet Kaya',
      sonGuncelleme: '2024-01-20',
      durum: 'aktif',
      iletisimKanali: 'sms',
      otomatikGuncelleme: true,
      kriterler: ['Üyelik süresi dolmuş', 'Son 30 gün içinde']
    },
    {
      id: 5,
      ad: 'Yönetim Kurulu',
      aciklama: 'Yönetim kurulu üyeleri',
      kategori: 'Yönetim',
      uyeSayisi: 15,
      aktifUyeSayisi: 15,
      olusturmaTarihi: '2024-01-01',
      olusturan: 'Sistem',
      sonGuncelleme: '2024-01-15',
      durum: 'aktif',
      iletisimKanali: 'tumu',
      otomatikGuncelleme: false,
      kriterler: ['Yönetim kurulu üyesi']
    }
  ]);

  const [grupUyeleri] = useState<GrupUyesi[]>([
    {
      id: 1,
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      telefon: '0555 123 45 67',
      email: 'ahmet@example.com',
      uyelikTarihi: '2023-01-15',
      sonIletisim: '2024-01-20',
      durum: 'aktif',
      kaynak: 'Web sitesi'
    },
    {
      id: 2,
      ad: 'Fatma',
      soyad: 'Demir',
      telefon: '0555 234 56 78',
      email: 'fatma@example.com',
      uyelikTarihi: '2023-03-20',
      sonIletisim: '2024-01-19',
      durum: 'aktif',
      kaynak: 'Sosyal medya'
    },
    {
      id: 3,
      ad: 'Mehmet',
      soyad: 'Kaya',
      telefon: '0555 345 67 89',
      email: 'mehmet@example.com',
      uyelikTarihi: '2023-06-10',
      sonIletisim: '2024-01-18',
      durum: 'aktif',
      kaynak: 'Etkinlik'
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'arsiv': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'arsiv': return 'Arşiv';
      default: return status;
    }
  };

  const getIletisimIcon = (kanal: string) => {
    switch (kanal) {
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'tumu': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getIletisimText = (kanal: string) => {
    switch (kanal) {
      case 'sms': return 'SMS';
      case 'email': return 'E-posta';
      case 'whatsapp': return 'WhatsApp';
      case 'tumu': return 'Tümü';
      default: return kanal;
    }
  };

  const filteredGruplar = mesajGruplari.filter(grup => {
    const matchesSearch = grup.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grup.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || grup.kategori === selectedCategory;
    const matchesStatus = !selectedStatus || grup.durum === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toplamGrup = mesajGruplari.length;
  const toplamUye = mesajGruplari.reduce((sum, g) => sum + g.uyeSayisi, 0);
  const toplamAktifUye = mesajGruplari.reduce((sum, g) => sum + g.aktifUyeSayisi, 0);
  const aktifGrupSayisi = mesajGruplari.filter(g => g.durum === 'aktif').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mesaj Grupları</h1>
          <p className="text-gray-600">Alıcı grupları yönetimi ve kriterleri</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewGroup(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Grup
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
                <p className="text-sm text-gray-600">Toplam Grup</p>
                <p className="text-2xl font-bold text-gray-900">{toplamGrup}</p>
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
                <p className="text-sm text-gray-600">Toplam Üye</p>
                <p className="text-2xl font-bold text-green-600">{toplamUye.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Üye</p>
                <p className="text-2xl font-bold text-blue-600">{toplamAktifUye.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Grup</p>
                <p className="text-2xl font-bold text-purple-600">{aktifGrupSayisi}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Grup adı veya açıklama ara..."
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
                <SelectItem value="Bağışçı">Bağışçı</SelectItem>
                <SelectItem value="Üye">Üye</SelectItem>
                <SelectItem value="Gönüllü">Gönüllü</SelectItem>
                <SelectItem value="Yönetim">Yönetim</SelectItem>
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
                <SelectItem value="arsiv">Arşiv</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Mesaj Grupları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGruplar.map((grup) => (
              <div key={grup.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{grup.ad}</div>
                      <div className="text-sm text-gray-500">{grup.aciklama}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      {getIletisimIcon(grup.iletisimKanali)}
                      <span>{getIletisimText(grup.iletisimKanali)}</span>
                    </Badge>
                    <Badge className={getDurumColor(grup.durum)}>
                      {getDurumText(grup.durum)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Toplam Üye</div>
                    <div className="font-medium">{grup.uyeSayisi.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Aktif Üye</div>
                    <div className="font-medium text-green-600">{grup.aktifUyeSayisi.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Kategori</div>
                    <div className="font-medium">{grup.kategori}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Otomatik Güncelleme</div>
                    <div className="font-medium">{grup.otomatikGuncelleme ? 'Açık' : 'Kapalı'}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-500 mb-1">Kriterler:</div>
                  <div className="flex flex-wrap gap-1">
                    {grup.kriterler.map((kriter, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {kriter}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {grup.olusturan} • {grup.olusturmaTarihi}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowGroupDetails(grup.id)}
                    >
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

      {/* New Group Modal */}
      {showNewGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Mesaj Grubu</h2>
              <Button variant="outline" onClick={() => setShowNewGroup(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Grup Adı</label>
                <Input placeholder="Grup adı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Grup açıklaması girin" rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bagisci">Bağışçı</SelectItem>
                      <SelectItem value="uye">Üye</SelectItem>
                      <SelectItem value="gonullu">Gönüllü</SelectItem>
                      <SelectItem value="yonetim">Yönetim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">İletişim Kanalı</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kanal seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">E-posta</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="tumu">Tümü</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Grubu Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewGroup(false)}>
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Group Details Modal */}
      {showGroupDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Grup Detayları</h2>
              <Button variant="outline" onClick={() => setShowGroupDetails(null)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Grup Bilgileri</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Ad:</strong> Tüm Bağışçılar</div>
                    <div><strong>Açıklama:</strong> Sistemdeki tüm bağışçıların bulunduğu grup</div>
                    <div><strong>Kategori:</strong> Bağışçı</div>
                    <div><strong>İletişim Kanalı:</strong> Tümü</div>
                    <div><strong>Durum:</strong> Aktif</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">İstatistikler</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Toplam Üye:</strong> 2,500</div>
                    <div><strong>Aktif Üye:</strong> 2,200</div>
                    <div><strong>Oluşturma Tarihi:</strong> 15.01.2024</div>
                    <div><strong>Son Güncelleme:</strong> 20.01.2024</div>
                    <div><strong>Oluşturan:</strong> Sistem</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Grup Üyeleri</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Ad Soyad</th>
                        <th className="px-4 py-2 text-left">Telefon</th>
                        <th className="px-4 py-2 text-left">E-posta</th>
                        <th className="px-4 py-2 text-left">Durum</th>
                        <th className="px-4 py-2 text-left">Son İletişim</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grupUyeleri.map((uye) => (
                        <tr key={uye.id} className="border-t">
                          <td className="px-4 py-2">{uye.ad} {uye.soyad}</td>
                          <td className="px-4 py-2">{uye.telefon}</td>
                          <td className="px-4 py-2">{uye.email}</td>
                          <td className="px-4 py-2">
                            <Badge className={uye.durum === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {uye.durum === 'aktif' ? 'Aktif' : 'Pasif'}
                            </Badge>
                          </td>
                          <td className="px-4 py-2">{uye.sonIletisim}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 