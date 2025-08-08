import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import * as ReactRouterDOM from 'react-router-dom';
import { DashboardStats, RecentActivity } from '../types.ts';
import { useDashboardData } from '../hooks/useData.ts';
import { ModernCard, ModernCardHeader, ModernCardContent } from './ui/ModernCard';
import { ModernButton } from './ui/ModernButton';
import { theme } from './ui/theme';
import {
  TrendingUp, TrendingDown, Users, Heart, DollarSign, Calendar,
  Activity, Clock, Bell, ChevronRight, Sparkles, Target, Award,
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  ArrowUpRight, ArrowDownRight, Plus, Filter, Download, RefreshCw,
  MapPin, MessageCircle, FileText, Package, AlertTriangle, CheckCircle
} from "lucide-react";

const timeSince = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " yıl önce";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " ay önce";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " gün önce";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " saat önce";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " dakika önce";
    return "az önce";
};

const SafeActivityDescription: React.FC<{ description: string }> = ({ description }) => {
    const strongTagRegex = /<strong>(.*?)<\/strong>/;
    const match = description.match(strongTagRegex);

    if (match && match.index !== undefined) {
        const actionText = match[1];
        const prefixText = description.substring(0, match.index);
        const suffixText = description.substring(match.index + match[0].length);

        return (
            <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                {prefixText}
                <strong className="text-blue-600 font-semibold">{actionText}</strong>
                {suffixText}
            </p>
        );
    }
    
    return (
        <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            {description}
        </p>
    );
};

// Enhanced Stat Card Component
interface ModernStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeType?: 'increase' | 'decrease';
  color: string;
  subtitle?: string;
  loading?: boolean;
}

const ModernStatCard: React.FC<ModernStatCardProps> = ({
  title, value, icon, change, changeType, color, subtitle, loading = false
}) => {
  if (loading) {
    return (
      <ModernCard variant="default" className="animate-pulse">
        <div className="h-24 bg-gray-200 rounded"></div>
      </ModernCard>
    );
  }

  return (
    <ModernCard variant="interactive" className="group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</h3>
            {change !== undefined && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                changeType === 'increase' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {changeType === 'increase' ? 
                  <ArrowUpRight className="h-3 w-3" /> : 
                  <ArrowDownRight className="h-3 w-3" />
                }
                {Math.abs(change)}%
              </div>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </ModernCard>
  );
};

// Quick Action Card Component
const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}> = ({ title, description, icon, color, onClick }) => (
  <ModernCard variant="interactive" className="group cursor-pointer" onClick={onClick}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </div>
  </ModernCard>
);

const Dashboard: React.FC = () => {
    const { data, isLoading: loading, error } = useDashboardData();
    const navigate = ReactRouterDOM.useNavigate();

    const stats = data?.stats;
    const recentActivities = data?.recentActivities;
    const monthlyData = data?.monthlyDonationData;

    // Mock data for enhanced charts
    const pieData = [
        { name: 'Nakit Bağış', value: 45, color: '#3b82f6' },
        { name: 'Ayni Yardım', value: 30, color: '#10b981' },
        { name: 'Kurban', value: 15, color: '#f59e0b' },
        { name: 'Diğer', value: 10, color: '#ef4444' },
    ];

    const quickActions = [
        {
            title: "Yeni Kişi Ekle",
            description: "Sisteme yeni kişi kaydı oluştur",
            icon: <Users className="h-6 w-6" />,
            color: "from-blue-500 to-indigo-600",
            onClick: () => navigate('/kisiler')
        },
        {
            title: "Bağış Kayd��",
            description: "Yeni bağış işlemi kaydet",
            icon: <Heart className="h-6 w-6" />,
            color: "from-rose-500 to-pink-600",
            onClick: () => navigate('/bagis-yonetimi')
        },
        {
            title: "Yardım Başvurusu",
            description: "Yeni yardım talebi oluştur",
            icon: <Target className="h-6 w-6" />,
            color: "from-emerald-500 to-teal-600",
            onClick: () => navigate('/yardimlar')
        },
        {
            title: "Rapor Oluştur",
            description: "Detaylı analitik raporu hazırla",
            icon: <BarChart3 className="h-6 w-6" />,
            color: "from-purple-500 to-violet-600",
            onClick: () => navigate('/raporlama-analitik')
        }
    ];

    if (loading) {
        return (
            <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
                <ModernCard variant="default" className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Veri Yüklenemedi</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <ModernButton variant="primary" onClick={() => window.location.reload()}>
                        Yeniden Dene
                    </ModernButton>
                </ModernCard>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Dashboard
                        <Sparkles className="inline-block h-8 w-8 text-blue-500 ml-2" />
                    </h1>
                    <p className="text-gray-600">Kafkasder yönetim sistemi genel görünümü</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <ModernButton variant="outline" icon={<Filter className="h-4 w-4" />}>
                        Filtrele
                    </ModernButton>
                    <ModernButton variant="outline" icon={<Download className="h-4 w-4" />}>
                        Dışa Aktar
                    </ModernButton>
                    <ModernButton variant="primary" icon={<RefreshCw className="h-4 w-4" />}>
                        Yenile
                    </ModernButton>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ModernStatCard
                    title="Toplam Kişi"
                    value={stats?.totalMembers || 0}
                    icon={<Users className="h-6 w-6" />}
                    change={12}
                    changeType="increase"
                    color="from-blue-500 to-indigo-600"
                    subtitle="Bu ay +45 yeni kayıt"
                    loading={loading}
                />
                <ModernStatCard
                    title="Toplam Bağış"
                    value={`₺${(stats?.totalDonations || 0).toLocaleString()}`}
                    icon={<Heart className="h-6 w-6" />}
                    change={8}
                    changeType="increase"
                    color="from-rose-500 to-pink-600"
                    subtitle="Bu ay ₺125.450"
                    loading={loading}
                />
                <ModernStatCard
                    title="Aktif Projeler"
                    value={stats?.activeProjects || 0}
                    icon={<Target className="h-6 w-6" />}
                    change={3}
                    changeType="decrease"
                    color="from-emerald-500 to-teal-600"
                    subtitle="12 proje tamamlandı"
                    loading={loading}
                />
                <ModernStatCard
                    title="Bu Ay Yardım"
                    value={stats?.monthlyAid || 0}
                    icon={<Award className="h-6 w-6" />}
                    change={15}
                    changeType="increase"
                    color="from-purple-500 to-violet-600"
                    subtitle="285 aile yardım aldı"
                    loading={loading}
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <QuickActionCard key={index} {...action} />
                    ))}
                </div>
            </div>

            {/* Charts and Data */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Monthly Trend Chart */}
                <ModernCard variant="default" className="lg:col-span-2">
                    <ModernCardHeader
                        title="Aylık Trendler"
                        subtitle="Son 12 ayın karşılaştırılması"
                        icon={<LineChartIcon className="h-5 w-5" />}
                        actions={
                            <div className="flex gap-2">
                                <ModernButton variant="ghost" size="sm">Bağışlar</ModernButton>
                                <ModernButton variant="ghost" size="sm">Yardımlar</ModernButton>
                            </div>
                        }
                    />
                    <ModernCardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData}>
                                    <defs>
                                        <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorAid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="donations"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorDonations)"
                                        name="Bağışlar"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="aid"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorAid)"
                                        name="Yardımlar"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </ModernCardContent>
                </ModernCard>

                {/* Pie Chart */}
                <ModernCard variant="default">
                    <ModernCardHeader
                        title="Bağış Dağılımı"
                        subtitle="Kategorilere göre dağılım"
                        icon={<PieChartIcon className="h-5 w-5" />}
                    />
                    <ModernCardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </ModernCardContent>
                </ModernCard>
            </div>

            {/* Recent Activities */}
            <ModernCard variant="default">
                <ModernCardHeader
                    title="Son Aktiviteler"
                    subtitle="Sistemdeki en son işlemler"
                    icon={<Activity className="h-5 w-5" />}
                    actions={
                        <ModernButton variant="ghost" size="sm" icon={<ChevronRight className="h-4 w-4" />}>
                            Tümünü Gör
                        </ModernButton>
                    }
                />
                <ModernCardContent>
                    <div className="space-y-4">
                        {recentActivities?.slice(0, 6).map((activity: RecentActivity, index: number) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <SafeActivityDescription description={activity.description} />
                                    <div className="flex items-center gap-2 mt-2">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span className="text-xs text-gray-500">{timeSince(activity.timestamp)}</span>
                                        {activity.type && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                {activity.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )) || (
                            <div className="text-center py-8 text-gray-500">
                                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>Henüz aktivite bulunmuyor</p>
                            </div>
                        )}
                    </div>
                </ModernCardContent>
            </ModernCard>
        </div>
    );
};

export default Dashboard;
