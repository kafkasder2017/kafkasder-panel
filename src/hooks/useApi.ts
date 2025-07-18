import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/services/api-client'
import { Context7Record } from '@/types/context7'

// Context7 Generic API Hook with Error Handling
export function useApi<T>(
  table: string,
  options: {
    filters?: Context7Record
    orderBy?: { column: string; ascending?: boolean }
    autoFetch?: boolean
    select?: string
  } = {}
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { filters, orderBy, autoFetch = true, select } = options

  const fetchData = useCallback(async () => {
    if (!table) {
      setError('Table name is required')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.get(table, {
        filters,
        orderBy,
        select
      })
      setData(Array.isArray(response) ? response : [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata'
      setError(errorMessage)
      setData([])
      console.error(`Error fetching data from ${table}:`, err)
    } finally {
      setLoading(false)
    }
  }, [table, filters, orderBy, select])

  const create = useCallback(async (item: any) => {
    if (!table) {
      throw new Error('Table name is required')
    }

    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.create(table, item)
      const newData = Array.isArray(response) ? response : [response]
      setData(prev => [...prev, ...newData])
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Oluşturma hatası'
      setError(errorMessage)
      console.error(`Error creating item in ${table}:`, err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [table])

  const update = useCallback(async (id: string, updates: any) => {
    if (!table) {
      throw new Error('Table name is required')
    }

    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.update(table, id, updates)
      const updatedData = Array.isArray(response) ? response[0] : response
      setData(prev => prev.map(item => (item as any).id === id ? updatedData : item))
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Güncelleme hatası'
      setError(errorMessage)
      console.error(`Error updating item in ${table}:`, err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [table])

  const remove = useCallback(async (id: string) => {
    if (!table) {
      throw new Error('Table name is required')
    }

    setLoading(true)
    setError(null)
    try {
      await apiClient.delete(table, id)
      setData(prev => prev.filter(item => (item as any).id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Silme hatası'
      setError(errorMessage)
      console.error(`Error deleting item from ${table}:`, err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [table])

  useEffect(() => {
    if (autoFetch && table) {
      fetchData()
    }
  }, [fetchData, autoFetch, table])

  return {
    data,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    refetch: fetchData
  }
}

// Diğer gelişmiş ve paginated, realtime, bulk, stats hook'ları şimdilik devre dışı bırakıldı. 