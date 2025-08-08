-- Fix infinite recursion in RLS policies for kullanicilar table

-- Drop existing policies that might cause recursion
DROP POLICY IF EXISTS "Users can view their own data" ON kullanicilar;
DROP POLICY IF EXISTS "Admins can view all users" ON kullanicilar;
DROP POLICY IF EXISTS "Users can update their own data" ON kullanicilar;
DROP POLICY IF EXISTS "Admins can manage all users" ON kullanicilar;
DROP POLICY IF EXISTS "Allow authenticated users to read" ON kullanicilar;
DROP POLICY IF EXISTS "Allow admins full access" ON kullanicilar;

-- Create simple, non-recursive policies
CREATE POLICY "Enable read access for authenticated users" ON kullanicilar
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON kullanicilar
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for own record" ON kullanicilar
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for own record" ON kullanicilar
    FOR DELETE USING (auth.uid() = user_id);

-- Grant permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE, DELETE ON kullanicilar TO authenticated;
GRANT SELECT ON kullanicilar TO anon;

-- Ensure RLS is enabled
ALTER TABLE kullanicilar ENABLE ROW LEVEL SECURITY;