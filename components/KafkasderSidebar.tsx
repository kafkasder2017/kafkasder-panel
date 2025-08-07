import React from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Home, Users, Calendar, BookOpen, Heart, MessageCircle, Settings,
  DollarSign, Building2, Users2, Clock, Shield, Archive,
  BarChart, MapPin, HelpCircle, Bot, FileText, Scale,
  GraduationCap, Package, Smartphone, Cpu, Database, Globe
} from "lucide-react";
import { NavItem } from '../types';

interface KafkasderSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function KafkasderSidebar({ activeSection, onSectionChange }: KafkasderSidebarProps) {
  const menuSections = [
    {
      title: "Ana Panel",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
        { id: "takvim", label: "Takvim", icon: Calendar, path: "/takvim" },
      ]
    },
    {
      title: "Bağış & Finans Yönetimi",
      items: [
        { id: "bagis-yonetimi", label: "Bağış Yönetimi", icon: Heart, path: "/bagis-yonetimi" },
        { id: "kumbaralar", label: "Kumbara Takibi", icon: DollarSign, path: "/kumbaralar" },
        { id: "finansal-kayitlar", label: "Finans & Fon Yönetimi", icon: BarChart, path: "/finansal-kayitlar" },
        { id: "odemeler", label: "Banka Ödeme Emirleri", icon: FileText, path: "/odemeler" },
      ]
    },
    {
      title: "Kişi & Kurum Yönetimi",
      items: [
        { id: "kisiler", label: "Kişi Listesi", icon: Users, path: "/kisiler" },
        { id: "gonulluler", label: "Gönüllü Yönetimi", icon: Users2, path: "/gonulluler" },
        { id: "kurumlar", label: "Kurumlar", icon: Building2, path: "/kurumlar" },
        { id: "uyeler", label: "Üye Yönetimi", icon: Heart, path: "/uyeler" },
      ]
    },
    {
      title: "Yardım & Sosyal Hizmetler",
      items: [
        { id: "ihtiyac-sahipleri", label: "Yardım Alanlar", icon: Users, path: "/ihtiyac-sahipleri" },
        { id: "yardimlar", label: "Yardım Başvuruları", icon: Heart, path: "/yardimlar" },
        { id: "depo-yonetimi", label: "Depo & Stok Yönetimi", icon: Package, path: "/depo-yonetimi" },
        { id: "vefa-destek", label: "Vefa Destek Yönetimi", icon: Shield, path: "/vefa-destek" },
        { id: "burslar", label: "Burs Yönetimi", icon: GraduationCap, path: "/burslar" },
        { id: "yetimler", label: "Yetim Yönetimi", icon: Heart, path: "/yetimler" },
        { id: "hukuki-yardim", label: "Hukuk Yönetimi", icon: Scale, path: "/hukuki-yardim" },
      ]
    },
    {
      title: "Sistem & Araçlar",
      items: [
        { id: "projeler", label: "Proje Yönetimi", icon: BookOpen, path: "/projeler" },
        { id: "etkinlikler", label: "Etkinlik Yönetimi", icon: Calendar, path: "/etkinlikler" },
        { id: "mesajlasma", label: "Mesajlaşma", icon: MessageCircle, path: "/mesajlasma" },
        { id: "raporlama-analitik", label: "Raporlama & Analitik", icon: BarChart, path: "/raporlama-analitik" },
        { id: "harita", label: "Harita Modülü", icon: MapPin, path: "/harita" },
        { id: "dokuman-arsivi", label: "Doküman Arşivi", icon: Archive, path: "/dokuman-arsivi" },
        { id: "chatbot-yonetimi", label: "AI Chatbot Yönetimi", icon: Bot, path: "/chatbot-yonetimi" },
      ]
    },
    {
      title: "Ayarlar",
      items: [
        { id: "sistem-ayarlari", label: "Sistem Ayarları", icon: Settings, path: "/sistem-ayarlari" },
        { id: "destek", label: "Yardım & Destek", icon: HelpCircle, path: "/destek" },
      ]
    }
  ];

  return (
    <div className="w-80 h-full bg-white/80 backdrop-blur-sm border-r border-blue-100/50 flex flex-col">
      <div className="p-8 border-b border-blue-100/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg"></div>
        <div className="relative text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'var(--font-editorial)' }}>
            Kafkasder Panel
          </h2>
          <p className="text-sm font-medium text-blue-600">Yönetim Sistemi</p>
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
                const isActive = activeSection === item.id || location.pathname === item.path;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-11 px-4 rounded-xl transition-all duration-300 text-left ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:from-blue-600 hover:to-indigo-600 transform scale-105' 
                        : 'text-gray-700 hover:bg-blue-50/70 hover:text-blue-700 hover:transform hover:scale-102'
                    }`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-6 border-t border-blue-100/50">
        <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-800">Yardıma İhtiyacınız Var?</p>
          </div>
          <p className="text-xs text-gray-600 mb-3">AI asistanımızla sohbet edin</p>
          <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
            Sohbeti Aç
          </Button>
        </div>
      </div>
    </div>
  );
}
