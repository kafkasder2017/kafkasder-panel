import React from 'react';
import { ModernButton } from "./ui/ModernButton";
import { ModernCard } from "./ui/ModernCard";
import {
  Home, Users, Calendar, BookOpen, Heart, MessageCircle, Settings,
  DollarSign, Building2, Users2, Clock, Shield, Archive, Smartphone,
  BarChart, MapPin, HelpCircle, Bot, FileText, Scale, Cpu, Database,
  GraduationCap, Package, Globe, Zap, Wifi, TrendingUp, PieChart,
  Activity, Bell, ChevronRight, Sparkles, Star, Award, Target
} from "lucide-react";
import { NavItem } from '../types';
import { theme, variants } from './ui/theme';

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
    <div className="w-80 h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 backdrop-blur-sm border-r border-blue-100/50 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl transform -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl transform translate-x-16 translate-y-16"></div>
      </div>
      
      {/* Header */}
      <div className="relative p-8 border-b border-blue-100/50">
        <ModernCard variant="glass" padding="lg" className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
            <Heart className="h-8 w-8 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Kafkasder Panel
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-medium text-blue-600">Modern Yönetim Sistemi</p>
            <Sparkles className="h-4 w-4 text-blue-500" />
          </div>
        </ModernCard>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        {menuSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <div key={section.title} className="space-y-3">
              {/* Section Header */}
              <div className="flex items-center gap-3 px-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center`}>
                  <SectionIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                  {section.title}
                </h3>
              </div>
              
              {/* Section Items */}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id || location.pathname === item.path;
                  
                  return (
                    <ModernButton
                      key={item.id}
                      variant="ghost"
                      size="base"
                      className={`w-full justify-start gap-3 h-12 px-4 rounded-2xl relative group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                          : 'text-gray-700 hover:bg-white/70 hover:text-blue-700 hover:shadow-md hover:scale-102'
                      } transition-all duration-300`}
                      onClick={() => onSectionChange(item.id)}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                      )}
                      
                      {/* Icon */}
                      <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      {/* Label */}
                      <span className="font-medium text-sm flex-1 text-left">
                        {item.label}
                      </span>
                      
                      {/* Badge */}
                      {item.badge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      
                      {/* Arrow */}
                      <ChevronRight className={`h-4 w-4 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                      } transition-transform group-hover:translate-x-1`} />
                    </ModernButton>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-6 border-t border-blue-100/50">
        <ModernCard variant="glass" padding="lg" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">AI Asistan</p>
                <p className="text-xs text-gray-500">7/24 Destek</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Akıllı asistanımızla her konuda yardım alın
            </p>
            <ModernButton 
              variant="primary" 
              size="sm" 
              className="w-full"
              icon={<Sparkles className="h-4 w-4" />}
            >
              Sohbeti Başlat
            </ModernButton>
          </div>
        </ModernCard>
      </div>
    </div>
  );
}
