'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Calendar,
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
  Briefcase
} from 'lucide-react';

interface Gorev {
  id: number;
  baslik: string;
  aciklama: string;
  projeId: number;
  projeAdi: string;
  atananKisi: string;
  durum: 'beklemede' | 'devam-ediyor' | 'tamamlandi' | 'iptal';
  oncelik: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  baslangicTarihi: string;
  bitisTarihi: string;
  tahminiSure: number;
  gerceklesenSure: number;
  etiketler: string[];
  olusturmaTarihi: string;
  sonGuncelleme: string;
  yorumlar: number;
  ekler: number;
}

export default function GorevYonetimiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [showNewTask, setShowNewTask] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const [gorevler] = useState<Gorev[]>([
    {
      id: 1,
      baslik: 'Kampanya materyalleri hazırlama',
      aciklama: 'Yardım kampanyası için broşür ve afiş tasarımı yapılacak. Tasarım örnekleri hazırlanacak ve onay için sunulacak.',
      projeId: 1,
      projeAdi: 'Yardım Kampanyası 2024',
      atananKisi: 'Fatma Demir',
      durum: 'tamamlandi',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-01-15',
      bitisTarihi: '2024-01-30',
      tahminiSure: 10,
      gerceklesenSure: 8,
      etiketler: ['tasarım', 'materyal', 'kampanya'],
      olusturmaTarihi: '2024-01-10',
      sonGuncelleme: '2024-01-28',
      yorumlar: 5,
      ekler: 3
    },
    {
      id: 2,
      baslik: 'Web sitesi ana sayfa tasarımı',
      aciklama: 'Yeni web sitesi için ana sayfa tasarımı. Modern ve kullanıcı dostu bir tasarım oluşturulacak.',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      atananKisi: 'Mehmet Kaya',
      durum: 'devam-ediyor',
      oncelik: 'orta',
      baslangicTarihi: '2024-02-15',
      bitisTarihi: '2024-03-15',
      tahminiSure: 15,
      gerceklesenSure: 8,
      etiketler: ['web', 'tasarım', 'frontend'],
      olusturmaTarihi: '2024-02-10',
      sonGuncelleme: '2024-02-25',
      yorumlar: 8,
      ekler: 2
    },
    {
      id: 3,
      baslik: 'Eğitim programı içerik hazırlama',
      aciklama: 'Eğitim programı için ders içeriklerinin hazırlanması. Müfredat ve materyaller oluşturulacak.',
      projeId: 3,
      projeAdi: 'Eğitim Programı',
      atananKisi: 'Ayşe Özkan',
      durum: 'beklemede',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-03-15',
      bitisTarihi: '2024-04-15',
      tahminiSure: 20,
      gerceklesenSure: 0,
      etiketler: ['eğitim', 'içerik', 'müfredat'],
      olusturmaTarihi: '2024-03-10',
      sonGuncelleme: '2024-03-12',
      yorumlar: 3,
      ekler: 1
    },
    {
      id: 4,
      baslik: 'Veritabanı optimizasyonu',
      aciklama: 'Mevcut veritabanının performans optimizasyonu ve güvenlik güncellemeleri yapılacak.',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      atananKisi: 'Ali Veli',
      durum: 'devam-ediyor',
      oncelik: 'acil',
      baslangicTarihi: '2024-02-20',
      bitisTarihi: '2024-03-10',
      tahminiSure: 12,
      gerceklesenSure: 6,
      etiketler: ['backend', 'veritabanı', 'optimizasyon'],
      olusturmaTarihi: '2024-02-18',
      sonGuncelleme: '2024-02-26',
      yorumlar: 12,
      ekler: 4
    },
    {
      id: 5,
      baslik: 'Sosyal medya kampanyası',
      aciklama: 'Yardım kampanyası için sosyal medya stratejisi ve içerik planı hazırlanacak.',
      projeId: 1,
      projeAdi: 'Yardım Kampanyası 2024',
      atananKisi: 'Hasan Hüseyin',
      durum: 'beklemede',
      oncelik: 'orta',
      baslangicTarihi: '2024-02-01',
      bitisTarihi: '2024-02-28',
      tahminiSure: 8,
      gerceklesenSure: 0,
      etiketler: ['sosyal medya', 'kampanya', 'içerik'],
      olusturmaTarihi: '2024-01-25',
      sonGuncelleme: '2024-01-30',
      yorumlar: 2,
      ekler: 0
    },
    {
      id: 6,
      baslik: 'Test ve kalite kontrol',
      aciklama: 'Web sitesi için kapsamlı test ve kalite kontrol süreçleri yapılacak.',
      projeId: 2,
      projeAdi: 'Web Sitesi Yenileme',
      atananKisi: 'Test Uzmanı',
      durum: 'beklemede',
      oncelik: 'yuksek',
      baslangicTarihi: '2024-03-20',
      bitisTarihi: '2024-04-05',
      tahminiSure: 10,
      gerceklesenSure: 0,
      etiketler: ['test', 'kalite kontrol', 'QA'],
      olusturmaTarihi: '2024-03-15',
      sonGuncelleme: '2024-03-15',
      yorumlar: 0,
      ekler: 0
    }
  ]);

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'devam-ediyor': return 'bg-blue-100 text-blue-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'devam-ediyor': return 'Devam Ediyor';
      case 'beklemede': return 'Beklemede';
      case 'tamamlandi': return 'Tamamlandı';
      case 'iptal': return 'İptal';
      default: return status;
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

  const getDurumIcon = (status: string) => {
    switch (status) {
      case 'devam-ediyor': return <Clock className="w-4 h-4" />;
      case 'beklemede': return <AlertCircle className="w-4 h-4" />;
      case 'tamamlandi': return <CheckCircle className="w-4 h-4" />;
      case 'iptal': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredGorevler = gorevler.filter(gorev => {
    const matchesSearch = gorev.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gorev.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || gorev.durum === selectedStatus;
    const matchesPriority = !selectedPriority || gorev.oncelik === selectedPriority;
    const matchesProject = !selectedProject || gorev.projeId.toString() === selectedProject;
    const matchesAssignee = !selectedAssignee || gorev.atananKisi === selectedAssignee;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesAssignee;
  });

  const toplamGorev = gorevler.length;
  const bekleyenGorev = gorevler.filter(g => g.durum === 'beklemede').length;
  const devamEdenGorev = gorevler.filter(g => g.durum === 'devam-ediyor').length;
  const tamamlananGorev = gorevler.filter(g => g.durum === 'tamamlandi').length;
  const toplamSure = gorevler.reduce((sum, g) => sum + g.tahminiSure, 0);
  const harcananSure = gorevler.reduce((sum, g) => sum + g.gerceklesenSure, 0);

  const uniqueProjects = [...new Set(gorevler.map(g => ({ id: g.projeId, name: g.projeAdi })))];
  const uniqueAssignees = [...new Set(gorevler.map(g => g.atananKisi))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Görev Yönetimi</h1>
          <p className="text-gray-600">Görev atama ve takibi sistemi</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}>
            {viewMode === 'list' ? 'Kanban Görünümü' : 'Liste Görünümü'}
          </Button>
          <Button onClick={() => setShowNewTask(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Görev
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Görev</p>
                <p className="text-2xl font-bold text-gray-900">{toplamGorev}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-600">{bekleyenGorev}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Devam Eden</p>
                <p className="text-2xl font-bold text-blue-600">{devamEdenGorev}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-2xl font-bold text-green-600">{tamamlananGorev}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Süre Kullanımı</p>
                <p className="text-2xl font-bold text-purple-600">{harcananSure}/{toplamSure}g</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Timer className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Görev ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="devam-ediyor">Devam Ediyor</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="dusuk">Düşük</SelectItem>
                <SelectItem value="orta">Orta</SelectItem>
                <SelectItem value="yuksek">Yüksek</SelectItem>
                <SelectItem value="acil">Acil</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Proje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Projeler</SelectItem>
                {uniqueProjects.map(project => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Atanan Kişi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kişiler</SelectItem>
                {uniqueAssignees.map(assignee => (
                  <SelectItem key={assignee} value={assignee}>
                    {assignee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Görevler ({filteredGorevler.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGorevler.map((gorev) => (
              <div key={gorev.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                      <div className="font-medium text-lg">{gorev.baslik}</div>
                      <Badge className={getDurumColor(gorev.durum)}>
                        {getDurumIcon(gorev.durum)}
                        <span className="ml-1">{getDurumText(gorev.durum)}</span>
                      </Badge>
                      <Badge className={getOncelikColor(gorev.oncelik)}>
                        {getOncelikText(gorev.oncelik)}
                      </Badge>
                    </div>
                    <div className="text-gray-600 mb-3">{gorev.aciklama}</div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Atanan:</span>
                        <span className="font-medium">{gorev.atananKisi}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Proje:</span>
                        <span className="font-medium">{gorev.projeAdi}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Timer className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Süre:</span>
                        <span className="font-medium">{gorev.gerceklesenSure}/{gorev.tahminiSure}g</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Bitiş:</span>
                        <span className="font-medium">{new Date(gorev.bitisTarihi).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{gorev.yorumlar} yorum</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Link className="w-4 h-4" />
                        <span>{gorev.ekler} ek</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Son güncelleme: {new Date(gorev.sonGuncelleme).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {gorev.etiketler.map((etiket, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {etiket}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>İlerleme</span>
                    <span>%{Math.round((gorev.gerceklesenSure / gorev.tahminiSure) * 100)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((gorev.gerceklesenSure / gorev.tahminiSure) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Task Modal */}
      {showNewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Yeni Görev</h2>
              <Button variant="outline" onClick={() => setShowNewTask(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Görev Başlığı</label>
                <Input placeholder="Görev başlığı girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea placeholder="Görev açıklaması girin" rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Proje</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Proje seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Projeler</SelectItem>
                      {uniqueProjects.map(project => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name}
                        </SelectItem>
                      ))}
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
                      <SelectItem value="all">Tüm Kişiler</SelectItem>
                      {uniqueAssignees.map(assignee => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                
                <div>
                  <label className="block text-sm font-medium mb-2">Durum</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beklemede">Beklemede</SelectItem>
                      <SelectItem value="devam-ediyor">Devam Ediyor</SelectItem>
                      <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                      <SelectItem value="iptal">İptal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlangıç Tarihi</label>
                  <Input type="date" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bitiş Tarihi</label>
                  <Input type="date" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tahmini Süre (gün)</label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Etiketler</label>
                <Input placeholder="Etiketleri virgülle ayırarak girin" />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Görevi Oluştur
                </Button>
                <Button variant="outline" onClick={() => setShowNewTask(false)}>
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