-- Reset all RLS policies for kullanicilar table

-- Disable RLS temporarily
ALTER TABLE kullanicilar DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'kullanicilar' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON kullanicilar';
    END LOOP;
END $$;

-- Grant basic permissions to roles
GRANT ALL ON kullanicilar TO authenticated;
GRANT SELECT ON kullanicilar TO anon;

-- Re-enable RLS with simple policies
ALTER TABLE kullanicilar ENABLE ROW LEVEL SECURITY;

-- Create simple policy for authenticated users
CREATE POLICY "authenticated_access" ON kullanicilar
    FOR ALL USING (true);