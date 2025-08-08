import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Code, Copy, CheckCircle, Plus, Layers, Settings } from 'lucide-react';

export default function SidebarCustomizationDemo() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sectionExamples = [
    {
      id: 'basic-section',
      title: 'Temel Section Ekleme',
      description: 'Yeni bir kategori ve menu öğeleri ekleyin',
      code: `{
  title: "Teknoloji & İnovasyon",
  items: [
    { 
      id: "mobile-app", 
      label: "Mobil Uygulama", 
      icon: Smartphone, 
      path: "/mobile-app" 
    },
    { 
      id: "api-dashboard", 
      label: "API Yönetimi", 
      icon: Cpu, 
      path: "/api-dashboard" 
    },
    { 
      id: "data-analytics", 
      label: "Veri Analitik", 
      icon: Database, 
      path: "/data-analytics" 
    },
  ]
}`
    },
    {
      id: 'icon-import',
      title: 'Icon Import Ekleme',
      description: 'Yeni iconları lucide-react\'tan import edin',
      code: `import { 
  Home, Users, Calendar, Heart, MessageCircle, Settings,
  // Yeni iconlar:
  Smartphone, Cpu, Database, Globe, Zap, Wifi
} from "lucide-react";`
    },
    {
      id: 'navigation-mapping',
      title: 'Navigation Mapping',
      description: 'Route mapping\'e yeni section\'ları ekleyin',
      code: `// getCurrentSection fonksiyonuna ekleyin:
const pathMap = {
  '/': 'dashboard',
  '/kisiler': 'kisiler',
  // Yeni routes:
  '/mobile-app': 'mobile-app',
  '/api-dashboard': 'api-dashboard',
  '/data-analytics': 'data-analytics',
};

// handleNavigation fonksiyonuna ekleyin:
const routeMap = {
  'dashboard': '/',
  'kisiler': '/kisiler',
  // Yeni mappings:
  'mobile-app': '/mobile-app',
  'api-dashboard': '/api-dashboard',
  'data-analytics': '/data-analytics',
};`
    },
    {
      id: 'route-setup',
      title: 'Route Kurulumu',
      description: 'AppContent.tsx\'e yeni route\'ları ekleyin',
      code: `// Component import:
const MobileApp = React.lazy(() => import('./MobileApp'));
const ApiDashboard = React.lazy(() => import('./ApiDashboard'));

// Routes ekleyin:
<Route path="/mobile-app" element={
  <ProtectedRoute userRole={userRole}>
    <MobileApp />
  </ProtectedRoute>
} />
<Route path="/api-dashboard" element={
  <ProtectedRoute userRole={userRole}>
    <ApiDashboard />
  </ProtectedRoute>
} />`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎨 Sidebar Özelleştirme Demo
        </h1>
        <p className="text-lg text-gray-600">
          KafkasderSidebar'a yeni section'lar ve menu öğeleri nasıl eklenir?
        </p>
      </div>

      {/* Live Demo */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <h2 className="text-xl font-semibold text-green-800">✅ Canlı Demo</h2>
        </div>
        <p className="text-green-700 mb-4">
          Sidebar'ınızda artık <strong>"Teknoloji & İnovasyon"</strong> section'ı mevcut! 
          Sol menüde yeni kategoriyi görebilir ve test edebilirsiniz.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-blue-500 mb-1">📱</div>
            <div className="text-sm font-medium">Mobil Uygulama</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-blue-500 mb-1">⚙️</div>
            <div className="text-sm font-medium">API Yönetimi</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-blue-500 mb-1">📊</div>
            <div className="text-sm font-medium">Veri Analitik</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-blue-500 mb-1">🌐</div>
            <div className="text-sm font-medium">Web Servisleri</div>
          </div>
        </div>
      </Card>

      {/* Step by Step Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-500" />
          Adım Adım Uygulama
        </h2>
        
        {sectionExamples.map((example, index) => (
          <Card key={example.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                
                <div className="relative">
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Kod Örneği</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(example.code, example.id)}
                        className="h-6 px-2 text-xs border-gray-600 text-gray-400 hover:text-white"
                      >
                        {copied === example.id ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-500" />
          Hızlı İpuçları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Icon Seçimi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Lucide React icon library kullanın</li>
              <li>• Anlamlı ve tutarlı iconlar seçin</li>
              <li>• İcon boyutları otomatik ayarlanır</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Section Organizasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• İlgili özellikleri gruplandırın</li>
              <li>• 3-7 öğe arası optimal</li>
              <li>• Alfabetik veya önem sırasına göre</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
