'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  PiggyBank, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  Plus,
  Download,
  Filter
} from 'lucide-react';

// Mock data
const stats = [
  {
    title: 'Toplam Kumbara',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: PiggyBank,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Aktif Kumbaralar',
    value: '892',
    change: '+8%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Dağıtım Yapılan Kişi',
    value: '756',
    change: '+15%',
    changeType: 'positive',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    title: 'Toplanan Tutar',
    value: '₺45,230',
    change: '+23%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'distribution',
    title: 'Yeni Kumbara Dağıtımı',
    description: 'Ahmet Yılmaz\'a kumbara dağıtıldı',
    amount: '₺0',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'collection',
    title: 'Kumbara Toplama',
    description: 'Fatma Demir\'in kumbarası toplandı',
    amount: '₺125',
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: 3,
    type: 'distribution',
    title: 'Kumbara Dağıtımı',
    description: 'Mehmet Kaya\'ya kumbara dağıtıldı',
    amount: '₺0',
    date: '2024-01-13',
    status: 'completed'
  },
  {
    id: 4,
    type: 'collection',
    title: 'Kumbara Toplama',
    description: 'Ayşe Özkan\'ın kumbarası toplandı',
    amount: '₺89',
    date: '2024-01-12',
    status: 'completed'
  },
  {
    id: 5,
    type: 'distribution',
    title: 'Kumbara Dağıtımı',
    description: 'Ali Veli\'ye kumbara dağıtıldı',
    amount: '₺0',
    date: '2024-01-11',
    status: 'completed'
  }
];

const upcomingCollections = [
  {
    id: 1,
    personName: 'Zeynep Kaya',
    location: 'İstanbul, Kadıköy',
    scheduledDate: '2024-01-20',
    status: 'scheduled'
  },
  {
    id: 2,
    personName: 'Mustafa Demir',
    location: 'Ankara, Çankaya',
    scheduledDate: '2024-01-22',
    status: 'scheduled'
  },
  {
    id: 3,
    personName: 'Elif Yıldız',
    location: 'İzmir, Konak',
    scheduledDate: '2024-01-25',
    status: 'scheduled'
  }
];

export default function KumbaraYonetimiPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Planlandı</Badge>;
      case 'pending':
        return <Badge variant="outline">Bekliyor</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'distribution':
        return <PiggyBank className="w-4 h-4 text-blue-600" />;
      case 'collection':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
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
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="w-6 h-6" />
              <span>Yeni Kumbara Dağıt</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span>Kumbara Topla</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Toplama Planla</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities and Upcoming Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">{activity.date}</span>
                      <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Collections */}
        <Card>
          <CardHeader>
            <CardTitle>Planlanan Toplamalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCollections.map((collection) => (
                <div key={collection.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{collection.personName}</p>
                    <p className="text-sm text-gray-500">{collection.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{collection.scheduledDate}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(collection.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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