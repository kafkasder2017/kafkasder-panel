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
  Copy,
  Mail,
  Smartphone,
  MessageSquare,
  Calendar,
  Tag,
  Settings,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface MesajSablonu {
  id: number;
  baslik: string;
  aciklama: string;
  icerik: string;
  kategori: string;
  iletisimKanali: 'sms' | 'email' | 'whatsapp';
  durum: 'aktif' | 'pasif' | 'taslak';
  onayDurumu: 'onaylandi' | 'beklemede' | 'reddedildi';
  kullanilmaSayisi: number;
  olusturmaTarihi: string;
  olusturan: string;
  sonGuncelleme: string;
  karakterSayisi: number;
  degiskenler: string[];
  etiketler: string[];
}

export default function MesajSablonlariPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [showTemplateDetails, setShowTemplateDetails] = useState<number | null>(null);

  const [mesajSablonlari] = useState<MesajSablonu[]>([
    {
      id: 1,
      baslik: 'Bağış Teşekkürü',
      aciklama: 'Bağış yapan kişilere gönderilen teşekkür mesajı',
      icerik: 'Sevgili {ad} {soyad}, {tutar} TL tutarındaki bağışınız için teşekkür ederiz. İhtiyaç sahiplerine umut oldunuz. KAFKASDER',
      kategori: 'Teşekkür',
      iletisimKanali: 'sms',
      durum: 'aktif',
      onayDurumu: 'onaylandi',
      kullanilmaSayisi: 45,
      olusturmaTarihi: '2024-01-15',
      olusturan: 'Ahmet Yılmaz',
      sonGuncelleme: '2024-01-20',
      karakterSayisi: 120,
      degiskenler: ['{ad}', '{soyad}', '{tutar}'],
      etiketler: ['bağış', 'teşekkür', 'otomatik']
    },
    {
      id: 2,
      baslik: 'Etkinlik Daveti',
      aciklama: 'Etkinlik davetleri için kullanılan şablon',
      icerik: 'Sevgili {ad}, {etkinlik_adi} etkinliğimize davetlisiniz. Tarih: {tarih}, Saat: {saat}, Yer: {yer}. Detaylar için: {link}',
      kategori: 'Davet',
      iletisimKanali: 'email',
      durum: 'aktif',
      onayDurumu: 'onaylandi',
      kullanilmaSayisi: 23,
      olusturmaTarihi: '2024-01-10',
      olusturan: 'Fatma Demir',
      sonGuncelleme: '2024-01-18',
      karakterSayisi: 180,
      degiskenler: ['{ad}', '{etkinlik_adi}', '{tarih}', '{saat}', '{yer}', '{link}'],
      etiketler: ['etkinlik', 'davet', 'toplu']
    },
    {
      id: 3,
      baslik: 'Acil Yardım Duyurusu',
      aciklama: 'Acil durumlar için kullanılan duyuru şablonu',
      icerik: 'ACİL: {bolge} bölgesinde {durum} yaşanmıştır. Yardım için: {telefon} veya {link}',
      kategori: 'Duyuru',
      iletisimKanali: 'whatsapp',
      durum: 'aktif',
      onayDurumu: 'onaylandi',
      kullanilmaSayisi: 12,
      olusturmaTarihi: '2024-01-05',
      olusturan: 'Mehmet Kaya',
      sonGuncelleme: '2024-01-15',
      karakterSayisi: 140,
      degiskenler: ['{bolge}', '{durum}', '{telefon}', '{link}'],
      etiketler: ['acil', 'duyuru', 'yardım']
    },
    {
      id: 4,
      baslik: 'Üyelik Yenileme Hatırlatması',
      aciklama: 'Üyelik süresi dolan kişilere gönderilen hatırlatma',
      icerik: 'Değerli üyemiz {ad} {soyad}, üyeliğinizin sona ermesine {gun} gün kaldı. Yenilemek için: {link}',
      kategori: 'Hatırlatma',
      iletisimKanali: 'sms',
      durum: 'aktif',
      onayDurumu: 'beklemede',
      kullanilmaSayisi: 8,
      olusturmaTarihi: '2024-01-12',
      olusturan: 'Ayşe Özkan',
      sonGuncelleme: '2024-01-19',
      karakterSayisi: 150,
      degiskenler: ['{ad}', '{soyad}', '{gun}', '{link}'],
      etiketler: ['üyelik', 'hatırlatma', 'otomatik']
    },
    {
      id: 5,
      baslik: 'Aylık Bülten',
      aciklama: 'Aylık faaliyet bülteni şablonu',
      icerik: 'KAFKASDER {ay} {yil} Bülteni\n\nBu ay gerçekleştirdiğimiz faaliyetler:\n{faaliyetler}\n\nGelecek ay planlarımız:\n{planlar}\n\nDetaylar: {link}',
      kategori: 'Bülten',
      iletisimKanali: 'email',
      durum: 'taslak',
      onayDurumu: 'beklemede',
      kullanilmaSayisi: 0,
      olusturmaTarihi: '2024-01-20',
      olusturan: 'Sistem',
      sonGuncelleme: '2024-01-20',
      karakterSayisi: 300,
      degiskenler: ['{ay}', '{yil}', '{faaliyetler}', '{planlar}', '{link}'],
      etiketler: ['bülten', 'aylık', 'rapor']
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'taslak': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'taslak': return 'Taslak';
      default: return status;
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

  const getOnayDurumuIcon = (status: string) => {
    switch (status) {
      case 'onaylandi': return <CheckCircle className="w-4 h-4" />;
      case 'beklemede': return <Clock className="w-4 h-4" />;
      case 'reddedildi': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getIletisimIcon = (kanal: string) => {
    switch (kanal) {
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getIletisimText = (kanal: string) => {
    switch (kanal) {
      case 'sms': return 'SMS';
      case 'email': return 'E-posta';
      case 'whatsapp': return 'WhatsApp';
      default: return kanal;
    }
  };

  const filteredSablonlar = mesajSablonlari.filter(sablon => {
    const matchesSearch = sablon.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sablon.aciklama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sablon.icerik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || sablon.kategori === selectedCategory;
    const matchesChannel = !selectedChannel || sablon.iletisimKanali === selectedChannel;
    const matchesStatus = !selectedStatus || sablon.durum === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesChannel && matchesStatus;
  });

  const toplamSablon = mesajSablonlari.length;
  const aktifSablon = mesajSablonlari.filter(s => s.durum === 'aktif').length;
  const onayliSablon = mesajSablonlari.filter(s => s.onayDurumu === 'onaylandi').length;
  const toplamKullanilma = mesajSablonlari.reduce((sum, s) => sum + s.kullanilmaSayisi, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mesaj Şablonları</h1>
          <p className="text-gray-600">Hazır mesaj şablonları yönetimi</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewTemplate(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Şablon
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
                <p className="text-sm text-gray-600">Toplam Şablon</p>
                <p className="text-2xl font-bold text-gray-900">{toplamSablon}</p>
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
                <p className="text-sm text-gray-600">Aktif Şablon</p>
                <p className="text-2xl font-bold text-green-600">{aktifSablon}</p>
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
                <p className="text-sm text-gray-600">Onaylı Şablon</p>
                <p className="text-2xl font-bold text-blue-600">{onayliSablon}</p>
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
                <p className="text-sm text-gray-600">Toplam Kullanım</p>
                <p className="text-2xl font-bold text-purple-600">{toplamKullanilma}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Şablon adı veya içerik ara..."
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
                <SelectItem value="Teşekkür">Teşekkür</SelectItem>
                <SelectItem value="Davet">Davet</SelectItem>
                <SelectItem value="Duyuru">Duyuru</SelectItem>
                <SelectItem value="Hatırlatma">Hatırlatma</SelectItem>
                <SelectItem value="Bülten">Bülten</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger>
                <SelectValue placeholder="İletişim Kanalı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kanallar</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">E-posta</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
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
                <SelectItem value="taslak">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Mesaj Şablonları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSablonlar.map((sablon) => (
              <div key={sablon.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{sablon.baslik}</div>
                      <div className="text-sm text-gray-500">{sablon.aciklama}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      {getIletisimIcon(sablon.iletisimKanali)}
                      <span>{getIletisimText(sablon.iletisimKanali)}</span>
                    </Badge>
                    <Badge className={getDurumColor(sablon.durum)}>
                      {getDurumText(sablon.durum)}
                    </Badge>
                    <Badge className={getOnayDurumuColor(sablon.onayDurumu)}>
                      {getOnayDurumuIcon(sablon.onayDurumu)}
                      <span className="ml-1">
                        {sablon.onayDurumu === 'onaylandi' ? 'Onaylı' : 
                         sablon.onayDurumu === 'beklemede' ? 'Beklemede' : 'Reddedildi'}
                      </span>
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded">
                  {sablon.icerik}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Kategori</div>
                    <div className="font-medium">{sablon.kategori}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Karakter</div>
                    <div className="font-medium">{sablon.karakterSayisi}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Kullanım</div>
                    <div className="font-medium text-blue-600">{sablon.kullanilmaSayisi}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Değişken</div>
                    <div className="font-medium">{sablon.degiskenler.length}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-500 mb-1">Değişkenler:</div>
                  <div className="flex flex-wrap gap-1">
                    {sablon.degiskenler.map((degisken, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {degisken}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-500 mb-1">Etiketler:</div>
                  <div className="flex flex-wrap gap-1">
                    {sablon.etiketler.map((etiket, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {etiket}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {sablon.olusturan} • {sablon.olusturmaTarihi}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowTemplateDetails(sablon.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
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

      {/* New Template Modal */}
      {showNewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Mesaj Şablonu</h2>
              <Button variant="outline" onClick={() => setShowNewTemplate(false)}>
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Şablon Başlığı</label>
                  <Input placeholder="Şablon başlığı girin" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <Textarea placeholder="Şablon açıklaması girin" rows={3} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tesekkur">Teşekkür</SelectItem>
                        <SelectItem value="davet">Davet</SelectItem>
                        <SelectItem value="duyuru">Duyuru</SelectItem>
                        <SelectItem value="hatirlatma">Hatırlatma</SelectItem>
                        <SelectItem value="bulten">Bülten</SelectItem>
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
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Şablon İçeriği</label>
                  <Textarea 
                    placeholder="Şablon içeriğini yazın. Değişkenler için {degisken_adi} formatını kullanın..."
                    rows={8}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Karakter sayısı: 0/1000
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Etiketler</label>
                  <Input placeholder="Etiketleri virgülle ayırarak girin" />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-6">
              <Button className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Şablonu Oluştur
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Önizle
              </Button>
              <Button variant="outline" onClick={() => setShowNewTemplate(false)}>
                İptal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Template Details Modal */}
      {showTemplateDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Şablon Detayları</h2>
              <Button variant="outline" onClick={() => setShowTemplateDetails(null)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Şablon Bilgileri</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Başlık:</strong> Bağış Teşekkürü</div>
                    <div><strong>Açıklama:</strong> Bağış yapan kişilere gönderilen teşekkür mesajı</div>
                    <div><strong>Kategori:</strong> Teşekkür</div>
                    <div><strong>İletişim Kanalı:</strong> SMS</div>
                    <div><strong>Durum:</strong> Aktif</div>
                    <div><strong>Onay Durumu:</strong> Onaylandı</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">İstatistikler</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Kullanım Sayısı:</strong> 45</div>
                    <div><strong>Karakter Sayısı:</strong> 120</div>
                    <div><strong>Oluşturma Tarihi:</strong> 15.01.2024</div>
                    <div><strong>Son Güncelleme:</strong> 20.01.2024</div>
                    <div><strong>Oluşturan:</strong> Ahmet Yılmaz</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Şablon İçeriği</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  Sevgili {`{ad}`} {`{soyad}`}, {`{tutar}`} TL tutarındaki bağışınız için teşekkür ederiz. İhtiyaç sahiplerine umut oldunuz. KAFKASDER
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Değişkenler</h3>
                  <div className="space-y-1">
                    {['{ad}', '{soyad}', '{tutar}'].map((degisken, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {degisken}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Etiketler</h3>
                  <div className="space-y-1">
                    {['bağış', 'teşekkür', 'otomatik'].map((etiket, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        <Tag className="w-3 h-3 mr-1" />
                        {etiket}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 