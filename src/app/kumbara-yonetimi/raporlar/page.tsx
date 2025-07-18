'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  MapPin,
  PiggyBank,
  Users,
  DollarSign
} from 'lucide-react';

// Mock data
const monthlyStats = [
  { month: 'Ocak', distributed: 45, collected: 38, amount: 12500 },
  { month: 'Şubat', distributed: 52, collected: 45, amount: 15800 },
  { month: 'Mart', distributed: 48, collected: 42, amount: 14200 },
  { month: 'Nisan', distributed: 61, collected: 55, amount: 18900 },
  { month: 'Mayıs', distributed: 55, collected: 48, amount: 16500 },
  { month: 'Haziran', distributed: 67, collected: 62, amount: 22100 }
];

const cityStats = [
  { city: 'İstanbul', active: 245, collected: 189, totalAmount: 45600 },
  { city: 'Ankara', active: 156, collected: 134, totalAmount: 28900 },
  { city: 'İzmir', active: 98, collected: 87, totalAmount: 18700 },
  { city: 'Bursa', active: 76, collected: 65, totalAmount: 12300 },
  { city: 'Antalya', active: 54, collected: 48, totalAmount: 8900 }
];

const performanceMetrics = [
  {
    title: 'Dağıtım Oranı',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'positive',
    description: 'Bu ay dağıtılan kumbara oranı'
  },
  {
    title: 'Toplama Verimliliği',
    value: '87.5%',
    change: '+1.8%',
    changeType: 'positive',
    description: 'Toplama işlemlerinin başarı oranı'
  },
  {
    title: 'Ortalama Toplama',
    value: '₺342',
    change: '+12.5%',
    changeType: 'positive',
    description: 'Kumbara başına ortalama toplama'
  },
  {
    title: 'Aktif Kumbara Oranı',
    value: '78.9%',
    change: '-0.5%',
    changeType: 'negative',
    description: 'Aktif kumbara yüzdesi'
  }
];

export default function KumbaraRaporlariPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCity, setSelectedCity] = useState('all');

  const getChangeColor = (changeType: string) => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'positive' ? '↗' : '↘';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kumbara Raporları</h1>
          <p className="text-gray-600 mt-1">
            Detaylı kumbara analizleri ve performans raporları
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Haftalık</SelectItem>
              <SelectItem value="month">Aylık</SelectItem>
              <SelectItem value="quarter">3 Aylık</SelectItem>
              <SelectItem value="year">Yıllık</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                      {getChangeIcon(metric.changeType)} {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">geçen dönem</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Aylık Trendler</span>
            <div className="flex space-x-2">
              <Badge variant="outline">Dağıtım</Badge>
              <Badge variant="outline">Toplama</Badge>
              <Badge variant="outline">Tutar</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between space-x-2">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(stat.distributed / 70) * 200}px` }}>
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  <div className="font-medium">{stat.month}</div>
                  <div>Dağıtım: {stat.distributed}</div>
                  <div>Toplama: {stat.collected}</div>
                  <div className="font-medium">₺{stat.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* City Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Şehir Bazlı Performans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cityStats.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{city.city.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{city.city}</p>
                      <p className="text-sm text-gray-500">
                        Aktif: {city.active} | Toplanan: {city.collected}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₺{city.totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {((city.collected / city.active) * 100).toFixed(1)}% verimlilik
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PiggyBank className="w-5 h-5 mr-2" />
              Kumbara Tipi Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium">Standart Kumbara</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">65%</p>
                  <p className="text-sm text-gray-500">812 adet</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm font-medium">Premium Kumbara</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">28%</p>
                  <p className="text-sm text-gray-500">349 adet</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm font-medium">Mini Kumbara</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">7%</p>
                  <p className="text-sm text-gray-500">86 adet</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detaylı İstatistikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600 mt-1">Toplam Kumbara</div>
              <div className="text-xs text-green-600 mt-1">+12% geçen aya göre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">₺98,450</div>
              <div className="text-sm text-gray-600 mt-1">Toplam Toplanan</div>
              <div className="text-xs text-green-600 mt-1">+23% geçen aya göre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">756</div>
              <div className="text-sm text-gray-600 mt-1">Aktif Kişi</div>
              <div className="text-xs text-green-600 mt-1">+8% geçen aya göre</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Rapor Dışa Aktarma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <Download className="w-6 h-6" />
              <span>Excel Raporu</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <Download className="w-6 h-6" />
              <span>PDF Raporu</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <Download className="w-6 h-6" />
              <span>CSV Verisi</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 