import React, { useState, useEffect } from 'react';
import { ModernCard, ModernCardHeader, ModernCardContent } from './ui/ModernCard';
import { ModernButton } from './ui/ModernButton';
import { ModernInput } from './ui/ModernInput';
import { Eye, EyeOff, Heart, Shield, Sparkles, Users, Award, BarChart3 } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load saved email on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) setEmail(savedEmail);
      } catch {}
    }
  }, []);

  // Auto-fill for development
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shouldAutofill = params.get('autofill') === '1';
      if (shouldAutofill) {
        const isDevelopment = import.meta.env.DEV;
        const autoEmail = isDevelopment ? import.meta.env.VITE_DEV_EMAIL || '' : '';
        const autoPass = isDevelopment ? import.meta.env.VITE_DEV_PASSWORD || '' : '';
        
        if (autoEmail && autoPass) {
          setEmail(autoEmail);
          setPassword(autoPass);
          try {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedEmail', autoEmail);
          } catch {}
          
          const timer = setTimeout(() => {
            const form = document.getElementById('login-form') as HTMLFormElement | null;
            if (form) form.requestSubmit?.();
          }, 100);
          return () => clearTimeout(timer);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save email if remember me
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('savedEmail', email);
        } catch {}
      }
      
      await onLogin(email, password);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Giriş sırasında bir hata oluştu.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center relative shadow-2xl shadow-blue-500/25 group-hover:shadow-3xl group-hover:shadow-blue-500/30 transition-all duration-500">
              <Heart className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-60 animate-pulse group-hover:opacity-80"></div>
            </div>
            
            {/* Floating icons around logo */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700">
              <Award className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4 animate-fade-in">
            Kafkasder Panel
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Yönetim Sistemi
            </p>
            <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-base font-medium mb-6">
            Sosyal yardım kuruluşları için gelişmiş AI destekli panel sistemi
          </p>
          
          {/* Feature highlights */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mb-8">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Güvenli</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>AI Destekli</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span>Analitik</span>
            </div>
          </div>
        </div>

        {/* Enhanced Login Form */}
        <ModernCard variant="glass" className="backdrop-blur-xl border-white/30 shadow-2xl shadow-blue-500/20 hover:shadow-3xl hover:shadow-blue-500/25 transition-all duration-500">
          <ModernCardHeader
            title="Güvenli Giriş"
            subtitle="Hesabınıza AI destekli güvenli giriş yapın"
            className="text-center"
            icon={<Shield className="h-5 w-5 text-blue-500" />}
          />
          
          <ModernCardContent>
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
                <p className="text-sm font-medium text-red-700 text-center">{error}</p>
              </div>
            )}

            <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-posta Adresi
                </label>
                <ModernInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@kafkasder.org"
                  required
                  autoComplete="email"
                  className="bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <ModernInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="bg-white/80 backdrop-blur-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <ModernButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300"
                disabled={loading}
                icon={loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Shield className="h-5 w-5" />}
              >
                {loading ? 'Giriş yapılıyor...' : 'Güvenli Giriş'}
              </ModernButton>
            </form>

            {/* Enhanced Additional Info */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-gray-600 font-medium">
                🔒 Bu sistem SSL sertifikası ve 2FA ile korunmaktadır
              </p>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col items-center gap-1 p-2 bg-white/50 rounded-lg">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600 font-medium">256-bit</span>
                  <span className="text-gray-400">Şifreleme</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/50 rounded-lg">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-gray-600 font-medium">Güvenilir</span>
                  <span className="text-gray-400">Platform</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/50 rounded-lg">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-600 font-medium">AI Destekli</span>
                  <span className="text-gray-400">Analiz</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700 font-medium">💡 İpucu: Sisteme giriş yaptıktan sonra AI asistanımız size yardımcı olacak</p>
              </div>
            </div>
          </ModernCardContent>
        </ModernCard>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Kafkasder. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
