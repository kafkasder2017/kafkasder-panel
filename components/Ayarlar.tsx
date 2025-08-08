import React, { useState } from 'react';
import { ModernCard, ModernCardHeader, ModernCardContent } from './ui/ModernCard';
import { ModernButton } from './ui/ModernButton';
import { ModernInput } from './ui/ModernInput';
import toast from 'react-hot-toast';
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Palette, 
  Users, 
  Mail, 
  Lock,
  Download,
  Upload,
  RefreshCw,
  Save,
  Sparkles,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Cpu,
  HardDrive,
  Wifi,
  Smartphone
} from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Ayarlar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('genel');
  const [settings, setSettings] = useState({
    organizationName: 'Kafkasder',
    email: 'info@kafkasder.org',
    phone: '+90 312 123 45 67',
    address: 'Ankara, Türkiye',
    website: 'https://kafkasder.org',
    timezone: 'Europe/Istanbul',
    language: 'tr',
    currency: 'TRY',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      email: true,
      sms: true,
      push: true,
      reports: true,
    },
    security: {
      twoFactor: true,
      passwordExpiry: 90,
      loginAttempts: 5,
      sessionTimeout: 30,
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
    },
    integrations: {
      whatsapp: true,
      email: true,
      sms: false,
      api: true,
    }
  });

  const sections: SettingsSection[] = [
    {
      id: 'genel',
      title: 'Genel Ayarlar',
      description: 'Temel organizasyon bilgileri ve sistem ayarları',
      icon: <Settings className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'guvenlik',
      title: 'Güvenlik',
      description: 'Şifre politikaları ve güvenlik ayarları',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'bildirimler',
      title: 'Bildirimler',
      description: 'E-posta, SMS ve push bildirim ayarları',
      icon: <Bell className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'entegrasyonlar',
      title: 'Entegrasyonlar',
      description: 'WhatsApp, API ve diğer sistem entegrasyonları',
      icon: <Globe className="h-6 w-6" />,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'yedekleme',
      title: 'Yedekleme',
      description: 'Otomatik yedekleme ve veri koruma ayarları',
      icon: <Database className="h-6 w-6" />,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'tema',
      title: 'Tema & Görünüm',
      description: 'Arayüz teması ve görsel özelleştirmeler',
      icon: <Palette className="h-6 w-6" />,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const handleSave = () => {
    toast.success('Ayarlar başarıyla kaydedildi');
  };

  const handleReset = () => {
    if (window.confirm('Tüm ayarları varsayılan değerlere sıfırlamak istediğinizden emin misiniz?')) {
      toast.success('Ayarlar sıfırlandı');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModernInput
          label="Organizasyon Adı"
          value={settings.organizationName}
          onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
          placeholder="Organizasyon adını girin"
        />
        <ModernInput
          label="E-posta Adresi"
          type="email"
          value={settings.email}
          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          placeholder="info@organizasyon.org"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModernInput
          label="Telefon"
          value={settings.phone}
          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
          placeholder="+90 312 123 45 67"
        />
        <ModernInput
          label="Web Sitesi"
          value={settings.website}
          onChange={(e) => setSettings({ ...settings, website: e.target.value })}
          placeholder="https://organizasyon.org"
        />
      </div>

      <ModernInput
        label="Adres"
        value={settings.address}
        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
        placeholder="Tam adres bilgisi"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Zaman Dilimi</label>
          <select 
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="Europe/Istanbul">Türkiye (UTC+3)</option>
            <option value="Europe/London">Londra (UTC+0)</option>
            <option value="America/New_York">New York (UTC-5)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Dil</label>
          <select 
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Para Birimi</label>
          <select 
            value={settings.currency}
            onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="TRY">Türk Lirası (₺)</option>
            <option value="USD">Dolar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-900">Güvenlik Durumu</h3>
            <p className="text-sm text-green-700">Sistemin güvenlik seviyesi yüksek</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800">2FA Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800">SSL Sertifikası</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800">Güçlü Şifreler</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={settings.security.twoFactor}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactor: e.target.checked }
              })}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-semibold text-gray-900">İki Faktörlü Doğrulama</div>
              <div className="text-sm text-gray-500">Ek güvenlik katmanı ekler</div>
            </div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Şifre Geçerlilik Süresi (Gün)</label>
          <ModernInput
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, passwordExpiry: Number(e.target.value) }
            })}
            min="30"
            max="365"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Maksimum Giriş Denemesi</label>
          <ModernInput
            type="number"
            value={settings.security.loginAttempts}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, loginAttempts: Number(e.target.value) }
            })}
            min="3"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Oturum Zaman Aşımı (Dakika)</label>
          <ModernInput
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, sessionTimeout: Number(e.target.value) }
            })}
            min="15"
            max="480"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <label key={key} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              {key === 'email' && <Mail className="h-5 w-5 text-white" />}
              {key === 'sms' && <Smartphone className="h-5 w-5 text-white" />}
              {key === 'push' && <Bell className="h-5 w-5 text-white" />}
              {key === 'reports' && <Download className="h-5 w-5 text-white" />}
            </div>
            <div>
              <div className="font-semibold text-gray-900 capitalize">
                {key === 'email' && 'E-posta Bildirimleri'}
                {key === 'sms' && 'SMS Bildirimleri'}
                {key === 'push' && 'Push Bildirimleri'}
                {key === 'reports' && 'Rapor Bildirimleri'}
              </div>
              <div className="text-sm text-gray-500">
                {key === 'email' && 'Önemli güncellemeler e-posta ile gönderilsin'}
                {key === 'sms' && 'Acil durumlar için SMS bildirimi'}
                {key === 'push' && 'Tarayıcı bildirimleri aktif olsun'}
                {key === 'reports' && 'Haftalık raporlar otomatik gönderilsin'}
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, [key]: e.target.checked }
            })}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
        </label>
      ))}
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <HardDrive className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-cyan-900">Yedekleme Durumu</h3>
            <p className="text-sm text-cyan-700">Son yedekleme: 2 saat önce</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <ModernButton variant="outline" icon={<Download className="h-4 w-4" />}>
            Manuel Yedek Al
          </ModernButton>
          <ModernButton variant="outline" icon={<Upload className="h-4 w-4" />}>
            Yedek Yükle
          </ModernButton>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={settings.backup.autoBackup}
            onChange={(e) => setSettings({
              ...settings,
              backup: { ...settings.backup, autoBackup: e.target.checked }
            })}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <div>
            <div className="font-semibold text-gray-900">Otomatik Yedekleme</div>
            <div className="text-sm text-gray-500">Veriler otomatik olarak yedeklensin</div>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Yedekleme Sıklığı</label>
          <select 
            value={settings.backup.backupFrequency}
            onChange={(e) => setSettings({
              ...settings,
              backup: { ...settings.backup, backupFrequency: e.target.value }
            })}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="hourly">Saatlik</option>
            <option value="daily">Günlük</option>
            <option value="weekly">Haftalık</option>
            <option value="monthly">Aylık</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Saklama Süresi (Gün)</label>
          <ModernInput
            type="number"
            value={settings.backup.retentionPeriod}
            onChange={(e) => setSettings({
              ...settings,
              backup: { ...settings.backup, retentionPeriod: Number(e.target.value) }
            })}
            min="7"
            max="365"
          />
        </div>
      </div>
    </div>
  );

  const getCurrentSection = () => {
    switch (activeSection) {
      case 'genel':
        return renderGeneralSettings();
      case 'guvenlik':
        return renderSecuritySettings();
      case 'bildirimler':
        return renderNotificationSettings();
      case 'yedekleme':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            Sistem Ayarları
            <Sparkles className="h-8 w-8 text-gray-500" />
          </h1>
          <p className="text-gray-600">Platform konfigürasyonu ve özelleştirme ayarları</p>
        </div>
        
        <div className="flex items-center gap-3">
          <ModernButton variant="outline" onClick={handleReset} icon={<RefreshCw className="h-4 w-4" />}>
            Sıfırla
          </ModernButton>
          <ModernButton variant="primary" onClick={handleSave} icon={<Save className="h-4 w-4" />}>
            Kaydet
          </ModernButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <ModernCard variant="default">
            <ModernCardHeader title="Ayar Kategorileri" icon={<Settings className="h-5 w-5" />} />
            <ModernCardContent>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg transform scale-105`
                        : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeSection === section.id 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-r ${section.color} text-white`
                    }`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{section.title}</div>
                      <div className={`text-xs ${
                        activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </ModernCardContent>
          </ModernCard>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <ModernCard variant="default">
            <ModernCardHeader 
              title={sections.find(s => s.id === activeSection)?.title || 'Ayarlar'}
              subtitle={sections.find(s => s.id === activeSection)?.description}
              icon={sections.find(s => s.id === activeSection)?.icon}
            />
            <ModernCardContent>
              {getCurrentSection()}
            </ModernCardContent>
          </ModernCard>
        </div>
      </div>
    </div>
  );
};

export default Ayarlar;
