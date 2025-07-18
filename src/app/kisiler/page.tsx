'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase/client'
import PersonsTable from '@/components/persons/PersonsTable'
import { Card, CardContent } from '@/components/ui/card'

// Context7 Client Component for Data Fetching
function PersonsData({ 
  searchParams 
}: { 
  searchParams: Promise<{ 
    page?: string
    category?: string
    status?: string
    search?: string
  }>
}) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [params, setParams] = useState<{
    page?: string
    category?: string
    status?: string
    search?: string
  }>({})
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Resolve searchParams promise
    searchParams.then(setParams)
  }, [searchParams])

  const page = parseInt(params.page || '1')
  const category = params.category || ''
  const status = params.status || ''
  const search = params.search || ''

  useEffect(() => {
    if (!params.page && !params.category && !params.status && !params.search) {
      return // Wait for params to be resolved
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Build query
        let query = supabase
          .from('persons')
          .select('*', { count: 'exact' })
          .range((page - 1) * 10, page * 10 - 1)
          .order('created_at', { ascending: false })

        // Add filters
        if (category) {
          query = query.eq('category', category)
        }
        if (status) {
          query = query.eq('status', status)
        }
        if (search) {
          query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
        }

        const { data: persons, count, error: fetchError } = await query

        if (fetchError) {
          throw new Error(fetchError.message)
        }

        const result = {
          data: persons || [],
          count: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / 10)
        }

        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, category, status, search, supabase, params])

  const handlePageChange = (newPage: number) => {
    // Update URL with new page
    const url = new URL(window.location.href)
    url.searchParams.set('page', newPage.toString())
    window.history.pushState({}, '', url.toString())
    // Trigger re-render by updating searchParams
    window.location.reload()
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (loading) {
    return <PersonsLoading />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">Hata Oluştu</h3>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600">Veri Bulunamadı</h3>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <PersonsTable
      persons={data.data}
      totalCount={data.count}
      currentPage={data.page}
      totalPages={data.totalPages}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
    />
  )
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
  searchParams: Promise<{ 
    page?: string
    category?: string
    status?: string
    search?: string
  }>
}) {
  return <PersonsData searchParams={searchParams} />
} 