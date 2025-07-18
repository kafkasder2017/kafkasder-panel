import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock dashboard data with all required features
    const dashboardData = {
      stats: {
        totalMembers: 1250,
        totalDonations: 3420,
        totalOrganizations: 89,
        totalBeneficiaries: 567,
        monthlyDonations: 156,
        monthlyMembers: 23,
        pendingApplications: 12,
        activeDonations: 89
      },
      pendingTasks: {
        pendingDonations: 8,
        pendingAidRequests: 15,
        pendingApprovals: 6,
        pendingReports: 3,
        totalPending: 32
      },
      recentActivities: [
        {
          id: 1,
          type: 'donation',
          title: 'Yeni Bağış',
          description: 'Ahmet Yılmaz 5.000 TL bağış yaptı',
          time: '2 saat önce',
          icon: 'Heart',
          color: 'text-green-600'
        },
        {
          id: 2,
          type: 'member',
          title: 'Yeni Üye',
          description: 'Fatma Demir üye oldu',
          time: '4 saat önce',
          icon: 'Users',
          color: 'text-blue-600'
        },
        {
          id: 3,
          type: 'aid',
          title: 'Yardım Başvurusu',
          description: 'Mehmet Kaya yardım başvurusu yaptı',
          time: '6 saat önce',
          icon: 'FileText',
          color: 'text-orange-600'
        },
        {
          id: 4,
          type: 'organization',
          title: 'Yeni Organizasyon',
          description: 'ABC Şirketi kayıt oldu',
          time: '1 gün önce',
          icon: 'Building2',
          color: 'text-purple-600'
        }
      ],
      calendar: {
        today: [
          {
            id: 1,
            title: 'Yönetim Kurulu Toplantısı',
            time: '14:00',
            type: 'meeting',
            priority: 'high'
          },
          {
            id: 2,
            title: 'Bağış Kampanyası Başlangıcı',
            time: '16:30',
            type: 'campaign',
            priority: 'medium'
          }
        ],
        upcoming: [
          {
            id: 3,
            title: 'Burs Dağıtım Töreni',
            date: '2024-01-15',
            type: 'event',
            priority: 'high'
          },
          {
            id: 4,
            title: 'Mali Rapor Hazırlama',
            date: '2024-01-18',
            type: 'task',
            priority: 'medium'
          }
        ]
      },
      exchangeRates: {
        USD: { buy: 29.85, sell: 29.95, change: '+0.12%' },
        EUR: { buy: 32.45, sell: 32.55, change: '-0.08%' },
        GBP: { buy: 37.80, sell: 37.90, change: '+0.25%' },
        XAU: { buy: 2050.50, sell: 2051.00, change: '+1.2%' }
      },
      messagingStats: {
        sms: { sent: 1250, delivered: 1180, failed: 70 },
        email: { sent: 890, delivered: 845, failed: 45 },
        whatsapp: { sent: 340, delivered: 325, failed: 15 }
      },
      workflow: {
        stages: [
          { name: 'Başvuru', count: 25, color: 'bg-blue-500' },
          { name: 'İnceleme', count: 18, color: 'bg-yellow-500' },
          { name: 'Onay', count: 12, color: 'bg-green-500' },
          { name: 'Tamamlandı', count: 8, color: 'bg-gray-500' }
        ]
      },
      invitations: {
        pending: 15,
        accepted: 45,
        declined: 8,
        total: 68
      }
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard API Error:', error)
    return NextResponse.json(
      { error: 'Dashboard verileri alınamadı' },
      { status: 500 }
    )
  }
} 