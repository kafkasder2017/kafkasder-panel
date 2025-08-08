-- Set isahamid095@gmail.com as admin user
-- First check if user exists, if not create it, then update role to ADMIN

-- Insert or update user with admin role
INSERT INTO kullanicilar (kullanici_adi, email, rol, durum)
VALUES ('Admin User', 'isahamid095@gmail.com', 'ADMIN', 'AKTIF')
ON CONFLICT (email) 
DO UPDATE SET 
  rol = 'ADMIN',
  durum = 'AKTIF',
  updated_at = now();

-- Grant permissions to authenticated role for kullanicilar table
GRANT ALL PRIVILEGES ON kullanicilar TO authenticated;
GRANT SELECT ON kullanicilar TO anon;

-- Create RLS policy for admin users
CREATE POLICY "Admin users can manage all users" ON kullanicilar
  FOR ALL USING (rol = 'ADMIN');

-- Create RLS policy for regular users to view their own data
CREATE POLICY "Users can view their own data" ON kullanicilar
  FOR SELECT USING (auth.uid() = user_id);

-- Enable RLS if not already enabled
ALTER TABLE kullanicilar ENABLE ROW LEVEL SECURITY;