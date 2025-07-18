'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Users,
  Heart,
  CreditCard,
  Package,
  Repeat,
  PiggyBank
} from 'lucide-react';

export default function BagisRaporlariPage() {
  const [period, setPeriod] = useState('month');
  const [category, setCategory] = useState('all');

  const [stats] = useState({
    toplamBagis: 1247500,
    buAyBagis: 156000,
    gecenAyBagis: 142000,
    yillikBagis: 1890000,
    toplamBagisci: 847,
    buAyBagisci: 23,
    gecenAyBagisci: 19,
    yillikBagisci: 156
  });

  const [donationTypes] = useState([
    { type: 'nakit', amount: 890000, count: 456, percentage: 71.3 },
    { type: 'kredi_karti', amount: 245000, count: 234, percentage: 19.6 },
    { type: 'online', amount: 67500, count: 89, percentage: 5.4 },
    { type: 'cek', amount: 25000, count: 12, percentage: 2.0 },
    { type: 'ayni', amount: 20000, count: 45, percentage: 1.6 },
    { type: 'tekrarli', amount: 0, count: 11, percentage: 0.1 }
  ]);

  const [categories] = useState([
    { category: 'genel', amount: 623750, count: 423, percentage: 50.0 },
    { category: 'egitim', amount: 373500, count: 234, percentage: 30.0 },
    { category: 'saglik', amount: 124500, count: 89, percentage: 10.0 },
    { category: 'acil', amount: 74700, count: 67, percentage: 6.0 },
    { category: 'ramazan', amount: 37350, count: 23, percentage: 3.0 },
    { category: 'kurban', amount: 18675, count: 11, percentage: 1.0 }
  ]);

  const [monthlyData] = useState([
    { month: 'Ocak', amount: 156000, count: 23 },
    { month: 'Şubat', amount: 142000, count: 19 },
    { month: 'Mart', amount: 168000, count: 28 },
    { month: 'Nisan', amount: 189000, count: 31 },
    { month: 'Mayıs', amount: 203000, count: 35 },
    { month: 'Haziran', amount: 178000, count: 29 },
    { month: 'Temmuz', amount: 165000, count: 27 },
    { month: 'Ağustos', amount: 192000, count: 33 },
    { month: 'Eylül', amount: 210000, count: 38 },
    { month: 'Ekim', amount: 198000, count: 34 },
    { month: 'Kasım', amount: 225000, count: 42 },
    { month: 'Aralık', amount: 248000, count: 47 }
  ]);

  const [topDonors] = useState([
    { name: 'Ahmet Yılmaz', totalAmount: 25000, donationCount: 5, lastDonation: '2024-01-15' },
    { name: 'Fatma Demir', totalAmount: 18000, donationCount: 3, lastDonation: '2024-01-14' },
    { name: 'Mehmet Kaya', totalAmount: 15000, donationCount: 4, lastDonation: '2024-01-13' },
    { name: 'Ayşe Özkan', totalAmount: 12000, donationCount: 2, lastDonation: '2024-01-12' },
    { name: 'Ali Şahin', totalAmount: 10000, donationCount: 3, lastDonation: '2024-01-11' }
  ]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('tr-TR') + ' ₺';
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'nakit': return 'Nakit';
      case 'kredi_karti': return 'Kredi Kartı';
      case 'online': return 'Online';
      case 'cek': return 'Çek/Senet';
      case 'ayni': return 'Ayni';
      case 'tekrarli': return 'Tekrarlı';
      default: return type;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'genel': return 'Genel';
      case 'egitim': return 'Eğitim';
      case 'saglik': return 'Sağlık';
      case 'acil': return 'Acil';
      case 'ramazan': return 'Ramazan';
      case 'kurban': return 'Kurban';
      default: return category;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nakit': return 'bg-blue-100 text-blue-800';
      case 'kredi_karti': return 'bg-indigo-100 text-indigo-800';
      case 'online': return 'bg-green-100 text-green-800';
      case 'cek': return 'bg-purple-100 text-purple-800';
      case 'ayni': return 'bg-orange-100 text-orange-800';
      case 'tekrarli': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'genel': return 'bg-gray-100 text-gray-800';
      case 'egitim': return 'bg-blue-100 text-blue-800';
      case 'saglik': return 'bg-red-100 text-red-800';
      case 'acil': return 'bg-orange-100 text-orange-800';
      case 'ramazan': return 'bg-green-100 text-green-800';
      case 'kurban': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bağış Raporları</h1>
          <p className="text-gray-600">Bağış istatistikleri ve detaylı raporlar</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Bu Hafta</SelectItem>
              <SelectItem value="month">Bu Ay</SelectItem>
              <SelectItem value="quarter">Bu Çeyrek</SelectItem>
              <SelectItem value="year">Bu Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bağış</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.toplamBagis)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +9.8% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay Bağış</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.buAyBagis)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +9.9% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bağışçı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toplamBagisci}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +21.1% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay Bağışçı</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.buAyBagisci}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +21.1% geçen aya göre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Types */}
        <Card>
          <CardHeader>
            <CardTitle>Bağış Türlerine Göre Dağılım</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {donationTypes.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeText(item.type)}
                    </Badge>
                    <span className="text-sm text-gray-600">{item.count} bağış</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(item.amount)}</div>
                    <div className="text-xs text-gray-500">%{item.percentage}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Kategorilere Göre Dağılım</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getCategoryColor(item.category)}>
                      {getCategoryText(item.category)}
                    </Badge>
                    <span className="text-sm text-gray-600">{item.count} bağış</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(item.amount)}</div>
                    <div className="text-xs text-gray-500">%{item.percentage}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Aylık Bağış Trendi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{item.month}</div>
                    <div className="text-sm text-gray-500">{item.count} bağış</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{formatCurrency(item.amount)}</div>
                  <div className="text-xs text-gray-500">Aylık toplam</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Donors */}
      <Card>
        <CardHeader>
          <CardTitle>En Çok Bağış Yapanlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDonors.map((donor, index) => (
              <div key={donor.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{donor.name}</div>
                    <div className="text-sm text-gray-500">
                      {donor.donationCount} bağış • Son: {donor.lastDonation}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{formatCurrency(donor.totalAmount)}</div>
                  <div className="text-xs text-gray-500">Toplam</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Ortalama Bağış</p>
                <p className="text-lg font-bold">{formatCurrency(1472)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Ayni Bağış Değeri</p>
                <p className="text-lg font-bold">{formatCurrency(20000)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Repeat className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Tekrarlı Bağışçı</p>
                <p className="text-lg font-bold">11</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 