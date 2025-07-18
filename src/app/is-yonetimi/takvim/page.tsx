'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Link,
  User,
  Tag,
  CalendarDays,
  Timer,
  Briefcase,
  Star,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Etkinlik {
  id: number;
  baslik: string;
  aciklama: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  tip: 'proje' | 'gorev' | 'toplanti' | 'egitim' | 'tatil';
  oncelik: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  durum: 'planlandi' | 'devam-ediyor' | 'tamamlandi' | 'iptal';
  projeId?: number;
  projeAdi?: string;
  atananKisi?: string;
  renk: string;
  tamGun: boolean;
  tekrarlama?: 'gunluk' | 'haftalik' | 'aylik' | 'yillik';
}

export default function TakvimPlanlamaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<Etkinlik | null>(null);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [etkinlikler] = useState<Etkinlik[]>([
    {
      id: 1,
      baslik: 'Proje Planlama Toplantısı',
      aciklama: 'Yardım Kampanyası 2024 projesi için planlama toplantısı',
      baslangicTarihi: '2024-02-26T10:00:00',
      bitisTarihi: '2024-02-26T12:00:00',
      tip: 'toplanti',
      oncelik: 'yuksek',
      durum: 'planlandi',
      projeId: 1,
      projeAdi: 'Yardım Kampanyası 2024',
      atananKisi: 'Ahmet Yılmaz',
      renk: 'bg-blue-500',
      tamGun: false
    },
    {
      id: 2,
      baslik: 'Web Sitesi Tasarım Tamamlanması',
      aciklama: 'Ana sayfa tasarımının tamamlanması ve onay süreci',
      baslangicTarihi: '2024-02-27T09:00:00',
      bitisTarihi: '2024-02-27T17:00:00',
      tip: 'gorev',
      oncelik: 'orta',
      durum: 'devam-ediyor',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      atananKisi: 'Fatma Demir',
      renk: 'bg-green-500',
      tamGun: true
    },
    {
      id: 3,
      baslik: 'Eğitim Programı İçerik Hazırlama',
      aciklama: 'Eğitim programı için ders içeriklerinin hazırlanması',
      baslangicTarihi: '2024-02-28T14:00:00',
      bitisTarihi: '2024-02-28T16:00:00',
      tip: 'gorev',
      oncelik: 'yuksek',
      durum: 'planlandi',
      projeId: 3,
      projeAdi: 'Eğitim Programı',
      atananKisi: 'Ayşe Özkan',
      renk: 'bg-purple-500',
      tamGun: false
    },
    {
      id: 4,
      baslik: 'Veritabanı Optimizasyonu',
      aciklama: 'Mevcut veritabanının performans optimizasyonu',
      baslangicTarihi: '2024-02-29T08:00:00',
      bitisTarihi: '2024-02-29T18:00:00',
      tip: 'gorev',
      oncelik: 'acil',
      durum: 'devam-ediyor',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      atananKisi: 'Ali Veli',
      renk: 'bg-red-500',
      tamGun: true
    },
    {
      id: 5,
      baslik: 'Haftalık Durum Toplantısı',
      aciklama: 'Tüm projelerin haftalık durum değerlendirmesi',
      baslangicTarihi: '2024-03-01T15:00:00',
      bitisTarihi: '2024-03-01T16:30:00',
      tip: 'toplanti',
      oncelik: 'orta',
      durum: 'planlandi',
      renk: 'bg-yellow-500',
      tamGun: false,
      tekrarlama: 'haftalik'
    },
    {
      id: 6,
      baslik: 'React Eğitimi',
      aciklama: 'Ekip üyelerine React ve TypeScript eğitimi',
      baslangicTarihi: '2024-03-04T10:00:00',
      bitisTarihi: '2024-03-04T17:00:00',
      tip: 'egitim',
      oncelik: 'yuksek',
      durum: 'planlandi',
      atananKisi: 'Fatma Demir',
      renk: 'bg-indigo-500',
      tamGun: true
    }
  ]);

  const getTipColor = (tip: string) => {
    switch (tip) {
      case 'proje': return 'bg-purple-100 text-purple-800';
      case 'gorev': return 'bg-blue-100 text-blue-800';
      case 'toplanti': return 'bg-yellow-100 text-yellow-800';
      case 'egitim': return 'bg-green-100 text-green-800';
      case 'tatil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipText = (tip: string) => {
    switch (tip) {
      case 'proje': return 'Proje';
      case 'gorev': return 'Görev';
      case 'toplanti': return 'Toplantı';
      case 'egitim': return 'Eğitim';
      case 'tatil': return 'Tatil';
      default: return tip;
    }
  };

  const getOncelikColor = (priority: string) => {
    switch (priority) {
      case 'acil': return 'bg-red-100 text-red-800';
      case 'yuksek': return 'bg-orange-100 text-orange-800';
      case 'orta': return 'bg-yellow-100 text-yellow-800';
      case 'dusuk': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOncelikText = (priority: string) => {
    switch (priority) {
      case 'acil': return 'Acil';
      case 'yuksek': return 'Yüksek';
      case 'orta': return 'Orta';
      case 'dusuk': return 'Düşük';
      default: return priority;
    }
  };

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'devam-ediyor': return 'bg-blue-100 text-blue-800';
      case 'planlandi': return 'bg-yellow-100 text-yellow-800';
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'devam-ediyor': return 'Devam Ediyor';
      case 'planlandi': return 'Planlandı';
      case 'tamamlandi': return 'Tamamlandı';
      case 'iptal': return 'İptal';
      default: return status;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return etkinlikler.filter(event => {
      const eventDate = new Date(event.baslangicTarihi);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const monthDays = getMonthDays(currentDate);
  const today = new Date();

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Takvim & Planlama</h1>
          <p className="text-gray-600">Proje takvimi ve etkinlik planlama</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={goToToday}>
            <CalendarDays className="w-4 h-4 mr-2" />
            Bugün
          </Button>
          <Button onClick={() => setShowNewEvent(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Etkinlik
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </h2>
              <Button variant="outline" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={viewMode === 'month' ? 'default' : 'outline'}
                onClick={() => setViewMode('month')}
              >
                Ay
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'outline'}
                onClick={() => setViewMode('week')}
              >
                Hafta
              </Button>
              <Button 
                variant={viewMode === 'day' ? 'default' : 'outline'}
                onClick={() => setViewMode('day')}
              >
                Gün
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {monthDays.map((day, index) => {
              const isToday = day.toDateString() === today.toDateString();
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const dayEvents = getEventsForDate(day);
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-200 ${
                    isToday ? 'bg-blue-50 border-blue-300' : ''
                  } ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600' : ''
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded cursor-pointer ${event.renk} text-white truncate`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        title={event.baslik}
                      >
                        {event.baslik}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayEvents.length - 3} daha
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Etkinlikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {etkinlikler
              .filter(event => new Date(event.baslangicTarihi) >= new Date())
              .sort((a, b) => new Date(a.baslangicTarihi).getTime() - new Date(b.baslangicTarihi).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${event.renk}`}></div>
                  <div className="flex-1">
                    <div className="font-medium">{event.baslik}</div>
                    <div className="text-sm text-gray-500">{event.aciklama}</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                      <span>{formatDate(event.baslangicTarihi)}</span>
                      {!event.tamGun && (
                        <span>{formatTime(event.baslangicTarihi)} - {formatTime(event.bitisTarihi)}</span>
                      )}
                      {event.projeAdi && <span>Proje: {event.projeAdi}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTipColor(event.tip)}>
                      {getTipText(event.tip)}
                    </Badge>
                    <Badge className={getOncelikColor(event.oncelik)}>
                      {getOncelikText(event.oncelik)}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Etkinlik Detayları</h2>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="font-medium text-lg">{selectedEvent.baslik}</div>
                <div className="text-gray-600">{selectedEvent.aciklama}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Başlangıç</div>
                  <div className="font-medium">
                    {formatDate(selectedEvent.baslangicTarihi)}
                    {!selectedEvent.tamGun && ` ${formatTime(selectedEvent.baslangicTarihi)}`}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Bitiş</div>
                  <div className="font-medium">
                    {formatDate(selectedEvent.bitisTarihi)}
                    {!selectedEvent.tamGun && ` ${formatTime(selectedEvent.bitisTarihi)}`}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Tip</div>
                  <Badge className={getTipColor(selectedEvent.tip)}>
                    {getTipText(selectedEvent.tip)}
                  </Badge>
                </div>
                <div>
                  <div className="text-gray-500">Öncelik</div>
                  <Badge className={getOncelikColor(selectedEvent.oncelik)}>
                    {getOncelikText(selectedEvent.oncelik)}
                  </Badge>
                </div>
                {selectedEvent.projeAdi && (
                  <div>
                    <div className="text-gray-500">Proje</div>
                    <div className="font-medium">{selectedEvent.projeAdi}</div>
                  </div>
                )}
                {selectedEvent.atananKisi && (
                  <div>
                    <div className="text-gray-500">Atanan Kişi</div>
                    <div className="font-medium">{selectedEvent.atananKisi}</div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Düzenle
                </Button>
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Etkinlik</h2>
              <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Etkinlik Başlığı</label>
                <Input placeholder="Etkinlik başlığı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Etkinlik açıklaması girin" rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlangıç Tarihi</label>
                  <Input type="datetime-local" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bitiş Tarihi</label>
                  <Input type="datetime-local" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tip</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tip seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proje">Proje</SelectItem>
                      <SelectItem value="gorev">Görev</SelectItem>
                      <SelectItem value="toplanti">Toplantı</SelectItem>
                      <SelectItem value="egitim">Eğitim</SelectItem>
                      <SelectItem value="tatil">Tatil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Öncelik</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dusuk">Düşük</SelectItem>
                      <SelectItem value="orta">Orta</SelectItem>
                      <SelectItem value="yuksek">Yüksek</SelectItem>
                      <SelectItem value="acil">Acil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Proje</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Proje seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yardım Kampanyası 2024</SelectItem>
                      <SelectItem value="2">Web Sitesi Yenileme</SelectItem>
                      <SelectItem value="3">Eğitim Programı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Atanan Kişi</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kişi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmet">Ahmet Yılmaz</SelectItem>
                      <SelectItem value="fatma">Fatma Demir</SelectItem>
                      <SelectItem value="mehmet">Mehmet Kaya</SelectItem>
                      <SelectItem value="ayse">Ayşe Özkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Etkinlik Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 