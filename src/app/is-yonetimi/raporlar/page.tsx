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
  Filter, 
  Calendar,
  Clock,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Star,
  Timer,
  DollarSign,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';

interface PerformansRaporu {
  id: number;
  projeAdi: string;
  tamamlanmaOrani: number;
  butceKullanimi: number;
  gecikmeOrani: number;
  ekipPerformansi: number;
  riskSeviyesi: 'dusuk' | 'orta' | 'yuksek';
  sonGuncelleme: string;
}

interface EkipPerformansi {
  id: number;
  uyeAdi: string;
  departman: string;
  tamamlananGorev: number;
  toplamGorev: number;
  performansPuani: number;
  gecikmeOrani: number;
  calismaSuresi: number;
}

export default function RaporlarAnalizPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const [performansRaporlari] = useState<PerformansRaporu[]>([
    {
      id: 1,
      projeAdi: 'Yardım Kampanyası 2024',
      tamamlanmaOrani: 65,
      butceKullanimi: 78,
      gecikmeOrani: 12,
      ekipPerformansi: 85,
      riskSeviyesi: 'orta',
      sonGuncelleme: '2024-02-26'
    },
    {
      id: 2,
      projeAdi: 'Web Sitesi Yenileme',
      tamamlanmaOrani: 45,
      butceKullanimi: 45,
      gecikmeOrani: 8,
      ekipPerformansi: 92,
      riskSeviyesi: 'dusuk',
      sonGuncelleme: '2024-02-26'
    },
    {
      id: 3,
      projeAdi: 'Eğitim Programı',
      tamamlanmaOrani: 15,
      butceKullanimi: 15,
      gecikmeOrani: 25,
      ekipPerformansi: 78,
      riskSeviyesi: 'yuksek',
      sonGuncelleme: '2024-02-26'
    }
  ]);

  const [ekipPerformanslari] = useState<EkipPerformansi[]>([
    {
      id: 1,
      uyeAdi: 'Ahmet Yılmaz',
      departman: 'Proje Yönetimi',
      tamamlananGorev: 45,
      toplamGorev: 50,
      performansPuani: 92,
      gecikmeOrani: 8,
      calismaSuresi: 3
    },
    {
      id: 2,
      uyeAdi: 'Fatma Demir',
      departman: 'Teknoloji',
      tamamlananGorev: 32,
      toplamGorev: 36,
      performansPuani: 88,
      gecikmeOrani: 12,
      calismaSuresi: 2
    },
    {
      id: 3,
      uyeAdi: 'Mehmet Kaya',
      departman: 'Teknoloji',
      tamamlananGorev: 28,
      toplamGorev: 31,
      performansPuani: 85,
      gecikmeOrani: 15,
      calismaSuresi: 2
    },
    {
      id: 4,
      uyeAdi: 'Ayşe Özkan',
      departman: 'Eğitim',
      tamamlananGorev: 18,
      toplamGorev: 23,
      performansPuani: 90,
      gecikmeOrani: 18,
      calismaSuresi: 2
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'dusuk': return 'bg-green-100 text-green-800';
      case 'orta': return 'bg-yellow-100 text-yellow-800';
      case 'yuksek': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'dusuk': return 'Düşük';
      case 'orta': return 'Orta';
      case 'yuksek': return 'Yüksek';
      default: return risk;
    }
  };

  const getPerformansColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const toplamProje = performansRaporlari.length;
  const ortalamaTamamlanma = performansRaporlari.reduce((sum, p) => sum + p.tamamlanmaOrani, 0) / toplamProje;
  const ortalamaButceKullanimi = performansRaporlari.reduce((sum, p) => sum + p.butceKullanimi, 0) / toplamProje;
  const ortalamaEkipPerformansi = ekipPerformanslari.reduce((sum, e) => sum + e.performansPuani, 0) / ekipPerformanslari.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Raporlar & Analiz</h1>
          <p className="text-gray-600">Performans raporları ve analizler</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            PDF İndir
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Excel İndir
          </Button>
        </div>
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
                <SelectItem value="week">Bu Hafta</SelectItem>
                <SelectItem value="month">Bu Ay</SelectItem>
                <SelectItem value="quarter">Bu Çeyrek</SelectItem>
                <SelectItem value="year">Bu Yıl</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Departman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Departmanlar</SelectItem>
                <SelectItem value="proje">Proje Yönetimi</SelectItem>
                <SelectItem value="teknoloji">Teknoloji</SelectItem>
                <SelectItem value="egitim">Eğitim</SelectItem>
                <SelectItem value="pazarlama">Pazarlama</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Proje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Projeler</SelectItem>
                <SelectItem value="1">Yardım Kampanyası 2024</SelectItem>
                <SelectItem value="2">Web Sitesi Yenileme</SelectItem>
                <SelectItem value="3">Eğitim Programı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Proje</p>
                <p className="text-2xl font-bold text-gray-900">{toplamProje}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ortalama Tamamlanma</p>
                <p className="text-2xl font-bold text-green-600">%{Math.round(ortalamaTamamlanma)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bütçe Kullanımı</p>
                <p className="text-2xl font-bold text-orange-600">%{Math.round(ortalamaButceKullanimi)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ekip Performansı</p>
                <p className="text-2xl font-bold text-purple-600">%{Math.round(ortalamaEkipPerformansi)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Proje Performans Raporu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performansRaporlari.map((proje) => (
              <div key={proje.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium text-lg">{proje.projeAdi}</div>
                    <div className="text-sm text-gray-500">
                      Son güncelleme: {new Date(proje.sonGuncelleme).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                  <Badge className={getRiskColor(proje.riskSeviyesi)}>
                    {getRiskText(proje.riskSeviyesi)} Risk
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Tamamlanma Oranı</div>
                    <div className="text-lg font-semibold text-green-600">%{proje.tamamlanmaOrani}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${proje.tamamlanmaOrani}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Bütçe Kullanımı</div>
                    <div className="text-lg font-semibold text-orange-600">%{proje.butceKullanimi}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${proje.butceKullanimi}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Gecikme Oranı</div>
                    <div className="text-lg font-semibold text-red-600">%{proje.gecikmeOrani}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${proje.gecikmeOrani}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Ekip Performansı</div>
                    <div className="text-lg font-semibold text-blue-600">%{proje.ekipPerformansi}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${proje.ekipPerformansi}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Ekip Performans Raporu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Üye</th>
                  <th className="text-left p-3">Departman</th>
                  <th className="text-left p-3">Görev Tamamlanma</th>
                  <th className="text-left p-3">Performans</th>
                  <th className="text-left p-3">Gecikme Oranı</th>
                  <th className="text-left p-3">Çalışma Süresi</th>
                </tr>
              </thead>
              <tbody>
                {ekipPerformanslari.map((uye) => (
                  <tr key={uye.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium">{uye.uyeAdi}</div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{uye.departman}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm">
                          {uye.tamamlananGorev}/{uye.toplamGorev}
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(uye.tamamlananGorev / uye.toplamGorev) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`font-semibold ${getPerformansColor(uye.performansPuani)}`}>
                        %{uye.performansPuani}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-red-600 font-medium">%{uye.gecikmeOrani}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-600">{uye.calismaSuresi} yıl</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proje Durumu Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Grafik burada görüntülenecek</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aylık Performans Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Grafik burada görüntülenecek</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Anahtar Metrikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">%78</div>
              <div className="text-sm text-gray-500">Genel Proje Tamamlanma Oranı</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5% geçen aya göre</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">%85</div>
              <div className="text-sm text-gray-500">Ortalama Ekip Performansı</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+3% geçen aya göre</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">%12</div>
              <div className="text-sm text-gray-500">Ortalama Gecikme Oranı</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">+2% geçen aya göre</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 