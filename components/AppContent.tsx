import React, { useState, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { KullaniciRol } from '../types';
import { supabase } from '../services/supabaseClient';
import { KafkasderSidebar } from './KafkasderSidebar';
import ProtectedRoute from './ProtectedRoute';

// Import all your existing lazy components
const Dashboard = React.lazy(() => import('./Dashboard'));
const KisiYonetimi = React.lazy(() => import('./KisiYonetimi'));
const BagisYonetimi = React.lazy(() => import('./BagisYonetimi'));
const GonulluYonetimi = React.lazy(() => import('./GonulluYonetimi'));
const EtkinlikYonetimi = React.lazy(() => import('./EtkinlikYonetimi'));
const FinansalKayitlar = React.lazy(() => import('./FinansalKayitlar'));
const ProjeYonetimi = React.lazy(() => import('./ProjeYonetimi'));
const YardimBasvurulari = React.lazy(() => import('./YardimBasvurulari'));
const YardimAlanlar = React.lazy(() => import('./YardimAlanlar'));
const UyeYonetimi = React.lazy(() => import('./UyeYonetimi'));
const Takvim = React.lazy(() => import('./Takvim'));
const TopluIletisim = React.lazy(() => import('./TopluIletisim'));
const MesajRaporlari = React.lazy(() => import('./MesajRaporlari'));
const RaporlamaAnalitik = React.lazy(() => import('./RaporlamaAnalitik'));
const ChatbotYonetimi = React.lazy(() => import('./ChatbotYonetimi'));
const DashboardWithNewSidebar = React.lazy(() => import('./DashboardWithNewSidebar'));
const SidebarIntegrationGuide = React.lazy(() => import('./SidebarIntegrationGuide'));
const IconShowcase = React.lazy(() => import('./IconShowcase'));
const SidebarCustomizationDemo = React.lazy(() => import('./SidebarCustomizationDemo'));
const TransitionSuccess = React.lazy(() => import('./TransitionSuccess'));
const YetimYonetimi = React.lazy(() => import('./YetimYonetimi'));
const HukukiYardim = React.lazy(() => import('./HukukiYardim'));
const Destek = React.lazy(() => import('./Destek'));
const KullaniciYonetimi = React.lazy(() => import('./KullaniciYonetimi'));
const Ayarlar = React.lazy(() => import('./Ayarlar'));
const Profil = React.lazy(() => import('./Profil'));
const AccessDenied = React.lazy(() => import('./AccessDenied'));
const HaritaModulu = React.lazy(() => import('./HaritaModulu'));
const OgrenciBurslari = React.lazy(() => import('./OgrenciBurslari'));
const StokYonetimi = React.lazy(() => import('./StokYonetimi'));
const OdemeYonetimi = React.lazy(() => import('./OdemeYonetimi'));
const KumbaraYonetimi = React.lazy(() => import('./KumbaraYonetimi'));
const AyniYardimIslemleri = React.lazy(() => import('./AyniYardimIslemleri'));
const VefaDestekYonetimi = React.lazy(() => import('./VefaDestekYonetimi'));
const BaskanOnayi = React.lazy(() => import('./BaskanOnayi'));
const KurumYonetimi = React.lazy(() => import('./KurumYonetimi'));
const Bildirimler = React.lazy(() => import('./Bildirimler'));
const DosyaYonetimi = React.lazy(() => import('./DosyaYonetimi'));
const GuvenlikAyarlari = React.lazy(() => import('../src/pages/GuvenlikAyarlari'));
const WhatsApp = React.lazy(() => import('../src/pages/WhatsApp'));
const ApiEntegrasyonu = React.lazy(() => import('./ApiEntegrasyonu'));
const MobileApp = React.lazy(() => import('./TechInnovation').then(module => ({ default: module.MobileApp })));
const ApiDashboard = React.lazy(() => import('./TechInnovation').then(module => ({ default: module.ApiDashboard })));
const DataAnalytics = React.lazy(() => import('./TechInnovation').then(module => ({ default: module.DataAnalytics })));
const WebServices = React.lazy(() => import('./TechInnovation').then(module => ({ default: module.WebServices })));

interface AppContentProps {
  user: User;
  userRole: KullaniciRol;
}

export default function AppContent({ user, userRole }: AppContentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Map routes to section IDs for sidebar
  const getCurrentSection = () => {
    const pathMap: { [key: string]: string } = {
      '/': 'dashboard',
      '/dashboard': 'dashboard',
      '/takvim': 'takvim',
      '/bagis-yonetimi': 'bagis-yonetimi',
      '/bagis-yonetimi/tum-bagislar': 'bagis-yonetimi',
      '/bagis-yonetimi/nakit': 'bagis-yonetimi',
      '/bagis-yonetimi/ayni': 'bagis-yonetimi',
      '/kumbaralar': 'kumbaralar',
      '/finansal-kayitlar': 'finansal-kayitlar',
      '/odemeler': 'odemeler',
      '/kisiler': 'kisiler',
      '/gonulluler': 'gonulluler',
      '/kurumlar': 'kurumlar',
      '/uyeler': 'uyeler',
      '/ihtiyac-sahipleri': 'ihtiyac-sahipleri',
      '/yardimlar': 'yardimlar',
      '/depo-yonetimi': 'depo-yonetimi',
      '/vefa-destek': 'vefa-destek',
      '/burslar': 'burslar',
      '/yetimler': 'yetimler',
      '/hukuki-yardim': 'hukuki-yardim',
      '/projeler': 'projeler',
      '/etkinlikler': 'etkinlikler',
      '/mesajlasma': 'mesajlasma',
      '/raporlama-analitik': 'raporlama-analitik',
      '/harita': 'harita',
      '/dokuman-arsivi': 'dokuman-arsivi',
      '/chatbot-yonetimi': 'chatbot-yonetimi',
      '/mobile-app': 'mobile-app',
      '/api-dashboard': 'api-dashboard',
      '/data-analytics': 'data-analytics',
      '/web-services': 'web-services',
      '/sistem-ayarlari': 'sistem-ayarlari',
      '/destek': 'destek'
    };
    return pathMap[location.pathname] || 'dashboard';
  };

  // Handle navigation from sidebar
  const handleNavigation = (sectionId: string) => {
    const routeMap: { [key: string]: string } = {
      'dashboard': '/',
      'takvim': '/takvim',
      'bagis-yonetimi': '/bagis-yonetimi',
      'kumbaralar': '/kumbaralar',
      'finansal-kayitlar': '/finansal-kayitlar',
      'odemeler': '/odemeler',
      'kisiler': '/kisiler',
      'gonulluler': '/gonulluler',
      'kurumlar': '/kurumlar',
      'uyeler': '/uyeler',
      'ihtiyac-sahipleri': '/ihtiyac-sahipleri',
      'yardimlar': '/yardimlar',
      'depo-yonetimi': '/depo-yonetimi',
      'vefa-destek': '/vefa-destek',
      'burslar': '/burslar',
      'yetimler': '/yetimler',
      'hukuki-yardim': '/hukuki-yardim',
      'projeler': '/projeler',
      'etkinlikler': '/etkinlikler',
      'mesajlasma': '/mesajlasma',
      'raporlama-analitik': '/raporlama-analitik',
      'harita': '/harita',
      'dokuman-arsivi': '/dokuman-arsivi',
      'chatbot-yonetimi': '/chatbot-yonetimi',
      'mobile-app': '/mobile-app',
      'api-dashboard': '/api-dashboard',
      'data-analytics': '/data-analytics',
      'web-services': '/web-services',
      'sistem-ayarlari': '/sistem-ayarlari',
      'destek': '/destek'
    };
    
    const route = routeMap[sectionId];
    if (route) {
      navigate(route);
      setSidebarOpen(false); // Close sidebar on mobile after navigation
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <KafkasderSidebar
        activeSection={getCurrentSection()}
        onSectionChange={handleNavigation}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Mobile header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-blue-100/50 lg:hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/30"></div>
          <div className="relative flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Kafkasder Panel
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Çıkış
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-transparent">
          <div className="p-8">
            <Suspense fallback={<div className="p-8 text-center text-zinc-600">Yükleniyor...</div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-sidebar-demo" element={<DashboardWithNewSidebar />} />
                <Route path="/sidebar-integration-guide" element={<SidebarIntegrationGuide />} />
                <Route path="/sidebar-customization-demo" element={<SidebarCustomizationDemo />} />
                <Route path="/transition-success" element={<TransitionSuccess />} />
                <Route path="/icon-showcase" element={<IconShowcase />} />
                
                {/* Kişiler & Kurumlar */}
                <Route path="/kisiler" element={<ProtectedRoute userRole={userRole}><KisiYonetimi /></ProtectedRoute>} />
                <Route path="/gonulluler" element={<ProtectedRoute userRole={userRole}><GonulluYonetimi /></ProtectedRoute>} />
                <Route path="/kurumlar" element={<ProtectedRoute userRole={userRole}><KurumYonetimi /></ProtectedRoute>} />
                
                {/* Bağış Yönetimi */}
                <Route path="/bagis-yonetimi" element={<ProtectedRoute userRole={userRole}><BagisYonetimi /></ProtectedRoute>} />
                <Route path="/bagis-yonetimi/tum-bagislar" element={<ProtectedRoute userRole={userRole}><BagisYonetimi /></ProtectedRoute>} />
                <Route path="/bagis-yonetimi/nakit" element={<ProtectedRoute userRole={userRole}><BagisYonetimi /></ProtectedRoute>} />
                <Route path="/bagis-yonetimi/ayni" element={<ProtectedRoute userRole={userRole}><AyniYardimIslemleri /></ProtectedRoute>} />
                <Route path="/kumbaralar" element={<ProtectedRoute userRole={userRole}><KumbaraYonetimi /></ProtectedRoute>} />
                
                {/* Yardım Yönetimi */}
                <Route path="/yardim-yonetimi" element={<ProtectedRoute userRole={userRole}><YardimBasvurulari /></ProtectedRoute>} />
                <Route path="/ihtiyac-sahipleri" element={<ProtectedRoute userRole={userRole}><YardimAlanlar /></ProtectedRoute>} />
                <Route path="/yardimlar" element={<ProtectedRoute userRole={userRole}><YardimBasvurulari /></ProtectedRoute>} />
                <Route path="/yardim-yonetimi/nakdi-yardimlar" element={<ProtectedRoute userRole={userRole}><YardimBasvurulari /></ProtectedRoute>} />
                <Route path="/yardim-yonetimi/ayni-yardimlar" element={<ProtectedRoute userRole={userRole}><AyniYardimIslemleri /></ProtectedRoute>} />
                <Route path="/yardim-yonetimi/tum-yardimlar" element={<ProtectedRoute userRole={userRole}><YardimBasvurulari /></ProtectedRoute>} />
                <Route path="/depo-yonetimi" element={<ProtectedRoute userRole={userRole}><StokYonetimi /></ProtectedRoute>} />
                <Route path="/vefa-destek" element={<ProtectedRoute userRole={userRole}><VefaDestekYonetimi /></ProtectedRoute>} />
                <Route path="/odemeler" element={<ProtectedRoute userRole={userRole}><OdemeYonetimi /></ProtectedRoute>} />
                <Route path="/yardim-yonetimi/hizmet-takip" element={<ProtectedRoute userRole={userRole}><YardimBasvurulari /></ProtectedRoute>} />
                <Route path="/yardim-yonetimi/hastane-sevk" element={<ProtectedRoute userRole={userRole}><YardimBasvurulari /></ProtectedRoute>} />
                <Route path="/baskan-onayi" element={<ProtectedRoute userRole={userRole}><BaskanOnayi /></ProtectedRoute>} />
                
                {/* Diğer Modüller */}
                <Route path="/harita" element={<ProtectedRoute userRole={userRole}><HaritaModulu /></ProtectedRoute>} />
                <Route path="/dokuman-arsivi" element={<ProtectedRoute userRole={userRole}><DosyaYonetimi /></ProtectedRoute>} />
                <Route path="/uyeler" element={<ProtectedRoute userRole={userRole}><UyeYonetimi /></ProtectedRoute>} />
                <Route path="/takvim" element={<ProtectedRoute userRole={userRole}><Takvim /></ProtectedRoute>} />
                <Route path="/finansal-kayitlar" element={<ProtectedRoute userRole={userRole}><FinansalKayitlar /></ProtectedRoute>} />
                <Route path="/mesajlasma" element={<ProtectedRoute userRole={userRole}><TopluIletisim /></ProtectedRoute>} />
                <Route path="/toplu-iletisim" element={<ProtectedRoute userRole={userRole}><TopluIletisim /></ProtectedRoute>} />
                <Route path="/mesajlasma/raporlar" element={<ProtectedRoute userRole={userRole}><MesajRaporlari /></ProtectedRoute>} />
                <Route path="/projeler" element={<ProtectedRoute userRole={userRole}><ProjeYonetimi /></ProtectedRoute>} />
                <Route path="/raporlama-analitik" element={<ProtectedRoute userRole={userRole}><RaporlamaAnalitik /></ProtectedRoute>} />
                <Route path="/etkinlikler" element={<ProtectedRoute userRole={userRole}><EtkinlikYonetimi /></ProtectedRoute>} />
                <Route path="/burslar" element={<ProtectedRoute userRole={userRole}><OgrenciBurslari /></ProtectedRoute>} />
                <Route path="/yetimler" element={<ProtectedRoute userRole={userRole}><YetimYonetimi /></ProtectedRoute>} />
                <Route path="/hukuki-yardim" element={<ProtectedRoute userRole={userRole}><HukukiYardim /></ProtectedRoute>} />
                <Route path="/destek" element={<ProtectedRoute userRole={userRole}><Destek /></ProtectedRoute>} />
                <Route path="/chatbot-yonetimi" element={<ProtectedRoute userRole={userRole}><ChatbotYonetimi /></ProtectedRoute>} />
                <Route path="/sistem-ayarlari" element={<ProtectedRoute userRole={userRole}><Ayarlar /></ProtectedRoute>} />
                <Route path="/sistem-ayarlari/genel" element={<ProtectedRoute userRole={userRole}><Ayarlar /></ProtectedRoute>} />
                <Route path="/sistem-ayarlari/kullanicilar" element={<ProtectedRoute userRole={userRole}><KullaniciYonetimi /></ProtectedRoute>} />
                <Route path="/sistem-ayarlari/yedekleme" element={<ProtectedRoute userRole={userRole}><Ayarlar /></ProtectedRoute>} />
                <Route path="/profil" element={<ProtectedRoute userRole={userRole}><Profil /></ProtectedRoute>} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="/bildirimler" element={<ProtectedRoute userRole={userRole}><Bildirimler /></ProtectedRoute>} />
                <Route path="/guvenlik-ayarlari" element={<ProtectedRoute userRole={userRole}><GuvenlikAyarlari /></ProtectedRoute>} />
                <Route path="/whatsapp" element={<ProtectedRoute userRole={userRole}><WhatsApp /></ProtectedRoute>} />
                <Route path="/api-entegrasyonu" element={<ProtectedRoute userRole={userRole}><ApiEntegrasyonu /></ProtectedRoute>} />

                {/* Technology & Innovation Routes */}
                <Route path="/mobile-app" element={<ProtectedRoute userRole={userRole}><MobileApp /></ProtectedRoute>} />
                <Route path="/api-dashboard" element={<ProtectedRoute userRole={userRole}><ApiDashboard /></ProtectedRoute>} />
                <Route path="/data-analytics" element={<ProtectedRoute userRole={userRole}><DataAnalytics /></ProtectedRoute>} />
                <Route path="/web-services" element={<ProtectedRoute userRole={userRole}><WebServices /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
