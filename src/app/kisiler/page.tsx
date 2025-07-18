import { Suspense } from 'react'
import { getPersons } from '@/lib/supabase/data'
import PersonsTable from '@/components/persons/PersonsTable'
import { Card, CardContent } from '@/components/ui/card'

// Context7 Server Component for Data Fetching
async function PersonsData({ 
  searchParams 
}: { 
  searchParams: { 
    page?: string
    category?: string
    status?: string
    search?: string
  } 
}) {
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category || ''
  const status = searchParams.status || ''
  const search = searchParams.search || ''

  try {
    const result = await getPersons({
      category: category || undefined,
      status: status || undefined,
      search: search || undefined,
      page,
      limit: 10
    })

    return (
      <PersonsTable
        persons={result.data}
        totalCount={result.count}
        currentPage={result.page}
        totalPages={result.totalPages}
        onPageChange={(newPage) => {
          // This will be handled by client component
        }}
        onRefresh={() => {
          // This will be handled by client component
        }}
      />
    )
  } catch (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">Hata Oluştu</h3>
            <p className="text-gray-600 mt-2">
              {error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }
}

// Context7 Loading Component
function PersonsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mt-2 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      
      <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )
}

// Context7 Main Page Component
export default function PersonsPage({ 
  searchParams 
}: { 
  searchParams: { 
    page?: string
    category?: string
    status?: string
    search?: string
  } 
}) {
  return (
    <Suspense fallback={<PersonsLoading />}>
      <PersonsData searchParams={searchParams} />
    </Suspense>
  )
} 