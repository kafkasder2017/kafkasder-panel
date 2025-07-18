'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  PiggyBank, 
  User, 
  MapPin, 
  Phone, 
  Calendar,
  Plus,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock data
const distributionHistory = [
  {
    id: 1,
    kumbaraNo: 'KMB-009',
    personName: 'Hasan Yıldız',
    phone: '0531 111 22 33',
    location: 'İstanbul, Beşiktaş',
    distributionDate: '2024-01-16',
    type: 'standard',
    status: 'completed',
    notes: 'Ev adresine teslim edildi'
  },
  {
    id: 2,
    kumbaraNo: 'KMB-010',
    personName: 'Selin Demir',
    phone: '0532 222 33 44',
    location: 'Ankara, Keçiören',
    distributionDate: '2024-01-15',
    type: 'premium',
    status: 'completed',
    notes: 'İş yerine teslim edildi'
  },
  {
    id: 3,
    kumbaraNo: 'KMB-011',
    personName: 'Burak Kaya',
    phone: '0533 333 44 55',
    location: 'İzmir, Bornova',
    distributionDate: '2024-01-14',
    type: 'standard',
    status: 'pending',
    notes: 'Teslimat bekleniyor'
  }
];

const kumbaraTypes = [
  { value: 'standard', label: 'Standart Kumbara', description: 'Normal boyut, plastik malzeme' },
  { value: 'premium', label: 'Premium Kumbara', description: 'Büyük boyut, metal malzeme' },
  { value: 'mini', label: 'Mini Kumbara', description: 'Küçük boyut, taşınabilir' }
];

export default function KumbaraDagilimiPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    personName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    kumbaraType: '',
    notes: ''
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      case 'pending':
        return <Badge variant="secondary">Bekliyor</Badge>;
      case 'cancelled':
        return <Badge variant="outline">İptal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'premium':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Premium</Badge>;
      case 'standard':
        return <Badge variant="outline">Standart</Badge>;
      case 'mini':
        return <Badge variant="outline">Mini</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form data:', formData);
    setShowForm(false);
    setFormData({
      personName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      district: '',
      kumbaraType: '',
      notes: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      personName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      district: '',
      kumbaraType: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kumbara Dağıtımı</h1>
          <p className="text-gray-600 mt-1">
            Yeni kumbara dağıtım işlemleri ve takibi
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Dağıtım
        </Button>
      </div>

      {/* Distribution Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Yeni Kumbara Dağıtımı</span>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Person Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="personName">Kişi Adı Soyadı *</Label>
                  <Input
                    id="personName"
                    value={formData.personName}
                    onChange={(e) => handleInputChange('personName', e.target.value)}
                    placeholder="Kişi adı ve soyadı"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0532 123 45 67"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="ornek@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kumbaraType">Kumbara Tipi *</Label>
                  <Select value={formData.kumbaraType} onValueChange={(value) => handleInputChange('kumbaraType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kumbara tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {kumbaraTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-gray-500">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">Şehir *</Label>
                  <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Şehir seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="istanbul">İstanbul</SelectItem>
                      <SelectItem value="ankara">Ankara</SelectItem>
                      <SelectItem value="izmir">İzmir</SelectItem>
                      <SelectItem value="bursa">Bursa</SelectItem>
                      <SelectItem value="antalya">Antalya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">İlçe *</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="İlçe seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kadikoy">Kadıköy</SelectItem>
                      <SelectItem value="besiktas">Beşiktaş</SelectItem>
                      <SelectItem value="cankaya">Çankaya</SelectItem>
                      <SelectItem value="konak">Konak</SelectItem>
                      <SelectItem value="nilufer">Nilüfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Detaylı adres"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Dağıtım ile ilgili notlar..."
                  rows={3}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  İptal
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Dağıtımı Kaydet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Distribution History */}
      <Card>
        <CardHeader>
          <CardTitle>Dağıtım Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distributionHistory.map((distribution) => (
              <div key={distribution.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <PiggyBank className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900">{distribution.kumbaraNo}</h3>
                    {getTypeBadge(distribution.type)}
                    {getStatusBadge(distribution.status)}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {distribution.personName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 mr-1" />
                      {distribution.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {distribution.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {distribution.distributionDate}
                    </div>
                  </div>
                  {distribution.notes && (
                    <p className="text-sm text-gray-600 mt-1">{distribution.notes}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bu Ay Dağıtılan</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <PiggyBank className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Aktif</p>
                <p className="text-2xl font-bold text-gray-900">892</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 