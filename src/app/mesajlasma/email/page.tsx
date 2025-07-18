'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
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
  Calendar,
  FileText,
  Image,
  Link
} from 'lucide-react';

interface EmailKampanya {
  id: number;
  baslik: string;
  konu: string;
  icerik: string;
  aliciSayisi: number;
  gonderilenSayisi: number;
  acilanSayisi: number;
  tiklananSayisi: number;
  durum: 'hazirlaniyor' | 'gonderiliyor' | 'tamamlandi' | 'iptal';
  olusturmaTarihi: string;
  gonderimTarihi?: string;
  olusturan: string;
  aliciGrubu: string;
  sablonAdi: string;
  acilmaOrani: number;
  tiklanmaOrani: number;
}

interface EmailSablonu {
  id: number;
  ad: string;
  aciklama: string;
  kategori: string;
  onizleme: string;
  kullanilmaSayisi: number;
  olusturmaTarihi: string;
  renkTemasi: string;
}

export default function EmailGonderimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const [emailKampanyalari] = useState<EmailKampanya[]>([
    {
      id: 1,
      baslik: 'Yılbaşı Bağış Kampanyası',
      konu: 'Yeni yılda ihtiyaç sahiplerine umut olun',
      icerik: 'Sevgili bağışçımız, yeni yılda ihtiyaç sahiplerine umut olmak için...',
      aliciSayisi: 2500,
      gonderilenSayisi: 2500,
      acilanSayisi: 1875,
      tiklananSayisi: 375,
      durum: 'tamamlandi',
      olusturmaTarihi: '2024-01-20 10:30:00',
      gonderimTarihi: '2024-01-20 11:00:00',
      olusturan: 'Ahmet Yılmaz',
      aliciGrubu: 'Tüm Bağışçılar',
      sablonAdi: 'Bağış Kampanyası',
      acilmaOrani: 75.0,
      tiklanmaOrani: 15.0
    },
    {
      id: 2,
      baslik: 'Aylık Bülten',
      konu: 'KAFKASDER Ocak 2024 Bülteni',
      icerik: 'Bu ay gerçekleştirdiğimiz faaliyetler ve gelecek planlarımız...',
      aliciSayisi: 1800,
      gonderilenSayisi: 1200,
      acilanSayisi: 840,
      tiklananSayisi: 168,
      durum: 'gonderiliyor',
      olusturmaTarihi: '2024-01-20 14:15:00',
      olusturan: 'Fatma Demir',
      aliciGrubu: 'Aktif Üyeler',
      sablonAdi: 'Aylık Bülten',
      acilmaOrani: 70.0,
      tiklanmaOrani: 14.0
    },
    {
      id: 3,
      baslik: 'Etkinlik Daveti',
      konu: 'Bu hafta sonu yardım etkinliğine davetlisiniz',
      icerik: 'Sevgili gönüllümüz, bu hafta sonu düzenleyeceğimiz yardım etkinliğine...',
      aliciSayisi: 800,
      gonderilenSayisi: 0,
      acilanSayisi: 0,
      tiklananSayisi: 0,
      durum: 'hazirlaniyor',
      olusturmaTarihi: '2024-01-20 16:45:00',
      olusturan: 'Mehmet Kaya',
      aliciGrubu: 'Gönüllüler',
      sablonAdi: 'Etkinlik Daveti',
      acilmaOrani: 0,
      tiklanmaOrani: 0
    },
    {
      id: 4,
      baslik: 'Üyelik Yenileme',
      konu: 'Üyeliğinizin sona ermesine 30 gün kaldı',
      icerik: 'Değerli üyemiz, üyeliğinizin sona ermesine 30 gün kaldı...',
      aliciSayisi: 500,
      gonderilenSayisi: 500,
      acilanSayisi: 350,
      tiklananSayisi: 105,
      durum: 'tamamlandi',
      olusturmaTarihi: '2024-01-19 09:20:00',
      gonderimTarihi: '2024-01-19 10:00:00',
      olusturan: 'Ayşe Özkan',
      aliciGrubu: 'Süresi Dolan Üyeler',
      sablonAdi: 'Üyelik Hatırlatma',
      acilmaOrani: 70.0,
      tiklanmaOrani: 21.0
    }
  ]);

  const [emailSablonlari] = useState<EmailSablonu[]>([
    {
      id: 1,
      ad: 'Bağış Kampanyası',
      aciklama: 'Bağış kampanyaları için profesyonel şablon',
      kategori: 'Kampanya',
      onizleme: 'Bağış kampanyası e-postası önizlemesi...',
      kullanilmaSayisi: 45,
      olusturmaTarihi: '2024-01-15',
      renkTemasi: 'Mavi'
    },
    {
      id: 2,
      ad: 'Aylık Bülten',
      aciklama: 'Aylık faaliyet bülteni şablonu',
      kategori: 'Bülten',
      onizleme: 'Aylık bülten e-postası önizlemesi...',
      kullanilmaSayisi: 23,
      olusturmaTarihi: '2024-01-10',
      renkTemasi: 'Yeşil'
    },
    {
      id: 3,
      ad: 'Etkinlik Daveti',
      aciklama: 'Etkinlik davetleri için şablon',
      kategori: 'Davet',
      onizleme: 'Etkinlik daveti e-postası önizlemesi...',
      kullanilmaSayisi: 12,
      olusturmaTarihi: '2024-01-05',
      renkTemasi: 'Turuncu'
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

  const filteredKampanyalar = emailKampanyalari.filter(kampanya => {
    const matchesSearch = kampanya.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kampanya.konu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || kampanya.durum === selectedStatus;
    const matchesGroup = !selectedGroup || kampanya.aliciGrubu === selectedGroup;
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const toplamKampanya = emailKampanyalari.length;
  const toplamAlici = emailKampanyalari.reduce((sum, k) => sum + k.aliciSayisi, 0);
  const toplamGonderilen = emailKampanyalari.reduce((sum, k) => sum + k.gonderilenSayisi, 0);
  const toplamAcilan = emailKampanyalari.reduce((sum, k) => sum + k.acilanSayisi, 0);
  const ortalamaAcilmaOrani = toplamGonderilen > 0 ? Math.round((toplamAcilan / toplamGonderilen) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">E-posta Gönderimi</h1>
          <p className="text-gray-600">E-posta kampanyaları ve bülten yönetimi</p>
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
                <Mail className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Açılma Oranı</p>
                <p className="text-2xl font-bold text-purple-600">%{ortalamaAcilmaOrani}</p>
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
                placeholder="Kampanya adı veya konu ara..."
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
            <CardTitle>E-posta Kampanyaları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredKampanyalar.map((kampanya) => (
                <div key={kampanya.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
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
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Konu:</strong> {kampanya.konu}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{kampanya.icerik.substring(0, 100)}...</div>
                  
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
                      <div className="text-gray-500">Açılan</div>
                      <div className="font-medium text-green-600">{kampanya.acilanSayisi.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tıklanan</div>
                      <div className="font-medium text-blue-600">{kampanya.tiklananSayisi.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Açılma Oranı</div>
                      <div className="font-medium text-green-600">%{kampanya.acilmaOrani}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tıklanma Oranı</div>
                      <div className="font-medium text-blue-600">%{kampanya.tiklanmaOrani}</div>
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
            <CardTitle>E-posta Şablonları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emailSablonlari.map((sablon) => (
                <div key={sablon.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{sablon.ad}</div>
                    <Badge variant="outline">{sablon.kategori}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{sablon.aciklama}</div>
                  <div className="text-xs text-gray-500 mb-2">{sablon.onizleme}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{sablon.kullanilmaSayisi} kullanım</span>
                    <span className={`px-2 py-1 rounded text-white text-xs ${
                      sablon.renkTemasi === 'Mavi' ? 'bg-blue-500' :
                      sablon.renkTemasi === 'Yeşil' ? 'bg-green-500' :
                      sablon.renkTemasi === 'Turuncu' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}>
                      {sablon.renkTemasi}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni E-posta Kampanyası</h2>
              <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kampanya Başlığı</label>
                  <Input placeholder="Kampanya başlığı girin" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta Konusu</label>
                  <Input placeholder="E-posta konusu girin" />
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
                  <label className="block text-sm font-medium mb-2">Şablon</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Şablon seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailSablonlari.map((sablon) => (
                        <SelectItem key={sablon.id} value={sablon.id.toString()}>
                          {sablon.ad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta İçeriği</label>
                  <Textarea 
                    placeholder="E-posta içeriğinizi yazın..."
                    rows={8}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    Resim Ekle
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link className="w-4 h-4 mr-2" />
                    Link Ekle
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Dosya Ekle
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-6">
              <Button className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Kampanyayı Başlat
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Önizle
              </Button>
              <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                İptal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 