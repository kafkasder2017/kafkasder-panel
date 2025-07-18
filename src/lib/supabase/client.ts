import { createClient } from '@supabase/supabase-js'

// Context7 Environment Variable Validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Context7 Error Handling for Missing Environment Variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not properly configured. Using fallback client.')
}

// Context7 Fallback Configuration
const fallbackUrl = 'https://your-project.supabase.co'
const fallbackKey = 'your-anon-key'

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
) 