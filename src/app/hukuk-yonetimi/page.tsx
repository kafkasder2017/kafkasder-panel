'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Scale, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Calendar,
  Plus,
  Download,
  Filter,
  FileText,
  Bell,
  Users
} from 'lucide-react';

// Mock data
const stats = [
  {
    title: 'Aktif Davalar',
    value: '24',
    change: '+3',
    changeType: 'positive',
    icon: Scale,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Bekleyen Tebligatlar',
    value: '12',
    change: '-2',
    changeType: 'negative',
    icon: Bell,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    title: 'Yaklaşan Duruşmalar',
    value: '8',
    change: '+1',
    changeType: 'positive',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    title: 'Aktif Avukatlar',
    value: '6',
    change: '0',
    changeType: 'neutral',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
];

const recentCases = [
  {
    id: 1,
    caseNumber: '2024/001',
    title: 'KAFKASDER vs. ABC Şirketi',
    type: 'Ticari Dava',
    status: 'active',
    court: 'İstanbul 5. Asliye Ticaret Mahkemesi',
    nextHearing: '2024-01-25',
    lawyer: 'Av. Mehmet Yılmaz'
  },
  {
    id: 2,
    caseNumber: '2024/002',
    title: 'KAFKASDER vs. XYZ Vakfı',
    type: 'İdari Dava',
    status: 'pending',
    court: 'Ankara 1. İdare Mahkemesi',
    nextHearing: '2024-01-30',
    lawyer: 'Av. Fatma Demir'
  },
  {
    id: 3,
    caseNumber: '2024/003',
    title: 'KAFKASDER vs. DEF Derneği',
    type: 'Hukuki Danışmanlık',
    status: 'completed',
    court: 'Dış Hukuki Danışmanlık',
    nextHearing: '2024-01-20',
    lawyer: 'Av. Ali Kaya'
  },
  {
    id: 4,
    caseNumber: '2024/004',
    title: 'KAFKASDER vs. GHI Limited',
    type: 'Ticari Dava',
    status: 'active',
    court: 'İzmir 3. Asliye Ticaret Mahkemesi',
    nextHearing: '2024-02-05',
    lawyer: 'Av. Zeynep Özkan'
  }
];

const upcomingHearings = [
  {
    id: 1,
    caseNumber: '2024/001',
    title: 'KAFKASDER vs. ABC Şirketi',
    court: 'İstanbul 5. Asliye Ticaret Mahkemesi',
    date: '2024-01-25',
    time: '10:00',
    type: 'Duruşma',
    status: 'scheduled'
  },
  {
    id: 2,
    caseNumber: '2024/002',
    title: 'KAFKASDER vs. XYZ Vakfı',
    court: 'Ankara 1. İdare Mahkemesi',
    date: '2024-01-30',
    time: '14:30',
    type: 'Duruşma',
    status: 'scheduled'
  },
  {
    id: 3,
    caseNumber: '2024/005',
    title: 'KAFKASDER vs. JKL Şirketi',
    court: 'İstanbul 2. Sulh Hukuk Mahkemesi',
    date: '2024-02-01',
    time: '09:00',
    type: 'Arabuluculuk',
    status: 'scheduled'
  }
];

const pendingNotifications = [
  {
    id: 1,
    type: 'tebligat',
    title: 'Tebligat Geldi',
    description: '2024/001 numaralı dava için tebligat geldi',
    date: '2024-01-16',
    priority: 'high'
  },
  {
    id: 2,
    type: 'document',
    title: 'Belge Güncellemesi',
    description: '2024/002 numaralı dava için yeni belge eklendi',
    date: '2024-01-15',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'hearing',
    title: 'Duruşma Hatırlatması',
    description: 'Yarın 10:00\'da duruşma var',
    date: '2024-01-16',
    priority: 'high'
  }
];

export default function HukukYonetimiPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'pending':
        return <Badge variant="secondary">Bekliyor</Badge>;
      case 'completed':
        return <Badge variant="outline">Tamamlandı</Badge>;
      case 'scheduled':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Planlandı</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="default" className="bg-red-100 text-red-800">Yüksek</Badge>;
      case 'medium':
        return <Badge variant="secondary">Orta</Badge>;
      case 'low':
        return <Badge variant="outline">Düşük</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'tebligat':
        return <Bell className="w-4 h-4 text-orange-600" />;
      case 'document':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'hearing':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change} geçen aya göre
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Hızlı İşlemler</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="w-6 h-6" />
              <span>Yeni Dava</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Bell className="w-6 h-6" />
              <span>Tebligat Ekle</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Duruşma Planla</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="w-6 h-6" />
              <span>Belge Yükle</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Cases and Upcoming Hearings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Son Davalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Scale className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{case_.caseNumber}</h3>
                      {getStatusBadge(case_.status)}
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{case_.title}</p>
                    <p className="text-sm text-gray-500">{case_.type}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{case_.court}</span>
                      <span className="text-sm text-gray-500">{case_.lawyer}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm text-gray-500">Sonraki Duruşma</p>
                    <p className="text-sm font-medium text-gray-900">{case_.nextHearing}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Hearings */}
        <Card>
          <CardHeader>
            <CardTitle>Yaklaşan Duruşmalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingHearings.map((hearing) => (
                <div key={hearing.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{hearing.caseNumber}</h3>
                      {getStatusBadge(hearing.status)}
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{hearing.title}</p>
                    <p className="text-sm text-gray-500">{hearing.court}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{hearing.type}</span>
                      <span className="text-sm font-medium text-gray-900">{hearing.date} {hearing.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Bekleyen Bildirimler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingNotifications.map((notification) => (
              <div key={notification.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                    {getPriorityBadge(notification.priority)}
                  </div>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{notification.date}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    Görüntüle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Period Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Dönem Filtresi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === 'week' && 'Haftalık'}
                {period === 'month' && 'Aylık'}
                {period === 'quarter' && '3 Aylık'}
                {period === 'year' && 'Yıllık'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 