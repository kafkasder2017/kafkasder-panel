// Context7 Environment Validation Pattern
export const validateEnvironment = () => {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`)
    return {
      supabaseUrl: '',
      anonKey: '',
      isValid: false
    }
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // JWT token format validation (Context7 Security Pattern)
  if (!anonKey?.startsWith('eyJ')) {
    console.warn('Invalid JWT token format in NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return {
      supabaseUrl: '',
      anonKey: '',
      isValid: false
    }
  }
  
  // URL format validation (Context7 Validation Pattern)
  if (!supabaseUrl?.includes('supabase.co')) {
    console.warn('Invalid Supabase URL format')
    return {
      supabaseUrl: '',
      anonKey: '',
      isValid: false
    }
  }
  
  return {
    supabaseUrl,
    anonKey,
    isValid: true
  }
}

// Context7 Runtime Validation
export const validateRuntime = () => {
  if (typeof window === 'undefined') {
    // Server-side validation
    return validateEnvironment()
  } else {
    // Client-side validation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !anonKey) {
      console.warn('Missing environment variables on client side')
      return { isValid: false, supabaseUrl: '', anonKey: '' }
    }
    
    // Basic validation for client-side
    if (!anonKey.startsWith('eyJ') || !supabaseUrl.includes('supabase.co')) {
      console.warn('Invalid environment variables on client side')
      return { isValid: false, supabaseUrl: '', anonKey: '' }
    }
    
    return { supabaseUrl, anonKey, isValid: true }
  }
} 