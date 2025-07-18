'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Euro, 
  PoundSterling,
  Coins,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

interface DovizKuru {
  kod: string;
  ad: string;
  alis: number;
  satis: number;
  degisim: number;
  degisimYuzde: number;
  guncellemeZamani: string;
  icon: string;
}

interface AltinKuru {
  kod: string;
  ad: string;
  alis: number;
  satis: number;
  degisim: number;
  degisimYuzde: number;
  guncellemeZamani: string;
  icon: string;
}

export default function DovizKurlariPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [dovizKurlari] = useState<DovizKuru[]>([
    {
      kod: 'USD',
      ad: 'Amerikan Doları',
      alis: 31.25,
      satis: 31.35,
      degisim: 0.15,
      degisimYuzde: 0.48,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '💵'
    },
    {
      kod: 'EUR',
      ad: 'Euro',
      alis: 34.10,
      satis: 34.20,
      degisim: -0.08,
      degisimYuzde: -0.23,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '💶'
    },
    {
      kod: 'GBP',
      ad: 'İngiliz Sterlini',
      alis: 39.85,
      satis: 39.95,
      degisim: 0.25,
      degisimYuzde: 0.63,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '💷'
    },
    {
      kod: 'JPY',
      ad: 'Japon Yeni',
      alis: 0.210,
      satis: 0.212,
      degisim: 0.002,
      degisimYuzde: 0.95,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '💴'
    },
    {
      kod: 'CHF',
      ad: 'İsviçre Frangı',
      alis: 36.80,
      satis: 36.90,
      degisim: -0.12,
      degisimYuzde: -0.32,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '🇨🇭'
    },
    {
      kod: 'CAD',
      ad: 'Kanada Doları',
      alis: 23.45,
      satis: 23.55,
      degisim: 0.05,
      degisimYuzde: 0.21,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '🇨🇦'
    }
  ]);

  const [altinKurlari] = useState<AltinKuru[]>([
    {
      kod: 'XAU',
      ad: 'Altın (Gram)',
      alis: 2150.50,
      satis: 2155.00,
      degisim: 12.50,
      degisimYuzde: 0.58,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '🥇'
    },
    {
      kod: 'XAG',
      ad: 'Gümüş (Gram)',
      alis: 25.80,
      satis: 26.00,
      degisim: 0.20,
      degisimYuzde: 0.78,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '🥈'
    },
    {
      kod: 'XPT',
      ad: 'Platin (Gram)',
      alis: 980.00,
      satis: 985.00,
      degisim: -5.00,
      degisimYuzde: -0.51,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '⚪'
    },
    {
      kod: 'XPD',
      ad: 'Paladyum (Gram)',
      alis: 1250.00,
      satis: 1255.00,
      degisim: 8.00,
      degisimYuzde: 0.64,
      guncellemeZamani: '2024-01-20 15:30:00',
      icon: '⚪'
    }
  ]);

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) + ' ₺';
    }
    return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) + ' ' + currency;
  };

  const getDegisimIcon = (degisim: number) => {
    if (degisim > 0) {
      return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    } else if (degisim < 0) {
      return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    } else {
      return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDegisimColor = (degisim: number) => {
    if (degisim > 0) {
      return 'text-green-600';
    } else if (degisim < 0) {
      return 'text-red-600';
    } else {
      return 'text-gray-600';
    }
  };

  const getDegisimBgColor = (degisim: number) => {
    if (degisim > 0) {
      return 'bg-green-100 text-green-800';
    } else if (degisim < 0) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Döviz Kurları</h1>
          <p className="text-gray-600">Güncel döviz ve altın kurları</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Son Güncelleme</div>
            <div className="text-sm font-medium">{lastUpdate.toLocaleString('tr-TR')}</div>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Güncelle
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">USD/TRY</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dovizKurlari[0].satis, 'TRY')}
                </p>
              </div>
              <div className="text-3xl">💵</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getDegisimIcon(dovizKurlari[0].degisim)}
              <span className={`font-medium ml-1 ${getDegisimColor(dovizKurlari[0].degisim)}`}>
                {dovizKurlari[0].degisim > 0 ? '+' : ''}{formatCurrency(dovizKurlari[0].degisim, 'TRY')}
              </span>
              <span className={`ml-1 ${getDegisimColor(dovizKurlari[0].degisim)}`}>
                ({dovizKurlari[0].degisim > 0 ? '+' : ''}{dovizKurlari[0].degisimYuzde}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">EUR/TRY</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dovizKurlari[1].satis, 'TRY')}
                </p>
              </div>
              <div className="text-3xl">💶</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getDegisimIcon(dovizKurlari[1].degisim)}
              <span className={`font-medium ml-1 ${getDegisimColor(dovizKurlari[1].degisim)}`}>
                {dovizKurlari[1].degisim > 0 ? '+' : ''}{formatCurrency(dovizKurlari[1].degisim, 'TRY')}
              </span>
              <span className={`ml-1 ${getDegisimColor(dovizKurlari[1].degisim)}`}>
                ({dovizKurlari[1].degisim > 0 ? '+' : ''}{dovizKurlari[1].degisimYuzde}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">GBP/TRY</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dovizKurlari[2].satis, 'TRY')}
                </p>
              </div>
              <div className="text-3xl">💷</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getDegisimIcon(dovizKurlari[2].degisim)}
              <span className={`font-medium ml-1 ${getDegisimColor(dovizKurlari[2].degisim)}`}>
                {dovizKurlari[2].degisim > 0 ? '+' : ''}{formatCurrency(dovizKurlari[2].degisim, 'TRY')}
              </span>
              <span className={`ml-1 ${getDegisimColor(dovizKurlari[2].degisim)}`}>
                ({dovizKurlari[2].degisim > 0 ? '+' : ''}{dovizKurlari[2].degisimYuzde}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Altın (Gram)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(altinKurlari[0].satis, 'TRY')}
                </p>
              </div>
              <div className="text-3xl">🥇</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {getDegisimIcon(altinKurlari[0].degisim)}
              <span className={`font-medium ml-1 ${getDegisimColor(altinKurlari[0].degisim)}`}>
                {altinKurlari[0].degisim > 0 ? '+' : ''}{formatCurrency(altinKurlari[0].degisim, 'TRY')}
              </span>
              <span className={`ml-1 ${getDegisimColor(altinKurlari[0].degisim)}`}>
                ({altinKurlari[0].degisim > 0 ? '+' : ''}{altinKurlari[0].degisimYuzde}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Döviz Kurları */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Döviz Kurları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Döviz</th>
                  <th className="text-left p-3 font-medium">Alış</th>
                  <th className="text-left p-3 font-medium">Satış</th>
                  <th className="text-left p-3 font-medium">Değişim</th>
                  <th className="text-left p-3 font-medium">% Değişim</th>
                  <th className="text-left p-3 font-medium">Güncelleme</th>
                </tr>
              </thead>
              <tbody>
                {dovizKurlari.map((doviz) => (
                  <tr key={doviz.kod} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{doviz.icon}</div>
                        <div>
                          <div className="font-medium">{doviz.ad}</div>
                          <div className="text-sm text-gray-500">{doviz.kod}/TRY</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(doviz.alis, 'TRY')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-red-600">
                        {formatCurrency(doviz.satis, 'TRY')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getDegisimIcon(doviz.degisim)}
                        <span className={`font-medium ml-1 ${getDegisimColor(doviz.degisim)}`}>
                          {doviz.degisim > 0 ? '+' : ''}{formatCurrency(doviz.degisim, 'TRY')}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getDegisimBgColor(doviz.degisim)}>
                        {doviz.degisim > 0 ? '+' : ''}{doviz.degisimYuzde}%
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-500">
                        {formatDateTime(doviz.guncellemeZamani)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Altın Kurları */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Coins className="w-5 h-5 mr-2" />
            Altın ve Değerli Maden Kurları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Maden</th>
                  <th className="text-left p-3 font-medium">Alış</th>
                  <th className="text-left p-3 font-medium">Satış</th>
                  <th className="text-left p-3 font-medium">Değişim</th>
                  <th className="text-left p-3 font-medium">% Değişim</th>
                  <th className="text-left p-3 font-medium">Güncelleme</th>
                </tr>
              </thead>
              <tbody>
                {altinKurlari.map((altin) => (
                  <tr key={altin.kod} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{altin.icon}</div>
                        <div>
                          <div className="font-medium">{altin.ad}</div>
                          <div className="text-sm text-gray-500">{altin.kod}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(altin.alis, 'TRY')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-red-600">
                        {formatCurrency(altin.satis, 'TRY')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getDegisimIcon(altin.degisim)}
                        <span className={`font-medium ml-1 ${getDegisimColor(altin.degisim)}`}>
                          {altin.degisim > 0 ? '+' : ''}{formatCurrency(altin.degisim, 'TRY')}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getDegisimBgColor(altin.degisim)}>
                        {altin.degisim > 0 ? '+' : ''}{altin.degisimYuzde}%
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-500">
                        {formatDateTime(altin.guncellemeZamani)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-medium">Güncelleme Sıklığı</div>
                <div className="text-sm text-gray-500">Her 5 dakikada bir</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-medium">İşlem Saatleri</div>
                <div className="text-sm text-gray-500">Pazartesi - Cuma 09:00-18:00</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-medium">Kaynak</div>
                <div className="text-sm text-gray-500">TCMB ve Piyasa Verileri</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 