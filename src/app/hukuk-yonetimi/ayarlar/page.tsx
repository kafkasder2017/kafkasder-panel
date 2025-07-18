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
  Scale,
  Users,
  Bell,
  Shield,
  Database,
  FileText,
  Calendar,
  Clock
} from 'lucide-react';

export default function HukukAyarlarPage() {
  const [settings, setSettings] = useState({
    // General Settings
    autoCaseNumbering: true,
    casePrefix: 'DAVA',
    startNumber: 1,
    defaultCourt: 'istanbul',
    
    // Notification Settings
    autoReminder: true,
    reminderDays: 7,
    requireApproval: false,
    maxCasesPerLawyer: 10,
    
    // Document Settings
    requireDocumentUpload: true,
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx'],
    autoBackup: true,
    
    // Calendar Settings
    calendarNotifications: true,
    smsNotifications: false,
    emailNotifications: true,
    hearingAlerts: true,
    deadlineAlerts: true,
    
    // Security Settings
    requireSignature: true,
    logAllActivities: true,
    backupFrequency: 'daily',
    
    // Integration Settings
    syncWithCourtSystem: true,
    exportFormat: 'excel',
    autoSync: true
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
      autoCaseNumbering: true,
      casePrefix: 'DAVA',
      startNumber: 1,
      defaultCourt: 'istanbul',
      autoReminder: true,
      reminderDays: 7,
      requireApproval: false,
      maxCasesPerLawyer: 10,
      requireDocumentUpload: true,
      maxFileSize: 10,
      allowedFileTypes: ['pdf', 'doc', 'docx'],
      autoBackup: true,
      calendarNotifications: true,
      smsNotifications: false,
      emailNotifications: true,
      hearingAlerts: true,
      deadlineAlerts: true,
      requireSignature: true,
      logAllActivities: true,
      backupFrequency: 'daily',
      syncWithCourtSystem: true,
      exportFormat: 'excel',
      autoSync: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hukuk Yönetimi Ayarları</h1>
          <p className="text-gray-600 mt-1">
            Sistem konfigürasyonu ve hukuki süreç tercihleri
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
              <Label htmlFor="casePrefix">Dava Numarası Ön Eki</Label>
              <Input
                id="casePrefix"
                value={settings.casePrefix}
                onChange={(e) => handleSettingChange('casePrefix', e.target.value)}
                placeholder="DAVA"
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
              <Label htmlFor="defaultCourt">Varsayılan Mahkeme</Label>
              <Select value={settings.defaultCourt} onValueChange={(value) => handleSettingChange('defaultCourt', value)}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="maxCasesPerLawyer">Avukat Başına Maksimum Dava</Label>
              <Input
                id="maxCasesPerLawyer"
                type="number"
                value={settings.maxCasesPerLawyer}
                onChange={(e) => handleSettingChange('maxCasesPerLawyer', parseInt(e.target.value))}
                placeholder="10"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Otomatik Dava Numaralandırma</Label>
              <p className="text-sm text-gray-500">Yeni davalar otomatik numara alsın</p>
            </div>
            <Switch
              checked={settings.autoCaseNumbering}
              onCheckedChange={(checked) => handleSettingChange('autoCaseNumbering', checked)}
            />
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
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reminderDays">Hatırlatma Günü</Label>
              <Input
                id="reminderDays"
                type="number"
                value={settings.reminderDays}
                onChange={(e) => handleSettingChange('reminderDays', parseInt(e.target.value))}
                placeholder="7"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Maksimum Dosya Boyutu (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                placeholder="10"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Hatırlatma</Label>
                <p className="text-sm text-gray-500">Duruşma ve süre hatırlatmaları gönder</p>
              </div>
              <Switch
                checked={settings.autoReminder}
                onCheckedChange={(checked) => handleSettingChange('autoReminder', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Onay Gerekliliği</Label>
                <p className="text-sm text-gray-500">Yeni dava açılımı için onay gerekli olsun</p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Belge Yükleme Zorunluluğu</Label>
                <p className="text-sm text-gray-500">Dava açılımında belge yükleme zorunlu olsun</p>
              </div>
              <Switch
                checked={settings.requireDocumentUpload}
                onCheckedChange={(checked) => handleSettingChange('requireDocumentUpload', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Takvim Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Takvim Bildirimleri</Label>
              <p className="text-sm text-gray-500">Duruşma ve etkinlik bildirimleri gönder</p>
            </div>
            <Switch
              checked={settings.calendarNotifications}
              onCheckedChange={(checked) => handleSettingChange('calendarNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-posta Bildirimleri</Label>
              <p className="text-sm text-gray-500">Önemli işlemler için e-posta bildirimi gönder</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Bildirimleri</Label>
              <p className="text-sm text-gray-500">Acil durumlar için SMS bildirimi gönder</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Duruşma Uyarıları</Label>
              <p className="text-sm text-gray-500">Duruşma öncesi uyarı bildirimleri gönder</p>
            </div>
            <Switch
              checked={settings.hearingAlerts}
              onCheckedChange={(checked) => handleSettingChange('hearingAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Süre Uyarıları</Label>
              <p className="text-sm text-gray-500">Süre dolumu öncesi uyarı bildirimleri gönder</p>
            </div>
            <Switch
              checked={settings.deadlineAlerts}
              onCheckedChange={(checked) => handleSettingChange('deadlineAlerts', checked)}
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
                <p className="text-sm text-gray-500">Dava işlemlerinde dijital imza gerekli olsun</p>
              </div>
              <Switch
                checked={settings.requireSignature}
                onCheckedChange={(checked) => handleSettingChange('requireSignature', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tüm Aktiviteleri Logla</Label>
                <p className="text-sm text-gray-500">Tüm işlemleri detaylı olarak kaydet</p>
              </div>
              <Switch
                checked={settings.logAllActivities}
                onCheckedChange={(checked) => handleSettingChange('logAllActivities', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Yedekleme</Label>
                <p className="text-sm text-gray-500">Verileri otomatik olarak yedekle</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
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
              <Label>Mahkeme Sistemi Senkronizasyonu</Label>
              <p className="text-sm text-gray-500">Dava verilerini mahkeme sistemi ile senkronize et</p>
            </div>
            <Switch
              checked={settings.syncWithCourtSystem}
              onCheckedChange={(checked) => handleSettingChange('syncWithCourtSystem', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Otomatik Senkronizasyon</Label>
              <p className="text-sm text-gray-500">Verileri otomatik olarak senkronize et</p>
            </div>
            <Switch
              checked={settings.autoSync}
              onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="allowedFileTypes">İzin Verilen Dosya Türleri</Label>
            <div className="flex space-x-2">
              {settings.allowedFileTypes.map((type, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  {type.toUpperCase()}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX dosya türleri desteklenir</p>
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
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-blue-600">Aktif Dava</div>
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