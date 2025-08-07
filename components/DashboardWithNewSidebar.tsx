import React, { useState } from 'react';
import { KafkasderSidebar } from './KafkasderSidebar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Users, Heart, Calendar, ChartBar, TrendingUp, DollarSign } from 'lucide-react';

function DashboardWithNewSidebar() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Here you would typically handle navigation
    console.log('Navigating to:', section);
  };

  const stats = [
    {
      title: 'Toplam Üye',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Bu Ay Bağış',
      value: '₺156,800',
      change: '+8%',
      icon: Heart,
      color: 'green'
    },
    {
      title: 'Aktif Projeler',
      value: '24',
      change: '+3',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Bekleyen Başvurular',
      value: '87',
      change: '-5%',
      icon: ChartBar,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      type: 'Bağış',
      description: 'Ahmet Yılmaz 500 TL bağış yaptı',
      time: '2 saat önce',
      amount: '500 TL'
    },
    {
      type: 'Üyelik',
      description: 'Fatma Demir yeni üye oldu',
      time: '3 saat önce',
      amount: null
    },
    {
      type: 'Başvuru',
      description: 'Mehmet Kaya yardım başvurusu yaptı',
      time: '5 saat önce',
      amount: null
    },
    {
      type: 'Proje',
      description: 'Ramazan Yardım Projesi tamamlandı',
      time: '1 gün önce',
      amount: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex">
      <KafkasderSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Kafkasder Yönetim Sistemi'ne hoş geldiniz</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm flex items-center gap-1 mt-1 ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Tüm Aktiviteleri Gör
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  onClick={() => handleSectionChange('kisiler')}
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Yeni Kişi</span>
                </Button>
                <Button 
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={() => handleSectionChange('bagis-yonetimi')}
                >
                  <Heart className="h-6 w-6" />
                  <span className="text-sm">Bağış Ekle</span>
                </Button>
                <Button 
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => handleSectionChange('projeler')}
                >
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Proje Oluştur</span>
                </Button>
                <Button 
                  className="h-20 flex-col gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={() => handleSectionChange('raporlama-analitik')}
                >
                  <ChartBar className="h-6 w-6" />
                  <span className="text-sm">Rapor Görüntüle</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardWithNewSidebar;
