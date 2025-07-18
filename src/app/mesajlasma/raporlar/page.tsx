'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Mail,
  Smartphone,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';

interface MesajRaporu {
  id: number;
  kampanyaAdi: string;
  iletisimKanali: 'sms' | 'email' | 'whatsapp';
  aliciSayisi: number;
  gonderilenSayisi: number;
  basariliSayisi: number;
  hataliSayisi: number;
  acilanSayisi?: number;
  tiklananSayisi?: number;
  yanitlananSayisi?: number;
  basariOrani: number;
  acilmaOrani?: number;
  tiklanmaOrani?: number;
  yanitlanmaOrani?: number;
  gonderimTarihi: string;
  maliyet: number;
}

interface GunlukIstatistik {
  tarih: string;
  sms: number;
  email: number;
  whatsapp: number;
  toplam: number;
}

export default function MesajRaporlariPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('');

  const [mesajRaporlari] = useState<MesajRaporu[]>([
    {
      id: 1,
      kampanyaAdi: 'Yılbaşı Bağış Kampanyası',
      iletisimKanali: 'sms',
      aliciSayisi: 2500,
      gonderilenSayisi: 2500,
      basariliSayisi: 2450,
      hataliSayisi: 50,
      basariOrani: 98.0,
      gonderimTarihi: '2024-01-20',
      maliyet: 125.00
    },
    {
      id: 2,
      kampanyaAdi: 'Aylık Bülten',
      iletisimKanali: 'email',
      aliciSayisi: 1800,
      gonderilenSayisi: 1200,
      basariliSayisi: 1150,
      hataliSayisi: 50,
      acilanSayisi: 840,
      tiklananSayisi: 168,
      basariOrani: 95.8,
      acilmaOrani: 70.0,
      tiklanmaOrani: 14.0,
      gonderimTarihi: '2024-01-20',
      maliyet: 0.00
    },
    {
      id: 3,
      kampanyaAdi: 'Acil Yardım Duyurusu',
      iletisimKanali: 'whatsapp',
      aliciSayisi: 1500,
      gonderilenSayisi: 1500,
      basariliSayisi: 1350,
      hataliSayisi: 150,
      yanitlananSayisi: 225,
      basariOrani: 90.0,
      yanitlanmaOrani: 15.0,
      gonderimTarihi: '2024-01-20',
      maliyet: 75.00
    },
    {
      id: 4,
      kampanyaAdi: 'Etkinlik Daveti',
      iletisimKanali: 'email',
      aliciSayisi: 500,
      gonderilenSayisi: 500,
      basariliSayisi: 480,
      hataliSayisi: 20,
      acilanSayisi: 350,
      tiklananSayisi: 105,
      basariOrani: 96.0,
      acilmaOrani: 70.0,
      tiklanmaOrani: 21.0,
      gonderimTarihi: '2024-01-19',
      maliyet: 0.00
    },
    {
      id: 5,
      kampanyaAdi: 'Üyelik Yenileme Hatırlatması',
      iletisimKanali: 'sms',
      aliciSayisi: 800,
      gonderilenSayisi: 800,
      basariliSayisi: 760,
      hataliSayisi: 40,
      basariOrani: 95.0,
      gonderimTarihi: '2024-01-19',
      maliyet: 40.00
    }
  ]);

  const [gunlukIstatistikler] = useState<GunlukIstatistik[]>([
    { tarih: '2024-01-15', sms: 1200, email: 800, whatsapp: 300, toplam: 2300 },
    { tarih: '2024-01-16', sms: 1100, email: 750, whatsapp: 250, toplam: 2100 },
    { tarih: '2024-01-17', sms: 1300, email: 900, whatsapp: 400, toplam: 2600 },
    { tarih: '2024-01-18', sms: 1400, email: 850, whatsapp: 350, toplam: 2600 },
    { tarih: '2024-01-19', sms: 1600, email: 1000, whatsapp: 500, toplam: 3100 },
    { tarih: '2024-01-20', sms: 1800, email: 1200, whatsapp: 600, toplam: 3600 }
  ]);

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

  const getBasariOraniColor = (oran: number) => {
    if (oran >= 95) return 'text-green-600';
    if (oran >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredRaporlar = mesajRaporlari.filter(rapor => {
    const matchesChannel = !selectedChannel || rapor.iletisimKanali === selectedChannel;
    const matchesCampaign = !selectedCampaign || rapor.kampanyaAdi === selectedCampaign;
    
    return matchesChannel && matchesCampaign;
  });

  const toplamKampanya = mesajRaporlari.length;
  const toplamAlici = mesajRaporlari.reduce((sum, r) => sum + r.aliciSayisi, 0);
  const toplamGonderilen = mesajRaporlari.reduce((sum, r) => sum + r.gonderilenSayisi, 0);
  const toplamBasarili = mesajRaporlari.reduce((sum, r) => sum + r.basariliSayisi, 0);
  const toplamMaliyet = mesajRaporlari.reduce((sum, r) => sum + r.maliyet, 0);
  const ortalamaBasariOrani = toplamGonderilen > 0 ? Math.round((toplamBasarili / toplamGonderilen) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mesaj Raporları</h1>
          <p className="text-gray-600">Gönderim istatistikleri ve performans analizi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Tarih Seç
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
                <BarChart3 className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Başarı Oranı</p>
                <p className={`text-2xl font-bold ${getBasariOraniColor(ortalamaBasariOrani)}`}>
                  %{ortalamaBasariOrani}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Maliyet</p>
                <p className="text-2xl font-bold text-orange-600">₺{toplamMaliyet.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Dönem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Son 7 Gün</SelectItem>
                <SelectItem value="30">Son 30 Gün</SelectItem>
                <SelectItem value="90">Son 90 Gün</SelectItem>
                <SelectItem value="365">Son 1 Yıl</SelectItem>
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

            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Kampanya" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                {mesajRaporlari.map((rapor) => (
                  <SelectItem key={rapor.id} value={rapor.kampanyaAdi}>
                    {rapor.kampanyaAdi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Daily Statistics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Günlük Gönderim İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {gunlukIstatistikler.map((istatistik) => (
                <div key={istatistik.tarih} className="p-4 border rounded-lg">
                  <div className="text-sm font-medium mb-2">
                    {new Date(istatistik.tarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>SMS:</span>
                      <span className="font-medium">{istatistik.sms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>E-posta:</span>
                      <span className="font-medium">{istatistik.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WhatsApp:</span>
                      <span className="font-medium">{istatistik.whatsapp}</span>
                    </div>
                    <div className="border-t pt-1 flex justify-between font-semibold">
                      <span>Toplam:</span>
                      <span>{istatistik.toplam}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Detaylı Kampanya Raporları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRaporlar.map((rapor) => (
              <div key={rapor.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getIletisimIcon(rapor.iletisimKanali)}
                    <div>
                      <div className="font-medium">{rapor.kampanyaAdi}</div>
                      <div className="text-sm text-gray-500">
                        {getIletisimText(rapor.iletisimKanali)} • {rapor.gonderimTarihi}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      {getIletisimIcon(rapor.iletisimKanali)}
                      <span>{getIletisimText(rapor.iletisimKanali)}</span>
                    </Badge>
                    <Badge className={`${getBasariOraniColor(rapor.basariOrani)} bg-opacity-10`}>
                      %{rapor.basariOrani} Başarı
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-gray-500">Alıcı</div>
                    <div className="font-medium">{rapor.aliciSayisi.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Gönderilen</div>
                    <div className="font-medium">{rapor.gonderilenSayisi.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Başarılı</div>
                    <div className="font-medium text-green-600">{rapor.basariliSayisi.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Hatalı</div>
                    <div className="font-medium text-red-600">{rapor.hataliSayisi.toLocaleString()}</div>
                  </div>
                </div>

                {rapor.iletisimKanali === 'email' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Açılan</div>
                      <div className="font-medium text-blue-600">{rapor.acilanSayisi?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Tıklanan</div>
                      <div className="font-medium text-purple-600">{rapor.tiklananSayisi?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Açılma Oranı</div>
                      <div className="font-medium">%{rapor.acilmaOrani || 0}</div>
                    </div>
                  </div>
                )}

                {rapor.iletisimKanali === 'whatsapp' && (
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-500">Yanıtlanan</div>
                      <div className="font-medium text-green-600">{rapor.yanitlananSayisi?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Yanıtlanma Oranı</div>
                      <div className="font-medium">%{rapor.yanitlanmaOrani || 0}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm text-gray-500">
                    Maliyet: ₺{rapor.maliyet.toFixed(2)}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                      Detay
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                      İndir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Kanal Performans Özeti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium">SMS</div>
                  <div className="text-sm text-gray-500">Kısa Mesaj Servisi</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Toplam Gönderim:</span>
                  <span className="font-medium">8,400</span>
                </div>
                <div className="flex justify-between">
                  <span>Başarı Oranı:</span>
                  <span className="font-medium text-green-600">%96.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Maliyet:</span>
                  <span className="font-medium">₺420.00</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium">E-posta</div>
                  <div className="text-sm text-gray-500">Elektronik Posta</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Toplam Gönderim:</span>
                  <span className="font-medium">5,700</span>
                </div>
                <div className="flex justify-between">
                  <span>Açılma Oranı:</span>
                  <span className="font-medium text-blue-600">%70.2</span>
                </div>
                <div className="flex justify-between">
                  <span>Tıklanma Oranı:</span>
                  <span className="font-medium text-purple-600">%17.5</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-sm text-gray-500">WhatsApp Business</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Toplam Gönderim:</span>
                  <span className="font-medium">2,400</span>
                </div>
                <div className="flex justify-between">
                  <span>Okunma Oranı:</span>
                  <span className="font-medium text-green-600">%90.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Yanıtlanma Oranı:</span>
                  <span className="font-medium text-blue-600">%15.2</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 