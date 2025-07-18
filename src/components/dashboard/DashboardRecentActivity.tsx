import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, User } from 'lucide-react'

interface DashboardRecentActivityProps {
  recentDonations: any[]
  recentPersons: any[]
}

export default function DashboardRecentActivity({ recentDonations, recentPersons }: DashboardRecentActivityProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Son Aktiviteler</CardTitle>
        <CardDescription>
          Son bağışlar ve kişi kayıtları
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Donations */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Son Bağışlar
            </h3>
            <div className="space-y-2">
              {recentDonations.slice(0, 3).map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">
                      {donation.amount?.toLocaleString('tr-TR')} ₺
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {donation.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(donation.donated_at)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Persons */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Son Kişi Kayıtları
            </h3>
            <div className="space-y-2">
              {recentPersons.slice(0, 3).map((person) => (
                <div key={person.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">
                      {person.first_name} {person.last_name}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {person.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(person.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Sistem Durumu</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Aktif
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 