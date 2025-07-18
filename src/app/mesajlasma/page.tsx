'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Smartphone, 
  Send, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Phone,
  Calendar
} from 'lucide-react';

interface SmsKampanya {
  id: number;
  baslik: string;
  mesaj: string;
  aliciSayisi: number;
  gonderilenSayisi: number;
  basariliSayisi: number;
  hataliSayisi: number;
  durum: 'hazirlaniyor' | 'gonderiliyor' | 'tamamlandi' | 'iptal';
  olusturmaTarihi: string;
  gonderimTarihi?: string;
  olusturan: string;
  aliciGrubu: string;
  karakterSayisi: number;
  mesajSayisi: number;
}

interface SmsSablonu {
  id: number;
  baslik: string;
  icerik: string;
  kategori: string;
  karakterSayisi: number;
  kullanilmaSayisi: number;
  olusturmaTarihi: string;
}

export default function SmsGonderimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const [smsKampanyalari] = useState<SmsKampanya[]>([
    {
      id: 1,
      baslik: 'Yılbaşı Bağış Kampanyası',
      mesaj: 'Yeni yılda ihtiyaç sahiplerine umut olun. Bağışınız için teşekkürler. KAFKASDER',
      aliciSayisi: 2500,
      gonderilenSayisi: 2500,
      basariliSayisi: 2450,
      hataliSayisi: 50,
      durum: 'tamamlandi',
      olusturmaTarihi: '2024-01-20 10:30:00',
      gonderimTarihi: '2024-01-20 11:00:00',
      olusturan: 'Ahmet Yılmaz',
      aliciGrubu: 'Tüm Bağışçılar',
      karakterSayisi: 120,
      mesajSayisi: 3
    },
    {
      id: 2,
      baslik: 'Acil Yardım Duyurusu',
      mesaj: 'Deprem bölgesi için acil yardım kampanyası başlatıldı. Destek olmak için: 0555 123 45 67',
      aliciSayisi: 1800,
      gonderilenSayisi: 1200,
      basariliSayisi: 1150,
      hataliSayisi: 50,
      durum: 'gonderiliyor',
      olusturmaTarihi: '2024-01-20 14:15:00',
      olusturan: 'Fatma Demir',
      aliciGrubu: 'Aktif Üyeler',
      karakterSayisi: 140,
      mesajSayisi: 2
    },
    {
      id: 3,
      baslik: 'Üyelik Yenileme Hatırlatması',
      mesaj: 'Üyeliğinizin sona ermesine 30 gün kaldı. Yenilemek için: www.kafkasder.org',
      aliciSayisi: 800,
      gonderilenSayisi: 0,
      basariliSayisi: 0,
      hataliSayisi: 0,
      durum: 'hazirlaniyor',
      olusturmaTarihi: '2024-01-20 16:45:00',
      olusturan: 'Mehmet Kaya',
      aliciGrubu: 'Süresi Dolan Üyeler',
      karakterSayisi: 110,
      mesajSayisi: 2
    },
    {
      id: 4,
      baslik: 'Etkinlik Daveti',
      mesaj: 'Bu hafta sonu düzenleyeceğimiz yardım etkinliğine davetlisiniz. Detaylar için arayın.',
      aliciSayisi: 500,
      gonderilenSayisi: 500,
      basariliSayisi: 480,
      hataliSayisi: 20,
      durum: 'tamamlandi',
      olusturmaTarihi: '2024-01-19 09:20:00',
      gonderimTarihi: '2024-01-19 10:00:00',
      olusturan: 'Ayşe Özkan',
      aliciGrubu: 'Gönüllüler',
      karakterSayisi: 130,
      mesajSayisi: 2
    }
  ]);

  const [smsSablonlari] = useState<SmsSablonu[]>([
    {
      id: 1,
      baslik: 'Bağış Teşekkürü',
      icerik: 'Bağışınız için teşekkür ederiz. İhtiyaç sahiplerine umut oldunuz. KAFKASDER',
      kategori: 'Teşekkür',
      karakterSayisi: 95,
      kullanilmaSayisi: 45,
      olusturmaTarihi: '2024-01-15'
    },
    {
      id: 2,
      baslik: 'Etkinlik Daveti',
      icerik: 'Bu hafta sonu düzenleyeceğimiz yardım etkinliğine davetlisiniz. Detaylar için arayın.',
      kategori: 'Davet',
      karakterSayisi: 130,
      kullanilmaSayisi: 23,
      olusturmaTarihi: '2024-01-10'
    },
    {
      id: 3,
      baslik: 'Acil Yardım',
      icerik: 'Acil yardım kampanyası başlatıldı. Destek olmak için: 0555 123 45 67',
      kategori: 'Acil',
      karakterSayisi: 110,
      kullanilmaSayisi: 12,
      olusturmaTarihi: '2024-01-05'
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'gonderiliyor': return 'bg-blue-100 text-blue-800';
      case 'hazirlaniyor': return 'bg-yellow-100 text-yellow-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'gonderiliyor': return 'Gönderiliyor';
      case 'hazirlaniyor': return 'Hazırlanıyor';
      case 'iptal': return 'İptal';
      default: return status;
    }
  };

  const getDurumIcon = (status: string) => {
    switch (status) {
      case 'tamamlandi': return <CheckCircle className="w-4 h-4" />;
      case 'gonderiliyor': return <Clock className="w-4 h-4 animate-pulse" />;
      case 'hazirlaniyor': return <AlertCircle className="w-4 h-4" />;
      case 'iptal': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredKampanyalar = smsKampanyalari.filter(kampanya => {
    const matchesSearch = kampanya.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kampanya.mesaj.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || kampanya.durum === selectedStatus;
    const matchesGroup = !selectedGroup || kampanya.aliciGrubu === selectedGroup;
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const toplamKampanya = smsKampanyalari.length;
  const toplamAlici = smsKampanyalari.reduce((sum, k) => sum + k.aliciSayisi, 0);
  const toplamBasarili = smsKampanyalari.reduce((sum, k) => sum + k.basariliSayisi, 0);
  const basariOrani = toplamAlici > 0 ? Math.round((toplamBasarili / toplamAlici) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS Gönderimi</h1>
          <p className="text-gray-600">Toplu SMS gönderimi ve kampanya yönetimi</p>
        </div>
        <div className="flex space-x-2">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kampanya</p>
                <p className="text-2xl font-bold text-gray-900">{toplamKampanya}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Alıcı</p>
                <p className="text-2xl font-bold text-green-600">{toplamAlici.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Başarılı Gönderim</p>
                <p className="text-2xl font-bold text-blue-600">{toplamBasarili.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Başarı Oranı</p>
                <p className="text-2xl font-bold text-purple-600">%{basariOrani}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Smartphone className="w-6 h-6 text-purple-600" />
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
                placeholder="Kampanya adı veya mesaj ara..."
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
                <SelectItem value="hazirlaniyor">Hazırlanıyor</SelectItem>
                <SelectItem value="gonderiliyor">Gönderiliyor</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Alıcı Grubu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Gruplar</SelectItem>
                <SelectItem value="Tüm Bağışçılar">Tüm Bağışçılar</SelectItem>
                <SelectItem value="Aktif Üyeler">Aktif Üyeler</SelectItem>
                <SelectItem value="Süresi Dolan Üyeler">Süresi Dolan Üyeler</SelectItem>
                <SelectItem value="Gönüllüler">Gönüllüler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns and Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>SMS Kampanyaları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredKampanyalar.map((kampanya) => (
                <div key={kampanya.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{kampanya.baslik}</div>
                        <div className="text-sm text-gray-500">{kampanya.aliciGrubu}</div>
                      </div>
                    </div>
                    <Badge className={getDurumColor(kampanya.durum)}>
                      {getDurumIcon(kampanya.durum)}
                      <span className="ml-1">{getDurumText(kampanya.durum)}</span>
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">{kampanya.mesaj}</div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Alıcı</div>
                      <div className="font-medium">{kampanya.aliciSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Gönderilen</div>
                      <div className="font-medium">{kampanya.gonderilenSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Başarılı</div>
                      <div className="font-medium text-green-600">{kampanya.basariliSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Hatalı</div>
                      <div className="font-medium text-red-600">{kampanya.hataliSayisi.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="text-xs text-gray-500">
                      {kampanya.olusturan} • {kampanya.olusturmaTarihi}
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

        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle>SMS Şablonları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {smsSablonlari.map((sablon) => (
                <div key={sablon.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{sablon.baslik}</div>
                    <Badge variant="outline">{sablon.kategori}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{sablon.icerik}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{sablon.karakterSayisi} karakter</span>
                    <span>{sablon.kullanilmaSayisi} kullanım</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni SMS Kampanyası</h2>
              <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kampanya Başlığı</label>
                <Input placeholder="Kampanya başlığı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Alıcı Grubu</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Alıcı grubu seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tum-bagiscilar">Tüm Bağışçılar</SelectItem>
                    <SelectItem value="aktif-uyeler">Aktif Üyeler</SelectItem>
                    <SelectItem value="suresi-dolan-uyeler">Süresi Dolan Üyeler</SelectItem>
                    <SelectItem value="gonulluler">Gönüllüler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mesaj İçeriği</label>
                <Textarea 
                  placeholder="SMS mesajınızı yazın..."
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1">
                  Karakter sayısı: 0/160
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Kampanyayı Başlat
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