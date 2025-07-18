'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  AlertTriangle,
  PiggyBank,
  Users,
  Bell,
  Shield,
  Database
} from 'lucide-react';

export default function KumbaraAyarlarPage() {
  const [settings, setSettings] = useState({
    // General Settings
    autoNumbering: true,
    prefix: 'KMB',
    startNumber: 1,
    defaultType: 'standard',
    
    // Collection Settings
    autoCollectionReminder: true,
    reminderDays: 30,
    maxCollectionAmount: 5000,
    requirePhoto: true,
    
    // Distribution Settings
    requireApproval: false,
    maxDistributionPerDay: 50,
    distributionNotes: 'Kumbara kullanım talimatları verildi',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    collectionAlerts: true,
    distributionAlerts: true,
    
    // Security Settings
    requireSignature: true,
    logAllActivities: true,
    backupFrequency: 'daily',
    
    // Integration Settings
    syncWithMainSystem: true,
    exportFormat: 'excel',
    autoBackup: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    // Reset to default settings
    setSettings({
      autoNumbering: true,
      prefix: 'KMB',
      startNumber: 1,
      defaultType: 'standard',
      autoCollectionReminder: true,
      reminderDays: 30,
      maxCollectionAmount: 5000,
      requirePhoto: true,
      requireApproval: false,
      maxDistributionPerDay: 50,
      distributionNotes: 'Kumbara kullanım talimatları verildi',
      emailNotifications: true,
      smsNotifications: false,
      collectionAlerts: true,
      distributionAlerts: true,
      requireSignature: true,
      logAllActivities: true,
      backupFrequency: 'daily',
      syncWithMainSystem: true,
      exportFormat: 'excel',
      autoBackup: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kumbara Yönetimi Ayarları</h1>
          <p className="text-gray-600 mt-1">
            Sistem konfigürasyonu ve yönetim tercihleri
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Varsayılana Döndür
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Ayarları Kaydet
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Genel Ayarlar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="prefix">Kumbara Numarası Ön Eki</Label>
              <Input
                id="prefix"
                value={settings.prefix}
                onChange={(e) => handleSettingChange('prefix', e.target.value)}
                placeholder="KMB"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startNumber">Başlangıç Numarası</Label>
              <Input
                id="startNumber"
                type="number"
                value={settings.startNumber}
                onChange={(e) => handleSettingChange('startNumber', parseInt(e.target.value))}
                placeholder="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultType">Varsayılan Kumbara Tipi</Label>
              <Select value={settings.defaultType} onValueChange={(value) => handleSettingChange('defaultType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standart</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="mini">Mini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDistributionPerDay">Günlük Maksimum Dağıtım</Label>
              <Input
                id="maxDistributionPerDay"
                type="number"
                value={settings.maxDistributionPerDay}
                onChange={(e) => handleSettingChange('maxDistributionPerDay', parseInt(e.target.value))}
                placeholder="50"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Otomatik Numaralandırma</Label>
              <p className="text-sm text-gray-500">Yeni kumbaralar otomatik numara alsın</p>
            </div>
            <Switch
              checked={settings.autoNumbering}
              onCheckedChange={(checked: boolean) => handleSettingChange('autoNumbering', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Collection Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PiggyBank className="w-5 h-5 mr-2" />
            Toplama Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reminderDays">Hatırlatma Günü</Label>
              <Input
                id="reminderDays"
                type="number"
                value={settings.reminderDays}
                onChange={(e) => handleSettingChange('reminderDays', parseInt(e.target.value))}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCollectionAmount">Maksimum Toplama Tutarı</Label>
              <Input
                id="maxCollectionAmount"
                type="number"
                value={settings.maxCollectionAmount}
                onChange={(e) => handleSettingChange('maxCollectionAmount', parseInt(e.target.value))}
                placeholder="5000"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Toplama Hatırlatması</Label>
                <p className="text-sm text-gray-500">Toplama zamanı geldiğinde otomatik hatırlatma gönder</p>
              </div>
              <Switch
                checked={settings.autoCollectionReminder}
                onCheckedChange={(checked: any) => handleSettingChange('autoCollectionReminder', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Fotoğraf Zorunluluğu</Label>
                <p className="text-sm text-gray-500">Toplama işleminde fotoğraf çekimi zorunlu olsun</p>
              </div>
              <Switch
                checked={settings.requirePhoto}
                onCheckedChange={(checked: any) => handleSettingChange('requirePhoto', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Bildirim Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-posta Bildirimleri</Label>
              <p className="text-sm text-gray-500">Önemli işlemler için e-posta bildirimi gönder</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked: any) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Bildirimleri</Label>
              <p className="text-sm text-gray-500">Acil durumlar için SMS bildirimi gönder</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked: any) => handleSettingChange('smsNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Toplama Uyarıları</Label>
              <p className="text-sm text-gray-500">Toplama işlemleri hakkında bildirim gönder</p>
            </div>
            <Switch
              checked={settings.collectionAlerts}
              onCheckedChange={(checked: any) => handleSettingChange('collectionAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dağıtım Uyarıları</Label>
              <p className="text-sm text-gray-500">Dağıtım işlemleri hakkında bildirim gönder</p>
            </div>
            <Switch
              checked={settings.distributionAlerts}
              onCheckedChange={(checked: any) => handleSettingChange('distributionAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Güvenlik Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Yedekleme Sıklığı</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Günlük</SelectItem>
                  <SelectItem value="weekly">Haftalık</SelectItem>
                  <SelectItem value="monthly">Aylık</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exportFormat">Dışa Aktarma Formatı</Label>
              <Select value={settings.exportFormat} onValueChange={(value) => handleSettingChange('exportFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>İmza Zorunluluğu</Label>
                <p className="text-sm text-gray-500">Toplama işlemlerinde dijital imza gerekli olsun</p>
              </div>
              <Switch
                checked={settings.requireSignature}
                onCheckedChange={(checked: any) => handleSettingChange('requireSignature', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tüm Aktiviteleri Logla</Label>
                <p className="text-sm text-gray-500">Tüm işlemleri detaylı olarak kaydet</p>
              </div>
              <Switch
                checked={settings.logAllActivities}
                onCheckedChange={(checked: any) => handleSettingChange('logAllActivities', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Yedekleme</Label>
                <p className="text-sm text-gray-500">Verileri otomatik olarak yedekle</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked: any) => handleSettingChange('autoBackup', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Entegrasyon Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ana Sistem Senkronizasyonu</Label>
              <p className="text-sm text-gray-500">Kumbara verilerini ana sistem ile senkronize et</p>
            </div>
            <Switch
              checked={settings.syncWithMainSystem}
              onCheckedChange={(checked: any) => handleSettingChange('syncWithMainSystem', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="distributionNotes">Varsayılan Dağıtım Notları</Label>
            <Textarea
              id="distributionNotes"
              value={settings.distributionNotes}
              onChange={(e) => handleSettingChange('distributionNotes', e.target.value)}
              placeholder="Dağıtım sırasında otomatik eklenen notlar..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Sistem Durumu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-600">Aktif</div>
              <div className="text-sm text-green-600">Sistem Durumu</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-blue-600">Toplam Kumbara</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <div className="text-2xl font-bold text-purple-600">Son 24 Saat</div>
              <div className="text-sm text-purple-600">Son Güncelleme</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 