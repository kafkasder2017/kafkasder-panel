import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Code, Copy, CheckCircle, ArrowRight } from 'lucide-react';

function SidebarIntegrationGuide() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const integrationSteps = [
    {
      id: 'replace-sidebar',
      title: '1. Mevcut Sidebar\'ı Değiştir',
      description: 'App.tsx dosyasında mevcut Sidebar componentini KafkasderSidebar ile değiştirin.',
      code: `// App.tsx içinde
import { KafkasderSidebar } from './components/KafkasderSidebar';

// Mevcut Sidebar yerine:
<KafkasderSidebar 
  activeSection={currentPath} 
  onSectionChange={handleNavigation} 
/>`
    },
    {
      id: 'add-navigation-handler',
      title: '2. Navigation Handler Ekle',
      description: 'Sidebar\'dan gelen section değişikliklerini handle eden fonksiyon ekleyin.',
      code: `const handleNavigation = (sectionId: string) => {
  // Section ID'sine göre routing
  const routeMap = {
    'dashboard': '/',
    'kisiler': '/kisiler',
    'bagis-yonetimi': '/bagis-yonetimi',
    // ... diğer routes
  };
  
  const route = routeMap[sectionId];
  if (route) {
    navigate(route);
  }
};`
    },
    {
      id: 'current-path-tracking',
      title: '3. Aktif Section Tracking',
      description: 'Mevcut sayfa durumunu takip ederek sidebar\'da aktif section\'ı gösterin.',
      code: `import { useLocation } from 'react-router-dom';

const location = useLocation();
const getCurrentSection = () => {
  const pathMap = {
    '/': 'dashboard',
    '/kisiler': 'kisiler',
    '/bagis-yonetimi': 'bagis-yonetimi',
    // ... diğer paths
  };
  return pathMap[location.pathname] || 'dashboard';
};`
    },
    {
      id: 'customize-sections',
      title: '4. Section\'ları Özelleştir',
      description: 'KafkasderSidebar.tsx içindeki menuSections array\'ini ihtiyaçlarınıza göre düzenleyin.',
      code: `// Yeni section eklemek için:
{
  title: "Yeni Kategori",
  items: [
    { 
      id: "new-feature", 
      label: "Yeni Özellik", 
      icon: NewIcon, 
      path: "/new-feature" 
    },
  ]
}`
    }
  ];

  const benefits = [
    "Modern gradient tasarım",
    "Kategorize edilmiş menü yapısı",
    "Hover ve aktif state animasyonları",
    "Responsive tasarım",
    "Lucide React icon desteği",
    "AI chatbot entegrasyonu hazır",
    "Kolay özelleştirilebilir yapı"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Yeni Sidebar Entegrasyonu
        </h1>
        <p className="text-lg text-gray-600">
          Modern ve gelişmiş sidebar tasarımını mevcut uygulamanıza entegre etmek için adım adım rehber
        </p>
      </div>

      {/* Benefits */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Yeni Sidebar'ın Avantajları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Integration Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Entegrasyon Adımları</h2>
        
        {integrationSteps.map((step, index) => (
          <Card key={step.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
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
                        onClick={() => copyToClipboard(step.code, step.id)}
                        className="h-6 px-2 text-xs border-gray-600 text-gray-400 hover:text-white"
                      >
                        {copied === step.id ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-blue-500" />
          Sonraki Adımlar
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            1. Demo'yu inceleyerek tasarımın uygulamanıza uygun olup olmadığını kontrol edin
          </p>
          <p className="text-gray-700">
            2. Yukarıdaki adımları takip ederek entegrasyonu gerçekleştirin
          </p>
          <p className="text-gray-700">
            3. Menu section'larını ve icon'ları ihtiyaçlarınıza göre özelleştirin
          </p>
          <p className="text-gray-700">
            4. Responsive tasarımı test edin ve gerekli ayarlamaları yapın
          </p>
        </div>
      </Card>
    </div>
  );
}

export default SidebarIntegrationGuide;
