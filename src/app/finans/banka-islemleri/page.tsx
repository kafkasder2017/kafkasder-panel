'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
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
  CreditCard,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface BankaIslemi {
  id: number;
  islemNo: string;
  bankaAdi: string;
  hesapNo: string;
  islemTuru: 'para_yatirma' | 'para_cekme' | 'havale' | 'eft' | 'kredi_karti' | 'cek_senet';
  tutar: number;
  paraBirimi: string;
  aciklama: string;
  tarih: string;
  durum: 'beklemede' | 'tamamlandi' | 'iptal' | 'hata';
  komisyon: number;
  netTutar: number;
  islemYapan: string;
  referansNo?: string;
}

export default function BankaIslemleriPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [bankaIslemleri] = useState<BankaIslemi[]>([
    {
      id: 1,
      islemNo: 'BIS-2024-001',
      bankaAdi: 'Ziraat Bankası',
      hesapNo: '****1234',
      islemTuru: 'para_yatirma',
      tutar: 50000,
      paraBirimi: 'TRY',
      aciklama: 'Bağış geliri yatırma',
      tarih: '2024-01-20',
      durum: 'tamamlandi',
      komisyon: 0,
      netTutar: 50000,
      islemYapan: 'Ahmet Yılmaz',
      referansNo: 'REF-001'
    },
    {
      id: 2,
      islemNo: 'BIS-2024-002',
      bankaAdi: 'Garanti BBVA',
      hesapNo: '****5678',
      islemTuru: 'havale',
      tutar: 25000,
      paraBirimi: 'TRY',
      aciklama: 'Personel maaş ödemesi',
      tarih: '2024-01-19',
      durum: 'tamamlandi',
      komisyon: 15,
      netTutar: 24985,
      islemYapan: 'Fatma Demir',
      referansNo: 'REF-002'
    },
    {
      id: 3,
      islemNo: 'BIS-2024-003',
      bankaAdi: 'İş Bankası',
      hesapNo: '****9012',
      islemTuru: 'eft',
      tutar: 100000,
      paraBirimi: 'TRY',
      aciklama: 'Tedarikçi ödemesi',
      tarih: '2024-01-18',
      durum: 'beklemede',
      komisyon: 25,
      netTutar: 99975,
      islemYapan: 'Mehmet Kaya',
      referansNo: 'REF-003'
    },
    {
      id: 4,
      islemNo: 'BIS-2024-004',
      bankaAdi: 'Yapı Kredi',
      hesapNo: '****3456',
      islemTuru: 'kredi_karti',
      tutar: 15000,
      paraBirimi: 'TRY',
      aciklama: 'Ofis malzemeleri',
      tarih: '2024-01-17',
      durum: 'tamamlandi',
      komisyon: 75,
      netTutar: 14925,
      islemYapan: 'Ayşe Özkan',
      referansNo: 'REF-004'
    },
    {
      id: 5,
      islemNo: 'BIS-2024-005',
      bankaAdi: 'Ziraat Bankası',
      hesapNo: '****1234',
      islemTuru: 'para_cekme',
      tutar: 20000,
      paraBirimi: 'TRY',
      aciklama: 'Nakit ihtiyacı',
      tarih: '2024-01-16',
      durum: 'tamamlandi',
      komisyon: 0,
      netTutar: 20000,
      islemYapan: 'Ali Veli',
      referansNo: 'REF-005'
    },
    {
      id: 6,
      islemNo: 'BIS-2024-006',
      bankaAdi: 'Garanti BBVA',
      hesapNo: '****5678',
      islemTuru: 'cek_senet',
      tutar: 50000,
      paraBirimi: 'TRY',
      aciklama: 'Çek tahsilatı',
      tarih: '2024-01-15',
      durum: 'hata',
      komisyon: 50,
      netTutar: 49950,
      islemYapan: 'Hasan Yıldız',
      referansNo: 'REF-006'
    }
  ]);

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TRY') {
      return amount.toLocaleString('tr-TR') + ' ₺';
    }
    return amount.toLocaleString('tr-TR') + ' ' + currency;
  };

  const getIslemTuruText = (type: string) => {
    switch (type) {
      case 'para_yatirma': return 'Para Yatırma';
      case 'para_cekme': return 'Para Çekme';
      case 'havale': return 'Havale';
      case 'eft': return 'EFT';
      case 'kredi_karti': return 'Kredi Kartı';
      case 'cek_senet': return 'Çek/Senet';
      default: return type;
    }
  };

  const getIslemTuruColor = (type: string) => {
    switch (type) {
      case 'para_yatirma': return 'bg-green-100 text-green-800';
      case 'para_cekme': return 'bg-red-100 text-red-800';
      case 'havale': return 'bg-blue-100 text-blue-800';
      case 'eft': return 'bg-purple-100 text-purple-800';
      case 'kredi_karti': return 'bg-orange-100 text-orange-800';
      case 'cek_senet': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'bg-green-100 text-green-800';
      case 'beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'iptal': return 'bg-red-100 text-red-800';
      case 'hata': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDurumText = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'beklemede': return 'Beklemede';
      case 'iptal': return 'İptal';
      case 'hata': return 'Hata';
      default: return status;
    }
  };

  const filteredIslemler = bankaIslemleri.filter(islem => {
    const matchesSearch = islem.islemNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         islem.aciklama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         islem.bankaAdi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBank = !selectedBank || islem.bankaAdi === selectedBank;
    const matchesType = !selectedType || islem.islemTuru === selectedType;
    const matchesStatus = !selectedStatus || islem.durum === selectedStatus;
    
    return matchesSearch && matchesBank && matchesType && matchesStatus;
  });

  const toplamIslem = filteredIslemler.length;
  const toplamTutar = filteredIslemler.reduce((sum, islem) => sum + islem.tutar, 0);
  const toplamKomisyon = filteredIslemler.reduce((sum, islem) => sum + islem.komisyon, 0);
  const tamamlananIslem = filteredIslemler.filter(islem => islem.durum === 'tamamlandi').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banka İşlemleri</h1>
          <p className="text-gray-600">Banka hesapları ve finansal işlemler</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni İşlem
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam İşlem</p>
                <p className="text-2xl font-bold text-gray-900">{toplamIslem}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Tutar</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(toplamTutar, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Komisyon</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(toplamKomisyon, 'TRY')}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tamamlanan</p>
                <p className="text-2xl font-bold text-blue-600">{tamamlananIslem}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              %{toplamIslem > 0 ? Math.round((tamamlananIslem / toplamIslem) * 100) : 0} başarı oranı
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="İşlem no, açıklama veya banka ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger>
                <SelectValue placeholder="Banka Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Bankalar</SelectItem>
                <SelectItem value="Ziraat Bankası">Ziraat Bankası</SelectItem>
                <SelectItem value="Garanti BBVA">Garanti BBVA</SelectItem>
                <SelectItem value="İş Bankası">İş Bankası</SelectItem>
                <SelectItem value="Yapı Kredi">Yapı Kredi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="İşlem Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                <SelectItem value="para_yatirma">Para Yatırma</SelectItem>
                <SelectItem value="para_cekme">Para Çekme</SelectItem>
                <SelectItem value="havale">Havale</SelectItem>
                <SelectItem value="eft">EFT</SelectItem>
                <SelectItem value="kredi_karti">Kredi Kartı</SelectItem>
                <SelectItem value="cek_senet">Çek/Senet</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="iptal">İptal</SelectItem>
                <SelectItem value="hata">Hata</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Banka İşlemleri Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">İşlem No</th>
                  <th className="text-left p-3 font-medium">Banka</th>
                  <th className="text-left p-3 font-medium">Hesap No</th>
                  <th className="text-left p-3 font-medium">İşlem Türü</th>
                  <th className="text-left p-3 font-medium">Tutar</th>
                  <th className="text-left p-3 font-medium">Komisyon</th>
                  <th className="text-left p-3 font-medium">Net Tutar</th>
                  <th className="text-left p-3 font-medium">Durum</th>
                  <th className="text-left p-3 font-medium">Tarih</th>
                  <th className="text-left p-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredIslemler.map((islem) => (
                  <tr key={islem.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium text-blue-600">{islem.islemNo}</div>
                      {islem.referansNo && (
                        <div className="text-xs text-gray-500">Ref: {islem.referansNo}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{islem.bankaAdi}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{islem.hesapNo}</div>
                    </td>
                    <td className="p-3">
                      <Badge className={getIslemTuruColor(islem.islemTuru)}>
                        {getIslemTuruText(islem.islemTuru)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold">
                        {formatCurrency(islem.tutar, islem.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-600">
                        {formatCurrency(islem.komisyon, islem.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(islem.netTutar, islem.paraBirimi)}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getDurumColor(islem.durum)}>
                        {getDurumText(islem.durum)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">{islem.tarih}</div>
                      <div className="text-xs text-gray-500">{islem.islemYapan}</div>
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