import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Smartphone, Cpu, Database, Globe, Rocket, Star } from 'lucide-react';

interface TechPageProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

const TechPage: React.FC<TechPageProps> = ({ title, icon, description, features }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Coming Soon Card */}
      <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-center mb-4">
          <Rocket className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Yakında Geliyor!</h2>
        <p className="text-gray-600 mb-6">Bu özellik geliştirme aşamasında. En kısa sürede hizmetinizde olacak.</p>
        
        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Button className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
          Bildirim Al
        </Button>
      </Card>
    </div>
  );
};

// Specific components for each tech feature
export const MobileApp: React.FC = () => (
  <TechPage
    title="Mobil Uygulama"
    icon={<Smartphone className="h-8 w-8 text-white" />}
    description="Kafkasder Panel'in mobil uygulaması ile her yerden sisteminizi yönetin"
    features={[
      "iOS ve Android desteği",
      "Offline çalışma özelliği", 
      "Push bildirimler",
      "Mobil optimizasyon"
    ]}
  />
);

export const ApiDashboard: React.FC = () => (
  <TechPage
    title="API Yönetimi"
    icon={<Cpu className="h-8 w-8 text-white" />}
    description="Güçlü API yönetim sistemi ile entegrasyonlarınızı kontrol edin"
    features={[
      "RESTful API desteği",
      "API anahtarı yönetimi",
      "Rate limiting",
      "Dokümantasyon"
    ]}
  />
);

export const DataAnalytics: React.FC = () => (
  <TechPage
    title="Veri Analitik"
    icon={<Database className="h-8 w-8 text-white" />}
    description="Gelişmiş veri analitik araçları ile detaylı raporlar oluşturun"
    features={[
      "Gerçek zamanlı analitik",
      "Özelleştirilebilir raporlar",
      "Veri görselleştirme",
      "Tahmin modelleri"
    ]}
  />
);

export const WebServices: React.FC = () => (
  <TechPage
    title="Web Servisleri"
    icon={<Globe className="h-8 w-8 text-white" />}
    description="Üçüncü parti entegrasyonlar ve web servisleri yönetimi"
    features={[
      "Webhook desteği",
      "Third-party entegrasyonlar",
      "Microservice mimarisi",
      "Cloud desteği"
    ]}
  />
);
