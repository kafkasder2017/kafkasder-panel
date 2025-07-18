import { supabase } from '../supabase/client'

// Context7 API Client with Error Handling
export const apiClient = {
  async get(table: string, params?: any) {
    try {
      let query = supabase.from(table).select('*')
      
      // Context7 Filter Application
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query = query.eq(key, value)
          }
        })
      }
      
      // Context7 Order Application
      if (params?.orderBy) {
        query = query.order(params.orderBy.column, { ascending: params.orderBy.ascending })
      }
      
      // Context7 Pagination
      if (params?.limit) {
        query = query.limit(params.limit)
      }
      if (params?.offset) {
        query = query.range(params.offset, params.offset + params.limit - 1)
      }
      
      const { data, error } = await query
      if (error) throw error
      return data || []
    } catch (error) {
      console.error(`API Client Error (${table}):`, error)
      return []
    }
  },
  
  async create(table: string, values: any) {
    try {
      const { data, error } = await supabase.from(table).insert(values).select()
      if (error) throw error
      return data
    } catch (error) {
      console.error(`API Client Create Error (${table}):`, error)
      throw error
    }
  },
  
  async update(table: string, id: string | number, values: any) {
    try {
      const { data, error } = await supabase.from(table).update(values).eq('id', id).select()
      if (error) throw error
      return data
    } catch (error) {
      console.error(`API Client Update Error (${table}):`, error)
      throw error
    }
  },
  
  async delete(table: string, id: string | number) {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
      return true
    } catch (error) {
      console.error(`API Client Delete Error (${table}):`, error)
      throw error
    }
  }
} 