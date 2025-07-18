export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      kisiler: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          category: 'donor' | 'beneficiary' | 'member' | 'volunteer'
          status: 'draft' | 'active' | 'inactive' | 'blocked'
          address: string | null
          city: string | null
          country: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          category?: 'donor' | 'beneficiary' | 'member' | 'volunteer'
          status?: 'draft' | 'active' | 'inactive' | 'blocked'
          address?: string | null
          city?: string | null
          country?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          category?: 'donor' | 'beneficiary' | 'member' | 'volunteer'
          status?: 'draft' | 'active' | 'inactive' | 'blocked'
          address?: string | null
          city?: string | null
          country?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ulkeler: {
        Row: {
          id: string
          name: string
          code: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          created_at?: string
        }
      }
      sehirler: {
        Row: {
          id: string
          name: string
          country_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          country_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          country_id?: string
          created_at?: string
        }
      }
      ilceler: {
        Row: {
          id: string
          name: string
          city_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          city_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          city_id?: string
          created_at?: string
        }
      }
    }
  }
}

export type Person = Database['public']['Tables']['kisiler']['Row']
export type PersonInsert = Database['public']['Tables']['kisiler']['Insert']
export type PersonUpdate = Database['public']['Tables']['kisiler']['Update']

export type Country = Database['public']['Tables']['ulkeler']['Row']
export type City = Database['public']['Tables']['sehirler']['Row']
export type District = Database['public']['Tables']['ilceler']['Row'] 