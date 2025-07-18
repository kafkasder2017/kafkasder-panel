import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp,
  Heart
} from 'lucide-react'

interface DashboardStatsProps {
  personsCount: number
  organizationsCount: number
  donationsCount: number
  recentDonations: any[]
}

export default function DashboardStats({ personsCount, organizationsCount, donationsCount, recentDonations }: DashboardStatsProps) {
  const stats = [
    {
      title: 'Toplam Bağış',
      value: `${donationsCount.toLocaleString('tr-TR')}`,
      description: `${recentDonations.length} son bağış`,
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Aktif Kişiler',
      value: personsCount.toString(),
      description: `${personsCount} toplam kişi`,
      icon: Users,
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Organizasyonlar',
      value: organizationsCount.toString(),
      description: `${organizationsCount} toplam organizasyon`,
      icon: Building2,
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Tamamlanan Bağışlar',
      value: `${donationsCount.toLocaleString('tr-TR')}`,
      description: `${donationsCount} bağış`,
      icon: Heart,
      trend: '+8.7%',
      trendUp: true
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
            <div className="flex items-center mt-2">
              <TrendingUp className={`h-3 w-3 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs ml-1 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 