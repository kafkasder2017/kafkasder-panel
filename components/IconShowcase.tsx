import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { QuestionMarkIcon } from './icons/QuestionMarkIcon';
import { 
  HelpCircle, 
  Info, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  Heart,
  Users,
  Settings,
  Home
} from 'lucide-react';

export default function IconShowcase() {
  const customIcons = [
    {
      name: 'QuestionMarkIcon',
      component: <QuestionMarkIcon size={24} color="#3B82F6" />,
      description: 'Özel soru işareti ikonu - Builder.io\'dan temizlenmiş'
    }
  ];

  const lucideIcons = [
    { name: 'HelpCircle', component: <HelpCircle size={24} className="text-blue-500" />, description: 'Yardım' },
    { name: 'Info', component: <Info size={24} className="text-blue-500" />, description: 'Bilgi' },
    { name: 'AlertCircle', component: <AlertCircle size={24} className="text-yellow-500" />, description: 'Uyarı' },
    { name: 'CheckCircle', component: <CheckCircle size={24} className="text-green-500" />, description: 'Başarılı' },
    { name: 'XCircle', component: <XCircle size={24} className="text-red-500" />, description: 'Hata' },
    { name: 'MessageCircle', component: <MessageCircle size={24} className="text-purple-500" />, description: 'Mesaj' },
    { name: 'Heart', component: <Heart size={24} className="text-red-500" />, description: 'Bağış' },
    { name: 'Users', component: <Users size={24} className="text-indigo-500" />, description: 'Kullanıcılar' },
    { name: 'Settings', component: <Settings size={24} className="text-gray-500" />, description: 'Ayarlar' },
    { name: 'Home', component: <Home size={24} className="text-blue-500" />, description: 'Ana Sayfa' }
  ];

  const iconVariations = [
    { size: 16, color: '#3B82F6', label: 'Küçük - Mavi' },
    { size: 20, color: '#10B981', label: 'Orta - Yeşil' },
    { size: 24, color: '#F59E0B', label: 'Büyük - Sarı' },
    { size: 32, color: '#EF4444', label: 'Çok Büyük - Kırmızı' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎨 Icon Showcase
        </h1>
        <p className="text-lg text-gray-600">
          Temizlenmiş özel icon ve mevcut Lucide icon sistemi
        </p>
      </div>

      {/* Cleaned Custom Icon */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Temizlenmiş Özel Icon
        </h2>
        <p className="text-gray-600 mb-6">
          Builder.io'dan gelen bozuk kodu temizleyip düzgün React component haline getirdim.
        </p>
        
        <div className="space-y-6">
          {customIcons.map((icon, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {icon.component}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{icon.name}</h3>
                <p className="text-sm text-gray-600">{icon.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`<QuestionMarkIcon size={24} color="#3B82F6" />`)}
              >
                Kodu Kopyala
              </Button>
            </div>
          ))}
        </div>

        {/* Icon Variations */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Boyut ve Renk Varyasyonları</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {iconVariations.map((variation, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg border">
                <div className="flex justify-center mb-2">
                  <QuestionMarkIcon size={variation.size} color={variation.color} />
                </div>
                <p className="text-xs text-gray-600">{variation.label}</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 block">
                  size={variation.size}
                </code>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Lucide Icons for Comparison */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Mevcut Lucide Icons
        </h2>
        <p className="text-gray-600 mb-6">
          Sidebar ve uygulamada kullanılan mevcut icon sistemi
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {lucideIcons.map((icon, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex justify-center mb-2">
                {icon.component}
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{icon.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{icon.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Examples */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Kullanım Örnekleri
        </h2>
        
        <div className="space-y-4">
          {/* In Sidebar */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Sidebar'da Kullanım</h3>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
              <QuestionMarkIcon size={16} color="#6B7280" />
              <span className="text-sm text-gray-700">Yardım & Destek</span>
            </div>
          </div>

          {/* In Button */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Button'da Kullanım</h3>
            <Button className="flex items-center gap-2">
              <QuestionMarkIcon size={16} color="#ffffff" />
              Yardım Al
            </Button>
          </div>

          {/* In Card Header */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Card Header'da Kullanım</h3>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <QuestionMarkIcon size={20} color="#3B82F6" />
                <h4 className="font-semibold text-gray-900">Sıkça Sorulan Sorular</h4>
              </div>
              <p className="text-gray-600 text-sm">Bu bölümde en çok sorulan soruları bulabilirsiniz.</p>
            </div>
          </div>

          {/* Tailwind CSS with currentColor */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Tailwind CSS + currentColor</h3>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <QuestionMarkIcon
                  size={16}
                  color="currentColor"
                  className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                />
                <span className="text-gray-700">Hover üzerime!</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <QuestionMarkIcon
                  size={18}
                  color="currentColor"
                  className="text-green-500 hover:text-green-600 transition-colors cursor-pointer"
                />
                <span className="text-gray-700">Yeşil tema</span>
              </div>
              <div className="flex items-center gap-3">
                <QuestionMarkIcon
                  size={20}
                  color="currentColor"
                  className="text-purple-500 hover:text-purple-600 transition-colors cursor-pointer"
                />
                <span className="text-gray-700">Mor tema</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Code Examples */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Kod Örnekleri
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Import</h3>
            <pre className="text-gray-300 text-sm">
{`import { QuestionMarkIcon } from './components/icons';`}
            </pre>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Temel Kullanım</h3>
            <pre className="text-gray-300 text-sm">
{`<QuestionMarkIcon size={24} color="#3B82F6" />`}
            </pre>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Tailwind CSS ile</h3>
            <pre className="text-gray-300 text-sm">
{`<QuestionMarkIcon
  size={16}
  color="currentColor"
  className="text-blue-500 hover:text-blue-600 transition-colors"
/>`}
            </pre>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Responsive Boyutlar</h3>
            <pre className="text-gray-300 text-sm">
{`<QuestionMarkIcon
  size={16}
  color="currentColor"
  className="text-gray-500 sm:text-blue-500 md:text-green-500 lg:text-purple-500"
/>`}
            </pre>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Dark Mode Desteği</h3>
            <pre className="text-gray-300 text-sm">
{`<QuestionMarkIcon
  size={20}
  color="currentColor"
  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
/>`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
