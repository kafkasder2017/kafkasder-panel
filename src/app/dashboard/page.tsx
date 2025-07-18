import { Suspense } from 'react';
import { createServerComponentClient } from '@/lib/supabase/server';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardRecentActivity from '@/components/dashboard/DashboardRecentActivity';
import { SkeletonCard, SuspenseWrapper } from '@/components/ui/suspense-wrapper';
import PerformanceMonitor from '@/components/dashboard/PerformanceMonitor';

// ============================================================================
// CACHED DATA FETCHING
// ============================================================================

/**
 * Cached data fetching for dashboard stats
 */
async function getDashboardStats() {
  const supabase = await createServerComponentClient();
  
  // Fetch stats in parallel
  const [persons, organizations, donations, recentDonations] = await Promise.all([
    // Total persons count
    supabase.from('persons').select('id', { count: 'exact', head: true }),
    
    // Total organizations count
    supabase.from('organizations').select('id', { count: 'exact', head: true }),
    
    // Total donations count
    supabase.from('donations').select('id', { count: 'exact', head: true }),
    
    // Recent donations
    supabase.from('donations')
      .select(`
        *,
        persons(first_name, last_name),
        organizations(name)
      `)
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  return {
    personsCount: persons.count || 0,
    organizationsCount: organizations.count || 0,
    donationsCount: donations.count || 0,
    recentDonations: recentDonations.data || []
  };
}

/**
 * Cached data fetching for dashboard charts
 */
async function getDashboardCharts() {
  const supabase = await createServerComponentClient();
  
  // Fetch chart data in parallel
  const [monthlyDonations, donationTypes, topDonors] = await Promise.all([
    // Monthly donations for the last 12 months
    supabase.rpc('get_monthly_donations', { months_back: 12 }),
    
    // Donation types distribution
    supabase.from('donations')
      .select('type, amount')
      .order('created_at', { ascending: false }),
    
    // Top donors
    supabase.from('donations')
      .select('amount, donor_name, created_at')
      .order('amount', { ascending: false })
      .limit(10)
  ]);

  return {
    monthlyDonations: monthlyDonations.data || [],
    donationTypes: donationTypes.data || [],
    topDonors: topDonors.data || []
  };
}

// ============================================================================
// DASHBOARD COMPONENTS
// ============================================================================

/**
 * Dashboard Stats Component with Server Data
 */
async function DashboardStatsServer() {
  const stats = await getDashboardStats();
  
  return (
    <DashboardStats
      personsCount={stats.personsCount}
      organizationsCount={stats.organizationsCount}
      donationsCount={stats.donationsCount}
      recentDonations={stats.recentDonations}
    />
  );
}

/**
 * Dashboard Charts Component with Server Data
 */
async function DashboardChartsServer() {
  const charts = await getDashboardCharts();
  
  return (
    <DashboardCharts
      monthlyDonations={charts.monthlyDonations}
      donationTypes={charts.donationTypes}
      topDonors={charts.topDonors}
    />
  );
}

/**
 * Dashboard Recent Activity Component with Server Data
 */
async function DashboardRecentActivityServer() {
  const supabase = await createServerComponentClient();
  
  // Fetch recent donations and persons in parallel
  const [recentDonations, recentPersons] = await Promise.all([
    supabase
      .from('donations')
      .select(`
        *,
        persons(first_name, last_name),
        organizations(name)
      `)
      .order('created_at', { ascending: false })
      .limit(5),
    
    supabase
      .from('persons')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  return (
    <DashboardRecentActivity 
      recentDonations={recentDonations.data || []}
      recentPersons={recentPersons.data || []}
    />
  );
}

// ============================================================================
// MAIN DASHBOARD PAGE
// ============================================================================

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            KAFKASDER yönetim paneli genel bakış
          </p>
        </div>

        {/* Dashboard Stats */}
        <SuspenseWrapper
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <DashboardStatsServer />
        </SuspenseWrapper>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2">
            <SuspenseWrapper
              fallback={
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                  </div>
                </div>
              }
            >
              <DashboardChartsServer />
            </SuspenseWrapper>
          </div>

          {/* Recent Activity Section */}
          <div className="lg:col-span-1">
            <SuspenseWrapper
              fallback={
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="mb-3">
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <DashboardRecentActivityServer />
            </SuspenseWrapper>
          </div>
        </div>

        {/* Performance Monitoring */}
        <PerformanceMonitor />
      </div>
    </div>
  );
} 