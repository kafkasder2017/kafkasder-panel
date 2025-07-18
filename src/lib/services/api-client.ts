import { createClient } from '../supabase/client'

// Context7 API Client Pattern
export class ApiClient {
  private supabase = createClient()

  // Generic GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const { data, error } = await this.supabase
      .from(endpoint)
      .select('*')
      .match(params || {})

    if (error) {
      throw new Error(`API Error: ${error.message}`)
    }

    return data as T
  }

  // Generic POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    const { data: result, error } = await this.supabase
      .from(endpoint)
      .insert([data])
      .select()
      .single()

    if (error) {
      throw new Error(`API Error: ${error.message}`)
    }

    return result as T
  }

  // Generic PUT request
  async put<T>(endpoint: string, id: string, data: any): Promise<T> {
    const { data: result, error } = await this.supabase
      .from(endpoint)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`API Error: ${error.message}`)
    }

    return result as T
  }

  // Generic DELETE request
  async delete(endpoint: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(endpoint)
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`API Error: ${error.message}`)
    }
  }

  // Auth methods
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(`Auth Error: ${error.message}`)
    }

    return data
  }

  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) {
      throw new Error(`Auth Error: ${error.message}`)
    }

    return data
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()

    if (error) {
      throw new Error(`Auth Error: ${error.message}`)
    }
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()

    if (error) {
      throw new Error(`Auth Error: ${error.message}`)
    }

    return user
  }

  async getSession() {
    const { data: { session }, error } = await this.supabase.auth.getSession()

    if (error) {
      throw new Error(`Auth Error: ${error.message}`)
    }

    return session
  }
}

// Context7 Singleton Pattern
export const supabaseApiClient = new ApiClient() 