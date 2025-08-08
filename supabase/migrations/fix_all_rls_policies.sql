-- Fix RLS policies for all main tables

-- Fix kisiler table
ALTER TABLE kisiler DISABLE ROW LEVEL SECURITY;
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'kisiler' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON kisiler';
    END LOOP;
END $$;
GRANT ALL ON kisiler TO authenticated;
GRANT SELECT ON kisiler TO anon;
ALTER TABLE kisiler ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_access" ON kisiler FOR ALL USING (true);

-- Fix yardim_basvurulari table
ALTER TABLE yardim_basvurulari DISABLE ROW LEVEL SECURITY;
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'yardim_basvurulari' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON yardim_basvurulari';
    END LOOP;
END $$;
GRANT ALL ON yardim_basvurulari TO authenticated;
GRANT SELECT ON yardim_basvurulari TO anon;
ALTER TABLE yardim_basvurulari ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_access" ON yardim_basvurulari FOR ALL USING (true);

-- Fix projeler table
ALTER TABLE projeler DISABLE ROW LEVEL SECURITY;
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'projeler' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON projeler';
    END LOOP;
END $$;
GRANT ALL ON projeler TO authenticated;
GRANT SELECT ON projeler TO anon;
ALTER TABLE projeler ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_access" ON projeler FOR ALL USING (true);

-- Fix bagislar table
ALTER TABLE bagislar DISABLE ROW LEVEL SECURITY;
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'bagislar' AND schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON bagislar';
    END LOOP;
END $$;
GRANT ALL ON bagislar TO authenticated;
GRANT SELECT ON bagislar TO anon;
ALTER TABLE bagislar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_access" ON bagislar FOR ALL USING (true);