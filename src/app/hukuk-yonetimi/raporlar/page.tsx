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
  Scale,
  Users,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Mock data
const performanceMetrics = [
  {
    title: 'Başarı Oranı',
    value: '87.5%',
    change: '+2.3%',
    changeType: 'positive',
    description: 'Kazanılan dava oranı'
  },
  {
    title: 'Ortalama Süre',
    value: '8.2 Ay',
    change: '-0.5 Ay',
    changeType: 'positive',
    description: 'Dava başına ortalama süre'
  },
  {
    title: 'Aktif Dava',
    value: '24',
    change: '+3',
    changeType: 'positive',
    description: 'Devam eden dava sayısı'
  },
  {
    title: 'Maliyet Tasarrufu',
    value: '₺125,000',
    change: '+15.2%',
    changeType: 'positive',
    description: 'Bu ay sağlanan tasarruf'
  }
];

const caseTypeStats = [
  { type: 'Ticari Dava', count: 12, successRate: 91, avgDuration: 6.5 },
  { type: 'İdari Dava', count: 8, successRate: 85, avgDuration: 9.2 },
  { type: 'Sulh Dava', count: 4, successRate: 95, avgDuration: 3.8 },
  { type: 'Hukuki Danışmanlık', count: 15, successRate: 100, avgDuration: 1.2 }
];

const lawyerPerformance = [
  {
    name: 'Av. Mehmet Yılmaz',
    activeCases: 8,
    completedCases: 45,
    successRate: 92,
    avgDuration: 7.1,
    specialization: 'Ticaret Hukuku'
  },
  {
    name: 'Av. Fatma Demir',
    activeCases: 5,
    completedCases: 38,
    successRate: 89,
    avgDuration: 8.5,
    specialization: 'İdare Hukuku'
  },
  {
    name: 'Av. Ali Kaya',
    activeCases: 3,
    completedCases: 22,
    successRate: 85,
    avgDuration: 4.2,
    specialization: 'Sözleşme Hukuku'
  },
  {
    name: 'Av. Zeynep Özkan',
    activeCases: 6,
    completedCases: 31,
    successRate: 91,
    avgDuration: 6.8,
    specialization: 'Ticaret Hukuku'
  }
];

const monthlyTrends = [
  { month: 'Ocak', newCases: 8, completedCases: 6, successRate: 85 },
  { month: 'Şubat', newCases: 12, completedCases: 9, successRate: 88 },
  { month: 'Mart', newCases: 10, completedCases: 8, successRate: 90 },
  { month: 'Nisan', newCases: 15, completedCases: 12, successRate: 87 },
  { month: 'Mayıs', newCases: 11, completedCases: 10, successRate: 92 },
  { month: 'Haziran', newCases: 14, completedCases: 11, successRate: 89 }
];

const courtPerformance = [
  { court: 'İstanbul 5. Asliye Ticaret', cases: 8, successRate: 88, avgDuration: 6.2 },
  { court: 'Ankara 1. İdare Mahkemesi', cases: 6, successRate: 83, avgDuration: 9.8 },
  { court: 'İzmir 3. Asliye Ticaret', cases: 4, successRate: 90, avgDuration: 5.5 },
  { court: 'Bursa 1. İdare Mahkemesi', cases: 3, successRate: 85, avgDuration: 8.1 },
  { court: 'İstanbul 2. Sulh Hukuk', cases: 3, successRate: 95, avgDuration: 3.2 }
];

export default function DavaRaporlariPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLawyer, setSelectedLawyer] = useState('all');

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
          <h1 className="text-2xl font-bold text-gray-900">Dava Raporları</h1>
          <p className="text-gray-600 mt-1">
            Detaylı hukuk analizleri ve performans raporları
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

      {/* Case Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Dava Tipi Performansı</span>
            <div className="flex space-x-2">
              <Badge variant="outline">Dava Sayısı</Badge>
              <Badge variant="outline">Başarı Oranı</Badge>
              <Badge variant="outline">Ortalama Süre</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caseTypeStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{stat.type}</h3>
                    <p className="text-sm text-gray-500">{stat.count} dava</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Başarı Oranı</p>
                    <p className="font-medium text-green-600">{stat.successRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Ortalama Süre</p>
                    <p className="font-medium text-gray-900">{stat.avgDuration} ay</p>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stat.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lawyer Performance and Court Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lawyer Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Avukat Performansı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lawyerPerformance.map((lawyer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lawyer.name}</p>
                      <p className="text-sm text-gray-500">{lawyer.specialization}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <p className="text-gray-500">Aktif</p>
                        <p className="font-medium">{lawyer.activeCases}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Başarı</p>
                        <p className="font-medium text-green-600">{lawyer.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Süre</p>
                        <p className="font-medium">{lawyer.avgDuration} ay</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Court Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scale className="w-5 h-5 mr-2" />
              Mahkeme Performansı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courtPerformance.map((court, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Scale className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{court.court}</p>
                      <p className="text-sm text-gray-500">{court.cases} dava</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <p className="text-gray-500">Başarı</p>
                        <p className="font-medium text-green-600">{court.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Süre</p>
                        <p className="font-medium">{court.avgDuration} ay</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Aylık Trendler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between space-x-2">
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(trend.newCases / 15) * 200}px` }}>
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  <div className="font-medium">{trend.month}</div>
                  <div>Yeni: {trend.newCases}</div>
                  <div>Tamamlanan: {trend.completedCases}</div>
                  <div className="font-medium">{trend.successRate}% başarı</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detaylı İstatistikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">39</div>
              <div className="text-sm text-gray-600 mt-1">Toplam Dava</div>
              <div className="text-xs text-green-600 mt-1">+12% geçen aya göre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">87.5%</div>
              <div className="text-sm text-gray-600 mt-1">Genel Başarı Oranı</div>
              <div className="text-xs text-green-600 mt-1">+2.3% geçen aya göre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">6.8 Ay</div>
              <div className="text-sm text-gray-600 mt-1">Ortalama Dava Süresi</div>
              <div className="text-xs text-green-600 mt-1">-0.5 ay geçen aya göre</div>
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