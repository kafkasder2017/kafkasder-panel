'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  RefreshCw,
  Eye,
  Trash2,
  Plus,
  Database,
  BarChart3
} from 'lucide-react';

interface YuklemeIslemi {
  id: number;
  dosyaAdi: string;
  dosyaTuru: 'excel' | 'csv' | 'xml' | 'json';
  boyut: number;
  yuklenmeTarihi: string;
  durum: 'beklemede' | 'isleniyor' | 'tamamlandi' | 'hata';
  islemYapan: string;
  toplamKayit: number;
  basariliKayit: number;
  hataliKayit: number;
  hataMesaji?: string;
  islemSuresi?: number;
}

interface DosyaSabloni {
  id: number;
  ad: string;
  aciklama: string;
  dosyaTuru: string;
  ornekDosya: string;
  gerekliAlanlar: string[];
}

export default function DosyaYuklemePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [yuklemeIslemleri] = useState<YuklemeIslemi[]>([
    {
      id: 1,
      dosyaAdi: 'bagis_verileri_2024.xlsx',
      dosyaTuru: 'excel',
      boyut: 2.5,
      yuklenmeTarihi: '2024-01-20 14:30:00',
      durum: 'tamamlandi',
      islemYapan: 'Ahmet Yılmaz',
      toplamKayit: 1500,
      basariliKayit: 1485,
      hataliKayit: 15,
      islemSuresi: 45
    },
    {
      id: 2,
      dosyaAdi: 'uye_listesi.csv',
      dosyaTuru: 'csv',
      boyut: 1.2,
      yuklenmeTarihi: '2024-01-19 16:15:00',
      durum: 'isleniyor',
      islemYapan: 'Fatma Demir',
      toplamKayit: 800,
      basariliKayit: 650,
      hataliKayit: 0,
      islemSuresi: 30
    },
    {
      id: 3,
      dosyaAdi: 'finansal_rapor.xml',
      dosyaTuru: 'xml',
      boyut: 3.8,
      yuklenmeTarihi: '2024-01-18 11:45:00',
      durum: 'hata',
      islemYapan: 'Mehmet Kaya',
      toplamKayit: 2000,
      basariliKayit: 0,
      hataliKayit: 2000,
      hataMesaji: 'XML formatı geçersiz',
      islemSuresi: 120
    },
    {
      id: 4,
      dosyaAdi: 'yardim_alanlar.json',
      dosyaTuru: 'json',
      boyut: 0.8,
      yuklenmeTarihi: '2024-01-17 09:20:00',
      durum: 'tamamlandi',
      islemYapan: 'Ayşe Özkan',
      toplamKayit: 300,
      basariliKayit: 300,
      hataliKayit: 0,
      islemSuresi: 15
    }
  ]);

  const [dosyaSablolari] = useState<DosyaSabloni[]>([
    {
      id: 1,
      ad: 'Bağış Verileri',
      aciklama: 'Bağışçı ve bağış bilgileri için Excel şablonu',
      dosyaTuru: 'excel',
      ornekDosya: 'bagis_sablonu.xlsx',
      gerekliAlanlar: ['Ad', 'Soyad', 'E-posta', 'Telefon', 'Bağış Tutarı', 'Tarih']
    },
    {
      id: 2,
      ad: 'Üye Listesi',
      aciklama: 'Üye bilgileri için CSV şablonu',
      dosyaTuru: 'csv',
      ornekDosya: 'uye_sablonu.csv',
      gerekliAlanlar: ['Üye No', 'Ad', 'Soyad', 'E-posta', 'Telefon', 'Üyelik Tarihi']
    },
    {
      id: 3,
      ad: 'Finansal Rapor',
      aciklama: 'Finansal işlemler için XML şablonu',
      dosyaTuru: 'xml',
      ornekDosya: 'finans_sablonu.xml',
      gerekliAlanlar: ['İşlem No', 'Tarih', 'Tutar', 'Açıklama', 'Kategori']
    },
    {
      id: 4,
      ad: 'Yardım Alanlar',
      aciklama: 'Yardım alan kişiler için JSON şablonu',
      dosyaTuru: 'json',
      ornekDosya: 'yardim_sablonu.json',
      gerekliAlanlar: ['TC Kimlik', 'Ad', 'Soyad', 'Yardım Türü', 'Tutar', 'Tarih']
    }
  ]);

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${(sizeInMB * 1024).toFixed(1)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'isleniyor': return 'bg-blue-100 text-blue-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'hata': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'isleniyor': return 'İşleniyor';
      case 'beklemede': return 'Beklemede';
      case 'hata': return 'Hata';
      default: return status;
    }
  };

  const getDurumIcon = (status: string) => {
    switch (status) {
      case 'tamamlandi': return <CheckCircle className="w-4 h-4" />;
      case 'isleniyor': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'beklemede': return <Clock className="w-4 h-4" />;
      case 'hata': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getDosyaTuruIcon = (type: string) => {
    switch (type) {
      case 'excel': return '📊';
      case 'csv': return '📄';
      case 'xml': return '📋';
      case 'json': return '📝';
      default: return '📁';
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toplamYukleme = yuklemeIslemleri.length;
  const basariliYukleme = yuklemeIslemleri.filter(y => y.durum === 'tamamlandi').length;
  const hataliYukleme = yuklemeIslemleri.filter(y => y.durum === 'hata').length;
  const toplamKayit = yuklemeIslemleri.reduce((sum, y) => sum + y.toplamKayit, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dosyadan Veri Yükleme</h1>
          <p className="text-gray-600">Toplu veri yükleme ve işleme</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Şablon İndir
          </Button>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Raporlar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Yükleme</p>
                <p className="text-2xl font-bold text-gray-900">{toplamYukleme}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Başarılı</p>
                <p className="text-2xl font-bold text-green-600">{basariliYukleme}</p>
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
                <p className="text-sm text-gray-600">Hatalı</p>
                <p className="text-2xl font-bold text-red-600">{hataliYukleme}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kayıt</p>
                <p className="text-2xl font-bold text-blue-600">{toplamKayit.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Dosya Yükleme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Dosya seçin veya sürükleyip bırakın</p>
              <p className="text-sm text-gray-500 mb-4">Excel, CSV, XML, JSON dosyaları desteklenir</p>
              <Input
                type="file"
                accept=".xlsx,.xls,.csv,.xml,.json"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span>Dosya Seç</span>
                </Button>
              </label>
            </div>

            {selectedFile && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isUploading ? 'Yükleniyor...' : 'Yükle'}
                  </Button>
                </div>
                {isUploading && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      %{uploadProgress} tamamlandı
                    </div>
                  </div>
                )}
              </div>
            )}

            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Şablon seçin (opsiyonel)" />
              </SelectTrigger>
              <SelectContent>
                {dosyaSablolari.map((sablon) => (
                  <SelectItem key={sablon.id} value={sablon.id.toString()}>
                    {sablon.ad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* File Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Dosya Şablonları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dosyaSablolari.map((sablon) => (
                <div key={sablon.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getDosyaTuruIcon(sablon.dosyaTuru)}</span>
                      <div>
                        <div className="font-medium">{sablon.ad}</div>
                        <div className="text-sm text-gray-500">{sablon.aciklama}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Gerekli alanlar: {sablon.gerekliAlanlar.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle>Yükleme Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Dosya Adı</th>
                  <th className="text-left p-3 font-medium">Tür</th>
                  <th className="text-left p-3 font-medium">Boyut</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">Kayıt Sayısı</th>
                  <th className="text-left p-3 font-medium">Başarı Oranı</th>
                  <th className="text-left p-3 font-medium">Tarih</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {yuklemeIslemleri.map((islem) => (
                  <tr key={islem.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getDosyaTuruIcon(islem.dosyaTuru)}</span>
                        <div>
                          <div className="font-medium">{islem.dosyaAdi}</div>
                          <div className="text-xs text-gray-500">{islem.islemYapan}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{islem.dosyaTuru.toUpperCase()}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{formatFileSize(islem.boyut)}</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getDurumColor(islem.durum)}>
                        {getDurumIcon(islem.durum)}
                        <span className="ml-1">{getDurumText(islem.durum)}</span>
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>Toplam: {islem.toplamKayit}</div>
                        <div className="text-green-600">Başarılı: {islem.basariliKayit}</div>
                        {islem.hataliKayit > 0 && (
                          <div className="text-red-600">Hatalı: {islem.hataliKayit}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {islem.toplamKayit > 0 ? 
                          Math.round((islem.basariliKayit / islem.toplamKayit) * 100) : 0}%
                      </div>
                      {islem.islemSuresi && (
                        <div className="text-xs text-gray-500">{islem.islemSuresi} saniye</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{islem.yuklenmeTarihi}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {islem.durum === 'hata' && (
                          <Button size="sm" variant="outline">
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 