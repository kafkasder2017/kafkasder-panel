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
      persons: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          mobile_phone: string | null
          international_phone: string | null
          nationality: string | null
          identity_number: string | null
          birth_date: string | null
          country_id: string | null
          city_id: string | null
          district_id: string | null
          neighborhood_id: string | null
          address: string | null
          category: 'donor' | 'beneficiary' | 'member' | 'volunteer'
          file_number: string | null
          sponsorship_type: string | null
          status: 'draft' | 'active' | 'inactive' | 'blocked'
          father_name: string | null
          mother_name: string | null
          identity_type: string | null
          identity_validity_date: string | null
          identity_issuer: string | null
          identity_series: string | null
          previous_identities: string[] | null
          previous_addresses: string[] | null
          passport_type: string | null
          passport_number: string | null
          passport_validity_date: string | null
          visa_start_date: string | null
          visa_end_date: string | null
          return_document: string | null
          gender: string | null
          birth_place: string | null
          marital_status: string | null
          education_level: string | null
          employment_status: string | null
          work_sector: string | null
          profession_group: string | null
          profession_description: string | null
          criminal_record: boolean
          housing_type: string | null
          monthly_income: number | null
          monthly_expenses: number | null
          social_security: string | null
          income_sources: string[] | null
          blood_type: string | null
          smoking: boolean
          disability_details: string | null
          prosthetics: string[] | null
          medical_devices: string[] | null
          medications: string[] | null
          surgeries: string[] | null
          diseases: string[] | null
          health_notes: string | null
          emergency_contact_name: string | null
          emergency_contact_relation: string | null
          emergency_contact_phone1: string | null
          emergency_contact_phone2: string | null
          tags: string[] | null
          is_earthquake_victim: boolean
          special_situations: string[] | null
          notes_tr: string | null
          notes_en: string | null
          notes_ar: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          mobile_phone?: string | null
          international_phone?: string | null
          nationality?: string | null
          identity_number?: string | null
          birth_date?: string | null
          country_id?: string | null
          city_id?: string | null
          district_id?: string | null
          neighborhood_id?: string | null
          address?: string | null
          category?: 'donor' | 'beneficiary' | 'member' | 'volunteer'
          file_number?: string | null
          sponsorship_type?: string | null
          status?: 'draft' | 'active' | 'inactive' | 'blocked'
          father_name?: string | null
          mother_name?: string | null
          identity_type?: string | null
          identity_validity_date?: string | null
          identity_issuer?: string | null
          identity_series?: string | null
          previous_identities?: string[] | null
          previous_addresses?: string[] | null
          passport_type?: string | null
          passport_number?: string | null
          passport_validity_date?: string | null
          visa_start_date?: string | null
          visa_end_date?: string | null
          return_document?: string | null
          gender?: string | null
          birth_place?: string | null
          marital_status?: string | null
          education_level?: string | null
          employment_status?: string | null
          work_sector?: string | null
          profession_group?: string | null
          profession_description?: string | null
          criminal_record?: boolean
          housing_type?: string | null
          monthly_income?: number | null
          monthly_expenses?: number | null
          social_security?: string | null
          income_sources?: string[] | null
          blood_type?: string | null
          smoking?: boolean
          disability_details?: string | null
          prosthetics?: string[] | null
          medical_devices?: string[] | null
          medications?: string[] | null
          surgeries?: string[] | null
          diseases?: string[] | null
          health_notes?: string | null
          emergency_contact_name?: string | null
          emergency_contact_relation?: string | null
          emergency_contact_phone1?: string | null
          emergency_contact_phone2?: string | null
          tags?: string[] | null
          is_earthquake_victim?: boolean
          special_situations?: string[] | null
          notes_tr?: string | null
          notes_en?: string | null
          notes_ar?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          mobile_phone?: string | null
          international_phone?: string | null
          nationality?: string | null
          identity_number?: string | null
          birth_date?: string | null
          country_id?: string | null
          city_id?: string | null
          district_id?: string | null
          neighborhood_id?: string | null
          address?: string | null
          category?: 'donor' | 'beneficiary' | 'member' | 'volunteer'
          file_number?: string | null
          sponsorship_type?: string | null
          status?: 'draft' | 'active' | 'inactive' | 'blocked'
          father_name?: string | null
          mother_name?: string | null
          identity_type?: string | null
          identity_validity_date?: string | null
          identity_issuer?: string | null
          identity_series?: string | null
          previous_identities?: string[] | null
          previous_addresses?: string[] | null
          passport_type?: string | null
          passport_number?: string | null
          passport_validity_date?: string | null
          visa_start_date?: string | null
          visa_end_date?: string | null
          return_document?: string | null
          gender?: string | null
          birth_place?: string | null
          marital_status?: string | null
          education_level?: string | null
          employment_status?: string | null
          work_sector?: string | null
          profession_group?: string | null
          profession_description?: string | null
          criminal_record?: boolean
          housing_type?: string | null
          monthly_income?: number | null
          monthly_expenses?: number | null
          social_security?: string | null
          income_sources?: string[] | null
          blood_type?: string | null
          smoking?: boolean
          disability_details?: string | null
          prosthetics?: string[] | null
          medical_devices?: string[] | null
          medications?: string[] | null
          surgeries?: string[] | null
          diseases?: string[] | null
          health_notes?: string | null
          emergency_contact_name?: string | null
          emergency_contact_relation?: string | null
          emergency_contact_phone1?: string | null
          emergency_contact_phone2?: string | null
          tags?: string[] | null
          is_earthquake_victim?: boolean
          special_situations?: string[] | null
          notes_tr?: string | null
          notes_en?: string | null
          notes_ar?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          person_id: string | null
          organization_id: string | null
          amount: number
          currency: string
          type: 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind'
          method: 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other'
          description: string | null
          receipt_number: string | null
          status: 'pending' | 'completed' | 'failed' | 'cancelled'
          donated_at: string
          processed_at: string | null
          notes: string | null
          attachments: string[] | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          person_id?: string | null
          organization_id?: string | null
          amount: number
          currency?: string
          type: 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind'
          method: 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other'
          description?: string | null
          receipt_number?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          donated_at?: string
          processed_at?: string | null
          notes?: string | null
          attachments?: string[] | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          person_id?: string | null
          organization_id?: string | null
          amount?: number
          currency?: string
          type?: 'cash' | 'check' | 'credit_card' | 'online' | 'in_kind'
          method?: 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'other'
          description?: string | null
          receipt_number?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          donated_at?: string
          processed_at?: string | null
          notes?: string | null
          attachments?: string[] | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          type: string | null
          tax_number: string | null
          phone: string | null
          email: string | null
          website: string | null
          address: string | null
          contact_person_id: string | null
          country_id: string | null
          city_id: string | null
          district_id: string | null
          neighborhood_id: string | null
          status: string
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          tax_number?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address?: string | null
          contact_person_id?: string | null
          country_id?: string | null
          city_id?: string | null
          district_id?: string | null
          neighborhood_id?: string | null
          status?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          tax_number?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          address?: string | null
          contact_person_id?: string | null
          country_id?: string | null
          city_id?: string | null
          district_id?: string | null
          neighborhood_id?: string | null
          status?: string
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      countries: {
        Row: {
          id: string
          name: string
          code: string
          phone_code: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          phone_code?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          phone_code?: string | null
          created_at?: string
        }
      }
      cities: {
        Row: {
          id: string
          country_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          country_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          name?: string
          created_at?: string
        }
      }
      districts: {
        Row: {
          id: string
          city_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          city_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          city_id?: string
          name?: string
          created_at?: string
        }
      }
      neighborhoods: {
        Row: {
          id: string
          district_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          district_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          district_id?: string
          name?: string
          created_at?: string
        }
      }
    }
  }
}

export type Person = Database['public']['Tables']['persons']['Row']
export type PersonInsert = Database['public']['Tables']['persons']['Insert']
export type PersonUpdate = Database['public']['Tables']['persons']['Update']

export type Donation = Database['public']['Tables']['donations']['Row']
export type DonationInsert = Database['public']['Tables']['donations']['Insert']
export type DonationUpdate = Database['public']['Tables']['donations']['Update']

export type Organization = Database['public']['Tables']['organizations']['Row']
export type OrganizationInsert = Database['public']['Tables']['organizations']['Insert']
export type OrganizationUpdate = Database['public']['Tables']['organizations']['Update']

export type Country = Database['public']['Tables']['countries']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type District = Database['public']['Tables']['districts']['Row']
export type Neighborhood = Database['public']['Tables']['neighborhoods']['Row'] 