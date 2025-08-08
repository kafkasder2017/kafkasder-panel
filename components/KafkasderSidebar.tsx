import React from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Home, Users, Calendar, BookOpen, Heart, MessageCircle, Settings,
  DollarSign, Building2, Users2, Clock, Shield, Archive, Smartphone,
  BarChart, MapPin, HelpCircle, Bot, FileText, Scale, Cpu, Database,
  GraduationCap, Package, Globe, Zap, Wifi, TrendingUp, PieChart,
  Activity, Bell, ChevronRight, Sparkles, Star, Award, Target
} from "lucide-react";
import { NavItem } from '../types';

interface KafkasderSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function KafkasderSidebar({ activeSection, onSectionChange }: KafkasderSidebarProps) {
  const menuSections = [
    {
      title: "Ana Kontrol Paneli",
      icon: Home,
      color: "from-blue-500 to-indigo-600",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/", badge: "Ana" },
        { id: "raporlama-analitik", label: "Analytics & Raporlar", icon: TrendingUp, path: "/raporlama-analitik", badge: "Yeni" },
        { id: "takvim", label: "Takvim & Etkinlikler", icon: Calendar, path: "/takvim" },
      ]
    },
    {
      title: "İnsan Kaynakları & Toplum",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      items: [
        { id: "kisiler", label: "Kişi Yönetimi", icon: Users, path: "/kisiler" },
        { id: "gonulluler", label: "Gönüllü Koordinasyonu", icon: Users2, path: "/gonulluler" },
        { id: "uyeler", label: "Üyelik Sistemi", icon: Award, path: "/uyeler" },
        { id: "kurumlar", label: "Kurum & Ortaklıklar", icon: Building2, path: "/kurumlar" },
      ]
    },
    {
      title: "Finansal Yönetim & Bağış",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-600",
      items: [
        { id: "bagis-yonetimi", label: "Bağış Yönetim Merkezi", icon: Heart, path: "/bagis-yonetimi" },
        { id: "finansal-kayitlar", label: "Finansal İşlemler", icon: PieChart, path: "/finansal-kayitlar" },
        { id: "kumbaralar", label: "Kumbara Takip Sistemi", icon: DollarSign, path: "/kumbaralar" },
        { id: "odemeler", label: "Ödeme & Transfer", icon: FileText, path: "/odemeler" },
      ]
    },
    {
      title: "Sosyal Yardım & Hizmetler",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      items: [
        { id: "ihtiyac-sahipleri", label: "Yardım Talep Sistemi", icon: Target, path: "/ihtiyac-sahipleri" },
        { id: "yardimlar", label: "Yardım Koordinasyonu", icon: Heart, path: "/yardimlar" },
        { id: "yetimler", label: "Yetim Bakım Sistemi", icon: Users, path: "/yetimler" },
        { id: "burslar", label: "Eğitim & Burs Programı", icon: GraduationCap, path: "/burslar" },
        { id: "vefa-destek", label: "Vefa Destek Ağı", icon: Shield, path: "/vefa-destek" },
        { id: "hukuki-yardim", label: "Hukuki Danışmanlık", icon: Scale, path: "/hukuki-yardim" },
      ]
    },
    {
      title: "Operasyonel Yönetim",
      icon: Package,
      color: "from-purple-500 to-violet-600",
      items: [
        { id: "projeler", label: "Proje Yönetimi", icon: BookOpen, path: "/projeler" },
        { id: "etkinlikler", label: "Etkinlik Organizasyonu", icon: Calendar, path: "/etkinlikler" },
        { id: "depo-yonetimi", label: "Depo & Lojistik", icon: Package, path: "/depo-yonetimi" },
        { id: "dokuman-arsivi", label: "Doküman Merkezi", icon: Archive, path: "/dokuman-arsivi" },
        { id: "harita", label: "Coğrafi Haritalama", icon: MapPin, path: "/harita" },
      ]
    },
    {
      title: "İletişim & Dijital Araçlar",
      icon: MessageCircle,
      color: "from-cyan-500 to-blue-600",
      items: [
        { id: "mesajlasma", label: "Toplu İletişim", icon: MessageCircle, path: "/mesajlasma" },
        { id: "chatbot-yonetimi", label: "AI Asistan Yönetimi", icon: Bot, path: "/chatbot-yonetimi", badge: "AI" },
        { id: "mobile-app", label: "Mobil Uygulama", icon: Smartphone, path: "/mobile-app", badge: "Beta" },
        { id: "web-services", label: "Web Servisleri", icon: Globe, path: "/web-services" },
      ]
    },
    {
      title: "Teknoloji & İnovasyon",
      icon: Zap,
      color: "from-indigo-500 to-purple-600",
      items: [
        { id: "api-dashboard", label: "API Yönetim Paneli", icon: Cpu, path: "/api-dashboard", badge: "Dev" },
        { id: "data-analytics", label: "Veri Analitik Hub", icon: Database, path: "/data-analytics", badge: "Pro" },
      ]
    },
    {
      title: "Sistem Yönetimi",
      icon: Settings,
      color: "from-gray-500 to-slate-600",
      items: [
        { id: "sistem-ayarlari", label: "Sistem Konfigürasyonu", icon: Settings, path: "/sistem-ayarlari" },
        { id: "destek", label: "Yardım & Teknik Destek", icon: HelpCircle, path: "/destek" },
      ]
    }
  ];

  return (
    <div className="w-80 h-full bg-white/80 backdrop-blur-sm border-r border-purple-100/50 flex flex-col">
      
      <div className="p-8 border-b border-purple-100/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 to-blue-50/50 rounded-lg"></div>
        <div className="relative text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'var(--font-editorial)' }}>
            Kafkasder Panel
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--lilac-600)' }}>Modern Yönetim Sistemi</p>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-6 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-11 px-4 rounded-xl transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg hover:from-violet-600 hover:to-blue-600 transform scale-105'
                        : 'text-gray-700 hover:bg-violet-50/70 hover:text-violet-700 hover:transform hover:scale-102'
                    }`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-violet-100 text-violet-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-6 border-t border-purple-100/50">
        <div className="bg-gradient-to-br from-violet-50/70 to-blue-50/70 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-blue-400 rounded-lg flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-800">AI Asistan</p>
          </div>
          <p className="text-xs text-gray-600 mb-3">7/24 akıllı destek sistemi</p>
          <Button variant="outline" size="sm" className="w-full border-violet-200 text-violet-700 hover:bg-violet-50">
            Sohbeti Başlat
          </Button>
        </div>
      </div>
    </div>
  );
}
