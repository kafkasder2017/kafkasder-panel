'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
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
  Smartphone,
  Calendar,
  FileText,
  Image,
  Video,
  File
} from 'lucide-react';

interface WhatsAppKampanya {
  id: number;
  baslik: string;
  mesaj: string;
  medyaTuru: 'text' | 'image' | 'video' | 'document' | 'audio';
  medyaUrl?: string;
  aliciSayisi: number;
  gonderilenSayisi: number;
  okunanSayisi: number;
  yanitlananSayisi: number;
  durum: 'hazirlaniyor' | 'gonderiliyor' | 'tamamlandi' | 'iptal';
  olusturmaTarihi: string;
  gonderimTarihi?: string;
  olusturan: string;
  aliciGrubu: string;
  sablonAdi: string;
  okunmaOrani: number;
  yanitlanmaOrani: number;
}

interface WhatsAppSablonu {
  id: number;
  baslik: string;
  icerik: string;
  kategori: string;
  medyaTuru: string;
  onayDurumu: 'onaylandi' | 'beklemede' | 'reddedildi';
  kullanilmaSayisi: number;
  olusturmaTarihi: string;
}

export default function WhatsAppGonderimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const [whatsappKampanyalari] = useState<WhatsAppKampanya[]>([
    {
      id: 1,
      baslik: 'Acil Yardım Duyurusu',
      mesaj: 'Deprem bölgesi için acil yardım kampanyası başlatıldı. Destek olmak için: 0555 123 45 67',
      medyaTuru: 'text',
      aliciSayisi: 1500,
      gonderilenSayisi: 1500,
      okunanSayisi: 1350,
      yanitlananSayisi: 225,
      durum: 'tamamlandi',
      olusturmaTarihi: '2024-01-20 10:30:00',
      gonderimTarihi: '2024-01-20 11:00:00',
      olusturan: 'Ahmet Yılmaz',
      aliciGrubu: 'Aktif Üyeler',
      sablonAdi: 'Acil Duyuru',
      okunmaOrani: 90.0,
      yanitlanmaOrani: 15.0
    },
    {
      id: 2,
      baslik: 'Etkinlik Daveti',
      mesaj: 'Bu hafta sonu düzenleyeceğimiz yardım etkinliğine davetlisiniz. Detaylar için arayın.',
      medyaTuru: 'image',
      medyaUrl: '/etkinlik-posteri.jpg',
      aliciSayisi: 800,
      gonderilenSayisi: 600,
      okunanSayisi: 540,
      yanitlananSayisi: 108,
      durum: 'gonderiliyor',
      olusturmaTarihi: '2024-01-20 14:15:00',
      olusturan: 'Fatma Demir',
      aliciGrubu: 'Gönüllüler',
      sablonAdi: 'Etkinlik Daveti',
      okunmaOrani: 90.0,
      yanitlanmaOrani: 18.0
    },
    {
      id: 3,
      baslik: 'Bağış Teşekkürü',
      mesaj: 'Bağışınız için teşekkür ederiz. İhtiyaç sahiplerine umut oldunuz. KAFKASDER',
      medyaTuru: 'text',
      aliciSayisi: 1200,
      gonderilenSayisi: 0,
      okunanSayisi: 0,
      yanitlananSayisi: 0,
      durum: 'hazirlaniyor',
      olusturmaTarihi: '2024-01-20 16:45:00',
      olusturan: 'Mehmet Kaya',
      aliciGrubu: 'Tüm Bağışçılar',
      sablonAdi: 'Teşekkür Mesajı',
      okunmaOrani: 0,
      yanitlanmaOrani: 0
    },
    {
      id: 4,
      baslik: 'Rapor Paylaşımı',
      mesaj: 'Ocak 2024 faaliyet raporumuzu incelemek için tıklayın.',
      medyaTuru: 'document',
      medyaUrl: '/rapor-ocak-2024.pdf',
      aliciSayisi: 500,
      gonderilenSayisi: 500,
      okunanSayisi: 425,
      yanitlananSayisi: 85,
      durum: 'tamamlandi',
      olusturmaTarihi: '2024-01-19 09:20:00',
      gonderimTarihi: '2024-01-19 10:00:00',
      olusturan: 'Ayşe Özkan',
      aliciGrubu: 'Yönetim Kurulu',
      sablonAdi: 'Rapor Paylaşımı',
      okunmaOrani: 85.0,
      yanitlanmaOrani: 17.0
    }
  ]);

  const [whatsappSablonlari] = useState<WhatsAppSablonu[]>([
    {
      id: 1,
      baslik: 'Acil Duyuru',
      icerik: 'Acil durum duyurusu için şablon',
      kategori: 'Duyuru',
      medyaTuru: 'text',
      onayDurumu: 'onaylandi',
      kullanilmaSayisi: 25,
      olusturmaTarihi: '2024-01-15'
    },
    {
      id: 2,
      baslik: 'Etkinlik Daveti',
      icerik: 'Etkinlik davetleri için şablon',
      kategori: 'Davet',
      medyaTuru: 'image',
      onayDurumu: 'onaylandi',
      kullanilmaSayisi: 18,
      olusturmaTarihi: '2024-01-10'
    },
    {
      id: 3,
      baslik: 'Teşekkür Mesajı',
      icerik: 'Bağış teşekkürü için şablon',
      kategori: 'Teşekkür',
      medyaTuru: 'text',
      onayDurumu: 'beklemede',
      kullanilmaSayisi: 8,
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

  const getMedyaIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <File className="w-4 h-4" />;
      case 'audio': return <FileText className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getMedyaText = (type: string) => {
    switch (type) {
      case 'text': return 'Metin';
      case 'image': return 'Resim';
      case 'video': return 'Video';
      case 'document': return 'Belge';
      case 'audio': return 'Ses';
      default: return type;
    }
  };

  const getOnayDurumuColor = (status: string) => {
    switch (status) {
      case 'onaylandi': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredKampanyalar = whatsappKampanyalari.filter(kampanya => {
    const matchesSearch = kampanya.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kampanya.mesaj.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || kampanya.durum === selectedStatus;
    const matchesGroup = !selectedGroup || kampanya.aliciGrubu === selectedGroup;
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const toplamKampanya = whatsappKampanyalari.length;
  const toplamAlici = whatsappKampanyalari.reduce((sum, k) => sum + k.aliciSayisi, 0);
  const toplamGonderilen = whatsappKampanyalari.reduce((sum, k) => sum + k.gonderilenSayisi, 0);
  const toplamOkunan = whatsappKampanyalari.reduce((sum, k) => sum + k.okunanSayisi, 0);
  const ortalamaOkunmaOrani = toplamGonderilen > 0 ? Math.round((toplamOkunan / toplamGonderilen) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Gönderimi</h1>
          <p className="text-gray-600">WhatsApp Business API ile mesaj gönderimi</p>
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
              <div className="p-3 bg-green-100 rounded-full">
                <MessageSquare className="w-6 h-6 text-green-600" />
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
                <p className="text-sm text-gray-600">Gönderilen</p>
                <p className="text-2xl font-bold text-blue-600">{toplamGonderilen.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Okunma Oranı</p>
                <p className="text-2xl font-bold text-purple-600">%{ortalamaOkunmaOrani}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
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
                <SelectItem value="Gönüllüler">Gönüllüler</SelectItem>
                <SelectItem value="Yönetim Kurulu">Yönetim Kurulu</SelectItem>
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
            <CardTitle>WhatsApp Kampanyaları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredKampanyalar.map((kampanya) => (
                <div key={kampanya.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium">{kampanya.baslik}</div>
                        <div className="text-sm text-gray-500">{kampanya.aliciGrubu}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center space-x-1">
                        {getMedyaIcon(kampanya.medyaTuru)}
                        <span>{getMedyaText(kampanya.medyaTuru)}</span>
                      </Badge>
                      <Badge className={getDurumColor(kampanya.durum)}>
                        {getDurumIcon(kampanya.durum)}
                        <span className="ml-1">{getDurumText(kampanya.durum)}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">{kampanya.mesaj}</div>
                  
                  {kampanya.medyaUrl && (
                    <div className="text-xs text-gray-500 mb-3">
                      Medya: {kampanya.medyaUrl}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Alıcı</div>
                      <div className="font-medium">{kampanya.aliciSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Gönderilen</div>
                      <div className="font-medium">{kampanya.gonderilenSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Okunan</div>
                      <div className="font-medium text-green-600">{kampanya.okunanSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Yanıtlanan</div>
                      <div className="font-medium text-blue-600">{kampanya.yanitlananSayisi.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Okunma Oranı</div>
                      <div className="font-medium text-green-600">%{kampanya.okunmaOrani}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Yanıtlanma Oranı</div>
                      <div className="font-medium text-blue-600">%{kampanya.yanitlanmaOrani}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
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
            <CardTitle>WhatsApp Şablonları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {whatsappSablonlari.map((sablon) => (
                <div key={sablon.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{sablon.baslik}</div>
                    <Badge className={getOnayDurumuColor(sablon.onayDurumu)}>
                      {sablon.onayDurumu === 'onaylandi' ? 'Onaylı' : 
                       sablon.onayDurumu === 'beklemede' ? 'Beklemede' : 'Reddedildi'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{sablon.icerik}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{sablon.kullanilmaSayisi} kullanım</span>
                    <span className="flex items-center space-x-1">
                      {getMedyaIcon(sablon.medyaTuru)}
                      <span>{getMedyaText(sablon.medyaTuru)}</span>
                    </span>
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
              <h2 className="text-xl font-bold">Yeni WhatsApp Kampanyası</h2>
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
                    <SelectItem value="gonulluler">Gönüllüler</SelectItem>
                    <SelectItem value="yonetim-kurulu">Yönetim Kurulu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Medya Türü</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Medya türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Metin</SelectItem>
                    <SelectItem value="image">Resim</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Belge</SelectItem>
                    <SelectItem value="audio">Ses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mesaj İçeriği</label>
                <Textarea 
                  placeholder="WhatsApp mesajınızı yazın..."
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1">
                  Karakter sayısı: 0/1000
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