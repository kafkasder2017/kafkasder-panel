'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3
} from 'lucide-react';

interface KasaHareketi {
  id: number;
  islemNo: string;
  islemTuru: 'gelir' | 'gider' | 'transfer';
  kategori: string;
  altKategori: string;
  tutar: number;
  paraBirimi: string;
  aciklama: string;
  tarih: string;
  kasaAdi: string;
  islemYapan: string;
  belgeNo?: string;
  onayDurumu: 'onaylandi' | 'beklemede' | 'reddedildi';
  onayEden?: string;
  onayTarihi?: string;
}

interface KasaOzeti {
  toplamGelir: number;
  toplamGider: number;
  netDurum: number;
  buAyGelir: number;
  buAyGider: number;
  gecenAyGelir: number;
  gecenAyGider: number;
  gelirArtisOrani: number;
  giderArtisOrani: number;
}

export default function KasaRaporlariPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedKasa, setSelectedKasa] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('buAy');

  const [kasaOzeti] = useState<KasaOzeti>({
    toplamGelir: 1250000,
    toplamGider: 850000,
    netDurum: 400000,
    buAyGelir: 185000,
    buAyGider: 95000,
    gecenAyGelir: 165000,
    gecenAyGider: 88000,
    gelirArtisOrani: 12.1,
    giderArtisOrani: 8.0
  });

  const [kasaHareketleri] = useState<KasaHareketi[]>([
    {
      id: 1,
      islemNo: 'KAS-2024-001',
      islemTuru: 'gelir',
      kategori: 'Bağış',
      altKategori: 'Nakit Bağış',
      tutar: 5000,
      paraBirimi: 'TRY',
      aciklama: 'Genel bağış geliri',
      tarih: '2024-01-20',
      kasaAdi: 'Ana Kasa',
      islemYapan: 'Ahmet Yılmaz',
      belgeNo: 'BEL-001',
      onayDurumu: 'onaylandi',
      onayEden: 'Fatma Demir',
      onayTarihi: '2024-01-20'
    },
    {
      id: 2,
      islemNo: 'KAS-2024-002',
      islemTuru: 'gider',
      kategori: 'Personel',
      altKategori: 'Maaş',
      tutar: 25000,
      paraBirimi: 'TRY',
      aciklama: 'Personel maaş ödemesi',
      tarih: '2024-01-19',
      kasaAdi: 'Ana Kasa',
      islemYapan: 'Mehmet Kaya',
      belgeNo: 'BEL-002',
      onayDurumu: 'onaylandi',
      onayEden: 'Fatma Demir',
      onayTarihi: '2024-01-19'
    },
    {
      id: 3,
      islemNo: 'KAS-2024-003',
      islemTuru: 'gelir',
      kategori: 'Aidat',
      altKategori: 'Üye Aidatı',
      tutar: 1000,
      paraBirimi: 'TRY',
      aciklama: 'Üye aidatı tahsilatı',
      tarih: '2024-01-18',
      kasaAdi: 'Ana Kasa',
      islemYapan: 'Ayşe Özkan',
      belgeNo: 'BEL-003',
      onayDurumu: 'onaylandi',
      onayEden: 'Fatma Demir',
      onayTarihi: '2024-01-18'
    },
    {
      id: 4,
      islemNo: 'KAS-2024-004',
      islemTuru: 'gider',
      kategori: 'Ofis',
      altKategori: 'Kira',
      tutar: 15000,
      paraBirimi: 'TRY',
      aciklama: 'Ofis kirası ödemesi',
      tarih: '2024-01-17',
      kasaAdi: 'Ana Kasa',
      islemYapan: 'Ali Veli',
      belgeNo: 'BEL-004',
      onayDurumu: 'beklemede'
    },
    {
      id: 5,
      islemNo: 'KAS-2024-005',
      islemTuru: 'transfer',
      kategori: 'Transfer',
      altKategori: 'Banka Transferi',
      tutar: 50000,
      paraBirimi: 'TRY',
      aciklama: 'Banka hesabına transfer',
      tarih: '2024-01-16',
      kasaAdi: 'Ana Kasa',
      islemYapan: 'Hasan Yıldız',
      belgeNo: 'BEL-005',
      onayDurumu: 'onaylandi',
      onayEden: 'Fatma Demir',
      onayTarihi: '2024-01-16'
    },
    {
      id: 6,
      islemNo: 'KAS-2024-006',
      islemTuru: 'gider',
      kategori: 'Hizmet',
      altKategori: 'Elektrik',
      tutar: 2500,
      paraBirimi: 'TRY',
      aciklama: 'Elektrik faturası ödemesi',
      tarih: '2024-01-15',
      kasaAdi: 'Ana Kasa',
      islemYapan: 'Zeynep Kaya',
      belgeNo: 'BEL-006',
      onayDurumu: 'reddedildi',
      onayEden: 'Fatma Demir',
      onayTarihi: '2024-01-15'
    }
  ]);

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getIslemTuruColor = (type: string) => {
    switch (type) {
      case 'gelir': return 'bg-green-100 text-green-800';
      case 'gider': return 'bg-red-100 text-red-800';
      case 'transfer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIslemTuruText = (type: string) => {
    switch (type) {
      case 'gelir': return 'Gelir';
      case 'gider': return 'Gider';
      case 'transfer': return 'Transfer';
      default: return type;
    }
  };

  const getOnayDurumuColor = (status: string) => {
    switch (status) {
      case 'onaylandi': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'reddedildi': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOnayDurumuText = (status: string) => {
    switch (status) {
      case 'onaylandi': return 'Onaylandı';
      case 'beklemede': return 'Beklemede';
      case 'reddedildi': return 'Reddedildi';
      default: return status;
    }
  };

  const filteredHareketler = kasaHareketleri.filter(hareket => {
    const matchesSearch = hareket.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hareket.aciklama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hareket.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || hareket.islemTuru === selectedType;
    const matchesCategory = !selectedCategory || hareket.kategori === selectedCategory;
    const matchesKasa = !selectedKasa || hareket.kasaAdi === selectedKasa;
    
    return matchesSearch && matchesType && matchesCategory && matchesKasa;
  });

  const toplamGelir = filteredHareketler.filter(h => h.islemTuru === 'gelir').reduce((sum, h) => sum + h.tutar, 0);
  const toplamGider = filteredHareketler.filter(h => h.islemTuru === 'gider').reduce((sum, h) => sum + h.tutar, 0);
  const netDurum = toplamGelir - toplamGider;
  const onaylananIslem = filteredHareketler.filter(h => h.onayDurumu === 'onaylandi').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kasa Raporları</h1>
          <p className="text-gray-600">Kasa hareketleri ve finansal raporlar</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Hareket
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(kasaOzeti.toplamGelir, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{kasaOzeti.gelirArtisOrani}%</span>
              <span className="text-gray-500 ml-1">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Gider</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(kasaOzeti.toplamGider, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">+{kasaOzeti.giderArtisOrani}%</span>
              <span className="text-gray-500 ml-1">geçen aya göre</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Durum</p>
                <p className={`text-2xl font-bold ${netDurum >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(netDurum), 'TRY')}
                </p>
              </div>
              <div className={`p-3 rounded-full ${netDurum >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                <DollarSign className={`w-6 h-6 ${netDurum >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {netDurum >= 0 ? 'Pozitif bakiye' : 'Negatif bakiye'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Onaylanan İşlem</p>
                <p className="text-2xl font-bold text-blue-600">{onaylananIslem}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              %{filteredHareketler.length > 0 ? Math.round((onaylananIslem / filteredHareketler.length) * 100) : 0} onay oranı
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
                placeholder="İşlem no, açıklama veya kategori ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="İşlem Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="gelir">Gelir</SelectItem>
                <SelectItem value="gider">Gider</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="Bağış">Bağış</SelectItem>
                <SelectItem value="Aidat">Aidat</SelectItem>
                <SelectItem value="Personel">Personel</SelectItem>
                <SelectItem value="Ofis">Ofis</SelectItem>
                <SelectItem value="Hizmet">Hizmet</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedKasa} onValueChange={setSelectedKasa}>
              <SelectTrigger>
                <SelectValue placeholder="Kasa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kasalar</SelectItem>
                <SelectItem value="Ana Kasa">Ana Kasa</SelectItem>
                <SelectItem value="Yardım Kasası">Yardım Kasası</SelectItem>
                <SelectItem value="Acil Durum Kasası">Acil Durum Kasası</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Dönem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buAy">Bu Ay</SelectItem>
                <SelectItem value="gecenAy">Geçen Ay</SelectItem>
                <SelectItem value="buYil">Bu Yıl</SelectItem>
                <SelectItem value="gecenYil">Geçen Yıl</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gelir/Gider Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Grafik burada gösterilecek</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aylık Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Grafik burada gösterilecek</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kasa Hareketleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Tür</th>
                  <th className="text-left p-3 font-medium">Kategori</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Kasa</th>
                  <th className="text-left p-3 font-medium">Onay Durumu</th>
                  <th className="text-left p-3 font-medium">Tarih</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredHareketler.map((hareket) => (
                  <tr key={hareket.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{hareket.islemNo}</div>
                      {hareket.belgeNo && (
                        <div className="text-xs text-gray-500">Belge: {hareket.belgeNo}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge className={getIslemTuruColor(hareket.islemTuru)}>
                        {getIslemTuruText(hareket.islemTuru)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{hareket.kategori}</div>
                      <div className="text-sm text-gray-500">{hareket.altKategori}</div>
                    </td>
                    <td className="p-3">
                      <div className={`font-semibold ${
                        hareket.islemTuru === 'gelir' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {hareket.islemTuru === 'gelir' ? '+' : '-'}{formatCurrency(hareket.tutar, hareket.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{hareket.kasaAdi}</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getOnayDurumuColor(hareket.onayDurumu)}>
                        {getOnayDurumuText(hareket.onayDurumu)}
                      </Badge>
                      {hareket.onayEden && (
                        <div className="text-xs text-gray-500 mt-1">{hareket.onayEden}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{hareket.tarih}</div>
                      <div className="text-xs text-gray-500">{hareket.islemYapan}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
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