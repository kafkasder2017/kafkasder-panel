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
  RotateCcw,
  Eye,
  EyeOff,
  Key,
  UserCheck,
  FileCheck,
  AlertTriangle,
  Info,
  HelpCircle,
  BarChart3,
  Activity,
  DollarSign,
  Bell,
  FileText,
  Globe,
  CheckCircle,
  Database,
  RefreshCw,
} from 'lucide-react';

interface BursAyar {
  id: string;
  kategori: string;
  baslik: string;
  aciklama: string;
  deger: any;
  tip: 'text' | 'number' | 'select' | 'switch' | 'textarea' | 'date' | 'email' | 'password';
  secenekler?: string[];
  zorunlu: boolean;
  gizli: boolean;
}

export default function BursAyarlarPage() {
  const [ayarlar, setAyarlar] = useState<BursAyar[]>([
    {
      id: 'max_burs_miktari',
      kategori: 'Burs Ayarları',
      baslik: 'Maksimum Burs Miktarı',
      aciklama: 'Bir öğrenciye verilebilecek maksimum burs miktarı',
      deger: 2000,
      tip: 'number',
      zorunlu: true,
      gizli: false
    },
    {
      id: 'min_burs_miktari',
      kategori: 'Burs Ayarları',
      baslik: 'Minimum Burs Miktarı',
      aciklama: 'Bir öğrenciye verilebilecek minimum burs miktarı',
      deger: 300,
      tip: 'number',
      zorunlu: true,
      gizli: false
    },
    {
      id: 'burs_onay_sureci',
      kategori: 'Burs Ayarları',
      baslik: 'Burs Onay Süreci',
      aciklama: 'Burs başvurularının onay süreci',
      deger: 'otomatik',
      tip: 'select',
      secenekler: ['otomatik', 'manuel', 'karma'],
      zorunlu: true,
      gizli: false
    },
    {
      id: 'burs_odeme_periyodu',
      kategori: 'Burs Ayarları',
      baslik: 'Burs Ödeme Periyodu',
      aciklama: 'Burs ödemelerinin yapılma periyodu',
      deger: 'aylik',
      tip: 'select',
      secenekler: ['haftalik', 'aylik', '3_aylik', '6_aylik', 'yillik'],
      zorunlu: true,
      gizli: false
    },
    {
      id: 'otomatik_hatirlatma',
      kategori: 'Bildirim Ayarları',
      baslik: 'Otomatik Hatırlatma',
      aciklama: 'Burs ödemeleri için otomatik hatırlatma gönder',
      deger: true,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'email_bildirimleri',
      kategori: 'Bildirim Ayarları',
      baslik: 'E-posta Bildirimleri',
      aciklama: 'Burs işlemleri için e-posta bildirimleri gönder',
      deger: true,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'sms_bildirimleri',
      kategori: 'Bildirim Ayarları',
      baslik: 'SMS Bildirimleri',
      aciklama: 'Burs işlemleri için SMS bildirimleri gönder',
      deger: false,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'bildirim_email',
      kategori: 'Bildirim Ayarları',
      baslik: 'Bildirim E-posta Adresi',
      aciklama: 'Sistem bildirimlerinin gönderileceği e-posta adresi',
      deger: 'burs@kafkasder.org',
      tip: 'email',
      zorunlu: true,
      gizli: false
    },
    {
      id: 'max_basvuru_sayisi',
      kategori: 'Başvuru Ayarları',
      baslik: 'Maksimum Başvuru Sayısı',
      aciklama: 'Bir öğrencinin aynı anda yapabileceği maksimum başvuru sayısı',
      deger: 3,
      tip: 'number',
      zorunlu: true,
      gizli: false
    },
    {
      id: 'basvuru_sure_siniri',
      kategori: 'Başvuru Ayarları',
      baslik: 'Başvuru Süre Sınırı',
      aciklama: 'Başvuru yapılabilecek maksimum süre (gün)',
      deger: 30,
      tip: 'number',
      zorunlu: true,
      gizli: false
    },
    {
      id: 'otomatik_red_sureci',
      kategori: 'Başvuru Ayarları',
      baslik: 'Otomatik Red Süreci',
      aciklama: 'Belirli süre sonra otomatik red işlemi yap',
      deger: true,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'rapor_otomatik_olustur',
      kategori: 'Rapor Ayarları',
      baslik: 'Otomatik Rapor Oluştur',
      aciklama: 'Aylık raporları otomatik olarak oluştur',
      deger: true,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'rapor_saklama_suresi',
      kategori: 'Rapor Ayarları',
      baslik: 'Rapor Saklama Süresi',
      aciklama: 'Raporların saklanma süresi (ay)',
      deger: 24,
      tip: 'number',
      zorunlu: true,
      gizli: false
    },
    {
      id: 'veri_yedekleme',
      kategori: 'Sistem Ayarları',
      baslik: 'Otomatik Veri Yedekleme',
      aciklama: 'Verileri otomatik olarak yedekle',
      deger: true,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'yedekleme_frekansi',
      kategori: 'Sistem Ayarları',
      baslik: 'Yedekleme Frekansı',
      aciklama: 'Veri yedekleme sıklığı',
      deger: 'gunluk',
      tip: 'select',
      secenekler: ['gunluk', 'haftalik', 'aylik'],
      zorunlu: true,
      gizli: false
    },
    {
      id: 'sistem_bakim_modu',
      kategori: 'Sistem Ayarları',
      baslik: 'Bakım Modu',
      aciklama: 'Sistemi bakım moduna al',
      deger: false,
      tip: 'switch',
      zorunlu: false,
      gizli: false
    },
    {
      id: 'api_anahtari',
      kategori: 'Entegrasyon Ayarları',
      baslik: 'API Anahtarı',
      aciklama: 'Sistem API anahtarı',
      deger: 'sk_test_1234567890abcdef',
      tip: 'password',
      zorunlu: true,
      gizli: true
    },
    {
      id: 'webhook_url',
      kategori: 'Entegrasyon Ayarları',
      baslik: 'Webhook URL',
      aciklama: 'Dış sistem entegrasyonu için webhook URL',
      deger: 'https://api.example.com/webhook',
      tip: 'text',
      zorunlu: false,
      gizli: false
    }
  ]);

  const [showPassword, setShowPassword] = useState<{[key: string]: boolean}>({});
  const [hasChanges, setHasChanges] = useState(false);

  const kategoriGruplari = ayarlar.reduce((gruplar, ayar) => {
    if (!gruplar[ayar.kategori]) {
      gruplar[ayar.kategori] = [];
    }
    gruplar[ayar.kategori].push(ayar);
    return gruplar;
  }, {} as {[key: string]: BursAyar[]});

  const handleAyarChange = (id: string, yeniDeger: any) => {
    setAyarlar(prev => prev.map(ayar => 
      ayar.id === id ? { ...ayar, deger: yeniDeger } : ayar
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Ayarları kaydet
    console.log('Ayarlar kaydediliyor:', ayarlar);
    setHasChanges(false);
    // Burada API çağrısı yapılacak
  };

  const handleReset = () => {
    // Ayarları varsayılana sıfırla
    setAyarlar(prev => prev.map(ayar => ({
      ...ayar,
      deger: ayar.id === 'max_burs_miktari' ? 2000 :
             ayar.id === 'min_burs_miktari' ? 300 :
             ayar.id === 'burs_onay_sureci' ? 'otomatik' :
             ayar.id === 'burs_odeme_periyodu' ? 'aylik' :
             ayar.id === 'otomatik_hatirlatma' ? true :
             ayar.id === 'email_bildirimleri' ? true :
             ayar.id === 'sms_bildirimleri' ? false :
             ayar.id === 'bildirim_email' ? 'burs@kafkasder.org' :
             ayar.id === 'max_basvuru_sayisi' ? 3 :
             ayar.id === 'basvuru_sure_siniri' ? 30 :
             ayar.id === 'otomatik_red_sureci' ? true :
             ayar.id === 'rapor_otomatik_olustur' ? true :
             ayar.id === 'rapor_saklama_suresi' ? 24 :
             ayar.id === 'veri_yedekleme' ? true :
             ayar.id === 'yedekleme_frekansi' ? 'gunluk' :
             ayar.id === 'sistem_bakim_modu' ? false :
             ayar.id === 'api_anahtari' ? 'sk_test_1234567890abcdef' :
             ayar.id === 'webhook_url' ? 'https://api.example.com/webhook' :
             ayar.deger
    })));
    setHasChanges(false);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderAyarInput = (ayar: BursAyar) => {
    switch (ayar.tip) {
      case 'text':
      case 'email':
        return (
          <Input
            value={ayar.deger}
            onChange={(e) => handleAyarChange(ayar.id, e.target.value)}
            type={ayar.tip}
            placeholder={`${ayar.baslik} girin`}
          />
        );
      
      case 'password':
        return (
          <div className="relative">
            <Input
              value={ayar.deger}
              onChange={(e) => handleAyarChange(ayar.id, e.target.value)}
              type={showPassword[ayar.id] ? 'text' : 'password'}
              placeholder="••••••••"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => togglePasswordVisibility(ayar.id)}
            >
              {showPassword[ayar.id] ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        );
      
      case 'number':
        return (
          <Input
            value={ayar.deger}
            onChange={(e) => handleAyarChange(ayar.id, Number(e.target.value))}
            type="number"
            placeholder={`${ayar.baslik} girin`}
          />
        );
      
      case 'select':
        return (
          <Select value={ayar.deger} onValueChange={(value) => handleAyarChange(ayar.id, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`${ayar.baslik} seçin`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Seçenekler</SelectItem>
              {ayar.secenekler?.map(secenek => (
                <SelectItem key={secenek} value={secenek}>
                  {secenek.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'switch':
        return (
          <Switch
            checked={ayar.deger}
            onCheckedChange={(checked) => handleAyarChange(ayar.id, checked)}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={ayar.deger}
            onChange={(e) => handleAyarChange(ayar.id, e.target.value)}
            placeholder={`${ayar.baslik} girin`}
            rows={3}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Burs Yönetimi Ayarları</h1>
          <p className="text-gray-600">Burs modülü konfigürasyonu ve sistem ayarları</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Varsayılana Sıfırla
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Settings Categories */}
      {Object.entries(kategoriGruplari).map(([kategori, kategoriAyarlari]) => (
        <Card key={kategori}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {kategori === 'Burs Ayarları' && <DollarSign className="w-5 h-5 text-green-600" />}
              {kategori === 'Bildirim Ayarları' && <Bell className="w-5 h-5 text-blue-600" />}
              {kategori === 'Başvuru Ayarları' && <FileText className="w-5 h-5 text-purple-600" />}
              {kategori === 'Rapor Ayarları' && <BarChart3 className="w-5 h-5 text-orange-600" />}
              {kategori === 'Sistem Ayarları' && <Settings className="w-5 h-5 text-gray-600" />}
              {kategori === 'Entegrasyon Ayarları' && <Globe className="w-5 h-5 text-indigo-600" />}
              <span>{kategori}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {kategoriAyarlari.map((ayar) => (
                <div key={ayar.id} className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <label className="text-sm font-medium text-gray-900">
                        {ayar.baslik}
                      </label>
                      {ayar.zorunlu && (
                        <Badge variant="outline" className="text-xs">
                          Zorunlu
                        </Badge>
                      )}
                      {ayar.gizli && (
                        <Badge variant="outline" className="text-xs">
                          Gizli
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ayar.aciklama}</p>
                    <div className="max-w-md">
                      {renderAyarInput(ayar)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {ayar.tip === 'switch' && (
                      <div className="text-sm text-gray-500">
                        {ayar.deger ? 'Aktif' : 'Pasif'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Sistem Durumu</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Veritabanı</div>
                <div className="text-sm text-green-600">Bağlantı aktif</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">E-posta Servisi</div>
                <div className="text-sm text-blue-600">Çalışıyor</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Yedekleme</div>
                <div className="text-sm text-green-600">Son yedekleme: 2 saat önce</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Database className="w-6 h-6" />
              <span>Veri Yedekle</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <RefreshCw className="w-6 h-6" />
              <span>Önbelleği Temizle</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <FileCheck className="w-6 h-6" />
              <span>Sistem Kontrolü</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <HelpCircle className="w-6 h-6" />
              <span>Yardım</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes Banner */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5" />
            <span>Kaydedilmemiş değişiklikler var</span>
            <Button size="sm" onClick={handleSave}>
              Kaydet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 