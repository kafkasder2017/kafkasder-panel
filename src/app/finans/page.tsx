'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building, 
  PiggyBank,
  CreditCard,
  Receipt,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download
} from 'lucide-react';

interface VarlikOzeti {
  toplamVarlik: number;
  nakitBakiye: number;
  bankaHesaplari: number;
  yatirimlar: number;
  alacaklar: number;
  borclar: number;
  buAyGelir: number;
  buAyGider: number;
  gecenAyGelir: number;
  gecenAyGider: number;
  gelirArtisOrani: number;
  giderArtisOrani: number;
}

interface BankaHesabi {
  id: number;
  bankaAdi: string;
  hesapTuru: string;
  hesapNo: string;
  bakiye: number;
  paraBirimi: string;
  sonIslemTarihi: string;
  durum: 'aktif' | 'pasif' | 'bloke';
}

interface SonIslemler {
  id: number;
  islemNo: string;
  aciklama: string;
  tutar: number;
  paraBirimi: string;
  islemTuru: 'gelir' | 'gider' | 'transfer';
  tarih: string;
  kategori: string;
  bankaAdi?: string;
}

export default function FinansPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('buAy');

  const [varlikOzeti] = useState<VarlikOzeti>({
    toplamVarlik: 2450000,
    nakitBakiye: 125000,
    bankaHesaplari: 1850000,
    yatirimlar: 350000,
    alacaklar: 125000,
    borclar: 0,
    buAyGelir: 185000,
    buAyGider: 95000,
    gecenAyGelir: 165000,
    gecenAyGider: 88000,
    gelirArtisOrani: 12.1,
    giderArtisOrani: 8.0
  });

  const [bankaHesaplari] = useState<BankaHesabi[]>([
    {
      id: 1,
      bankaAdi: 'Ziraat Bankası',
      hesapTuru: 'TL Mevduat',
      hesapNo: '****1234',
      bakiye: 850000,
      paraBirimi: 'TRY',
      sonIslemTarihi: '2024-01-20',
      durum: 'aktif'
    },
    {
      id: 2,
      bankaAdi: 'Garanti BBVA',
      hesapTuru: 'Döviz Hesabı',
      hesapNo: '****5678',
      bakiye: 25000,
      paraBirimi: 'USD',
      sonIslemTarihi: '2024-01-19',
      durum: 'aktif'
    },
    {
      id: 3,
      bankaAdi: 'İş Bankası',
      hesapTuru: 'Cari Hesap',
      hesapNo: '****9012',
      bakiye: 750000,
      paraBirimi: 'TRY',
      sonIslemTarihi: '2024-01-18',
      durum: 'aktif'
    },
    {
      id: 4,
      bankaAdi: 'Yapı Kredi',
      hesapTuru: 'Altın Hesabı',
      hesapNo: '****3456',
      bakiye: 150000,
      paraBirimi: 'TRY',
      sonIslemTarihi: '2024-01-17',
      durum: 'aktif'
    }
  ]);

  const [sonIslemler] = useState<SonIslemler[]>([
    {
      id: 1,
      islemNo: 'ISL-2024-001',
      aciklama: 'Bağış geliri - Kredi kartı',
      tutar: 5000,
      paraBirimi: 'TRY',
      islemTuru: 'gelir',
      tarih: '2024-01-20',
      kategori: 'Bağış',
      bankaAdi: 'Garanti BBVA'
    },
    {
      id: 2,
      islemNo: 'ISL-2024-002',
      aciklama: 'Personel maaş ödemesi',
      tutar: 25000,
      paraBirimi: 'TRY',
      islemTuru: 'gider',
      tarih: '2024-01-19',
      kategori: 'Personel',
      bankaAdi: 'İş Bankası'
    },
    {
      id: 3,
      islemNo: 'ISL-2024-003',
      aciklama: 'Havale bağışı',
      tutar: 10000,
      paraBirimi: 'TRY',
      islemTuru: 'gelir',
      tarih: '2024-01-18',
      kategori: 'Bağış',
      bankaAdi: 'Ziraat Bankası'
    },
    {
      id: 4,
      islemNo: 'ISL-2024-004',
      aciklama: 'Ofis kirası ödemesi',
      tutar: 15000,
      paraBirimi: 'TRY',
      islemTuru: 'gider',
      tarih: '2024-01-17',
      kategori: 'Kira',
      bankaAdi: 'İş Bankası'
    }
  ]);

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-green-100 text-green-800';
      case 'pasif': return 'bg-gray-100 text-gray-800';
      case 'bloke': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aktif': return 'Aktif';
      case 'pasif': return 'Pasif';
      case 'bloke': return 'Bloke';
      default: return 'Bilinmiyor';
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'gelir': return 'bg-green-100 text-green-800';
      case 'gider': return 'bg-red-100 text-red-800';
      case 'transfer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case 'gelir': return 'Gelir';
      case 'gider': return 'Gider';
      case 'transfer': return 'Transfer';
      default: return type;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Varlık Özeti</h1>
          <p className="text-gray-600">Genel finansal durum ve varlık dağılımı</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Detaylı Rapor
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Varlık</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(varlikOzeti.toplamVarlik, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+8.5%</span>
              <span className="text-gray-500 ml-1">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bu Ay Gelir</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(varlikOzeti.buAyGelir, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{varlikOzeti.gelirArtisOrani}%</span>
              <span className="text-gray-500 ml-1">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bu Ay Gider</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(varlikOzeti.buAyGider, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">+{varlikOzeti.giderArtisOrani}%</span>
              <span className="text-gray-500 ml-1">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Kar</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(varlikOzeti.buAyGelir - varlikOzeti.buAyGider, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+15.2%</span>
              <span className="text-gray-500 ml-1">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Varlık Dağılımı */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Varlık Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Banka Hesapları</div>
                    <div className="text-sm text-gray-500">TL ve Döviz hesapları</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(varlikOzeti.bankaHesaplari, 'TRY')}</div>
                  <div className="text-sm text-gray-500">%75.5</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Yatırımlar</div>
                    <div className="text-sm text-gray-500">Altın, döviz, menkul kıymetler</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(varlikOzeti.yatirimlar, 'TRY')}</div>
                  <div className="text-sm text-gray-500">%14.3</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <PiggyBank className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Nakit Bakiye</div>
                    <div className="text-sm text-gray-500">Kasa ve nakit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(varlikOzeti.nakitBakiye, 'TRY')}</div>
                  <div className="text-sm text-gray-500">%5.1</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Receipt className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Alacaklar</div>
                    <div className="text-sm text-gray-500">Tahsil edilecek tutarlar</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(varlikOzeti.alacaklar, 'TRY')}</div>
                  <div className="text-sm text-gray-500">%5.1</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banka Hesapları */}
        <Card>
          <CardHeader>
            <CardTitle>Banka Hesapları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bankaHesaplari.map((hesap) => (
                <div key={hesap.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{hesap.bankaAdi}</div>
                    <Badge className={getStatusColor(hesap.durum)}>
                      {getStatusText(hesap.durum)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{hesap.hesapTuru}</div>
                  <div className="text-sm text-gray-500 mb-2">{hesap.hesapNo}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-green-600">
                      {formatCurrency(hesap.bakiye, hesap.paraBirimi)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Son: {hesap.sonIslemTarihi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Son İşlemler */}
      <Card>
        <CardHeader>
          <CardTitle>Son İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Açıklama</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Tür</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Banka</th>
                  <th className="text-left p-3 font-medium">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {sonIslemler.map((islem) => (
                  <tr key={islem.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{islem.islemNo}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{islem.aciklama}</div>
                    </td>
                    <td className="p-3">
                      <div className={`font-semibold ${
                        islem.islemTuru === 'gelir' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {islem.islemTuru === 'gelir' ? '+' : '-'}{formatCurrency(islem.tutar, islem.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTransactionTypeColor(islem.islemTuru)}>
                        {getTransactionTypeText(islem.islemTuru)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{islem.kategori}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-600">{islem.bankaAdi}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{islem.tarih}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 