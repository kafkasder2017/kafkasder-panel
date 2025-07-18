import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardChartsProps {
  monthlyDonations: any[]
  donationTypes: { type: string; amount: number }[]
  topDonors: { amount: number; donor_name: string; created_at: string }[]
}

export default function DashboardCharts({ monthlyDonations, donationTypes, topDonors }: DashboardChartsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bağış Analizi</CardTitle>
        <CardDescription>
          Aylık bağış miktarları ve tür dağılımı
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Monthly Donations Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Aylık Bağış Miktarları</h3>
            <div className="grid grid-cols-2 gap-4">
              {monthlyDonations.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">{item.month}</span>
                  <span className="text-lg font-bold text-blue-600">
                    {item.amount.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Types Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bağış Türleri</h3>
            <div className="grid grid-cols-2 gap-4">
              {donationTypes.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium capitalize">{item.type}</span>
                  <span className="text-lg font-bold text-green-600">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Donors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">En Çok Bağış Yapanlar</h3>
            <div className="space-y-2">
              {topDonors.map((donor, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="font-medium">{donor.donor_name}</span>
                  <span className="text-lg font-bold text-yellow-600">{donor.amount.toLocaleString('tr-TR')} ₺</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 