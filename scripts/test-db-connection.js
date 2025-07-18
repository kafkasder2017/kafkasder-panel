const { createClient } = require('@supabase/supabase-js')

// Test database connection and user_profiles table
async function testDatabaseConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Database connection failed:', error)
      return
    }

    console.log('✅ Database connection successful')
    console.log('✅ user_profiles table exists and is accessible')

    // Test table structure
    const { data: structure, error: structureError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1)

    if (structureError) {
      console.error('❌ Error reading table structure:', structureError)
    } else {
      console.log('✅ Table structure is accessible')
      if (structure && structure.length > 0) {
        console.log('📋 Sample record structure:', Object.keys(structure[0]))
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testDatabaseConnection() 