'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { hasPermission } from '@/lib/auth'
import {
  Download,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  UserPlus,
  UserMinus,
} from 'lucide-react'

// Mock data - gerçek uygulamada API'den gelecek
const mockStats = {
  totalMembers: 1250,
  activeMembers: 1180,
  inactiveMembers: 70,
  newMembersThisMonth: 45,
  leftMembersThisMonth: 12,
  totalRevenue: 125430,
  averageRevenue: 104.5,
  collectionRate: 78.3,
}

const mockMonthlyData = [
  { month: 'Ocak', members: 1200, revenue: 115000, newMembers: 35, leftMembers: 8 },
  { month: 'Şubat', members: 1220, revenue: 118000, newMembers: 42, leftMembers: 10 },
  { month: 'Mart', members: 1240, revenue: 121000, newMembers: 38, leftMembers: 12 },
  { month: 'Nisan', members: 1250, revenue: 125430, newMembers: 45, leftMembers: 12 },
]

const mockTopMembers = [
  { rank: 1, name: 'Ahmet Yılmaz', memberNumber: 'UYE-2024-001', totalPaid: 15000, joinDate: '2020-01-15' },
  { rank: 2, name: 'Fatma Demir', memberNumber: 'UYE-2024-002', totalPaid: 12000, joinDate: '2021-03-20' },
  { rank: 3, name: 'Mehmet Kaya', memberNumber: 'UYE-2024-003', totalPaid: 9800, joinDate: '2022-06-10' },
  { rank: 4, name: 'Ayşe Çelik', memberNumber: 'UYE-2024-004', totalPaid: 8500, joinDate: '2021-11-05' },
  { rank: 5, name: 'Ali Özkan', memberNumber: 'UYE-2024-005', totalPaid: 7200, joinDate: '2023-02-28' },
]

const mockMembershipTypes = [
  { type: 'Normal', count: 980, percentage: 78.4, revenue: 98000 },
  { type: 'Premium', count: 200, percentage: 16.0, revenue: 200000 },
  { type: 'VIP', count: 50, percentage: 4.0, revenue: 75000 },
  { type: 'Öğrenci', count: 20, percentage: 1.6, revenue: 5000 },
]

export default function MemberReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024')
  const { user } = useAuth()

  const canViewReports = hasPermission(user, 'members:view')

  const stats = [
    {
      title: 'Toplam Üye',
      value: mockStats.totalMembers.toLocaleString(),
      change: '+2.5%',
      icon: Users,
      color: 'text-blue-600',
      trend: 'up',
    },
    {
      title: 'Aktif Üye',
      value: mockStats.activeMembers.toLocaleString(),
      change: '+1.8%',
      icon: UserPlus,
      color: 'text-green-600',
      trend: 'up',
    },
    {
      title: 'Aylık Gelir',
      value: `₺${mockStats.totalRevenue.toLocaleString()}`,
      change: '+3.2%',
      icon: DollarSign,
      color: 'text-purple-600',
      trend: 'up',
    },
    {
      title: 'Tahsilat Oranı',
      value: `%${mockStats.collectionRate}`,
      change: '+1.5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      trend: 'up',
    },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  if (!canViewReports) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Erişim Reddedildi</h3>
          <p className="text-muted-foreground">
            Bu raporları görüntülemek için yetkiniz bulunmamaktadır.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Üye Raporları</h1>
          <p className="text-muted-foreground">
            Üye istatistikleri, performans analizi ve raporlar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(stat.trend)}
                  Geçen aya göre {stat.change}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Aylık Trend</CardTitle>
            <CardDescription>
              Üye sayısı ve gelir trendi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMonthlyData.map((data) => (
                <div key={data.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{data.month}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.newMembers} yeni, {data.leftMembers} ayrılan
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{data.members} üye</p>
                    <p className="text-sm text-muted-foreground">
                      ₺{data.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Types */}
        <Card>
          <CardHeader>
            <CardTitle>Üyelik Tipleri</CardTitle>
            <CardDescription>
              Üyelik tipine göre dağılım
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMembershipTypes.map((type) => (
                <div key={type.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium">{type.type}</p>
                      <p className="text-sm text-muted-foreground">
                        %{type.percentage} ({type.count} üye)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{type.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>En Aktif Üyeler</CardTitle>
          <CardDescription>
            En çok aidat ödeyen üyeler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sıra</TableHead>
                <TableHead>Üye</TableHead>
                <TableHead>Üye No</TableHead>
                <TableHead>Toplam Ödeme</TableHead>
                <TableHead>Üyelik Tarihi</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTopMembers.map((member) => (
                <TableRow key={member.memberNumber}>
                  <TableCell>
                    <Badge variant="outline">#{member.rank}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.memberNumber}</TableCell>
                  <TableCell className="font-medium">
                    ₺{member.totalPaid.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(member.joinDate).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Aktif
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Üye Aktivitesi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Bu ay yeni üye</span>
              <span className="font-medium text-green-600">+{mockStats.newMembersThisMonth}</span>
            </div>
            <div className="flex justify-between">
              <span>Bu ay ayrılan</span>
              <span className="font-medium text-red-600">-{mockStats.leftMembersThisMonth}</span>
            </div>
            <div className="flex justify-between">
              <span>Net artış</span>
              <span className="font-medium text-blue-600">
                +{mockStats.newMembersThisMonth - mockStats.leftMembersThisMonth}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Gelir Analizi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Toplam gelir</span>
              <span className="font-medium">₺{mockStats.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Ortalama üye geliri</span>
              <span className="font-medium">₺{mockStats.averageRevenue}</span>
            </div>
            <div className="flex justify-between">
              <span>Tahsilat oranı</span>
              <span className="font-medium">%{mockStats.collectionRate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Üyelik Durumu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Aktif üyeler</span>
              <span className="font-medium text-green-600">{mockStats.activeMembers}</span>
            </div>
            <div className="flex justify-between">
              <span>Pasif üyeler</span>
              <span className="font-medium text-red-600">{mockStats.inactiveMembers}</span>
            </div>
            <div className="flex justify-between">
              <span>Aktiflik oranı</span>
              <span className="font-medium text-blue-600">
                %{((mockStats.activeMembers / mockStats.totalMembers) * 100).toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 