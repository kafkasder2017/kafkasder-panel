'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Download, 
  Upload,
  Users,
  Shield,
  Bell,
  Calendar,
  FileText,
  Database,
  Globe,
  Palette,
  Zap,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Edit
} from 'lucide-react';

interface SistemAyar {
  id: string;
  ad: string;
  aciklama: string;
  deger: string | number | boolean;
  tip: 'text' | 'number' | 'boolean' | 'select';
  kategori: string;
  secenekler?: string[];
}

interface BildirimAyar {
  id: string;
  ad: string;
  aciklama: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  varsayilan: boolean;
}

export default function IsYonetimiAyarlarPage() {
  const [activeTab, setActiveTab] = useState('genel');
  const [sistemAyarlari, setSistemAyarlari] = useState<SistemAyar[]>([
    {
      id: 'proje_otomatik_arsivleme',
      ad: 'Proje Otomatik Arşivleme',
      aciklama: 'Tamamlanan projeleri otomatik olarak arşivle',
      deger: true,
      tip: 'boolean',
      kategori: 'proje'
    },
    {
      id: 'gorev_hatirlatma_suresi',
      ad: 'Görev Hatırlatma Süresi',
      aciklama: 'Görev bitiş tarihinden kaç gün önce hatırlatma gönderilsin',
      deger: 3,
      tip: 'number',
      kategori: 'gorev'
    },
    {
      id: 'maksimum_dosya_boyutu',
      ad: 'Maksimum Dosya Boyutu (MB)',
      aciklama: 'Yüklenebilecek maksimum dosya boyutu',
      deger: 10,
      tip: 'number',
      kategori: 'dosya'
    },
    {
      id: 'izinli_dosya_tipleri',
      ad: 'İzinli Dosya Tipleri',
      aciklama: 'Yüklenebilecek dosya tipleri',
      deger: 'pdf,docx,xlsx,jpg,png',
      tip: 'text',
      kategori: 'dosya'
    },
    {
      id: 'otomatik_yedekleme',
      ad: 'Otomatik Yedekleme',
      aciklama: 'Veritabanı otomatik yedekleme',
      deger: true,
      tip: 'boolean',
      kategori: 'sistem'
    },
    {
      id: 'yedekleme_sikligi',
      ad: 'Yedekleme Sıklığı',
      aciklama: 'Yedekleme sıklığı',
      deger: 'gunluk',
      tip: 'select',
      kategori: 'sistem',
      secenekler: ['gunluk', 'haftalik', 'aylik']
    },
    {
      id: 'bildirim_dil',
      ad: 'Bildirim Dili',
      aciklama: 'Sistem bildirimlerinin dili',
      deger: 'tr',
      tip: 'select',
      kategori: 'bildirim',
      secenekler: ['tr', 'en', 'ar']
    },
    {
      id: 'zaman_dilimi',
      ad: 'Zaman Dilimi',
      aciklama: 'Sistem zaman dilimi',
      deger: 'Europe/Istanbul',
      tip: 'select',
      kategori: 'sistem',
      secenekler: ['Europe/Istanbul', 'UTC', 'Europe/London']
    }
  ]);

  const [bildirimAyarlari, setBildirimAyarlari] = useState<BildirimAyar[]>([
    {
      id: 'yeni_gorev_atandi',
      ad: 'Yeni Görev Atandı',
      aciklama: 'Size yeni görev atandığında bildirim alın',
      email: true,
      sms: false,
      push: true,
      varsayilan: true
    },
    {
      id: 'gorev_tamamlandi',
      ad: 'Görev Tamamlandı',
      aciklama: 'Görev tamamlandığında bildirim alın',
      email: true,
      sms: false,
      push: false,
      varsayilan: true
    },
    {
      id: 'proje_guncelleme',
      ad: 'Proje Güncelleme',
      aciklama: 'Proje güncellendiğinde bildirim alın',
      email: false,
      sms: false,
      push: true,
      varsayilan: false
    },
    {
      id: 'toplanti_hatirlatma',
      ad: 'Toplantı Hatırlatma',
      aciklama: 'Toplantı öncesi hatırlatma alın',
      email: true,
      sms: true,
      push: true,
      varsayilan: true
    },
    {
      id: 'dosya_yuklendi',
      ad: 'Dosya Yüklendi',
      aciklama: 'Yeni dosya yüklendiğinde bildirim alın',
      email: false,
      sms: false,
      push: true,
      varsayilan: false
    }
  ]);

  const handleAyarDegistir = (id: string, yeniDeger: any) => {
    setSistemAyarlari(prev => 
      prev.map(ayar => 
        ayar.id === id ? { ...ayar, deger: yeniDeger } : ayar
      )
    );
  };

  const handleBildirimDegistir = (id: string, tip: 'email' | 'sms' | 'push', deger: boolean) => {
    setBildirimAyarlari(prev => 
      prev.map(bildirim => 
        bildirim.id === id ? { ...bildirim, [tip]: deger } : bildirim
      )
    );
  };

  const ayarlariKaydet = () => {
    // API çağrısı yapılacak
    console.log('Ayarlar kaydediliyor...');
  };

  const ayarlariSifirla = () => {
    // Varsayılan ayarlara dön
    console.log('Ayarlar sıfırlanıyor...');
  };

  const tabs = [
    { id: 'genel', label: 'Genel Ayarlar', icon: Settings },
    { id: 'bildirim', label: 'Bildirim Ayarları', icon: Bell },
    { id: 'guvenlik', label: 'Güvenlik', icon: Shield },
    { id: 'yedekleme', label: 'Yedekleme', icon: Database },
    { id: 'entegrasyon', label: 'Entegrasyonlar', icon: Globe }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sistem Ayarları</h1>
          <p className="text-gray-600">İş yönetimi sistemi ayarları</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={ayarlariSifirla}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sıfırla
          </Button>
          <Button onClick={ayarlariKaydet}>
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'genel' && (
        <Card>
          <CardHeader>
            <CardTitle>Genel Ayarlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sistemAyarlari.map((ayar) => (
                <div key={ayar.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{ayar.ad}</div>
                    <div className="text-sm text-gray-500">{ayar.aciklama}</div>
                  </div>
                  <div className="ml-4">
                    {ayar.tip === 'boolean' && (
                      <Switch
                        checked={ayar.deger as boolean}
                        onCheckedChange={(checked: boolean) => handleAyarDegistir(ayar.id, checked)}
                      />
                    )}
                    {ayar.tip === 'number' && (
                      <Input
                        type="number"
                        value={ayar.deger as number}
                        onChange={(e) => handleAyarDegistir(ayar.id, parseInt(e.target.value))}
                        className="w-32"
                      />
                    )}
                    {ayar.tip === 'text' && (
                      <Input
                        value={ayar.deger as string}
                        onChange={(e) => handleAyarDegistir(ayar.id, e.target.value)}
                        className="w-64"
                      />
                    )}
                    {ayar.tip === 'select' && ayar.secenekler && (
                      <Select
                        value={ayar.deger as string}
                        onValueChange={(value) => handleAyarDegistir(ayar.id, value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ayar.secenekler.map((secenek) => (
                            <SelectItem key={secenek} value={secenek}>
                              {secenek}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'bildirim' && (
        <Card>
          <CardHeader>
            <CardTitle>Bildirim Ayarları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bildirimAyarlari.map((bildirim) => (
                <div key={bildirim.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium">{bildirim.ad}</div>
                      <div className="text-sm text-gray-500">{bildirim.aciklama}</div>
                    </div>
                    <Badge variant={bildirim.varsayilan ? 'default' : 'outline'}>
                      {bildirim.varsayilan ? 'Varsayılan' : 'Özel'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={bildirim.email}
                        onCheckedChange={(checked: boolean) => handleBildirimDegistir(bildirim.id, 'email', checked)}
                      />
                      <div>
                        <div className="text-sm font-medium">E-posta</div>
                        <div className="text-xs text-gray-500">E-posta bildirimi</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={bildirim.sms}
                        onCheckedChange={(checked: boolean) => handleBildirimDegistir(bildirim.id, 'sms', checked)}
                      />
                      <div>
                        <div className="text-sm font-medium">SMS</div>
                        <div className="text-xs text-gray-500">SMS bildirimi</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={bildirim.push}
                        onCheckedChange={(checked: boolean) => handleBildirimDegistir(bildirim.id, 'push', checked)}
                      />
                      <div>
                        <div className="text-sm font-medium">Push</div>
                        <div className="text-xs text-gray-500">Push bildirimi</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'guvenlik' && (
        <Card>
          <CardHeader>
            <CardTitle>Güvenlik Ayarları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">İki Faktörlü Doğrulama</div>
                    <div className="text-sm text-gray-500">Hesap güvenliği için iki faktörlü doğrulama</div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Otomatik Oturum Kapatma</div>
                    <div className="text-sm text-gray-500">Belirli süre sonra otomatik oturum kapatma</div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 dakika</SelectItem>
                      <SelectItem value="30">30 dakika</SelectItem>
                      <SelectItem value="60">1 saat</SelectItem>
                      <SelectItem value="120">2 saat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Şifre Karmaşıklığı</div>
                    <div className="text-sm text-gray-500">Minimum şifre gereksinimleri</div>
                  </div>
                  <Select defaultValue="orta">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dusuk">Düşük</SelectItem>
                      <SelectItem value="orta">Orta</SelectItem>
                      <SelectItem value="yuksek">Yüksek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">IP Kısıtlaması</div>
                    <div className="text-sm text-gray-500">Belirli IP adreslerinden erişim kısıtlaması</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'yedekleme' && (
        <Card>
          <CardHeader>
            <CardTitle>Yedekleme Ayarları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Otomatik Yedekleme</div>
                    <div className="text-sm text-gray-500">Veritabanı otomatik yedekleme</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Yedekleme Sıklığı</div>
                    <div className="text-sm text-gray-500">Yedekleme sıklığı</div>
                  </div>
                  <Select defaultValue="gunluk">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gunluk">Günlük</SelectItem>
                      <SelectItem value="haftalik">Haftalık</SelectItem>
                      <SelectItem value="aylik">Aylık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Yedekleme Saklama Süresi</div>
                    <div className="text-sm text-gray-500">Yedeklerin saklanma süresi</div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 gün</SelectItem>
                      <SelectItem value="30">30 gün</SelectItem>
                      <SelectItem value="90">90 gün</SelectItem>
                      <SelectItem value="365">1 yıl</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Manuel Yedekleme
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Yedek Geri Yükle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'entegrasyon' && (
        <Card>
          <CardHeader>
            <CardTitle>Entegrasyon Ayarları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">E-posta Entegrasyonu</div>
                    <div className="text-sm text-gray-500">SMTP ayarları</div>
                  </div>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Yapılandır
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">SMS Entegrasyonu</div>
                    <div className="text-sm text-gray-500">SMS servis sağlayıcısı ayarları</div>
                  </div>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Yapılandır
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Google Calendar</div>
                    <div className="text-sm text-gray-500">Google Calendar entegrasyonu</div>
                  </div>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Bağlan
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Slack Entegrasyonu</div>
                    <div className="text-sm text-gray-500">Slack bildirim entegrasyonu</div>
                  </div>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Bağlan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 